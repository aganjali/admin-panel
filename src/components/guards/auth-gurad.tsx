"use client";

import { useUser } from "@/services/user/hook";
import Loading from "@/components/loading";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: ProtectedRouteProps) {
  const { state } = useUser({
    redirectTo: "/login",
  });

  if (state === "loading") {
    return (
      <Loading title="Authenticating" desc="Verifying your credentials..." />
    );
  }

  if (state === "logged-out") {
    return null;
  }

  return <>{children}</>;
}
