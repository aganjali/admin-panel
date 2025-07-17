"use client";

import { useUser } from "@/services/user/hook";
import Loading from "@/components/loading";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function GuestGuard({ children }: ProtectedRouteProps) {
  const { state } = useUser({
    redirectIfFound: true,
  });

  if (state === "loading") {
    return (
      <Loading title="Authenticating" desc="Verifying your credentials..." />
    );
  }

  if (state === "logged-in") {
    return null;
  }

  return <>{children}</>;
}
