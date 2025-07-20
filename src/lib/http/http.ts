import queryString from "query-string";

import { TokenManager } from "./token-manager";
import { ApiError, AuthError } from "./errors";
import { HEADERS, HTTP_METHODS, CONTENT_TYPES } from "./constants";

import type {
  AuthTokens,
  GateRequest,
  RequestOptions,
  AuthErrorResponse,
  GateMethodRequest,
  HttpServiceConfig,
  AuthFailedListener,
  TokenUpdateListener,
  AbpHttpRemoteServiceErrorInfo,
} from "./types";
import { fallbackLng, LanguageValue } from "../locales/config-locales";

/**
 * A modern HTTP client built on the Fetch API.
 * It provides a clean, typed interface for making API requests,
 * with built-in automatic token refresh logic and a subscribable event system
 * for authentication state changes.
 */
export class HttpService {
  private readonly baseUrl: string;
  private readonly tokenManager: TokenManager;
  locale: LanguageValue;

  constructor(config: HttpServiceConfig) {
    this.baseUrl = config.baseUrl;
    this.tokenManager = TokenManager.instance;
    this.tokenManager.initialize({
      tokenRefreshUrl: config.tokenRefreshUrl,
    });
    this.locale = fallbackLng;
  }

  /**
   * Subscribes a listener to be called when authentication fails permanently.
   * This is useful for triggering a global logout flow or user notification.
   * @param listener The callback function to execute when authentication fails.
   * @returns A function to unsubscribe the listener, preventing memory leaks.
   */
  public subscribeToAuthFailed(listener: AuthFailedListener): () => void {
    return this.tokenManager.subscribeToAuthFailed(listener);
  }

  /**
   * Subscribes a listener to be called when tokens are successfully refreshed/updated.
   * This is useful for persisting the new tokens to secure storage or updating UI.
   * @param listener The callback function to execute with the new AuthResponse data.
   * @returns A function to unsubscribe the listener.
   */
  public subscribeToTokenUpdate(listener: TokenUpdateListener): () => void {
    return this.tokenManager.subscribeToTokenUpdate(listener);
  }

  /** * Sets the authentication tokens in the token manager.
   * Call this after login or when loading tokens from storage.
   * @param tokens An object containing accessToken and refreshToken, or null to clear.
   */
  public setAuthTokens(tokens: AuthTokens | null): void {
    this.tokenManager.setTokens(tokens);
  }
  private getBaseUrl = ({ isApiRoutes, isExternal }: GateRequest<any, any>) => {
    if (isApiRoutes) {
      // if (typeof window !== 'undefined') return '';
      const vc = process.env.VERCEL_URL;
      if (vc) return `https://${vc}`;
      return process.env.NEXT_PUBLIC_HOST_URL ?? "";
    }
    if (!isExternal) return this.baseUrl;
    return "";
  };
  private getRequestOptions(req: GateRequest<any, any>): RequestOptions {
    const {
      url,
      params,
      data,
      op = {},
      isFile = false,
      isExternal = false,
      timeout = typeof window === "undefined" ? 0 : 30000,
      headers: customHeaders,
    } = req;

    const requestUrl = this.getBaseUrl(req) + url;
    const fullUrl = new URL(requestUrl); // Validate URL structure early

    const headers = new Headers({
      [HEADERS.ACCEPT]: CONTENT_TYPES.JSON,
      [HEADERS.REQUESTED_WITH]: "XMLHttpRequest", // Common header for identifying AJAX requests
      ...(customHeaders as Record<string, string>), // Spread custom headers
    });

    if (!isExternal) {
      // Example: Default language header for non-external requests
      headers.set(HEADERS.ACCEPT_LANGUAGE, this.locale); // Or your app's default
    }

    const method = op.method?.toUpperCase() ?? HTTP_METHODS.GET;
    let body: BodyInit | undefined;
    const queryParams = { ...(params as Record<string, string>) }; // Ensure params are string record

    // GET  requests should not have a body; data is sent as query parameters.
    if (method === HTTP_METHODS.GET) {
      if (data) {
        // Merge data into queryParams for GET/DELETE
        Object.assign(queryParams, data as Record<string, string>);
      }
    } else if (isFile) {
      // For file uploads, data should be FormData. Headers are set automatically by fetch for FormData.
      body = data as FormData;
      // Do NOT set Content-Type for FormData, browser does it with boundary.
    } else if (data) {
      // For other methods like POST, PUT, PATCH with data, stringify if JSON.
      body = JSON.stringify(data);
      if (!headers.has(HEADERS.CONTENT_TYPE)) {
        // Set Content-Type if not already set by customHeaders
        headers.set(HEADERS.CONTENT_TYPE, CONTENT_TYPES.JSON);
      }
    }

    // Append query parameters to URL
    if (Object.keys(queryParams).length > 0) {
      fullUrl.search = queryString.stringify(queryParams, {
        skipNull: true,
        skipEmptyString: true,
        arrayFormat: "none",
      });
    }
    let controller: AbortController | undefined;
    let timeoutId: 0 | NodeJS.Timeout = 0;
    if (timeout > 0) {
      controller = new AbortController();
      timeoutId = setTimeout(() => {
        if (!controller?.signal.aborted) controller!.abort();
      }, timeout);
    }
    return { controller, method, headers, body, fullUrl, timeoutId, timeout };
  }

