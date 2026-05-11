"use client";

import { useLocale } from "./Providers";
import { t } from "@/lib/i18n";
import { Toggles } from "./Toggles";

const REPO_URL = "https://github.com/DimonKeeYongKit/stash";

export function SiteHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const { locale } = useLocale();
  const dict = t(locale);

  return (
    <header className="relative z-20 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-zinc-200 bg-white/85 px-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/85 sm:px-8">
      <div className="flex min-w-0 flex-1 items-center gap-3 h-14">
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
      <div className="mr-8">
        <Toggles />
      </div>
      <a
        href={REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={dict.sourceLabel}
        className="github-corner absolute right-0 top-0 text-white dark:text-zinc-950"
      >
        <svg
          width="56"
          height="56"
          viewBox="0 0 250 250"
          aria-hidden="true"
          className="block fill-zinc-900 dark:fill-zinc-100"
        >
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
          <path
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="currentColor"
            style={{ transformOrigin: "130px 106px" }}
            className="octo-arm"
          />
          <path
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,80.9 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="currentColor"
            className="octo-body"
          />
        </svg>
      </a>
    </header>
  );
}
