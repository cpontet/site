// Builds the public talk material from resources/Talks (private, gitignored):
// - slides: PDF (PowerPoint decks converted with LibreOffice, images downsampled) and one webp
//   per slide in static/talks/<slug>/;
// - video posters: YouTube thumbnails as 16:9 webp in static/talks/video/;
// - src/lib/content/talk-assets.json: slide count, size and PDF weight read by the talk pages.
// Needs soffice (LibreOffice), pdftoppm/pdfinfo (poppler-utils), ffmpeg and curl.
// LibreOffice substitutes missing fonts and text then overlaps: make the decks' fonts visible
// (Calibri, Segoe UI from Windows; Nunito from Google Fonts), e.g. with a FONTCONFIG_FILE that adds
// /mnt/c/Windows/Fonts under WSL.
// `bun run talks` re-renders everything; `bun run talks <slug>` only one deck.
import { execFileSync } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join } from 'node:path';
import { talks } from '../src/lib/content/talks.ts';

const SOURCE = 'resources/Talks';
const OUT = 'static/talks';
const MANIFEST = 'src/lib/content/talk-assets.json';
const SLIDE_WIDTH = 960;

// LibreOffice PDF export: 150 dpi JPEG images keep decks readable at a fraction of the weight.
const pdfExport = `pdf:impress_pdf_Export:${JSON.stringify({
  ReduceImageResolution: { type: 'boolean', value: 'true' },
  MaxImageResolution: { type: 'long', value: '150' },
  Quality: { type: 'long', value: '75' },
  UseLosslessCompression: { type: 'boolean', value: 'false' },
})}`;

const run = (cmd: string, args: string[]) => execFileSync(cmd, args, { stdio: 'pipe' });

const only = process.argv[2];
const manifest: Record<string, { pages: number; width: number; height: number; pdfBytes: number }> =
  existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {};

for (const talk of talks) {
  if (!talk.slides || (only && talk.slug !== only)) continue;
  const source = join(SOURCE, talk.slides);
  if (!existsSync(source)) throw new Error(`${talk.slug}: missing ${source}`);
  const tmp = mkdtempSync(join(tmpdir(), 'talk-'));

  let pdf = source;
  if (source.endsWith('.pptx')) {
    run('soffice', ['--headless', '--convert-to', pdfExport, '--outdir', tmp, source]);
    pdf = join(tmp, basename(source).replace(/\.pptx$/, '.pdf'));
  }

  const dir = join(OUT, talk.slug);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const pdfOut = join(OUT, `${talk.slug}.pdf`);
  copyFileSync(pdf, pdfOut);

  run('pdftoppm', [
    '-png',
    '-scale-to-x',
    String(SLIDE_WIDTH),
    '-scale-to-y',
    '-1',
    pdf,
    join(tmp, 's'),
  ]);
  const pngs = readdirSync(tmp)
    .filter((f) => f.startsWith('s-') && f.endsWith('.png'))
    .sort();
  pngs.forEach((png, i) => {
    run('ffmpeg', [
      '-loglevel',
      'error',
      '-y',
      '-i',
      join(tmp, png),
      '-quality',
      '72',
      join(dir, `${i + 1}.webp`),
    ]);
  });

  const size = run('pdfinfo', ['-f', '1', '-l', '1', pdf]).toString();
  const [, w, h] = size.match(/Page\s+1 size:\s+([\d.]+) x ([\d.]+)/) ?? [];
  manifest[talk.slug] = {
    pages: pngs.length,
    width: SLIDE_WIDTH,
    height: Math.round((SLIDE_WIDTH * Number(h)) / Number(w)),
    pdfBytes: statSync(pdfOut).size,
  };
  rmSync(tmp, { recursive: true, force: true });
  console.log(
    `${talk.slug}: ${pngs.length} slides, ${(statSync(pdfOut).size / 1e6).toFixed(1)} MB`,
  );
}

if (!only) {
  for (const slug of Object.keys(manifest)) {
    if (!talks.some((t) => t.slug === slug && t.slides)) delete manifest[slug];
  }
  // Video posters, 16:9 (old 4:3 thumbnails are letterboxed, so crop the middle).
  const ids = talks.flatMap((t) => (t.video ? [t.video.id] : []));
  mkdirSync(join(OUT, 'video'), { recursive: true });
  for (const id of ids) {
    const jpg = join(tmpdir(), `${id}.jpg`);
    try {
      run('curl', ['-sf', '-o', jpg, `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`]);
    } catch {
      run('curl', ['-sf', '-o', jpg, `https://i.ytimg.com/vi/${id}/hqdefault.jpg`]);
    }
    for (const width of [640, 1280]) {
      const vf = `crop=iw:iw*9/16,scale=${width}:${(width * 9) / 16}`;
      run('ffmpeg', [
        '-loglevel',
        'error',
        '-y',
        '-i',
        jpg,
        '-vf',
        vf,
        '-quality',
        '78',
        join(OUT, 'video', `${id}-${width}.webp`),
      ]);
    }
  }
}

writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
