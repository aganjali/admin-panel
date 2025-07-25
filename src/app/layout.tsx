import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";

import "@/styles/globals.css";
import { detectLanguage } from "@/lib/locales/server";
import { detectCookieSettings } from "@/lib/settings/server";
import { http } from "@/lib/http";
import { ApiResponse } from "@/types";
import { permissionsApi } from "@/lib/api/permissions";
// import { ColorThemeProvider } from "@/components/color-theme-provider";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await detectLanguage();
  const settings = await detectCookieSettings();
  // let loginInfo: ApiResponse<GetCurrentLoginInformationsOutput> | null = null;
  let permissions: ApiResponse<string[]> | null = null;
  console.log("refetch");
  try {
    permissions = await permissionsApi.grantedPermissions().fetch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {}

  http.locale = lang;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} theme-${settings.activeTheme} text-foreground group/body overscroll-none font-sans antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]`}
      >
        <Providers
          lang={lang}
          settings={settings}
          permissions={permissions}
          // loginInfo={loginInfo}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
