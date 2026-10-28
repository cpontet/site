// Rasterises static/favicon.svg into the PNG/ICO icons browsers and devices still ask for.
import { execFileSync } from 'node:child_process';
import { readFileSync, rmSync } from 'node:fs';
import { chromium } from 'playwright-core';

const svg = readFileSync('static/favicon.svg', 'utf8');
const targets = [
  { file: 'static/icon-192.png', size: 192, background: null },
  { file: 'static/icon-512.png', size: 512, background: null },
  // iOS fills transparency with black: use an opaque background with some padding.
  { file: 'static/apple-touch-icon.png', size: 180, background: '#ffffff', padding: 0.12 },
  { file: 'static/favicon-32.png', size: 32, background: null },
];

const browser = await chromium.launch();
const page = await browser.newPage();
for (const { file, size, background, padding = 0 } of targets) {
  const inner = Math.round(size * (1 - 2 * padding));
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    `<html><body style="margin:0;width:${size}px;height:${size}px;display:grid;place-items:center;background:${background ?? 'transparent'}">
      <div style="width:${inner}px;height:${inner}px">${svg.replace('<svg ', '<svg width="100%" height="100%" ')}</div>
    </body></html>`,
  );
  await page.screenshot({ path: file, omitBackground: background === null });
}
await browser.close();

// favicon.ico for legacy clients, from the 32px PNG.
execFileSync('ffmpeg', [
  '-loglevel',
  'error',
  '-y',
  '-i',
  'static/favicon-32.png',
  'static/favicon.ico',
]);
rmSync('static/favicon-32.png');
console.log('Icons written to static/');
