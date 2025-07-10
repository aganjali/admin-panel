"use client";
import { ColorThemeProvider } from "@/shared/components/widgets/color-theme-provider";
import { Toaster } from "@/shared/components/ui/sonner";
import { I18nProvider, LanguageValue } from "@/shared/lib/locales";
import { queryClient } from "@/shared/lib/query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AppSidebar } from "@/src/features/navigation/components";
import {
  SidebarInset,
  SidebarProvider,
} from "@/src/shared/components/ui/sidebar";
import { SiteHeader } from "@/src/shared/components/layout/site-header";

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
            <SidebarProvider
              style={
                {
                  "--sidebar-width": "calc(var(--spacing) * 72)",
                  "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
              }
            >
              <AppSidebar variant="inset" />
              <SidebarInset>
                <SiteHeader />
                {children}
              </SidebarInset>
            </SidebarProvider>
            <Toaster />
          </ColorThemeProvider>
        </NextThemesProvider>
      </QueryClientProvider>
    </I18nProvider>
  );
}
