import { GalleryVerticalEnd } from "lucide-react";
import { ThemeToggle } from "@/shared/components/widgets/theme-toggle";
import { ColorSwitcher } from "@/shared/components/widgets/color-switcher";
import Link from "next/link";

export default function AuthHeader() {
  return (
    <header className="flex justify-center gap-2 md:justify-start">
      <Link href="/" className="flex items-center gap-2 font-medium">
        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
          <GalleryVerticalEnd className="size-4" />
        </div>
        Acme Inc.
      </Link>
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <ColorSwitcher />
      </div>
    </header>
  );
}
