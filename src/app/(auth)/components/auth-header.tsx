import { LogoWithName } from "@/components/logo-with-name";
import { SettingsDrawer } from "@/components/settings/settings-drawer";

import Link from "next/link";
export default function AuthHeader() {
  return (
    <header className="flex justify-center gap-2 md:justify-start">
      <Link href="/">
        <LogoWithName />
      </Link>
      <div className="ml-auto flex items-center gap-2">
        <SettingsDrawer />
      </div>
    </header>
  );
}
