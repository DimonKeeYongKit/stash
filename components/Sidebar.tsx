"use client";

import type { Category } from "@/lib/types";
import { useLocale } from "./Providers";
import { tx } from "@/lib/i18n";

export function Sidebar({
  categories,
  open,
  onClose,
  active,
  onJump,
}: {
  categories: Category[];
  open: boolean;
  onClose: () => void;
  active: string;
  onJump: (id: string) => void;
}) {
  const { locale } = useLocale();

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={
          "fixed inset-0 z-30 bg-black/30 backdrop-blur-sm transition-opacity lg:hidden " +
          (open ? "opacity-100" : "pointer-events-none opacity-0")
        }
      />
      <aside
        className={
          "fixed inset-y-0 left-0 z-40 flex w-16 transform flex-col items-center gap-1 border-r border-zinc-200 bg-white py-3 transition-transform dark:border-zinc-800 dark:bg-zinc-950 lg:translate-x-0 " +
          (open ? "translate-x-0" : "-translate-x-full lg:translate-x-0")
        }
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            onClose();
          }}
          className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg text-xl transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
          aria-label="stash"
          title="stash"
        >
          📦
        </a>
        <nav className="flex flex-col items-center gap-1.5">
          {categories.map((c) => {
            const isActive = active === c.id;
            const label = tx(c.name, locale);
            return (
              <a
                key={c.id}
                href={`#cat-${c.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onJump(c.id);
                  onClose();
                }}
                title={label}
                aria-label={label}
                className={
                  "group relative flex h-10 w-10 items-center justify-center rounded-lg text-lg transition " +
                  (isActive
                    ? "bg-zinc-100 dark:bg-zinc-800"
                    : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100")
                }
              >
                <span aria-hidden="true">{c.icon ?? "•"}</span>
                {isActive && (
                  <span className="absolute -left-1 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-zinc-900 dark:bg-zinc-100" />
                )}
                <span className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition group-hover:opacity-100 dark:bg-zinc-100 dark:text-zinc-900">
                  {label}
                </span>
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
