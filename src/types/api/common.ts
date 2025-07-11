export enum ApiErrorCodes {
  Common = 0,
  UserIsUnder18 = 1,
  CountryRestricted = 2,
  ApplicantNotExists = 3,
  ProgressFinished = 4,
}

export interface ValidationError<T> {
  members: (keyof T)[];
  message: string;
}
export interface ErrorMeta<T = unknown> {
  code: number;
  details: string;
  message: string;
  validationErrors?: ValidationError<T>[] | null;
}

export interface ApiResponse<T = never> {
  result: T;
  success: boolean;
  targetUrl: string | null;
}
type NonNulish<T> = [T] extends [never] ? NonNullable<unknown> : T;

export interface ErrorResponse<
  D = NonNullable<unknown>,
  P = NonNullable<unknown>
> {
  error: ErrorMeta<NonNulish<D> & NonNulish<P>>;
  unAuthorized: boolean;
  underConstruction: boolean;
  accessDenied: boolean;
  api: boolean;
  tenantId: string;
  request?: boolean;
  canceled?: boolean;
}
