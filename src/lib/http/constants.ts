export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

export const HEADERS = {
  ACCEPT: 'Accept',
  CONTENT_TYPE: 'Content-Type',
  AUTHORIZATION: 'Authorization',
  REQUESTED_WITH: 'X-Requested-With',
  ACCEPT_LANGUAGE: 'Accept-Language',
} as const;

export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM_URLENCODED: 'application/x-www-form-urlencoded',
  MULTIPART_FORMDATA: 'multipart/form-data', // Added for clarity, though often set by FormData itself
} as const;

export const GRANT_TYPES = {
  REFRESH_TOKEN: 'refresh_token',
} as const;
