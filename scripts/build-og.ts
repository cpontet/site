// Renders the 1200×630 Open Graph share images (one per language) to static/og/.
// Needs a Playwright Chromium: `bunx playwright-core install chromium` if missing.
import { mkdirSync, readFileSync } from 'node:fs';
import { chromium } from 'playwright-core';

const dataUri = (path: string, type: string) =>
  `data:${type};base64,${readFileSync(path).toString('base64')}`;

const display = dataUri(
  'node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2',
  'font/woff2',
);
const body = dataUri(
  'node_modules/@fontsource/atkinson-hyperlegible/files/atkinson-hyperlegible-latin-700-normal.woff2',
  'font/woff2',
);
const portrait = dataUri('src/lib/assets/portrait.webp', 'image/webp');

// Same strings as the site (meta title / footer tagline), kept short to stay legible as a thumbnail.
const variants = [
  {
    file: 'static/og/default-en.png',
    role: ['Freelance CTO &', 'cloud architect'],
    topics: ['Sovereign cloud', 'Agentic AI', 'DDD & EventStorming', 'Facilitation'],
  },
  {
    file: 'static/og/default-fr.png',
    role: ['CTO freelance &', 'architecte cloud'],
    topics: ['Cloud souverain', 'IA agentique', 'DDD & EventStorming', 'Facilitation'],
  },
];

// Colours mirror the light tokens in src/routes/layout.css.
const html = (role: string[], topics: string[]) => `<!doctype html>
<html><head><style>
  @font-face { font-family: Bricolage; src: url(${display}); font-weight: 200 800; }
  @font-face { font-family: Atkinson; src: url(${body}); font-weight: 700; }
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; background: #fff; color: #1F2340; font-family: Atkinson;
    display: flex; align-items: center; padding: 0 0 0 80px; overflow: hidden; position: relative; }
  .text { flex: 1; display: flex; flex-direction: column; gap: 22px; position: relative; z-index: 1; }
  .site { font-size: 26px; color: #0076AD; }
  h1 { font-family: Bricolage; font-weight: 800; font-size: 84px; line-height: 1; letter-spacing: -0.03em; }
  .role { font-family: Bricolage; font-weight: 700; font-size: 44px; line-height: 1.1; letter-spacing: -0.02em; }
  .topics { font-size: 25px; color: #4B4F66; max-width: 600px; line-height: 1.4; }
  .art { width: 500px; height: 630px; position: relative; flex: none; }
  .disc { position: absolute; left: 40px; top: 95px; width: 440px; height: 440px; border-radius: 50%;
    background: #0098DD; overflow: hidden; }
  .disc img { width: 100%; height: 100%; object-fit: cover; }
  .ring { position: absolute; left: 10px; top: 60px; width: 110px; height: 110px; border-radius: 50%;
    border: 16px solid #1F2340; }
  .dot { position: absolute; right: 30px; top: 70px; width: 70px; height: 70px; border-radius: 50%; background: #FFC900; }
  .half { position: absolute; right: 10px; bottom: 70px; width: 130px; height: 65px;
    border-radius: 65px 65px 0 0; background: #FF5200; }
  .tri { position: absolute; left: 20px; bottom: 50px; width: 0; height: 0; transform: rotate(-14deg);
    border-left: 40px solid transparent; border-right: 40px solid transparent; border-bottom: 70px solid #92C900; }
</style></head>
<body>
  <div class="text">
    <p class="site">cedricpontet.com</p>
    <h1>Cédric Pontet</h1>
    <p class="role">${role.join('<br>')}</p>
    <p class="topics">${topics.map((t) => t.replace(/ /g, '&nbsp;')).join(' · ')}</p>
  </div>
  <div class="art">
    <div class="disc"><img src="${portrait}" alt=""></div>
    <span class="ring"></span><span class="dot"></span><span class="half"></span><span class="tri"></span>
  </div>
</body></html>`;

mkdirSync('static/og', { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const { file, role, topics } of variants) {
  await page.setContent(html(role, topics), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: file });
}
await browser.close();
console.log('Share images written to static/og/');
