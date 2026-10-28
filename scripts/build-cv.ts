// Renders cv/cv.html to static/cv/cedric-pontet-cv.pdf (A4) with a local Chromium.
// Needs a Playwright Chromium: `bunx playwright-core install chromium` if missing.
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';

const source = resolve('cv/cv.html');
const output = resolve('static/cv/cedric-pontet-cv.pdf');

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(source).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: output, format: 'A4', printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log(`CV written to ${output}`);
