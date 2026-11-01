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
| 2026-11-26 | Story mapping a backlog in a day (Restena My.lu)        | Facilitation             | Draft EN/FR, TODO(cedric) on workshop facts |
| 2026-12-03 | Sovereignty is not resilience (DAS)                      | Sovereignty + Cloud      | Draft EN/FR, to review |
| 2026-12-10 | Technical excellence without a mandate                   | CTO                      | Draft EN/FR, to review |
| 2026-12-17 | A landing zone in Bicep: what goes in the first sprint   | Cloud                    | Draft EN/FR, TODO(cedric) on network choices |
| 2027-01-07 | Domain-Driven Design for coding agents                   | DDD + Agentic            | Draft EN/FR, to review |

- Once MeluXina is live, link it from the Tapestry post's "What Europe would have to bring" (EN/FR).
- EuroStack post: unverified items (EP resolution of 22 Jan 2026 wording, key4biz quote,
  "leaked draft") were left out on purpose; add them only once checked against the source.

### Review before each publish date (the routine publishes drafts as they are)

- 2026-11-26 Story mapping (most urgent): fill the `TODO(cedric)` comment with the workshop facts
  (who was in the room, the backbone, one surprise, the first slice). Also check that the one-day
  agenda matches how you actually run it.
- 2026-12-10 Technical excellence: the advice ("what I have seen help", "my role on standards") is
  written in your voice; reword anything that is not your opinion.
- 2026-12-17 Landing zone: fill the `TODO(cedric)` comment with one or two network choices from
  the data platform (private endpoints, DNS, what was deferred), without naming the project.
- 2027-01-07 DDD for coding agents: confirm "the loop I am now putting in place" and the promise
  to report back; otherwise present it as a proposal. Quotes were checked verbatim on 2026-11-01.
- `TODO(cedric)` comments are HTML comments: invisible to readers, but the gap ships if not filled.

## Next

- Accessibility: manual screen-reader pass with NVDA (Windows) and VoiceOver (macOS/iOS),
  EN and FR (axe + 320px reflow already run in CI via `bun run a11y`)
- Talks: resolve the `TODO(cedric)` notes in `src/lib/content/talks.ts`
  (Voxxed Days 2025 repeat, a missing event name, speaker slots without titles)
- Contact form at 320px: the Turnstile widget (fixed 300px) overflows the form, so the home and
  contact pages scroll sideways once it loads; `bun run a11y` measures before it appears.
  Try `size: 'flexible'` (or compact) and tighter padding on phones.

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
