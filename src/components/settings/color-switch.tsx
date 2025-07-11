"use client";

import { ReactNode } from "react";

import { themes } from "@/lib/themes";
import { useSettings } from "./settings-provider";
import { Palette } from "lucide-react";
import { Label } from "../ui/label";
import { useTheme } from "next-themes";

interface Props {
  children?: ReactNode;
}

const ColorSwitch: React.FC<Props> = () => {
  const { activeTheme, setActiveTheme } = useSettings();
  const { resolvedTheme = "light" } = useTheme();
  return (
    <div className="space-y-3 pb-6">
      <div className="flex items-center gap-2">
        <Palette className="h-4 w-4" />
        <Label className="text-sm font-medium">Color Theme</Label>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {themes
          .filter((f) => f.enabled)
          .map((theme) => (
            <div
              key={theme.name}
              className={`p-3 rounded-lg border-2 bg-background cursor-pointer transition-colors ${
                activeTheme === theme.key
                  ? "border-primary "
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => setActiveTheme(theme.key)}
            >
              <div className="flex flex-col bg-background gap-2">
                <span className="text-sm font-medium">{theme.name}</span>
                <div className="flex gap-1 w-full ">
                  {theme[resolvedTheme as "light" | "dark"].colors.map(
                    (color, index) => (
                      <div
                        key={index}
                        className="w-3 h-3 rounded-full border border-border/20"
                        style={{ backgroundColor: color }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ColorSwitch;
