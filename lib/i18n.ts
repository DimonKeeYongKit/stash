import type { Translatable } from "./types";

export type Locale = "en" | "zh";

export const LOCALES: Locale[] = ["en", "zh"];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "zh";
}

export function tx(value: Translatable | undefined, locale: Locale): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[locale] ?? value.en ?? value.zh ?? "";
}

type Dict = {
  brandSuffix: string;
  headerDesc: string;
  searchPlaceholder: string;
  allCategory: string;
  empty: string;
  passwordLabel: (code: string) => string;
  footer: (n: number, m: number) => string;
  sourceLabel: string;
  toggleLanguageLabel: string;
  toggleThemeToLight: string;
  toggleThemeToDark: string;
  backToTop: string;
};

export const dictionaries: Record<Locale, Dict> = {
  en: {
    brandSuffix: "· resource hub",
    headerDesc:
      "Collecting, organizing, and sharing the cloud-drive links, tools, and reference material I actually use.",
    searchPlaceholder: "Search resources, tags, domains…",
    allCategory: "All",
    empty: "No matching resources.",
    passwordLabel: (code) => `Code ${code}`,
    footer: (n, m) => `${n} resources · ${m} categories`,
    sourceLabel: "Source",
    toggleLanguageLabel: "切换到中文",
    toggleThemeToLight: "Switch to light mode",
    toggleThemeToDark: "Switch to dark mode",
    backToTop: "Back to top",
  },
  zh: {
    brandSuffix: "· 资源中转站",
    headerDesc: "收集、整理、转发我用得上的网盘 / 工具 / 资料链接。",
    searchPlaceholder: "搜索资源、标签、域名…",
    allCategory: "全部",
    empty: "没有匹配的资源。",
    passwordLabel: (code) => `提取码 ${code}`,
    footer: (n, m) => `共收录 ${n} 条资源 · ${m} 个分类`,
    sourceLabel: "源码",
    toggleLanguageLabel: "Switch to English",
    toggleThemeToLight: "切换到浅色模式",
    toggleThemeToDark: "切换到深色模式",
    backToTop: "回到顶部",
  },
};

export function t(locale: Locale): Dict {
  return dictionaries[locale];
}