  /**
   * The core request method. It handles request setup, execution, automatic token refresh, and error handling.
   * @template R The expected response type.
   * @param req The request configuration object.
   * @param isRetry A flag to prevent infinite retry loops for token refreshing.
   * @returns A promise that resolves with the response data of type R.
   */
  private async performRequest<R>(
    req: GateRequest<any, any>,
    options: RequestOptions
  ): Promise<R> {
    const {
      tryIsSecure = false, // Allow trying secure requests
      isSecure = true, // Secure by default
    } = req;
    const { method, headers, body, controller, fullUrl, timeoutId, timeout } =
      options;

    try {
      if (isSecure || tryIsSecure) {
        let token = this.tokenManager.getAccessToken();

        if (!token) {
          try {
            const res = await this.tokenManager.fetchAccessToken();

            token = res?.accessToken ?? null;
          } catch (fetchError) {
            if (!tryIsSecure) throw fetchError;
          }
        }
        if (token) headers!.set(HEADERS.AUTHORIZATION, `Bearer ${token}`);
      }

      const response = await fetch(fullUrl.toString(), {
        method,
        headers,
        body,
        signal: controller?.signal,
      });
      if (timeoutId) clearTimeout(timeoutId); // Clear timeout if request completes/fails before timeout

      if (!response.ok) {
        // Handle 401 Unauthorized: attempt token refresh if secure and not already a retry
        if (
          response.status === 401 &&
          (isSecure || tryIsSecure) &&
          this.tokenManager.isLoggedIn()
        ) {
          let newToken: string = "";
          try {
            newToken = await this.tokenManager.refreshAccessToken();
            // Retry the original request with the new token
          } catch (refreshError) {
            if (!tryIsSecure)
              // If refresh fails, throw the refresh error (which might be an AuthError)
              throw refreshError;
          }

          if (newToken)
            headers.set(HEADERS.AUTHORIZATION, `Bearer ${newToken}`);
          else headers.delete(HEADERS.AUTHORIZATION); // Clear if no new token

          return this.performRequest<R>(req, { ...options, headers }); // Cast as any to satisfy GateRequest type
        }

        // For other non-ok responses, parse error details
        const errorContentType = response.headers.get(HEADERS.CONTENT_TYPE);
        let errorData;
        if (errorContentType && errorContentType.includes(CONTENT_TYPES.JSON)) {
          errorData = await response.json();
        } else {
          // Fallback for non-JSON error responses
          const errorText = await response.text();
          errorData = {
            error: `HTTP_${response.status}`,
            error_description: errorText || `HTTP Error: ${response.status}`,
            error_uri: `Server responded with status ${response.status}`,
          };
        }

        if (errorData?.error?.message || errorData?.error?.code) {
          // Volo.Abp style error
          throw new ApiError(
            response.status,
            errorData.error as AbpHttpRemoteServiceErrorInfo
          );
        }
        if (errorData?.error && errorData?.error_description) {
          // OAuth style error
          throw new AuthError(response.status, errorData as AuthErrorResponse);
        }
        // Generic HTTP error if specific error structures are not matched
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText}`
        );
      }

      // Handle successful responses
      if (
        response.status === 204 ||
        response.headers.get(HEADERS.CONTENT_TYPE) === null
      ) {
        // No Content or no content type header
        return undefined as R; // Or specific value indicating no content
      }

      // Assuming successful responses are JSON, adjust if other types are expected
      const responseData = await response.json();
      return responseData as R;
    } catch (error) {
      if (timeoutId) clearTimeout(timeoutId); // Ensure timeout is cleared on any error

      // Re-throw known custom errors (ApiError, AuthError)
      if (error instanceof ApiError || error instanceof AuthError) throw error;

      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unknown network error occurred.";
      if (error instanceof Error && error.name === "AbortError") {
        // Specifically handle timeout
        throw new Error(`Request timed out after ${timeout / 1000} seconds.`);
      }
      // Wrap other errors for consistent error handling by the caller
      throw new Error(
        `Network request to ${fullUrl.toString()} failed: ${errorMessage}`
      );
    }
  }

  /** * Creates a request object that can be executed by calling its `fetch` method.
   * This allows deferring the actual network call.
   * @template R Expected response type.
   * @template D Request body data type.
   * @template P Request query parameters type.
   * @param req The request configuration.
   * @returns An object with a `fetch` method that executes the request.
   */
  public request<R, D, P>(req: GateRequest<D, P>) {
    const options = this.getRequestOptions(req);
    return {
      fetch: (): Promise<R> => this.performRequest<R>(req, options),
      cancel: () => {
        if (
          options.controller &&
          options.controller.signal.aborted === false &&
          options.timeoutId
        ) {
          options.controller?.abort();
          clearTimeout(options.timeoutId);
        }
      },
      options,
    };
  }

  // --- Shortcut Methods ---
  public get = <R = void, P = void>(req: GateMethodRequest<never, P>) =>
    this.request<R, never, P>({
      ...req,
      op: { ...req.op, method: HTTP_METHODS.GET },
    });

  public post = <R = void, D = void, P = void>(req: GateMethodRequest<D, P>) =>
    this.request<R, D, P>({
      ...req,
      op: { ...req.op, method: HTTP_METHODS.POST },
    });

  public put = <R = void, D = void, P = void>(req: GateMethodRequest<D, P>) =>
    this.request<R, D, P>({
      ...req,
      op: { ...req.op, method: HTTP_METHODS.PUT },
    });

  public patch = <R = void, D = void, P = void>(req: GateMethodRequest<D, P>) =>
    this.request<R, D, P>({
      ...req,
      op: { ...req.op, method: HTTP_METHODS.PATCH },
    });

  public del = <R = void, D = void, P = void>(
    req: GateMethodRequest<D, P> // Changed P to D to allow data in delete body if needed, though unusual
  ) =>
    this.request<R, D, P>({
      ...req,
      op: { ...req.op, method: HTTP_METHODS.DELETE },
    });

  /** * Helper method for file uploads using POST.
   * @param req Request configuration, where `data` will be converted to FormData.
   */
  private upload<R, D, P>(
    method: typeof HTTP_METHODS.POST | typeof HTTP_METHODS.PUT,
    { data, ...req }: GateMethodRequest<D, P>
  ) {
    let fd = new FormData();
    if (data && data === Object(data)) {
      // Ensure data is an object before processing
      fd = this.objectToFormData(data as Record<string, any>); // Assumes objectToFormData utility
    } else if (data) {
      console.warn(
        "Data for file upload is not an object, trying to append directly if it's a File/Blob."
      );
    }
    return this.request<R, FormData, P>({
      ...req,
      data: fd,
      op: { ...req.op, method },
      isFile: true, // Signals that this is a file upload
      timeout: 0, // Typically, file uploads might have longer or no timeout
    });
  }

  /** Shortcut for POST file uploads. */
  public file = <R = void, D = void, P = void>(req: GateMethodRequest<D, P>) =>
    this.upload<R, D, P>(HTTP_METHODS.POST, req);

  /** Shortcut for PUT file uploads. */
  public putFile = <R = void, D = void, P = void>(
    req: GateMethodRequest<D, P>
  ) => this.upload<R, D, P>(HTTP_METHODS.PUT, req);

  private objectToFormData(obj: Record<string, any>): FormData {
    const formData = new FormData();

    const appendToFormData = (data: any, key: string) => {
      if (data === null || data === undefined || data === "SKIP_FIELD") return;

      if (Array.isArray(data)) {
        data.forEach((item, index) => {
          appendToFormData(item, `${key}[${index}]`);
        });
      } else if (data instanceof File || data instanceof Blob) {
        formData.append(key, data);
      } else if (data instanceof Date) {
        formData.append(key, data.toISOString());
      } else if (typeof data === "object") {
        Object.entries(data).forEach(([nestedKey, value]) => {
          appendToFormData(value, `${key}.${nestedKey}`);
        });
      } else {
        formData.append(key, String(data));
      }
    };

    Object.entries(obj).forEach(([key, value]) => {
      appendToFormData(value, key);
    });

    return formData;
  }
}

// Configuration should ideally come from environment variables or a config file.
// Ensure EXPO_PUBLIC_API_URL is set in your environment for React Native/Expo.
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api";

const http = new HttpService({
  baseUrl: API_BASE_URL,
  tokenRefreshUrl: `/api/token`, // Adjust path as needed
});

export { http };
