"use client";
import type { ApiResponse, AuthenticateModel } from "@/types";

import { useMemo, useEffect } from "react";
import { useLatestCallback } from "@/hooks/use-latest-callback";
import { useQuery } from "@tanstack/react-query";

import { UserContext } from "./context";

import type { CheckPermsFn, UserContextType } from "./context";
import { authApi } from "@/lib/api/auth";
import { http } from "@/lib/http";
import { queryClient } from "@/lib/query";
import { useRouter } from "next/navigation";
import { permissionsApi } from "@/lib/api/permissions";
import { getAvatar } from "@/lib/imgs";

export const UserProvider: React.FC<{
  children: React.ReactNode;
  permissions: ApiResponse<string[]> | null;
  // loginInfo: ApiResponse<GetCurrentLoginInformationsOutput> | null;
}> = ({ children, permissions: initialPerms }) => {
  const router = useRouter();
  const {
    data: profile = null,
    refetch: refreshUser,
    isPending,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => authApi.currentLoginInfo().fetch(),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: false,
    select: (s) => ({
      ...s.result,
      user: s.result.user
        ? {
            ...s.result.user,
            id: s.result.user.id ?? 0,
            avatar: s.result.user.id ? getAvatar(s.result.user.id) : "",
            fullName: (
              (s.result.user.name ?? "") +
              " " +
              (s.result.user.surname ?? "")
            ).trim(),
            initials:
              (s.result.user.name?.charAt(0).toUpperCase() ?? "") +
              (s.result.user.surname?.charAt(0).toUpperCase() ?? ""),
          }
        : null,
    }),
    // initialData: initialLoginInfo ?? undefined,
  });
  const user = profile?.user ?? null;

  const { data: perms = null } = useQuery({
    queryKey: ["granted-permissions"],
    queryFn: () => permissionsApi.grantedPermissions().fetch(),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    placeholderData: initialPerms ?? undefined,
    select: (s) => Object.fromEntries(s.result.map((item) => [item, true])),
    staleTime: Number.POSITIVE_INFINITY,
  });

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

  const checkPerms: CheckPermsFn = useLatestCallback(
    ({ list, type = "default" }) => {
      if (!perms) return false;
      if (type === "single") return perms[(list as [string])[0]] ?? false;
      if (type === "and") {
        return (list as string[]).every((f) => perms[f] ?? false);
      }

      if (type === "or") {
        return (list as string[]).some((f) => perms[f] ?? false);
      }

      return (list as string[] | (string | string[])[]).every((e) =>
        Array.isArray(e) ? e.some((f) => perms[f] ?? false) : perms[e] ?? false
      );
    }
  );

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
      grantedPermissions: perms ?? {},
      isActive,
      login,
      logout,
      refreshUser,
      checkPerms,
    }),
    [
      user,
      isPending,
      isAuthenticated,
      perms,
      checkPerms,
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
