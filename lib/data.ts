import raw from "@/data/resources.json";
import type { ResourceData } from "./types";

const data = raw as unknown as ResourceData;

export const categories = data.categories;
export const resources = data.resources;

export function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
