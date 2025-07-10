"use client";

import { useColorTheme } from "./color-theme-provider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { themes } from "@/lib/themes";

export function ColorSwitcher() {
  const { activeTheme, setActiveTheme } = useColorTheme();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-transparent hover:bg-muted/50 transition-colors"
        >
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline">Colors</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        className="w-80 sm:w-96 flex flex-col"
        overlayClassName="bg-transparent"
      >
        <SheetHeader className="flex-shrink-0">
          <SheetTitle>Choose a color theme</SheetTitle>
          <SheetDescription>
            Select a color scheme for your interface
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-2 gap-3 pb-6 p-3 pt-0">
            {themes.map((theme) => {
              const isSelected = activeTheme === theme.key;

              return (
                <button
                  key={theme.key}
                  onClick={() => setActiveTheme(theme.key)}
                  className={cn(
                    "group relative flex flex-col gap-3 rounded-lg border-2 p-3 text-left transition-all duration-200 hover:shadow-md",
                    isSelected
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border hover:border-primary/50 hover:bg-muted/30"
                  )}
                >
                  {/* Color Preview */}
                  <div className="flex gap-1.5">
                    {theme.colors.map((color, index) => (
                      <div
                        key={index}
                        className="h-5 w-5 rounded-full border-2 border-background shadow-sm transition-transform group-hover:scale-110"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  {/* Theme Name */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{theme.name}</span>
                  </div>

                  {/* Gradient Preview Bar */}
                  <div className="h-2 rounded-full opacity-60 group-hover:opacity-80 transition-opacity overflow-hidden">
                    <div
                      className="h-full w-full"
                      style={{
                        background: `linear-gradient(to right, ${theme.colors.join(
                          ", "
                        )})`,
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
