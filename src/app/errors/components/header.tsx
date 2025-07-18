import { LogoWithName } from "@/components/logo-with-name";
import ProfileDropdown from "@/components/profile-dropdown";
import { SettingsDrawer } from "@/components/settings/settings-drawer";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-center gap-2 md:justify-start">
      <Link href="/">
        <LogoWithName />
      </Link>
      <div className="ml-auto flex items-center gap-3">
        <SettingsDrawer />
        <ProfileDropdown />
      </div>
    </header>
  );
}
