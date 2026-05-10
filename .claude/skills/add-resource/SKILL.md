---
name: add-resource
description: Add a new entry to data/resources.json. Triggers on requests to add/收录/新增 a resource, link, site, or tool to the stash. Picks the best fit from existing categories before creating a new one, and only suggests splitting categories when the user explicitly asks.
user-invocable: false
---

# Add a resource to data/resources.json

Use this skill whenever the user asks to add a new entry to [data/resources.json](../../../data/resources.json) — phrasings include "加个资源", "收录这个网站", "add this tool to the stash", "把 X 加进去", etc.

## Workflow

1. **Read the current file** [data/resources.json](../../../data/resources.json) in full. Never edit blind — you need the existing `categories` and `resources` arrays to make a good placement decision and to avoid id collisions.

2. **Gather what's needed.** Required fields per resource:
   - `id` — kebab-case, unique across `resources[]`. Derive from the title; if it collides, suffix with a domain hint (e.g. `grid-css`, not `grid-2`).
   - `title` — display name as the site uses it.
   - `url` — full https URL.
   - `category` — one of the `categories[].id` values (see step 3).
   - `tags` — 2–4 lowercase keywords. Reuse tags already present in the file when applicable; consistent tags matter more than clever ones.
   - `description.en` and `description.zh` — one short sentence each (≤ ~80 chars). Match the tone of existing entries: action-oriented, no marketing fluff. The zh version should be natural Chinese, not a literal translation.

   If the user only gave a URL, infer title/description from the page (WebFetch) rather than asking — only ask if the inference is genuinely ambiguous.

3. **Pick the category — fit before create.**
   - List the current categories with their `id`, bilingual `name`, and a one-line read of what already lives in each (based on the existing resources).
   - Try hard to fit the new resource into an existing category. A loose-but-reasonable fit beats category sprawl.
   - Only if nothing fits, propose either (a) broadening an existing category's scope, or (b) adding a new category. When proposing a new category, give it an `id` (short, lowercase), bilingual `name`, and an `icon` (single emoji, matching the visual register of the existing icons). Ask the user to confirm before adding.

4. **Do not proactively suggest splitting categories.** Even if a category is getting large, leave it alone unless the user explicitly asks something like "看看哪些 category 该拆分" or "should we split X". When they do ask, see [subdivide.md](./subdivide.md).

5. **Edit the file.** Append the new resource to the end of `resources[]`. Preserve the existing 2-space indentation and the field ordering used by neighbouring entries (`id`, `title`, `url`, `category`, `tags`, `description`). Use the Edit tool — do not rewrite the whole file.

6. **Report back briefly.** One or two sentences: which category you placed it in (and why, if it wasn't obvious), plus any category change you made. Don't restate the JSON you just wrote.

## Things to avoid

- Don't invent a new category just because the new resource is *slightly* off-theme from the closest existing one. Categories exist to group, not to label individually.
- Don't reorder or reformat existing entries.
- Don't add fields not present in the schema (no `addedAt`, no `author`, etc.) unless the user asks.
- Don't translate the English description word-for-word into the Chinese one — write the zh as if it were the original.
