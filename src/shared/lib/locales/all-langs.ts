// "use client";

import type { Locale } from "date-fns/locale";

export type ThemeDirection = "ltr" | "rtl";

import { enUS, deAT } from "date-fns/locale";
import { keyBy } from "../helper";

// ----------------------------------------------------------------------
export type I18nLang = {
  value: string;
  label: string;
  countryCode: string;
  adapterLocale: Locale;
  dir: ThemeDirection;
  numberFormat: {
    code: string;
    transformDigits?: (v: string) => string;
  };
  systemValue: {
    components: any;
  };
  // fontFamily: string;
};

export const allLangs: I18nLang[] = [
  {
    value: "en",
    label: "English",
    countryCode: "GB",
    adapterLocale: enUS,
    dir: "ltr",
    numberFormat: { code: "en-US" },
    systemValue: {
      components: {},
    },
    // fontFamily: defaultFontEn,
  },
  {
    value: "de",
    label: "German",
    countryCode: "AT",
    adapterLocale: deAT,
    dir: "ltr",
    numberFormat: { code: "de-AT" },
    systemValue: {
      components: {},
    },
    // fontFamily: defaultFontFa,
  },
];
export const allLangsObj = keyBy(allLangs, "value");

/**
 * Country code:
 * https://flagcdn.com/en/codes.json
 *
 * Number format code:
 * https://gist.github.com/raushankrjha/d1c7e35cf87e69aa8b4208a8171a8416
 */
