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

## Updating the CV

The downloadable CVs are generated from `cv/cv.html` (English, `static/cv/cedric-pontet-cv.pdf`)
and `cv/cv.fr.html` (French, `static/cv/cedric-pontet-cv-fr.pdf`):

```bash
bun run cv   # renders both to A4 PDF with a local Playwright Chromium
```

Edit the HTML (keep both languages in step), run the command, and commit the sources and PDFs. If no Chromium is installed yet,
run `bunx playwright-core install chromium` once.

## Updating the favicon

`static/favicon.svg` is the source. After editing it, run `bun run icons` to regenerate
`favicon.ico`, `apple-touch-icon.png` and the `icon-192/512.png` manifest icons.

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

The visual design (playful, #play14 colours with a blue accent, light and dark themes) lives in a design canvas;
its style guide is the reference for the tokens in `src/routes/layout.css`.

## Deployment

The site runs as a Cloudflare Worker serving prerendered pages as static assets; only
`/contact` (form posts) and unknown URLs (404) run Worker code.

[CI](.github/workflows/ci.yml) runs lint, type check and build on every pull request, and deploys
on every push to `main`.

### One-time setup

1. **GitHub secrets** (repo → Settings → Secrets → Actions):
   - `CLOUDFLARE_API_TOKEN`: token from the "Edit Cloudflare Workers" template.
   - `CLOUDFLARE_ACCOUNT_ID`: shown in the Cloudflare dashboard sidebar.
2. **Custom domain**: `wrangler.jsonc` attaches `cedricpontet.com` to the Worker on deploy.
   Add a Redirect Rule (Rules → Redirect Rules) from `www.cedricpontet.com/*` to
   `https://cedricpontet.com/${1}` (301), plus a proxied DNS record for `www`.
3. **Contact form**:
   - Enable Email Routing on the domain and verify the inbox that should receive messages,
     then store it as a secret: `bunx wrangler secret put CONTACT_TO` (kept out of the public repo).
   - Create a Turnstile widget for `cedricpontet.com`, put its site key in `src/lib/config.ts`,
     and store the secret: `bunx wrangler secret put TURNSTILE_SECRET_KEY`.
4. **Analytics** (optional): enable Cloudflare Web Analytics for the domain (no cookies).

### Deploy by hand

```bash
bun run build && bunx wrangler deploy
```

## License

Code © Cédric Pontet. Articles and photos are not licensed for reuse without permission.
