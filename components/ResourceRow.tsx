"use client";

import type { Resource } from "@/lib/types";
import { getHostname } from "@/lib/data";
import { useLocale } from "./Providers";
import { t, tx } from "@/lib/i18n";

export function ResourceRow({ resource }: { resource: Resource }) {
  const { locale } = useLocale();
  const dict = t(locale);
  const host = getHostname(resource.url);
  const favicon = `https://www.google.com/s2/favicons?domain=${host}&sz=64`;
  const title = tx(resource.title, locale);
  const description = tx(resource.description, locale);

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      title={description || host}
      className="group flex items-start gap-3 rounded-xl border border-zinc-200/70 bg-white p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={favicon}
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 shrink-0 rounded-lg bg-zinc-100 object-contain p-1 dark:bg-zinc-800"
        loading="lazy"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-medium text-zinc-900 group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
            {title}
          </span>
          {resource.password && (
            <span className="shrink-0 rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
              {dict.passwordLabel(resource.password)}
            </span>
          )}
        </div>
        <div className="mt-0.5 truncate text-xs text-zinc-500 dark:text-zinc-400">
          {description || host}
        </div>
      </div>
    </a>
  );
}
