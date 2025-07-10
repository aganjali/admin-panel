"use client";

import i18next from "i18next";
import { useMemo } from "react";

import { allLangs } from "./all-langs";
import { fallbackLng } from "./config-locales";

// ----------------------------------------------------------------------

export function useLang() {
  const { currentLang, fallback } = useMemo(() => {
    const currentLang = allLangs.find(
      (lang) => lang.value === i18next.resolvedLanguage,
    );
    const fallback = allLangs.filter((lang) => lang.value === fallbackLng)[0];
    return { fallback, currentLang };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18next.resolvedLanguage]);

  return {
    currentLang: currentLang ?? fallback,
  };
}
