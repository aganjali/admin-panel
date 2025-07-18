"use client";

import { CheckPermsFnArgs, UseReturnType, useUser } from "@/services/user/hook";
import Loading from "@/components/loading";

interface ProtectedRouteProps {
  children: React.ReactNode;
  perms?: CheckPermsFnArgs;
  useReturn?: UseReturnType;
  // permissions: CheckPermsFnArgs[0];
}

export function AuthGuard({ children, useReturn, perms }: ProtectedRouteProps) {
  const { state } = useUser({
    redirectTo: "/login",
    useReturn,
    perms: perms ? { ...perms, redirectToNotAccess: true } : undefined,
  });

  if (state === "loading") {
    return <Loading title="Authenticating" desc="Please wait..." />;
  }

  if (state === "logged-out") {
    return null;
  }

  return <>{children}</>;
}
