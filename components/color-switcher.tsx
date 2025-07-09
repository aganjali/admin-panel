"use client";

// import { useState } from "react";
import { useColorTheme } from "./color-theme-provider";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { themes } from "@/lib/themes";

// interface BaseColorOKLCH {
//   light: Record<string, string>;
//   dark: Record<string, string>;
// }

export function ColorSwitcher() {
  const { activeTheme, setActiveTheme } = useColorTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline">Colors</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3" align="end">
        <div className="space-y-3">
          <div className="text-sm font-medium">Choose a color theme</div>
          <div className="grid grid-cols-3 gap-2">
            {themes.map((theme) => {
              //   const colors = getThemeColors(theme);
              // theme.cssVars.light.primary
              const isSelected = activeTheme === theme.key;

              return (
                <button
                  key={theme.key}
                  onClick={() => setActiveTheme(theme.key)}
                  className={cn(
                    "relative flex flex-col items-center gap-2 rounded-md border-2 p-2 text-xs transition-colors hover:bg-muted/50",
                    isSelected ? "border-primary" : "border-muted"
                  )}
                >
                  <div className="flex gap-1">
                    <div
                      className="h-4 w-4 rounded-full border"
                      style={{
                        backgroundColor: theme.colors[0],
                      }}
                    />
                    <div
                      className="h-4 w-4 rounded-full border"
                      style={{
                        backgroundColor: theme.colors[1],
                      }}
                    />
                  </div>
                  <span className="font-medium">{theme.name}</span>
                  {isSelected && (
                    <Check className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground p-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
