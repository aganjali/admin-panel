import { cookies as getCookies } from "next/headers";
const cookieName = "color-theme";
const fallbackTheme = "default";

export async function detectTheme() {
  const cookies = await getCookies();

  const theme = cookies.get(cookieName)?.value ?? fallbackTheme;

  return theme;
}
