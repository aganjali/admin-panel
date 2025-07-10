"use client";

import { useStorageState } from "@/shared/hooks/use-storage-state";
import { cookie } from "@/shared/lib/storage";
import { createContext, ReactNode, useContext, useEffect } from "react";

type ThemeContextType = {
  activeTheme: string;
  setActiveTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ColorThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme: string;
}) {
  const { setState: setActiveTheme, state: activeTheme } = useStorageState(
    "color-theme",
    cookie,
    initialTheme
  );

  useEffect(() => {
    console.log({ activeTheme });
    Array.from(document.body.classList)
      .filter((className) => className.startsWith("theme-"))
      .forEach((className) => {
        document.body.classList.remove(className);
      });
    document.body.classList.add(`theme-${activeTheme}`);

    return;
    // }

    // const root = document.documentElement;

    // // Apply CSS variables
    // const vars = theme[resolvedTheme as "light" | "dark"];
    // Object.entries(vars).forEach(([key, value]) => {
    //   root.style.setProperty(`--${key}`, value);
    // });
  }, [activeTheme]);

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useColorTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useColorTheme must be used within an ColorThemeProvider");
  }
  return context;
}
