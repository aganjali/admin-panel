"use client";

import { Globe } from "lucide-react";
import i18next from "i18next";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { allLangs } from "@/lib/locales/all-langs";
import {
  changeLangMessages,
  LanguageValue,
} from "@/lib/locales/config-locales";
import { useLang } from "@/lib/locales/use-lang";

export function LanguageSwitcher() {
  const { currentLang } = useLang();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLang: LanguageValue) => {
    startTransition(() => {
      i18next
        .changeLanguage(newLang)
        .then(() => {
          router.refresh();
          toast.success(changeLangMessages[newLang].success);
        })
        .catch(() => {
          toast.error(changeLangMessages[newLang].error);
        });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isPending}>
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {allLangs.map((language) => (
          <DropdownMenuItem
            key={language.value}
            disabled={currentLang.value === language.value}
            onClick={() =>
              handleLanguageChange(language.value as LanguageValue)
            }
          >
            <img
              src={`https://flagcdn.com/w20/${language.countryCode.toLowerCase()}.png`}
              alt={language.label}
              className="mr-2 h-4 w-4 rounded-full"
            />
            {language.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
