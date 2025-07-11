export type MinLayoutState = "icon" | "no-layout";
export type LayoutState = MinLayoutState | "full";
export type CookieSettings = {
  activeTheme: string;
  layout: LayoutState;
  minLayout: MinLayoutState;
};

export type LocalStorageSettings = {};
export const SETTINGS_COOKIE_KEY = "app-settings";
export const SETTINGS_LOCAL_KEY = "app-settings";
export const DefaultCookieSettings: CookieSettings = {
  activeTheme: "default",
  layout: "full",
  minLayout: "icon",
};
