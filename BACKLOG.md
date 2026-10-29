- Content to provide (placeholders live on the site)
  - Availability date: "Available for missions from [MONTH YEAR]" (src/lib/i18n/en.ts, fr.ts)
  - Legal notice: legal form, RCS number, LU VAT number, business permit number,
    email retention period (src/routes/[[lang=lang]]/legal/+page.svelte)
- Service pages (template in CLAUDE.md; CTO, Agile coaching, Cloud architecture done)
  - Sovereign cloud, Agentic software factory,
    DDD & EventStorming, Facilitation & workshops
- Blog articles
  - EventStorming era journey (strategic DDD, cinema 1960s to 2000s): second video post
  - Sovereignty DAS
  - DDD + AI
  - DDD Course
- Accessibility follow-ups (automated axe + 320px reflow checks now run in CI: `bun run a11y`)
  - Manual screen-reader pass: NVDA (Windows) and VoiceOver (macOS/iOS), EN and FR
- Nice to have
  - Compact mobile menu
