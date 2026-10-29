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

| Concern       | Choice                                                                  |
| ------------- | ----------------------------------------------------------------------- |
| Framework     | SvelteKit 3 + Svelte 5 (runes only: `$state`, `$derived`, `$props`)     |
| Language      | TypeScript (strict)                                                     |
| Styling       | Tailwind CSS 4 (`@tailwindcss/vite`), tokens in `src/routes/layout.css` |
| UI kit        | shadcn-svelte (bits-ui) — only add components actually used             |
| Blog          | Markdown via mdsvex, syntax highlighting with Shiki                     |
| Hosting       | Cloudflare Workers static assets, `@sveltejs/adapter-cloudflare`        |
| Package mgr   | bun (`bun.lock` committed); never npm/pnpm/yarn                         |
| Lint / format | Biome (`biome.json`), no ESLint or Prettier                             |

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
  to the verified inbox, read from the `CONTACT_TO` Worker secret (never commit it). Fallback if needed: a transactional email API (ask first).
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
bun run a11y         # axe-core (light/dark) + 320px reflow on every sitemap page; needs `bun run preview`
bun run format       # biome check --write .
bunx wrangler deploy # deploy (normally done by CI on push to main)
bunx shadcn-svelte@latest add <component>   # add a UI component
```

- Use `bun add` / `bun add -d` for dependencies and `bunx` instead of `npx`.
- Biome handles `.ts`, `.js`, `.json`, `.css` fully; its Svelte support covers the
  `<script>` and `<style>` blocks only, so `svelte-check` remains the safety net for markup.
- Biome config: tabs off, 2-space indent, single quotes, line width 100;
  ignore `.svelte-kit/`, `build/`, `src/lib/components/ui/` (generated), `wrangler.jsonc`
  (its content is hashed by `wrangler types --check`) and all `*.md`
  (Biome's Markdown formatter is experimental and breaks blog front matter).
- A Claude Code Stop hook (`.claude/hooks/biome-on-stop.sh`) runs `biome check --write` after
  every turn and reports unfixable errors back to Claude.
- `bun run check` deletes stale build output first: `worker-configuration.d.ts` imports the built
  worker for typing, which would otherwise drag compiled files into svelte-check.
- After editing `wrangler.jsonc`, run `bun run gen` (types are hashed against that file).

## Project layout

```
src/
  app.html                   # inline pre-paint theme script, <html lang="%lang%">
  hooks.server.ts            # fills %lang% from the URL
  params.ts                  # SvelteKit 3 param matchers (defineParams): lang = "fr"
  lib/
    assets/                  # portrait.webp (720px, transparent), favicon
    components/ui/           # shadcn-svelte generated components (don't hand-edit heavily)
    components/              # SiteHeader, SiteFooter, ThemeToggle, …
    content/                 # profile.ts, experience.ts, service-pages.ts — typed bilingual data (L10n)
    server/contact.ts        # validation, Turnstile check, MIME for send_email
    i18n.ts                  # Lang type, t(), localize(), switchLang()
    i18n/en.ts, i18n/fr.ts   # UI strings (fr is typed against en)
    blog.ts                  # loads posts via import.meta.glob, reading time, drafts
  content/blog/
    en/<slug>.md             # English posts
    fr/<slug>.md             # French posts
  routes/
    layout.css               # Tailwind + design tokens (light/dark), shadcn variable mapping
    +layout.svelte           # imports layout.css
    [[lang=lang]]/           # optional lang segment: "/" = en, "/fr" = fr; prerender = true
      +layout.ts/.svelte     # lang + dict, header/footer, hreflang links
      +page.svelte           # home
      about/                 # profile + experience timeline
      services/[slug]/       # one page per service that has an entry in service-pages.ts
      blog/                  # index (topic filter, page language only) + [slug]
      rss.xml/               # RSS per language
      contact/               # form action — the only non-prerendered route
      legal/                 # legal notice & privacy (placeholders: RCS, VAT, permit, address)
    +error.svelte            # playful 404 / error page
    sitemap.xml/             # sitemap with hreflang alternates
