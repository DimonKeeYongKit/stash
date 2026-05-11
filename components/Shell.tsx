"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Category, Resource } from "@/lib/types";
import { Sidebar } from "./Sidebar";
import { SiteHeader } from "./SiteHeader";
import { ResourceBrowser } from "./ResourceBrowser";
import { SiteFooter } from "./SiteFooter";
import { BackToTop } from "./BackToTop";
import { useLocale } from "./Providers";
import { t } from "@/lib/i18n";

export function Shell({
  categories,
  resources,
}: {
  categories: Category[];
  resources: Resource[];
}) {
  const { locale } = useLocale();
  const dict = t(locale);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(categories[0]?.id ?? "");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setShowBackToTop(el.scrollTop > 320);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

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
      {
        root: scrollRef.current,
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      },
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

  const onScrollTop = useCallback(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        categories={categories}
        open={open}
        onClose={() => setOpen(false)}
        active={active}
        onJump={onJump}
        onScrollTop={onScrollTop}
      />
      <div className="flex min-w-0 flex-1 flex-col lg:pl-16">
        <SiteHeader onMenuClick={() => setOpen(true)} />
        <div ref={scrollRef} className="no-scrollbar flex-1 overflow-y-auto">
          <main className="px-4 pb-12 pt-6 sm:px-8">
            <ResourceBrowser categories={categories} resources={resources} />
          </main>
          <SiteFooter
            resourceCount={resources.length}
            categoryCount={categories.length}
          />
        </div>
      </div>
      <BackToTop
        visible={showBackToTop}
        onClick={onScrollTop}
        label={dict.backToTop}
      />
    </div>
  );
}
