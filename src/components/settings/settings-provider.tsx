"use client";

import { useIsoMorphicEffect } from "@/hooks/use-isomorphic-effect";
import { useStorageState } from "@/hooks/use-storage-state";
import {
  CookieSettings,
  LayoutState,
  LocalStorageSettings,
  MinLayoutState,
  SETTINGS_COOKIE_KEY,
} from "@/lib/settings/index";
import { createContext, ReactNode, useContext, useMemo } from "react";

export type Settings = LocalStorageSettings & CookieSettings;

export type SettingsFunctions = {
  setActiveTheme: (theme: string) => void;
  setLayot: (l: LayoutState) => void;
  setMinLayot: (l: MinLayoutState) => void;
};

type SettingsContextType = Settings & SettingsFunctions;

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({
  children,
  initialCookieSettings,
}: {
  children: ReactNode;
  initialCookieSettings: CookieSettings;
}) {
  const { setField: setCookieSettings, state: cookieSettings } =
    useStorageState<CookieSettings>(
      SETTINGS_COOKIE_KEY,
      initialCookieSettings,
      { storageKey: "cookie", options: { expires: 30 } }
    );

  const { setField: _, state: localStorageSettings } =
    useStorageState<LocalStorageSettings>("app-settings", {});

  useIsoMorphicEffect(() => {
    Array.from(document.body.classList)
      .filter((className) => className.startsWith("theme-"))
      .forEach((className) => {
        document.body.classList.remove(className);
      });
    document.body.classList.add(`theme-${cookieSettings.activeTheme}`);

    return;
  }, [cookieSettings]);

  const value = useMemo<SettingsContextType>(() => {
    return {
      ...cookieSettings,
      ...localStorageSettings,
      setActiveTheme: (t) => setCookieSettings("activeTheme", t),
      setLayot: (l) => setCookieSettings("layout", l),
      setMinLayot: (l) => setCookieSettings("minLayout", l),
    };
  }, [
    cookieSettings,
    localStorageSettings,
    // setLocalStorageSettings,
    setCookieSettings,
  ]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within an SettingsProvider");
  }
  return context;
}
