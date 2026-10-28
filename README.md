# cedricpontet.com

Source of [cedricpontet.com](https://cedricpontet.com), the website of Cédric Pontet:
freelance CTO, cloud & sovereign cloud architect, DDD & EventStorming practitioner and
facilitator ([Playful Learner](https://playfullearner.com), [#play14](https://play14.org)).

The site presents the profile and experience, hosts a bilingual blog (English and French)
and has a contact form. It is prerendered and served from Cloudflare Workers.

## Stack

- [SvelteKit 3](https://svelte.dev/docs/kit) + Svelte 5 (runes), TypeScript
- [Tailwind CSS 4](https://tailwindcss.com) + [shadcn-svelte](https://www.shadcn-svelte.com)
- Markdown blog with [mdsvex](https://mdsvex.pngwn.io)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/) via `@sveltejs/adapter-cloudflare`
- [bun](https://bun.sh) for packages and scripts, [Biome](https://biomejs.dev) for lint and format

## Getting started

Requires bun 1.3+.

```bash
bun install
bun run dev        # http://localhost:5173 (English) and /fr (French)
```

| Command           | What it does                                     |
| ----------------- | ------------------------------------------------ |
| `bun run dev`     | Dev server with hot reload                       |
| `bun run build`   | Prerender the site into `.svelte-kit/cloudflare` |
| `bun run preview` | Serve the build locally with Wrangler            |
| `bun run check`   | Type-check (Wrangler types, svelte-check)        |
| `bun run lint`    | Biome lint + format check                        |
| `bun run format`  | Biome auto-fix                                   |

## Writing a blog post

Add a Markdown file to `src/content/blog/en/` or `src/content/blog/fr/`. The file name is the URL slug.

```yaml
---
title: 'What "sovereign" actually means when you migrate a workload'
description: "One-sentence summary used for cards, RSS and the meta description."
date: "2026-11-04"
lang: en
tags: [sovereign-cloud, architecture]
draft: false
translationOf: fr/ce-que-souverain-veut-dire # optional, links the other language
---
```

Drafts (`draft: true`) show in `bun run dev` but are left out of production builds.
Each language has its own RSS feed at `/rss.xml` and `/fr/rss.xml`.

## Project structure

```
src/
  routes/[[lang=lang]]/   pages; "/" is English, "/fr" is French
  routes/layout.css       design tokens (light and dark themes)
  lib/components/         site components; ui/ holds shadcn-svelte components
  lib/i18n/               UI strings (en.ts, fr.ts)
  content/blog/           Markdown articles
```

[CLAUDE.md](CLAUDE.md) holds the detailed conventions: design tokens, content rules,
SvelteKit 3 specifics and deployment.

## Design

The visual design (playful, #play14 orange, light and dark themes) lives in a design canvas;
its style guide is the reference for the tokens in `src/routes/layout.css`.

## Deployment

The domain is registered and served on Cloudflare. Pushing to `main` builds and deploys the
Worker (GitHub Actions + `wrangler deploy`, using a `CLOUDFLARE_API_TOKEN` secret).
To deploy by hand:

```bash
bun run build && bunx wrangler deploy
```

## License

Code © Cédric Pontet. Articles and photos are not licensed for reuse without permission.
