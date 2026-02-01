import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { type Theme } from "@/providers/theme-provider";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ThemeToggle = () => {
  const { t } = useTranslation();

  const { theme, setTheme } = useTheme();

  const onMenuItemClick = (value: Theme) => setTheme(value);

  const isCurrentlySelected = (value: Theme) => theme === value;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon-sm">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">{t("theme.toggle")}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => onMenuItemClick("light")}
          className={cn({
            "bg-accent": isCurrentlySelected("light"),
          })}
        >
          {t("theme.light")}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onMenuItemClick("dark")}
          className={cn({
            "bg-accent": isCurrentlySelected("dark"),
          })}
        >
          {t("theme.dark")}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onMenuItemClick("system")}
          className={cn({
            "bg-accent": isCurrentlySelected("system"),
          })}
        >
          {t("theme.system")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