static/
  favicon.svg                # icon source (brand blue disc + #play14 yellow dot); `bun run icons`
                             # renders favicon.ico, apple-touch-icon.png, icon-192/512.png
  og/                        # share images (`bun run og`)
  cv/                        # public PDF CV (missing: build only warns until added)
cv/cv.html, cv/cv.fr.html    # sources of static/cv/cedric-pontet-cv{,-fr}.pdf (`bun run cv`); public: no birth date; keep EN/FR in step
resources/                   # SOURCE material only (docx CVs, bio, raw photos) — gitignored, never served
```

### SvelteKit 3 notes (differs from SvelteKit 2 tutorials)

- Config lives in `vite.config.ts` inside `sveltekit({...})`; there is no `svelte.config.js`.
- Import app code through `#lib/...` (package.json `imports`), **with the `.js` extension**
  (`#lib/i18n.js`, `#lib/components/X.svelte`). Folder `index.ts` files are not resolved.
- Param matchers: a single `src/params.ts` exporting `params = defineParams({...})`
  from `@sveltejs/kit/params`.
- Hook types come from `@sveltejs/kit/hooks` (`Handle`), not `@sveltejs/kit`.
- The Cloudflare adapter does **not** pass `platform` to requests: read bindings and secrets with
  `import { env } from 'cloudflare:workers'` (works in dev too). Secret types are declared on
  `Cloudflare.Env` in `src/app.d.ts`. Never fall back to test credentials outside `dev`.
- shadcn-svelte init is interactive (preset picker); components.json already exists, so use
  `bunx shadcn-svelte@latest add <component>` from now on.

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

### Service pages

Each home page service card links to `/services/<slug>` once the service has an entry in
`src/lib/content/service-pages.ts` (cards without one stay plain; the sitemap and prerender
entries follow automatically). Every page uses the same hierarchy, typed by `ServicePage`:

1. Breadcrumb + hero: icon, title, lead (also the meta description), CTAs, "At a glance"
   (format, duration, where, languages).
2. When it helps: 3–4 situations in the reader's words.
3. What I take on: 4–6 scope items.
   Optional `ecosystem`: named vendors, tools or practices in 2–3 groups plus an external
   link, on a tinted panel (used by Sovereign cloud, Agentic software factory, DDD & EventStorming).
4. Ways to work together: 2–3 engagement formats.
5. Where I've done this: 2–3 real missions (facts from `resources/` only).
6. Related writing: posts in the page language sharing a tag with `ServicePage.tags`;
   hidden when there are none. Tag new posts accordingly.
7. Other ways I can help: the other services.
8. Contact section with the service preselected as topic.

The service's tint colours the icon disc, "At a glance" and format cards. Canvas artboard:
"v3 · Service page".

### Blog front matter

```yaml
---
title: "Migrating to a European sovereign cloud: lessons learned"
description: "One-sentence summary used for cards and meta description."
date: 2026-11-02
lang: en
tags: [sovereign-cloud, architecture]
draft: false
translationOf: fr/migrer-vers-un-cloud-souverain # optional
---
```

Drafts are excluded from the production build. Slugs are kebab-case, file name = slug.

## Design

- Design canvas: https://claude.ai/artifact/AZKNx2AnSkyyRFMCCKUtKt
  - v1 editorial & calm: rejected (serif hard to read).
  - v2 playful / EventStorming colours: kept for reference only, do not implement its sticky style.
  - **v3 playful, #play14 blue accent: the chosen design, in sync with the live site.** Pages:
    Home (light + dark), About, Blog index, Blog post, Legal notice & privacy, 404, and a Style
    guide artboard (light/dark tokens and components) matching `src/routes/layout.css`.
    Keep the canvas and the code in step when the visual design changes.
- Fonts (self-host via `@fontsource`):
  - Headings: **Bricolage Grotesque** 700–800, tight tracking.
  - Body: **Atkinson Hyperlegible** 400/700, 18px base — readability is a hard requirement.
