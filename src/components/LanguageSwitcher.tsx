import { Check } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const LANGUAGES = [
  { code: "en", label: "English", flag: "GB" },
  { code: "fr", label: "Français", flag: "FR" },
  { code: "de", label: "Deutsch", flag: "DE" },
  { code: "es", label: "Español", flag: "ES" },
  { code: "pt", label: "Português", flag: "PT" },
  { code: "it", label: "Italiano", flag: "IT" },
  { code: "ua", label: "Українська", flag: "UA" },
  { code: "pl", label: "Polski", flag: "PL" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language;

  const currentLang =
    LANGUAGES.find((lang) => lang.code === current) ?? LANGUAGES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon-sm">
          <ReactCountryFlag
            countryCode={currentLang.flag}
            svg
            style={{ width: "1.5em", height: "1.5em" }}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <ReactCountryFlag
                countryCode={lang.flag}
                svg
                style={{ width: "1.25em", height: "1.25em" }}
              />
              {lang.label}
            </div>

            {current === lang.code && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
