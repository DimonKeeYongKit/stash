"use client";

import { useMemo, useState } from "react";
import type { Category, Resource } from "@/lib/types";
import { ResourceRow } from "./ResourceRow";
import { useLocale } from "./Providers";
import { t, tx } from "@/lib/i18n";

export function ResourceBrowser({
  categories,
  resources,
}: {
  categories: Category[];
  resources: Resource[];
}) {
  const { locale } = useLocale();
  const dict = t(locale);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return resources;
    return resources.filter((r) => {
      const hay = [
        tx(r.title, locale),
        tx(r.description, locale),
        r.url,
        ...(r.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, resources, locale]);

  const grouped = useMemo(() => {
    const map = new Map<string, Resource[]>();
    for (const r of filtered) {
      const list = map.get(r.category);
      if (list) list.push(r);
      else map.set(r.category, [r]);
    }
    return map;
  }, [filtered]);

  return (
    <div id="top" className="mx-auto max-w-7xl space-y-8">
      {/* Search */}
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={dict.searchPlaceholder}
          className="w-full rounded-lg border border-zinc-200 bg-white py-2.5 pl-10 pr-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600 dark:focus:ring-zinc-800"
        />
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-white py-16 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
          {dict.empty}
        </div>
      ) : (
        categories.map((c) => {
          const list = grouped.get(c.id);
          if (!list || list.length === 0) return null;
          return (
            <section key={c.id} id={`cat-${c.id}`} className="scroll-mt-20">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                <span aria-hidden="true" className="text-base">
                  {c.icon ?? "🏷"}
                </span>
                <span>{tx(c.name, locale)}</span>
                <span className="text-xs font-normal text-zinc-400 dark:text-zinc-500">
                  {list.length}
                </span>
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {list.map((r) => (
                  <ResourceRow key={r.id} resource={r} />
                ))}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
