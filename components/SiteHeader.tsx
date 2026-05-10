"use client";

import { useLocale } from "./Providers";
import { t } from "@/lib/i18n";
import { Toggles } from "./Toggles";

export function SiteHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const { locale } = useLocale();
  const dict = t(locale);

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-3 border-b border-zinc-200 bg-white/85 px-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/85 sm:px-8">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Menu"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 lg:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-5 w-5"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <span className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          stash
        </span>
        <span className="hidden text-xs text-zinc-400 dark:text-zinc-500 sm:inline">
          {dict.brandSuffix}
        </span>
      </div>
      <Toggles />
    </header>
  );
}
