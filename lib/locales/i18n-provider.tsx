"use client";

import { useEffect } from "react";
import i18next, { type InitOptions } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next, I18nextProvider as Provider } from "react-i18next";

import { cookieName, i18nOptions } from "./config-locales";

import type { LanguageValue } from "./config-locales";

// ----------------------------------------------------------------------

const init: InitOptions = {
  ...i18nOptions(),
  detection: {
    caches: ["cookie"],
    lookupCookie: cookieName,
    cookieOptions: { path: "/", sameSite: "strict" },
  },
};

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (lang: string, ns: string) => import(`./langs/${lang}/${ns}.json`)
    )
  )
  .init(init);

// ----------------------------------------------------------------------

type Props = {
  lang?: LanguageValue | undefined;
  children: React.ReactNode;
};

export function I18nProvider({ lang, children }: Props) {
  useEffect(() => {
    if (lang) {
      // http.locale = lang as LocaleKeys;
    }
    i18next.changeLanguage(lang);
  }, [lang]);

  return <Provider i18n={i18next}>{children}</Provider>;
}
