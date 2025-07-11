import { AuthError } from "./errors";
import { getToken, refreshToken } from "./jwt-actions";
import { HEADERS, HTTP_METHODS, CONTENT_TYPES } from "./constants";

import type {
  AuthTokens,
  AuthResponse,
  AuthFailedListener,
  TokenUpdateListener,
} from "./types";

/**
 * Manages authentication tokens (storage, retrieval, and refreshing) as a singleton.
 * It provides a subscribable event system for authentication-related events.
 * This class is designed to be used internally by the HttpService.
 */
export class TokenManager {
  private static _instance: TokenManager;

  private tokens: AuthTokens = { accessToken: null };
  private isRefreshing = false;
  private isFetching = false;
  private config!: { tokenRefreshUrl: string }; // Definite assignment assertion

  // Sets for storing listeners to ensure no duplicates and allow easy removal.
  private readonly authFailedListeners = new Set<AuthFailedListener>();
  private readonly tokenUpdateListeners = new Set<TokenUpdateListener>();
  // Array for queuing subscribers waiting for a token refresh to complete.
  private readonly refreshSubscribers: ((token: string, error: any) => void)[] =
    [];
  // Array for queuing subscribers waiting for a token fetch to complete.
  private readonly fetchSubscribers: ((res: AuthTokens, error: any) => void)[] =
    [];

  private constructor() {
    // Private constructor to enforce singleton pattern.
  }

  /** Provides access to the singleton instance of TokenManager. */
  public static get instance(): TokenManager {
    if (!TokenManager._instance) {
      TokenManager._instance = new TokenManager();
    }
    return TokenManager._instance;
  }

  /**
   * Initializes the TokenManager with necessary configuration.
   * This must be called before the TokenManager can refresh tokens.
   * @param config Configuration object containing tokenRefreshUrl and clientId.
   */
  public initialize(config: { tokenRefreshUrl: string }): void {
    if (this.config) {
      console.warn("TokenManager already initialized. Re-initializing.");
    }
    this.config = config;
  }

  /**
   * Sets the authentication tokens.
   * @param newTokens An object containing the accessToken and refreshToken, or null to clear tokens.
   */
  public setTokens(newTokens: AuthTokens | null): void {
    this.tokens = newTokens ?? { accessToken: null };
  }

  /**
   * Retrieves the current access token.
   * @returns The access token string, or null if not available.
   */
  public getAccessToken(): string | null {
    return this.tokens.accessToken;
  }
  public isLoggedIn(): boolean {
    return this.tokens.accessToken !== null;
  }

  /**
   * Subscribes a listener to the 'authFailed' event.
   * This event is emitted when token refresh fails permanently (e.g., invalid_grant).
   * @param listener The function to call when authentication fails.
   * @returns An 'unsubscribe' function to remove the listener.
   */
  public subscribeToAuthFailed(listener: AuthFailedListener): () => void {
    this.authFailedListeners.add(listener);
    return () => this.authFailedListeners.delete(listener);
  }

  /**
   * Subscribes a listener to the 'tokenUpdated' event.
   * This event is emitted when tokens are successfully updated (e.g., after a refresh).
   * @param listener The function to call with the new AuthResponse data.
   * @returns An 'unsubscribe' function to remove the listener.
   */
  public subscribeToTokenUpdate(listener: TokenUpdateListener): () => void {
    this.tokenUpdateListeners.add(listener);
    return () => this.tokenUpdateListeners.delete(listener);
  }

  /** Notifies all 'authFailed' listeners. */
  private emitAuthFailed(e: any): void {
    this.authFailedListeners.forEach((listener) => {
      try {
        listener(e);
      } catch (error) {
        console.error("Error in authFailed listener:", error);
      }
    });
  }

