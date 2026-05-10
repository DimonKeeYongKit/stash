"use client";

import { useLocale, useTheme } from "./Providers";
import { t } from "@/lib/i18n";

export function Toggles() {
  const { locale, toggleLocale } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const dict = t(locale);
  const otherLocaleLabel = locale === "en" ? "中" : "EN";
  const themeLabel = theme === "dark" ? "Light" : "Dark";

  return (
    <div className="flex items-center gap-6 text-xs">
      <button
        type="button"
        onClick={toggleLocale}
        aria-label={dict.toggleLanguageLabel}
        title={dict.toggleLanguageLabel}
        className="text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        {otherLocaleLabel}
      </button>
      <span aria-hidden="true" className="h-3 w-px bg-zinc-200 dark:bg-zinc-800" />
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={
          theme === "dark" ? dict.toggleThemeToLight : dict.toggleThemeToDark
        }
        title={
          theme === "dark" ? dict.toggleThemeToLight : dict.toggleThemeToDark
        }
        className="text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        {themeLabel}
      </button>
    </div>
  );
}
