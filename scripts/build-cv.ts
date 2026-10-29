// Renders cv/cv.html and cv/cv.fr.html to static/cv/*.pdf (A4) with a local Chromium.
// Needs a Playwright Chromium: `bunx playwright-core install chromium` if missing.
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';

const cvs = [
  { source: 'cv/cv.html', output: 'static/cv/cedric-pontet-cv.pdf' },
  { source: 'cv/cv.fr.html', output: 'static/cv/cedric-pontet-cv-fr.pdf' },
];

const browser = await chromium.launch();
for (const cv of cvs) {
  const output = resolve(cv.output);
  const page = await browser.newPage();
  await page.goto(pathToFileURL(resolve(cv.source)).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: output, format: 'A4', printBackground: true, preferCSSPageSize: true });
  await page.close();
  console.log(`CV written to ${output}`);
}
await browser.close();
