"use client";
import { ColorThemeProvider } from "@/components/color-theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { queryClient } from "@/lib/query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
