"use server";

import type {
  AuthenticateModel,
  RefreshTokenResult,
  AuthenticateResultModel,
} from "@/types";

import { cookies } from "next/headers";

import { HEADERS, HTTP_METHODS, CONTENT_TYPES } from "./constants";

import type { AuthErrorResponse } from "./types";

const defaultOptions = { next: { revalidate: 0 } };
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api";

export async function login(data: AuthenticateModel) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/TokenAuth/Authenticate`, {
      method: HTTP_METHODS.POST,
      headers: { [HEADERS.CONTENT_TYPE]: CONTENT_TYPES.JSON },
      body: JSON.stringify(data),
      ...defaultOptions,
    });
    const responseData = await response.json();
    if (!response.ok) {
      return Response.json(responseData, { status: response.status });
    }
    const d = responseData.result as AuthenticateResultModel;
    const cookieNameJwt = process.env.JWT_COOKIE_NAME ?? "";
    const cookieName = process.env.REFRESH_COOKIE_NAME ?? "";
    if (!d.accessToken || !d.refreshToken) {
      return Response.json(responseData, { status: 401 });
    }
    if (!cookieName || !cookieNameJwt) {
      return Response.json(
        {
          error: {
            message: "faild to load cookie name",
            cookieName,
            cookieNameJwt,
            domain: process.env.JWT_DOMAIN,
          },
        },
        { status: 400 }
      );
    }

    const isSecure = cookieName.startsWith("__Secure");
    const isHttpOnly = process.env.NODE_ENV === "production";
    const domain = process.env.JWT_DOMAIN ?? "";

    let cookie = `${cookieName}=${d.refreshToken}; Path=/;`;

    if (isSecure) cookie = cookie.concat(" Secure;");
    if (isHttpOnly) {
      cookie = cookie.concat(" HttpOnly;");
    }
    const age = d.refreshTokenExpireInSeconds ?? 30 * 24 * 60 * 60;
    const exp = new Date(Date.now() + age * 1000);
    if (exp) {
      cookie = cookie.concat(` Expires=${exp.toUTCString()};`);
      cookie = cookie.concat(` Max-Age=${age};`);
    }
    cookie = cookie.concat(" SameSite=Lax;");

    if (domain) cookie = cookie.concat(` Domain=${domain};`);

    const headers = new Headers({
      "Set-Cookie": cookie,
    });

    const isSecureJwt = cookieNameJwt.startsWith("__Secure");
    const isHttpOnlyJwt = process.env.NODE_ENV === "production";

    cookie = `${cookieNameJwt}=${d.accessToken}; Path=/;`;

    if (isSecureJwt) cookie = cookie.concat(" Secure;");
    if (isHttpOnlyJwt) {
      cookie = cookie.concat(" HttpOnly;");
    }
    const ageJwt = d.expireInSeconds ?? 30 * 24 * 60 * 60;
    const expJwt = new Date(Date.now() + ageJwt * 1000);
    if (exp) {
      cookie = cookie.concat(` Expires=${expJwt.toUTCString()};`);
      cookie = cookie.concat(` Max-Age=${ageJwt};`);
    }
    cookie = cookie.concat(" SameSite=Lax;");

    if (domain) cookie = cookie.concat(` Domain=${domain};`);

    headers.append("Set-Cookie", cookie);
    return Response.json(
      {
        accessToken: d.accessToken,
      },
      { headers }
    );
  } catch (e: any) {
    return authFailedResponse(401, {
      error: "unknwon_error",
      error_description:
        e.error?.message ??
        e.message ??
        e.error ??
        (typeof e === "string" ? e : "Something went wrong"),
      error_uri: e.stack ?? "",
    });
  }
}

export async function refreshToken() {
  const c = await cookies();

  const refreshToken =
    c.getAll().find((f) => f.name === process.env.REFRESH_COOKIE_NAME)?.value ??
    "";

  if (!refreshToken) {
    return authFailedResponse(401, {
      error: "missing_refresh_token",
      error_description: "No refresh token available.",
      error_uri: "",
    });
  }
  try {
    const response = await fetch(`${API_BASE_URL}/api/TokenAuth/RefreshToken`, {
      method: HTTP_METHODS.POST,
      headers: { [HEADERS.CONTENT_TYPE]: CONTENT_TYPES.JSON },
      body: JSON.stringify({ refreshToken }),
      ...defaultOptions,
    });
    const responseData = await response.json();
    if (!response.ok) {
      return authFailedResponse(response.status, {
        error:
          responseData.error?.code?.toString() ?? response.status.toString(),
        error_description:
          responseData.error?.message ?? "Failed to refresh access token",
        error_uri: responseData.error?.details ?? "",
      });
    }
    const d = responseData.result as RefreshTokenResult;
    const cookieName = process.env.JWT_COOKIE_NAME ?? "";
    if (cookieName) {
      const exp = new Date(
        Date.now() + (d.expireInSeconds ?? 30 * 24 * 60 * 60) * 1000
      );
      const isSecure = cookieName.startsWith("__Secure");
      const isHttpOnly = process.env.NODE_ENV === "production";
      const domain = process.env.JWT_DOMAIN ?? "";

      let cookie = `${cookieName}=${d.accessToken}; Path=/;`;

      if (isSecure) cookie = cookie.concat(" Secure;");
      if (isHttpOnly) {
        cookie = cookie.concat(" HttpOnly;");
      }
      cookie = cookie.concat(" SameSite=Lax;");
      const ageJwt = d.expireInSeconds ?? 30 * 24 * 60 * 60;
      const expJwt = new Date(Date.now() + ageJwt * 1000);
      if (exp) {
        cookie = cookie.concat(` Expires=${expJwt.toUTCString()};`);
        cookie = cookie.concat(` Max-Age=${ageJwt};`);
      }
      if (domain) cookie = cookie.concat(` Domain=${domain};`);

      const headers = new Headers({
        "Set-Cookie": cookie,
      });
      return Response.json(
        {
          accessToken: d.accessToken,
        },
        { headers }
      );
    }
    return Response.json({ accessToken: null });
  } catch (e: any) {
    return authFailedResponse(401, {
      error: "unknwon_error",
      error_description:
        e.error?.message ??
        e.message ??
        e.error ??
        (typeof e === "string" ? e : "Something went wrong"),
      error_uri: e.stack ?? "",
    });
  }
}

export async function getToken() {
  const c = await cookies();
  const refreshToken =
    c.get(process.env.REFRESH_COOKIE_NAME ?? "")?.value ?? "";

  if (!refreshToken) {
    return Response.json({ accessToken: null });
  }

  const cookieName = process.env.JWT_COOKIE_NAME ?? "";

  let accessToken = "";

  if (cookieName) {
    accessToken = c.get(cookieName)?.value ?? "";
  }

  return Response.json({ accessToken });
}

export async function deleteToken() {
  const cookieName = process.env.JWT_COOKIE_NAME ?? "";
  const refreshCookieName = process.env.REFRESH_COOKIE_NAME ?? "";
  const headers = new Headers();
  if (cookieName) {
    const isSecure = cookieName.startsWith("__Secure");
    const isHttpOnly = process.env.NODE_ENV === "production";
    const domain = process.env.JWT_DOMAIN ?? "";

    let cookie = `${cookieName}=${""}; Path=/;`;

    if (isSecure) cookie = cookie.concat(" Secure;");
    if (isHttpOnly) {
      cookie = cookie.concat(" HttpOnly;");
    } // else
    cookie = cookie.concat(" SameSite=Lax;");
    cookie = cookie.concat(" Expires=Thu, 01 Jan 1970 00:00:00 GMT;");
    cookie = cookie.concat(" Max-Age=0;");

    if (domain) cookie = cookie.concat(` Domain=${domain};`);
    headers.append("Set-Cookie", cookie);
  }
  if (refreshCookieName) {
    const isSecure = refreshCookieName.startsWith("__Secure");
    const isHttpOnly = process.env.NODE_ENV === "production";
    const domain = process.env.JWT_DOMAIN ?? "";

    let cookie = `${refreshCookieName}=${""}; Path=/;`;

    if (isSecure) cookie = cookie.concat(" Secure;");
    if (isHttpOnly) {
      cookie = cookie.concat(" HttpOnly;");
    } // else
    cookie = cookie.concat(" SameSite=Lax;");
    cookie = cookie.concat(" Expires=Thu, 01 Jan 1970 00:00:00 GMT;");
    cookie = cookie.concat(" Max-Age=0;");

    if (domain) cookie = cookie.concat(` Domain=${domain};`);
    headers.append("Set-Cookie", cookie);
  }
  return Response.json({ accessToken: null }, { headers });
}

async function authFailedResponse(status: number, error: AuthErrorResponse) {
  const r = await deleteToken();
  return Response.json(error, { status, headers: r.headers });
}
