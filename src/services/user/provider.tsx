"use client";
import type {
  ApiResponse,
  AuthenticateModel,
  GetCurrentLoginInformationsOutput,
  GetUserPermissionsForEditOutput,
} from "@/types";

import { useMemo, useEffect } from "react";
import { useLatestCallback } from "@/hooks/use-latest-callback";
import { useQuery } from "@tanstack/react-query";

import { UserContext } from "./context";

import type { UserContextType } from "./context";
import { authApi } from "@/lib/api/auth";
import { http } from "@/lib/http";
import { queryClient } from "@/lib/query";
import { usersApi } from "@/lib/api/users";
import { useRouter } from "next/navigation";

export const UserProvider: React.FC<{
  children: React.ReactNode;
  permissions: ApiResponse<GetUserPermissionsForEditOutput> | null;
  loginInfo: ApiResponse<GetCurrentLoginInformationsOutput> | null;
}> = ({ children, loginInfo: initialLoginInfo, permissions: initialPerms }) => {
  const router = useRouter();
  const {
    data: profile = null,
    refetch: refreshUser,
    isPending,
  } = useQuery({
    queryKey: ["login-info"],
    queryFn: () => authApi.currentLoginInfo().fetch(),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: false,
    select: (s) => s.result,
    initialData: initialLoginInfo ?? undefined,
  });
  const user = profile?.user ?? null;

  const { data: perms = null } = useQuery({
    queryKey: ["permissions"],
    enabled: !!user?.id,
    queryFn: () => usersApi.getUserPermissionsForEdit({ Id: user?.id }).fetch(),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    initialData: initialPerms ?? undefined,
    select: (s) => s.result,
    staleTime: Number.POSITIVE_INFINITY,
  });
  const permissions = perms?.permissions ?? null;
  const grantedPermissions = perms?.grantedPermissionNames ?? null;
  // loginInfo?.
  const onAuthFailed = useLatestCallback(async () => {
    console.log("auth failed");
    http.setAuthTokens(null);
    queryClient.clear();
    await refreshUser();
    router.refresh();
  });
  const login = useLatestCallback(async (creds: AuthenticateModel) => {
    try {
      const res = await authApi.login(creds).fetch();
      http.setAuthTokens(res);
      queryClient.clear();
      await refreshUser();
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  });
  const logout = useLatestCallback(async () => {
    try {
      await authApi.logOut().fetch();
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
    await onAuthFailed();
  });

  useEffect(() => {
    const unsub = http.subscribeToAuthFailed(onAuthFailed);
    return () => {
      unsub();
    };
  }, [onAuthFailed]);

  const isAuthenticated = !isPending && !!user;

  // const needsKYC = !profile?.kycStatus?.isKYCVerified;

  const isActive = isAuthenticated;
  // const canTrade = isAuthenticated && !needsKYC;

  const contextValue: UserContextType = useMemo(
    () => ({
      user: user,
      isLoading: isPending,
      isAuthenticated,
      allPermissions: permissions ?? [],
      grantedPermissions: grantedPermissions ?? [],
      isActive,
      login,
      logout,
      refreshUser,
    }),
    [
      user,
      isPending,
      isAuthenticated,
      permissions,
      grantedPermissions,
      isActive,
      login,
      logout,
      refreshUser,
    ]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
