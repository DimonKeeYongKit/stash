# stash

A personal resource hub — collect, organize, and share frequently used cloud-drive links, tools, and reference material.

Stack: Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript.

## Adding resources

All data lives in [`data/resources.json`](./data/resources.json). Edit, push to GitHub, and Vercel will redeploy automatically.

```jsonc
{
  "categories": [
    { "id": "tools", "name": "Online tools", "icon": "🛠" }
  ],
  "resources": [
    {
      "id": "unique-id",
      "title": "Display name",
      "url": "https://...",
      "category": "tools",       // must match a categories[].id
      "tags": ["optional tag"],
      "description": "optional summary",
      "password": "optional access code"   // for cloud-drive links
    }
  ]
}
```

Field rules:

- `id`: just needs to be unique within the file
- `category`: must match an existing `categories[].id`, otherwise it won't show up in the category filter
- `password`: when set, it's rendered as a highlighted chip
- Favicons are pulled automatically from Google s2/favicons

## Local development

```bash
pnpm install   # skip if already installed
pnpm dev       # http://localhost:3000
pnpm build     # production build
```

## Deploying to Vercel

1. Push the project to GitHub
2. Import the repo in Vercel — the framework is auto-detected as Next.js
3. No environment variables required, just hit Deploy

Every push to `main` triggers an automatic redeploy.

## Project layout

```
app/                 routes + root layout
components/          UI components (ResourceCard / ResourceBrowser)
lib/                 types + data loading
data/resources.json  ← all resource data goes here
```
