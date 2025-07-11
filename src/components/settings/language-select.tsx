"use client";

import { Globe } from "lucide-react";

import { allLangs } from "@/lib/locales/all-langs";
import { LanguageValue } from "@/lib/locales/config-locales";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTranslate } from "@/lib/locales/use-locales";
import Image from "next/image";

export function LanguageSelect() {
  const { onChangeLang, currentLang } = useTranslate();

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4" />
        <Label className="text-sm font-medium">Language</Label>
      </div>
      <Select
        value={currentLang.value}
        onValueChange={(v) => onChangeLang(v as LanguageValue)}
      >
        <SelectTrigger size="sm">
          <SelectValue placeholder="Select language" className="text-xs" />
        </SelectTrigger>
        <SelectContent>
          {allLangs.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              <div className="flex items-center gap-1">
                <Image
                  src={`/assets/flagpack/${lang.countryCode.toLowerCase()}.webp`}
                  alt={lang.label}
                  width={16}
                  height={16}
                  className="mr-2 object-contain"
                />
                <span className="text-xs">{lang.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
