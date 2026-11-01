## Blocked

- Placeholders live on the site, waiting on company paperwork
  - Legal notice: legal form, RCS number, LU VAT number, business permit number,
    email retention period (`src/routes/[[lang=lang]]/legal/+page.svelte`), then remove its
    `TODO(cedric)` and have the privacy text reviewed
  - Availability date: "Available for missions from [MONTH YEAR]" (`src/lib/i18n/en.ts`, `fr.ts`)

## Publishing calendar (Thursdays; a scheduled routine flips `draft: false` on the date)

| Date       | Post                                                     | Service                  | Status                |
| ---------- | -------------------------------------------------------- | ------------------------ | --------------------- |
| 2026-11-05 | Is Tapestry the future of sovereign AI?                  | Sovereignty              | Draft EN/FR           |
| 2026-11-12 | Could MeluXina-AI train a sovereign model?               | Sovereignty              | Draft EN/FR           |
| 2026-11-19 | EuroStack: what was asked for, and what Europe delivered | Sovereignty              | Draft EN/FR, to review |
| 2026-11-26 | Story mapping a backlog in a day                         | Facilitation             | Needs Cédric's story  |
| 2026-12-03 | Sovereignty is not resilience (DAS)                      | Sovereignty + Cloud      | Draft EN/FR, to review |
| 2026-12-10 | Technical excellence without a mandate                   | CTO                      | Needs Cédric's story  |
| 2026-12-17 | A landing zone in Bicep: what goes in the first sprint   | Cloud                    | Needs Cédric's story  |
| 2027-01-07 | DDD + AI: specs that coding agents can execute           | DDD + Agentic            | Needs Cédric's story  |

- Once MeluXina is live, link it from the Tapestry post's "What Europe would have to bring" (EN/FR).
- EuroStack post: unverified items (EP resolution of 22 Jan 2026 wording, key4biz quote,
  "leaked draft") were left out on purpose; add them only once checked against the source.

## Next

- Accessibility: manual screen-reader pass with NVDA (Windows) and VoiceOver (macOS/iOS),
  EN and FR (axe + 320px reflow already run in CI via `bun run a11y`)
- Talks: resolve the `TODO(cedric)` notes in `src/lib/content/talks.ts`
  (Voxxed Days 2025 repeat, a missing event name, speaker slots without titles)

## Blog ideas

Tag new posts with the service's `tags` in `service-pages.ts`.

- Cloud architecture
  - Moving all IT workloads to Azure: what the plan missed
- CTO & strategic advisory
  - From head of software factory to CTO
  - Wardley Mapping for technical strategy
- DDD & EventStorming
  - EventStorming era journey (strategic DDD, cinema 1960s to 2000s): second video post
  - DDD course (source: `~/repos/perso/ddd/course`)
- Agile coaching & transformation
  - Portfolio governance in Azure DevOps for a public institution
  - What I believed 14 years ago is not outdated
    (https://itnation.lu/news/portrait-cedric-pontet-software-architect-at-agile-partner-sa/)
- Facilitation & workshops
  - Serious games for architecture decisions

## Nice to have

- Compact mobile menu
