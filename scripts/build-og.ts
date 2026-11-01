// Renders the 1200×630 Open Graph share images to static/og/:
// - default-{en,fr}.png, used by every page except blog posts;
// - blog/<lang>/<slug>.png, one per post (drafts included, so the card is ready on publish day),
//   plus src/lib/content/og-posts.json: a hash of the title each card was rendered with. A post whose title
//   no longer matches falls back to the default image until `bun run og` is run again.
// Needs a Playwright Chromium: `bunx playwright-core install chromium` if missing.
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright-core';
import { titleHash } from '../src/lib/seo.ts';

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
    topics: ['Sovereignty & resilience', 'Agentic AI', 'DDD & EventStorming', 'Facilitation'],
  },
  {
    file: 'static/og/default-fr.png',
    role: ['CTO freelance &', 'architecte cloud'],
    topics: ['Souveraineté & résilience', 'IA agentique', 'DDD & EventStorming', 'Facilitation'],
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

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Blog post card: same mint and game pieces as the post hero, title first, byline at the bottom.
const postHtml = (title: string, lang: 'en' | 'fr') => `<!doctype html>
<html lang="${lang}"><head><style>
  @font-face { font-family: Bricolage; src: url(${display}); font-weight: 200 800; }
  @font-face { font-family: Atkinson; src: url(${body}); font-weight: 700; }
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; background: #E2F4EA; color: #1F2340; font-family: Atkinson;
    padding: 72px 80px; overflow: hidden; position: relative; display: flex; flex-direction: column; }
  .site { font-size: 26px; color: #006C9F; position: relative; }
  .title { flex: 1; min-height: 0; margin: 28px 0; display: flex; align-items: center; width: 900px;
    position: relative; }
  h1 { font-family: Bricolage; font-weight: 800; font-size: 84px; line-height: 1.04;
    letter-spacing: -0.03em; text-wrap: balance; }
  .byline { display: flex; align-items: center; gap: 22px; position: relative; }
  .avatar { width: 92px; height: 92px; border-radius: 50%; background: #0098DD; overflow: hidden; }
  .avatar img { width: 100%; height: 100%; object-fit: cover; }
  .name { font-family: Bricolage; font-weight: 800; font-size: 34px; letter-spacing: -0.02em; }
  .role { font-size: 24px; color: #4B4F66; }
  .half { position: absolute; right: 60px; bottom: -150px; width: 300px; height: 300px;
    border-radius: 50%; background: #FF5200; clip-path: inset(0 0 50% 0); }
  .dot { position: absolute; right: 250px; top: 64px; width: 44px; height: 44px; border-radius: 50%;
    background: #FFC900; }
  .ring { position: absolute; right: 70px; top: 56px; width: 110px; height: 110px; border-radius: 50%;
    border: 18px solid #1F2340; }
</style></head>
<body>
  <span class="half"></span><span class="dot"></span><span class="ring"></span>
  <p class="site">cedricpontet.com · Blog</p>
  <div class="title"><h1>${escapeHtml(title)}</h1></div>
  <div class="byline">
    <div class="avatar"><img src="${portrait}" alt=""></div>
    <div><p class="name">Cédric Pontet</p><p class="role">${variants[lang === 'fr' ? 1 : 0].role.join(' ')}</p></div>
  </div>
</body></html>`;

const posts = (['en', 'fr'] as const).flatMap((lang) =>
  readdirSync(`src/content/blog/${lang}`)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const source = readFileSync(`src/content/blog/${lang}/${file}`, 'utf8');
      const front = Bun.YAML.parse(source.split(/^---$/m)[1]) as { title: string };
      return { lang, slug: file.replace(/\.md$/, ''), title: front.title };
    }),
);

mkdirSync('static/og/blog/en', { recursive: true });
mkdirSync('static/og/blog/fr', { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const { file, role, topics } of variants) {
  await page.setContent(html(role, topics), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: file });
}

const rendered: Record<string, string> = {};
for (const { lang, slug, title } of posts) {
  await page.setContent(postHtml(title, lang), { waitUntil: 'load' });
  await page.evaluate(async () => {
    await document.fonts.ready;
    // Shrink long titles until they fit their box.
    const box = document.querySelector<HTMLElement>('.title');
    const h1 = document.querySelector<HTMLElement>('h1');
    if (!box || !h1) return;
    for (let size = 84; size > 48 && h1.scrollHeight > box.clientHeight; size -= 4) {
      h1.style.fontSize = `${size - 4}px`;
    }
  });
  await page.screenshot({ path: `static/og/blog/${lang}/${slug}.png` });
  rendered[`${lang}/${slug}`] = titleHash(title);
}
await browser.close();
writeFileSync('src/lib/content/og-posts.json', `${JSON.stringify(rendered, null, 2)}\n`);
console.log(`Share images written to static/og/ (${posts.length} posts)`);
