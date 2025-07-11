import type { RefreshTokenResult } from "@/types";

export type AuthTokens = {
  //   hasRefreshToken: boolean;
  accessToken: string | null;
};
export type RequestOptions = {
  fullUrl: URL;
  method: string;
  headers: Headers;
  body?: BodyInit;
  controller?: AbortController;
  timeoutId: 0 | NodeJS.Timeout;
  timeout: number;
};
export interface HttpServiceConfig {
  baseUrl: string;
  tokenRefreshUrl: string;
}
export type AuthResponse = RefreshTokenResult & {
  refreshToken?: string | null;
};

export type ErrorResponseInfoValidation<D extends object> = Partial<
  Record<keyof D, string[]>
>;

export type AuthFailedListener = (e: any) => void;
export type TokenUpdateListener = (tokens: AuthResponse) => void;

export interface AbpHttpRemoteServiceErrorInfo {
  code?: number | null;
  message?: string | null;
  details?: string | null;
  data?: Record<string, any>;
  validationErrors?: AbpHttpRemoteServiceValidationErrorInfo[] | null;
}

export interface AbpHttpRemoteServiceErrorResponse {
  error?: AbpHttpRemoteServiceErrorInfo;
}

export interface AbpHttpRemoteServiceValidationErrorInfo {
  message?: string | null;
  members?: string[] | null;
}
export type AuthErrorResponse = {
  error: string;
  error_description: string;
  error_uri: string;
};

export interface GateRequest<D, P> {
  url: string;
  data?: D;
  params?: P;
  isFile?: boolean;
  isExternal?: boolean;
  isApiRoutes?: boolean;
  isSecure?: boolean;
  tryIsSecure?: boolean;
  timeout?: number;
  op?: Omit<RequestInit, "headers" | "body" | "url">;
  headers?: HeadersInit;
}
export type GateMethodRequest<D, P> = Omit<
  GateRequest<D, P>,
  "method" | "isFile"
>;

export interface RequestMeta<T, D, P> {
  url: string;
  options: RequestInit;
  fetch: () => Promise<T>;
  req: GateRequest<D, P>;
}