- Palette: brand accent #play14 blue `#0098DD` (tokens `--brand*`, Tailwind `bg-brand`, `text-brand-text`;
  ink text on it, never white — white fails AA),
  ink `#1F2340`, muted text `#4B4F66`, white ground, soft tints for cards
  (peach `#FFE6D9`, sky `#E4EEFF`, mint `#E2F4EA`, lilac `#EEE7FB`, sun `#FFF3C9`, rose `#FFE1E8`),
  small brand text `#006C9F` (same hue, AA on white and on every light tint).
- #play14 palette (decor shapes and accents only, never body text):
  red `#D80000`, orange `#FF5200`, yellow `#FFC900`, green `#92C900`, blue `#0098DD`, gray `#393939`.
  Hero shapes: yellow dot, green triangle, orange half-disc, ink ring (no blue: it is the accent).
- v3 shapes: 24px card radius, pill buttons, blue circle behind the portrait with a few
  geometric "game piece" shapes (ring, dot, half-disc, triangle), hand-drawn squiggle underline
  in the hero; gentle hover lift, disabled under `prefers-reduced-motion`.
- Dark theme (required): follows `prefers-color-scheme` by default, with a sun/moon toggle in
  the header that overrides it (stored in `localStorage`, applied by an inline script in
  `app.html` before paint to avoid a flash). Implemented as CSS variables swapped on the
  `.dark` class on `<html>` (shadcn convention); components never branch on theme.
  Dark tokens: bg `#14162B`, surface `#1D2040`, raised `#262A50`, border `#343A66`,
  input border `#5A608F`, text `#F3F3F8`, muted `#B4B7CC`, brand `#0098DD` (dark text on it),
  brand text `#5CC3F2`; tints become deep tones (peach `#3A2618`, sky `#1C2A4A`,
  mint `#173328`, lilac `#2A2148`, sun `#3A3216`, rose `#3A1D2A`). Dark surfaces step up in
  lightness instead of using shadows. Primary button inverts (light pill, dark text).
- Focus: 3px brand (blue) outline, 2px offset, on every interactive element in both themes.
- Tokens only: never hardcode hex colors in components; use the CSS variables / Tailwind theme.
- Accessibility: WCAG AA contrast, visible focus, semantic landmarks, `alt` on every image,
  respects `prefers-reduced-motion`.
- Performance: no client JS on content pages beyond the theme/lang toggles; images as
  responsive webp/avif with explicit width/height.

## SEO

- Per-page `<title>`, meta description, canonical URL, `hreflang` alternates (en/fr/x-default).
- Open Graph image per language (static for now): `static/og/default-{en,fr}.png`, rendered by
  `bun run og` (`scripts/build-og.ts`). All head tags go through `#lib/components/Seo.svelte`.
- `sitemap.xml` and `rss.xml` (per language) generated as prerendered endpoints.
- JSON-LD `Person` on home/about, `BlogPosting` on posts (builders in `src/lib/seo.ts`).

## Deployment

- Domain `cedricpontet.com` is on Cloudflare (registrar + DNS).
- Deployed as a Cloudflare Worker with static assets (`wrangler.jsonc`); `www` redirects to apex.
- `www` → apex is a Cloudflare Redirect Rule, not app code: prerendered assets are served
  before the Worker runs. One-time setup steps are in README.md.
- CI: `.github/workflows/ci.yml`, GitHub Actions with `oven-sh/setup-bun` →
  `bun install --frozen-lockfile && bun run lint && bun run check && bun run build && bun run a11y && bunx wrangler deploy`
  using `CLOUDFLARE_API_TOKEN` secret.

## Conventions

- Svelte 5 runes only; no legacy `export let`, no stores unless shared cross-route state.
- Components in PascalCase, one per file; content data is typed and lives in `src/lib/content`.
- Keep dependencies minimal; ask before adding anything beyond the stack above.
