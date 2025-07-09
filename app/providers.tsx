"use client";
import { ColorThemeProvider } from "@/components/color-theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { I18nProvider, LanguageValue } from "@/lib/locales";
import { queryClient } from "@/lib/query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({
  children,
  lang,
}: Readonly<{
  children: React.ReactNode;
  lang: LanguageValue;
}>) {
  return (
    <I18nProvider lang={lang}>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ColorThemeProvider>
            {children}
            <Toaster />
          </ColorThemeProvider>
        </NextThemesProvider>
      </QueryClientProvider>
    </I18nProvider>
  );
}
