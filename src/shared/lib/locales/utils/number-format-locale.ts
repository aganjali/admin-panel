import i18next from "i18next";

import { allLangs } from "../all-langs";
import { fallbackLng } from "../config-locales";

// ----------------------------------------------------------------------

export function formatNumberLocale() {
  const lng = i18next.resolvedLanguage ?? fallbackLng;

  const currentLang = allLangs.find((lang) => lang.value === lng);

  return {
    code: currentLang?.numberFormat.code ?? allLangs[0].numberFormat.code,
    rtl: currentLang?.dir === "rtl",
    transformDigits: currentLang?.numberFormat.transformDigits,
  };
}
