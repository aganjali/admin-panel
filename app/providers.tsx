"use client";
import { ColorThemeProvider } from "@/shared/components/widgets/color-theme-provider";
import { Toaster } from "@/shared/components/ui/sonner";
import { I18nProvider, LanguageValue } from "@/shared/lib/locales";
import { queryClient } from "@/shared/lib/query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({
  children,
  lang,
  theme,
}: Readonly<{
  children: React.ReactNode;
  lang: LanguageValue;
  theme: string;
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
          <ColorThemeProvider initialTheme={theme}>
            {children}
            <Toaster />
          </ColorThemeProvider>
        </NextThemesProvider>
      </QueryClientProvider>
    </I18nProvider>
  );
}
