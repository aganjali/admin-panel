import { useContext } from "react";
import { useIsoMorphicEffect } from "@/hooks/use-isomorphic-effect";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { UserContext } from "./context";

interface Props {
  redirectTo?: string;
  redirectIfFound?: string | boolean;
  redirectToNotVerified?: string;
  useReturn?: boolean;
}
export type UserState = "loading" | "logged-in" | "logged-out";
export const useUser = ({
  redirectTo = "",
  redirectIfFound = "",
  redirectToNotVerified = "",
  useReturn = !redirectIfFound,
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
  const state: UserState = isLoading
    ? "loading"
    : isAuthenticated
    ? redirectIfFound
      ? "loading"
      : "logged-in"
    : redirectTo
    ? "loading"
    : "logged-out";

  useIsoMorphicEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet

    if ((!redirectTo && !redirectIfFound) || isLoading) return;

    if (redirectIfFound && isAuthenticated) {
      router.replace(
        typeof redirectIfFound === "boolean" ? next : redirectIfFound
      );
    } else if (
      // If redirectTo is set, redirect if the user was not found.
      redirectTo &&
      !isAuthenticated
    ) {
      router.replace(
        redirectTo +
          (useReturn
            ? `?next=${encodeURIComponent(asPath + (q ? "?" + q : ""))}`
            : "")
      );
    }
    // else if (redirectToNotVerified && needsKYC) {
    //   router.replace(redirectToNotVerified);
    // }
  }, [
    user,
    isLoading,
    isAuthenticated,
    redirectIfFound,
    redirectToNotVerified,
    redirectTo,
  ]);

  return { ...context, state };
};
