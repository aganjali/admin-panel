import { useContext } from "react";
import { useIsoMorphicEffect } from "@/hooks/use-isomorphic-effect";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { CheckPermsFnArgs, UserContext } from "./context";

export type UseReturnType = "current" | "next" | "none";
type CommonArgs = {
  redirectToNotAccess?: string | boolean;
};

interface Props {
  redirectTo?: string;
  redirectIfFound?: string | boolean;
  useReturn?: UseReturnType;
  perms?: (CheckPermsFnArgs & CommonArgs) | null;
}

export type UserState = "loading" | "logged-in" | "logged-out";

export const useUser = ({
  redirectTo = "",
  redirectIfFound = "",
  useReturn = !redirectIfFound ? "current" : "none",
  perms = null,
}: Props = {}) => {
  const context = useContext(UserContext);
  const router = useRouter();
  const asPath = usePathname();
  const params = useSearchParams();
  const next = params.get("next") ?? "/";
  const otherParams = new URLSearchParams(params);
  const q = otherParams.toString();

  if (!context) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  const { isAuthenticated, isLoading, user } = context;

  const partialState: UserState = isLoading
    ? "loading"
    : isAuthenticated
    ? redirectIfFound
      ? "loading"
      : "logged-in"
    : redirectTo
    ? "loading"
    : "logged-out";
  const isLoggedIn = partialState === "logged-in";
  const hasAccess = isLoggedIn && perms ? context.checkPerms(perms) : false;

  const state: UserState = isLoggedIn
    ? !hasAccess && perms?.redirectToNotAccess
      ? "loading"
      : partialState
    : partialState;
  const redirectToNotAccess = perms?.redirectToNotAccess ?? "";
  const useReturnUrl =
    useReturn === "current"
      ? `?next=${encodeURIComponent(asPath + (q ? "?" + q : ""))}`
      : useReturn === "next"
      ? `?next=${encodeURIComponent(next)}`
      : "";

  useIsoMorphicEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet

    if ((!redirectTo && !redirectIfFound && !redirectToNotAccess) || isLoading)
      return;

    if (redirectIfFound && isAuthenticated) {
      router.replace(
        typeof redirectIfFound === "boolean" ? next : redirectIfFound
      );
    } else if (
      // If redirectTo is set, redirect if the user was not found.
      redirectTo &&
      !isAuthenticated
    ) {
      router.replace(redirectTo + useReturnUrl);
    } else if (redirectToNotAccess && !hasAccess) {
      console.log();
      router.replace(
        (typeof redirectToNotAccess === "boolean"
          ? "/errors/503"
          : redirectToNotAccess) + useReturnUrl
      );
    }
  }, [
    user,
    isLoading,
    isAuthenticated,
    hasAccess,
    redirectIfFound,
    redirectTo,
    redirectToNotAccess,
  ]);

  return { ...context, state, hasAccess };
};
