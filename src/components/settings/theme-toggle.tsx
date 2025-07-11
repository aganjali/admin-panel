"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const items = [
  {
    id: "light",
    title: "Light Mode",
    Icon: Sun,
  },
  {
    id: "dark",
    title: "Dark Mode",
    Icon: Moon,
  },
  {
    id: "system",
    title: "System Preference",
    Icon: Monitor,
  },
] as const;

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center gap-2">
        <Monitor className="h-4 w-4" />
        <Label className="text-sm font-medium">Theme</Label>
      </div>
      <RadioGroup
        value={theme}
        onValueChange={setTheme}
        className="flex rounded-full border gap-1 p-px"
      >
        {items.map((m) => (
          <Tooltip key={m.id}>
            <TooltipTrigger asChild>
              <div className="relative">
                <RadioGroupItem
                  value={m.id}
                  id={m.id}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={m.id}
                  className="flex items-center justify-center w-6 h-6 rounded-full peer-data-[state=checked]:border border-input  bg-background hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-accent peer-data-[state=checked]:text-accent-foreground cursor-pointer transition-colors"
                  title={m.title}
                >
                  <m.Icon className="h-3 w-3" />
                </Label>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{m.title}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </RadioGroup>
    </div>
  );
}
