"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Separator } from "../ui/separator";
import { LayoutToggle } from "./layout-toggle";
import { LanguageSelect } from "./language-select";
import ColorSwitch from "./color-switch";

export function SettingsDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="gap-2 bg-transparent hover:bg-muted/50 transition-colors"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="w-[360px] flex flex-col"
        overlayClassName="bg-transparent"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Settings
          </SheetTitle>
          <SheetDescription>Customize dashboard settings.</SheetDescription>
        </SheetHeader>

        <div className="space-y-6 px-4 overflow-y-auto">
          <ThemeToggle />
          <Separator />
          <LayoutToggle />
          <Separator />
          <LanguageSelect />
          <Separator />
          <ColorSwitch />
        </div>
      </SheetContent>
    </Sheet>
  );
}
