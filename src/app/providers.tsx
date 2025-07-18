"use client";
import ModalUI from "@/components/modal-ui";
import { SettingsProvider } from "@/components/settings";
import { Toaster } from "@/components/ui/sonner";
import { I18nProvider, LanguageValue } from "@/lib/locales";
import { queryClient } from "@/lib/query";
import { CookieSettings } from "@/lib/settings";
import { ManagedUIProvider } from "@/services/managed-ui";
import { UserProvider } from "@/services/user/provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export function Providers({
  children,
  lang,
  settings,
}: Readonly<{
  children: React.ReactNode;
  lang: LanguageValue;
  settings: CookieSettings;
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
          <NuqsAdapter>
            <SettingsProvider initialCookieSettings={settings}>
              <UserProvider>
                <ManagedUIProvider>
                  {children}
                  <Toaster />
                  <ModalUI />
                </ManagedUIProvider>
              </UserProvider>
            </SettingsProvider>
          </NuqsAdapter>
        </NextThemesProvider>
      </QueryClientProvider>
    </I18nProvider>
  );
}
