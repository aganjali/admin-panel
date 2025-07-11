"use client";

import * as React from "react";
import { PanelLeftClose, PanelLeftIcon, PanelLeftOpen } from "lucide-react";

import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useSettings } from "./settings-provider";

const items = [
  {
    id: "full",
    title: "Full Layout",
    Icon: PanelLeftOpen,
  },
  {
    id: "icon",
    title: "Icon Only",
    Icon: PanelLeftClose,
  },
  {
    id: "no-layout",
    title: "No Sidebar",
    Icon: PanelLeftClose,
  },
] as const;

export function LayoutToggle() {
  const { setLayot, layout } = useSettings();
  //   const { setOpen, open } = useSidebar();
  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center gap-2">
        <PanelLeftIcon className="h-4 w-4" />
        <Label className="text-sm font-medium">Layout</Label>
      </div>
      <RadioGroup
        value={layout}
        onValueChange={(v) => setLayot(v as any)}
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
