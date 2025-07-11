"use client";
import type { AuthenticateModel } from "@/types";

import { useMemo, useEffect } from "react";
import { useLatestCallback } from "@/hooks/use-latest-callback";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { UserContext } from "./context";

import type { UserContextType } from "./context";
import { authApi } from "@/lib/api/auth";
import { http } from "@/lib/http";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();

  // const onTokenUpdate = useLatestCallback((accessToken: string) => {
  //   http.setAuthTokens({
  //     accessToken,
  //   });
  // });

  const {
    data: profile = null,
    isPending,
    refetch: refreshUser,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => authApi.getCurrentUserProfile().fetch(),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: false,
    select: (s) => s.result,
  });
  const onAuthFailed = useLatestCallback(async () => {
    console.log("auth failed");
    http.setAuthTokens(null);
    queryClient.clear();
    await refreshUser();
  });
  const login = useLatestCallback(async (creds: AuthenticateModel) => {
    try {
      const res = await authApi.login(creds).fetch();
      http.setAuthTokens(res);
      queryClient.clear();
      await refreshUser();
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

  const isAuthenticated = !isPending && !!profile;

  // const needsKYC = !profile?.kycStatus?.isKYCVerified;

  const isActive = isAuthenticated;
  // const canTrade = isAuthenticated && !needsKYC;

  const contextValue: UserContextType = useMemo(
    () => ({
      user: profile,
      isLoading: isPending,
      isAuthenticated,
      // canTrade,
      // needsKYC,
      isActive,
      login,
      logout,
      refreshUser,
    }),
    [
      profile,
      isPending,
      isAuthenticated,
      // canTrade,
      // needsKYC,
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
