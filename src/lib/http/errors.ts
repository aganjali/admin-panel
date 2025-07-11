import type { ApiErrorCodes } from "@/types";

import type {
  AuthErrorResponse,
  ErrorResponseInfoValidation,
  AbpHttpRemoteServiceErrorInfo,
} from "./types";

export class ApiError<D extends object = any> extends Error {
  readonly code: ApiErrorCodes;
  readonly details: string;
  readonly data: Record<string, any>;
  readonly validationErrors: ErrorResponseInfoValidation<D>;
  readonly status: number;

  constructor(status: number, error: AbpHttpRemoteServiceErrorInfo) {
    super(error.message ?? error.details ?? "An API error occurred.");
    this.name = "ApiError";
    this.status = status;
    this.code = (error?.code ?? 0) as ApiErrorCodes;
    this.details = error.details ?? "";
    this.validationErrors = (error.validationErrors ?? []).reduce<
      ErrorResponseInfoValidation<D>
    >((prev, cur) => {
      if (cur.members && cur.message) {
        (cur.members as (keyof D)[]).forEach((member) => {
          if (!prev[member]) {
            prev[member] = [];
          }
          prev[member].push(cur.message!);
        });
      }
      return prev;
    }, {});
    this.data = error.data ?? {};
  }
}

/**
 * Represents an OAuth 2.0 authentication error.
 * This error is typically thrown during token acquisition or refresh if the auth server
 * responds with an error like 'invalid_grant'.
 */
export class AuthError extends Error {
  readonly code: string;
  readonly uri?: string;
  readonly status: number;

  constructor(status: number, error: AuthErrorResponse) {
    super(error.error_description ?? "An authentication error occurred.");
    this.name = "AuthError";
    this.status = status;
    this.code = `${error.error ?? "0"}`;
    this.uri = error.error_uri ?? "";
  }
}