  /** Notifies all 'tokenUpdated' listeners with the new token data. */
  private emitTokenUpdate(tokens: AuthResponse): void {
    this.tokenUpdateListeners.forEach((listener) => {
      try {
        listener(tokens);
      } catch (error) {
        console.error("Error in tokenUpdate listener:", error);
      }
    });
  }
  /**
   * fetch the access token.
   * Handles concurrent requests by queueing them until a new token is fetched.
   * @returns A promise that resolves with the new access token.
   * @throws {AuthError} If refresh fails (e.g., no refresh token, invalid_grant).
   * @throws {Error} For network or other unexpected errors during refresh.
   */
  public async fetchAccessToken(): Promise<AuthTokens | null> {
    if (!this.config) {
      throw new Error(
        "TokenManager not initialized. Call initialize() with configuration first."
      );
    }

    if (this.isFetching) {
      // If a refresh is already in progress, queue this request.
      return new Promise<AuthTokens | null>((resolve, reject) =>
        this.fetchSubscribers.push((res, e) => {
          if (!e) {
            resolve(res);
          } else {
            reject(e);
          }
        })
      );
    }

    this.isFetching = true;

    try {
      let response: Response | null = null;
      if (typeof window === "undefined") {
        response = await getToken();
      } else {
        response = await fetch(this.config.tokenRefreshUrl, {
          method: HTTP_METHODS.GET,
          headers: { [HEADERS.CONTENT_TYPE]: CONTENT_TYPES.JSON },

          next: {
            revalidate: 0,
          },
        });
      }
      const responseData = await response.json();
      if (!response.ok) {
        const authError = new AuthError(response.status, {
          error: responseData.error ?? response.status.toString(),
          error_description:
            responseData?.error_description ?? "Failed to fetch access token",
          error_uri: responseData.error?.error_uri ?? "",
        });
        if (
          authError.code === "invalid_grant" ||
          authError.code === "missing_refresh_token" ||
          authError.code === "401"
        ) {
          this.setTokens(null); // Clear tokens on invalid grant
        }
        throw authError;
      }

      const newAuthData = responseData as AuthTokens;
      if (newAuthData.accessToken !== this.tokens.accessToken) {
        this.emitTokenUpdate(newAuthData);
      }
      this.setTokens({
        accessToken: newAuthData.accessToken ?? null,
      }); // Preserve old refresh token if new one isn't provided

      // Notify queued subscribers with the new token.
      this.fetchSubscribers.forEach((callback) => callback(newAuthData, null));

      return newAuthData;
    } catch (error) {
      this.emitAuthFailed(error);
      this.fetchSubscribers.forEach((callback) =>
        callback({ accessToken: null }, error)
      );

      throw error; // Re-throw the error to be caught by the caller.
    } finally {
      this.isFetching = false;
      this.fetchSubscribers.length = 0; // Clear the queue of subscribers.
    }
  }

  /**
   * Refreshes the access token using the stored refresh token.
   * Handles concurrent requests by queueing them until a new token is fetched.
   * @returns A promise that resolves with the new access token.
   * @throws {AuthError} If refresh fails (e.g., no refresh token, invalid_grant).
   * @throws {Error} For network or other unexpected errors during refresh.
   */
  public async refreshAccessToken(): Promise<string> {
    if (!this.config) {
      throw new Error(
        "TokenManager not initialized. Call initialize() with configuration first."
      );
    }

    if (this.isRefreshing) {
      // If a refresh is already in progress, queue this request.
      return new Promise<string>((resolve, reject) =>
        this.refreshSubscribers.push((res, e) => {
          if (!e) {
            resolve(res);
          } else {
            reject(e);
          }
        })
      );
    }

    this.isRefreshing = true;

    try {
      let response: Response | null = null;
      if (typeof window === "undefined") {
        response = await refreshToken();
      } else {
        response = await fetch(this.config.tokenRefreshUrl, {
          method: HTTP_METHODS.POST,
          headers: { [HEADERS.CONTENT_TYPE]: CONTENT_TYPES.JSON },

          next: {
            revalidate: 0,
          },
        });
      }
      const responseData = await response.json();
      if (!response.ok) {
        const authError = new AuthError(response.status, {
          error: responseData.error ?? response.status.toString(),
          error_description:
            responseData?.error_description ?? "Failed to refresh access token",
          error_uri: responseData.error?.error_uri ?? "",
        });
        if (
          authError.code === "invalid_grant" ||
          authError.code === "missing_refresh_token" ||
          authError.code === "401"
        ) {
          this.setTokens(null); // Clear tokens on invalid grant
        }
        throw authError;
      }

      const newAuthData = responseData as AuthResponse;
      this.setTokens({
        accessToken: newAuthData.accessToken ?? null,
      }); // Preserve old refresh token if new one isn't provided

      this.emitTokenUpdate(newAuthData);

      // Notify queued subscribers with the new token.
      this.refreshSubscribers.forEach((callback) =>
        callback(newAuthData.accessToken ?? "", null)
      );

      return newAuthData.accessToken ?? "";
    } catch (error) {
      this.emitAuthFailed(error);
      this.refreshSubscribers.forEach((callback) => callback("", error));

      throw error; // Re-throw the error to be caught by the caller.
    } finally {
      this.isRefreshing = false;
      this.refreshSubscribers.length = 0; // Clear the queue of subscribers.
    }
  }
}
