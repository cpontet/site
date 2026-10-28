# cedricpontet.com

Personal / freelance website of Cédric Pontet — freelance CTO, cloud architect,
sovereign cloud specialist and agentic AI (coding agents, software factory) consultant.
Fully remote, based in Luxembourg, working for EU institutions, public sector and private clients.

## Goals

- Present the profile and positioning (who, what, why hire him).
- Show experience (25 years, selected missions — not a full CV dump).
- Host a markdown blog (EN and FR).
- Convert visitors into contacts (email, LinkedIn, downloadable CV).

## Stack

| Concern       | Choice                                                              |
| ------------- | ------------------------------------------------------------------- |
| Framework     | SvelteKit 3 + Svelte 5 (runes only: `$state`, `$derived`, `$props`) |
| Language      | TypeScript (strict)                                                 |
| Styling       | Tailwind CSS 4 (`@tailwindcss/vite`), design tokens in `src/app.css` |
| UI kit        | shadcn-svelte (bits-ui) — only add components actually used         |
| Blog          | Markdown via mdsvex, syntax highlighting with Shiki                 |
| Hosting       | Cloudflare Workers static assets, `@sveltejs/adapter-cloudflare`    |
| Package mgr   | bun (`bun.lock` committed); never npm/pnpm/yarn                     |
| Lint / format | Biome (`biome.json`), no ESLint or Prettier                         |

The site is prerendered (`export const prerender = true` in the root layout) with one
exception: the **contact form**, handled at runtime by the Worker. No database or CMS.
Analytics: Cloudflare Web Analytics only (no cookies, no banner).

### Contact form

- Form on the home page (`#contact`) and `/contact`, posting to a SvelteKit form action
  in `src/routes/[[lang=lang]]/contact/+page.server.ts` (`prerender = false` for that route).
  Progressive enhancement with `use:enhance`: it must work without JS.
- Fields: name, email, organisation (optional), topic (select), message. Validate server-side
  (length limits, email format); return field errors via `fail(400, …)`.
- Spam: Cloudflare Turnstile (site key public env, secret as Worker secret
  `TURNSTILE_SECRET_KEY`) plus a hidden honeypot field.
- Delivery: Cloudflare Email Routing `send_email` binding (`SEND_EMAIL` in `wrangler.jsonc`)
  to the verified inbox. Fallback if needed: a transactional email API (ask first).
- Optional rate limiting with the Workers Rate Limiting binding, keyed by IP.
- GDPR: no storage of submissions; a one-line notice under the form explains the data is only
  used to reply. The legal notice page names the data controller.

## Commands

```bash
bun install          # install dependencies
bun run dev          # local dev server
bun run build        # prerender to .svelte-kit/cloudflare
bun run preview      # wrangler preview of the build
bun run check        # svelte-check + types
bun run lint         # biome check .
bun run format       # biome check --write .
bunx wrangler deploy # deploy (normally done by CI on push to main)
bunx shadcn-svelte@latest add <component>   # add a UI component
```

- Use `bun add` / `bun add -d` for dependencies and `bunx` instead of `npx`.
- Biome handles `.ts`, `.js`, `.json`, `.css` fully; its Svelte support covers the
  `<script>` and `<style>` blocks only, so `svelte-check` remains the safety net for markup.
- Biome config: tabs off, 2-space indent, single quotes, line width 100;
  ignore `.svelte-kit/`, `build/`, `src/lib/components/ui/` (generated).

## Project layout

```
src/
  app.css                    # Tailwind + design tokens (colors, fonts, radii)
  lib/
    components/ui/           # shadcn-svelte generated components (don't hand-edit heavily)
    components/              # site components (Header, Footer, ExperienceItem, PostCard…)
    content/
      profile.ts             # positioning, services, skills — typed data, both languages
      experience.ts          # selected missions, typed, both languages
    i18n/                    # UI strings: en.ts, fr.ts
    blog.ts                  # loads posts via import.meta.glob, sorts, filters by lang
  content/blog/
    en/<slug>.md             # English posts
    fr/<slug>.md             # French posts
  routes/
    [[lang=lang]]/           # optional lang segment: "/" = en, "/fr" = fr
      +page.svelte           # home
      about/                 # profile + experience timeline
      services/              # offers
      blog/                  # index (topic + language filters) + [slug]
      contact/               # form action (the only non-prerendered route)
      legal/                 # legal notice & privacy (placeholders: RCS, VAT, permit, address)
    +error.svelte            # playful 404 / error page
static/
  images/                    # optimized photos (webp/avif)
  cv/                        # public PDF CVs
resources/                   # SOURCE material only (docx CVs, bio, raw photos) — never served
```

## Content rules

- **Languages**: English is the default (`/`), French at `/fr`. Every page exists in both.
  Blog posts may exist in only one language; link the translation via `translationOf` front matter.
- **Source of truth** for career facts is `resources/` (CVs + bio). Do not invent clients,
  certifications, dates or results. If something is missing, leave a `TODO(cedric):` comment.
- `resources/` contains personal data (date of birth, full CVs). Never publish birth date,
  and never copy docx files into `static/`.
