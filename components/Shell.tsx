"use client";

import { useCallback, useEffect, useState } from "react";
import type { Category, Resource } from "@/lib/types";
import { Sidebar } from "./Sidebar";
import { SiteHeader } from "./SiteHeader";
import { ResourceBrowser } from "./ResourceBrowser";
import { SiteFooter } from "./SiteFooter";

export function Shell({
  categories,
  resources,
}: {
  categories: Category[];
  resources: Resource[];
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(categories[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible[0]) {
          const id = visible[0].target.id.replace(/^cat-/, "");
          setActive(id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    for (const c of categories) {
      const el = document.getElementById(`cat-${c.id}`);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [categories]);

  const onJump = useCallback((id: string) => {
    const target = document.getElementById(`cat-${id}`);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="flex min-h-full">
      <Sidebar
        categories={categories}
        open={open}
        onClose={() => setOpen(false)}
        active={active}
        onJump={onJump}
      />
      <div className="flex min-w-0 flex-1 flex-col lg:pl-16">
        <SiteHeader onMenuClick={() => setOpen(true)} />
        <main className="flex-1 px-4 pb-12 pt-6 sm:px-8">
          <ResourceBrowser categories={categories} resources={resources} />
        </main>
        <SiteFooter
          resourceCount={resources.length}
          categoryCount={categories.length}
        />
      </div>
    </div>
  );
}
