import { cookies as getCookies } from "next/headers";
import {
  SETTINGS_COOKIE_KEY,
  DefaultCookieSettings,
  CookieSettings,
} from "./index";
import { themes } from "../themes";

export async function detectCookieSettings() {
  const cookies = await getCookies();

  let settings = DefaultCookieSettings;
  try {
    const val = cookies.get(SETTINGS_COOKIE_KEY)?.value;
    settings = val
      ? JSON.parse(val) ?? DefaultCookieSettings
      : DefaultCookieSettings;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    settings = DefaultCookieSettings;
  }
  if (!themes.find((f) => f.key === settings.activeTheme))
    settings.activeTheme = DefaultCookieSettings.activeTheme;

  return settings as CookieSettings;
}