- Positioning order: Freelance CTO · Cloud & Sovereign Cloud Architect · **DDD & EventStorming**
  · Agentic AI / Software Factory · Facilitator.
  DDD & EventStorming is a strong expertise (since 2008: DDD/CQRS/event sourcing architectures,
  EventStorming facilitation, KanDDDinsky speaker, Greg Young workshops, EventStorming Summit).
  Show it as one expertise among the others — it is NOT the site's theme.
  Never reuse the EventStorming sticky-note grammar as visual identity (it is Alberto Brandolini's). Facilitation is a first-class strength, not a footnote: Playful Learner (founder),
  #play14 (co-founder, since 2014), EventStorming, story mapping, serious games, visual thinking.
  It gets its own service, a home page section and a section on About.
  The Agile/DDD background supports the positioning; it is not the headline.
- Tone: calm, precise, senior. First person on the site ("I help…"). No buzzword stacking,
  no superlatives, no emoji in body copy.
- Pronouns: refer to Cédric as "I" on the site; elsewhere use his name.

### Blog front matter

```yaml
---
title: "Migrating to a European sovereign cloud: lessons learned"
description: "One-sentence summary used for cards and meta description."
date: 2026-11-02
lang: en
tags: [sovereign-cloud, architecture]
draft: false
translationOf: fr/migrer-vers-un-cloud-souverain   # optional
---
```

Drafts are excluded from the production build. Slugs are kebab-case, file name = slug.

## Design

- Design canvas: https://claude.ai/artifact/AZKNx2AnSkyyRFMCCKUtKt
  - v1 editorial & calm: rejected (serif hard to read).
  - v2 playful / EventStorming colours: kept for reference only, do not implement its sticky style.
  - **v3 playful, #play14 orange: the chosen design.** Pages: Home (light + dark), About,
    Blog index, Blog post, Legal notice & privacy, 404, and a Style guide artboard (light/dark
    tokens and components) that is the source of truth for `src/app.css`.
- Fonts (self-host via `@fontsource`):
  - Headings: **Bricolage Grotesque** 700–800, tight tracking.
  - Body: **Atkinson Hyperlegible** 400/700, 18px base — readability is a hard requirement.
- v3 palette: signature orange `#FF5200` (official #play14 orange; ink text on it, never white — white fails AA),
  ink `#1F2340`, muted text `#4B4F66`, white ground, soft tints for cards
  (peach `#FFE6D9`, sky `#E4EEFF`, mint `#E2F4EA`, lilac `#EEE7FB`, sun `#FFF3C9`, rose `#FFE1E8`),
  small orange text `#C43F00` (same hue, AA on white).
- #play14 palette (decor shapes and accents only, never body text):
  red `#D80000`, orange `#FF5200`, yellow `#FFC900`, green `#92C900`, blue `#0098DD`, gray `#393939`.
  Hero shapes: yellow dot, green triangle, blue half-disc, ink ring.
- v3 shapes: 24px card radius, pill buttons, orange circle behind the portrait with a few
  geometric "game piece" shapes (ring, dot, half-disc, triangle), hand-drawn squiggle underline
  in the hero; gentle hover lift, disabled under `prefers-reduced-motion`.
- Dark theme (required): follows `prefers-color-scheme` by default, with a sun/moon toggle in
  the header that overrides it (stored in `localStorage`, applied by an inline script in
  `app.html` before paint to avoid a flash). Implement as CSS variables swapped on
  `[data-theme="dark"]`; components never branch on theme.
  Dark tokens: bg `#14162B`, surface `#1D2040`, raised `#262A50`, border `#343A66`,
  input border `#5A608F`, text `#F3F3F8`, muted `#B4B7CC`, orange `#FF5200` (ink text on it),
  orange text `#FF8F5C`; tints become deep tones (peach `#3A2618`, sky `#1C2A4A`,
  mint `#173328`, lilac `#2A2148`, sun `#3A3216`, rose `#3A1D2A`). Dark surfaces step up in
  lightness instead of using shadows. Primary button inverts (light pill, dark text).
- Focus: 3px orange outline, 2px offset, on every interactive element in both themes.
- Tokens only: never hardcode hex colors in components; use the CSS variables / Tailwind theme.
- Accessibility: WCAG AA contrast, visible focus, semantic landmarks, `alt` on every image,
  respects `prefers-reduced-motion`.
- Performance: no client JS on content pages beyond the theme/lang toggles; images as
  responsive webp/avif with explicit width/height.

## SEO

- Per-page `<title>`, meta description, canonical URL, `hreflang` alternates (en/fr/x-default).
- Open Graph image per page (static for now).
- `sitemap.xml` and `rss.xml` (per language) generated as prerendered endpoints.
- JSON-LD `Person` on home/about, `BlogPosting` on posts.

## Deployment

- Domain `cedricpontet.com` is on Cloudflare (registrar + DNS).
- Deployed as a Cloudflare Worker with static assets (`wrangler.jsonc`); `www` redirects to apex.
- CI: GitHub Actions with `oven-sh/setup-bun` →
  `bun install --frozen-lockfile && bun run lint && bun run check && bun run build && bunx wrangler deploy`
  using `CLOUDFLARE_API_TOKEN` secret.

## Conventions

- Svelte 5 runes only; no legacy `export let`, no stores unless shared cross-route state.
- Components in PascalCase, one per file; content data is typed and lives in `src/lib/content`.
- Keep dependencies minimal; ask before adding anything beyond the stack above.
