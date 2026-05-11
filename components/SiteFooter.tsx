"use client";

import { useLocale } from "./Providers";
import { t } from "@/lib/i18n";

export function SiteFooter({
  resourceCount,
  categoryCount,
}: {
  resourceCount: number;
  categoryCount: number;
}) {
  const { locale } = useLocale();
  const dict = t(locale);

  return (
    <footer className="border-t border-zinc-200 bg-white px-4 py-6 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 sm:px-8">
      <span>{dict.footer(resourceCount, categoryCount)}</span>
    </footer>
  );
}
