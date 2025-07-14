"use client";

import { useUser } from "@/services/user/hook";
import Loading from "@/components/loading";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoading, user } = useUser({
    redirectTo: "/login",
  });

  if (isLoading) {
    return (
      <Loading title="Authenticating" desc="Verifying your credentials..." />
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
