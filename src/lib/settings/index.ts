export type LayoutState = "icon" | "full" | "no-layout";
export type CookieSettings = {
  activeTheme: string;
  layout: LayoutState;
};

export type LocalStorageSettings = {};
export const SETTINGS_COOKIE_KEY = "app-settings";
export const SETTINGS_LOCAL_KEY = "app-settings";
export const DefaultCookieSettings = {
  activeTheme: "default",
  layout: "full",
};
