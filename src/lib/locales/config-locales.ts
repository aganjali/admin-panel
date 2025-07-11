// ----------------------------------------------------------------------

export type LanguageValue = "en" | "de";

export const fallbackLng = "en";
export const languages = ["en", "de"];
export const defaultNS = "common";
export const cookieName = "NEXT_LOCALE";

// ----------------------------------------------------------------------

export function i18nOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    debug: true,
    lng,
    fallbackLng,
    ns,
    defaultNS,
    fallbackNS: defaultNS,
    supportedLngs: languages,
  };
}

// ----------------------------------------------------------------------

export const changeLangMessages: Record<
  LanguageValue,
  { success: string; error: string; loading: string }
> = {
  en: {
    success: "Language has been changed!",
    error: "Error changing language!",
    loading: "Loading...",
  },
  de: {
    success: "Sprache wurde geändert!",
    error: "Fehler beim Ändern der Sprache!",
    loading: "Laden...",
  },
};
