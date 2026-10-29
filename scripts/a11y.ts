// Runs axe-core (WCAG 2.2 A/AA + best practices) on every sitemap page plus a 404,
// in light and dark themes, plus a 320px reflow check (WCAG 1.4.10). Needs a running site: `bun run preview` (or set BASE_URL).
// Needs a Playwright Chromium: `bunx playwright-core install chromium` if missing.
import { createRequire } from 'node:module';
import type { AxeResults } from 'axe-core';
import { chromium } from 'playwright-core';

const base = process.env.BASE_URL ?? 'http://localhost:4173';
const axeSource = await Bun.file(
  createRequire(import.meta.url).resolve('axe-core/axe.min.js'),
).text();

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const paths = [
  ...[...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1] || '/'),
  '/this-page-does-not-exist',
  '/fr/cette-page-n-existe-pas',
];

const browser = await chromium.launch();
let failures = 0;

for (const colorScheme of ['light', 'dark'] as const) {
  const context = await browser.newContext({ colorScheme, reducedMotion: 'reduce' });
  // Third-party widget (Turnstile): not ours to fix, and it needs the network.
  await context.route('https://challenges.cloudflare.com/**', (route) => route.abort());

  for (const path of paths) {
    const page = await context.newPage();
    await page.goto(base + path, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.addScriptTag({ content: axeSource });
    const results: AxeResults = await page.evaluate(() =>
      // biome-ignore lint/suspicious/noExplicitAny: axe is injected at runtime
      (window as any).axe.run(document, {
        runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'],
      }),
    );
    await page.close();

    for (const v of results.violations) {
      failures++;
      console.log(`\n✗ [${colorScheme}] ${path}: ${v.id} (${v.impact}) — ${v.help}`);
      for (const node of v.nodes.slice(0, 5)) {
        console.log(`    ${node.target.join(' ')}`);
        console.log(`      ${node.failureSummary?.split('\n').slice(1).join(' ').trim()}`);
      }
      if (v.nodes.length > 5) console.log(`    … and ${v.nodes.length - 5} more`);
    }
  }
  await context.close();
}

// Reflow: no horizontal scrolling at 320 CSS px (code blocks and tables scroll on their own).
const mobile = await browser.newContext({ viewport: { width: 320, height: 640 } });
await mobile.route('https://challenges.cloudflare.com/**', (route) => route.abort());
for (const path of paths) {
  const page = await mobile.newPage();
  await page.goto(base + path, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const width = await page.evaluate(() => document.documentElement.scrollWidth);
  await page.close();
  if (width > 320) {
    failures++;
    console.log(`\n✗ [320px] ${path}: page is ${width}px wide, scrolls horizontally`);
  }
}
await mobile.close();
await browser.close();

const checked = paths.length * 3;
if (failures > 0) {
  console.log(`\n${failures} accessibility violation(s) across ${checked} page checks.`);
  process.exit(1);
}
console.log(`No accessibility violations across ${checked} page checks.`);
