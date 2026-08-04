/**
 * Render a social share card (1200×630) for each published note.
 *
 * Without these, every link shared on X or LinkedIn shows the same generic site
 * card. Since notes go out roughly monthly, the cards are generated rather than
 * drawn by hand: title, section label and the piece's own illustration, set in
 * the site's typeface and palette.
 *
 * Output: public/images/og/<slug>.png — committed, so CI needs no browser.
 * Existing cards are left alone; FORCE_OG=1 regenerates them.
 *
 * Uses a locally-installed Chrome, same policy as the other scripts here.
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const NOTES_DIR = 'src/content/notes';
const OUT_DIR = join('public', 'images', 'og');
const FORCE = process.env.FORCE_OG === '1';

const CHROME = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].find((p) => p && existsSync(p));

/** Section label, matching the nav in each language. */
const SECTION = { en: 'Reasoning', tr: 'Çıkarımlar', es: 'Razonamiento' };

/** Minimal frontmatter reader — enough for the handful of fields used here. */
function readFrontmatter(file) {
  const raw = readFileSync(file, 'utf8');
  const block = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!block) return null;
  const data = {};
  for (const line of block[1].split(/\r?\n/)) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (m) data[m[1]] = m[2].trim().replace(/^["'](.*)["']$/, '$1');
  }
  return data;
}

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function cardHtml({ title, lang, cover }) {
  const fontDir = resolve('public/fonts');
  const coverPath = cover ? resolve('public' + cover) : null;
  // Long titles need to step down a size or they overflow the panel.
  const titleSize = title.length > 42 ? 64 : title.length > 30 ? 76 : 88;

  return `<!doctype html><meta charset="utf-8">
<style>
  @font-face {
    font-family: 'EB Garamond';
    src: url('file://${fontDir}/eb-garamond-400-normal-latin-ext.woff2') format('woff2');
    font-weight: 400;
  }
  @font-face {
    font-family: 'Inter';
    src: url('file://${fontDir}/inter-600-normal-latin-ext.woff2') format('woff2');
    font-weight: 600;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #faf9f5; display: flex; }
  .left {
    flex: 1 1 58%;
    padding: 64px 48px 64px 72px;
    display: flex;
    flex-direction: column;
  }
  .brand {
    font-family: 'Inter', Helvetica, sans-serif;
    font-size: 19px; font-weight: 600; letter-spacing: 3.5px;
    color: #1a1a1a;
  }
  .label {
    font-family: 'Inter', Helvetica, sans-serif;
    font-size: 15px; font-weight: 600; letter-spacing: 2.5px;
    text-transform: uppercase; color: #b8952a;
    margin-top: 56px;
  }
  .rule { width: 64px; height: 1px; background: #b8952a; margin: 18px 0 26px; }
  h1 {
    font-family: 'EB Garamond', Georgia, serif;
    font-size: ${titleSize}px; font-weight: 400; line-height: 1.14;
    color: #1a1a1a; letter-spacing: -0.4px;
  }
  .url {
    font-family: 'Inter', Helvetica, sans-serif;
    font-size: 16px; letter-spacing: 2px; color: #8a8578;
    margin-top: auto;
  }
  .right {
    flex: 1 1 42%;
    background: #f0ede5;
    display: flex; align-items: center; justify-content: center;
    border-left: 1px solid #e5e0d5;
  }
  .right img { width: 100%; height: auto; }
  .right.empty { background: #f0ede5; }
</style>
<div class="left">
  <p class="brand">ATAŞ CAPITAL</p>
  <p class="label">${escapeHtml(SECTION[lang] ?? SECTION.en)}</p>
  <div class="rule"></div>
  <h1>${escapeHtml(title)}</h1>
  <p class="url">ATASCAP.COM</p>
</div>
<div class="right${coverPath ? '' : ' empty'}">
  ${coverPath ? `<img src="file://${coverPath}">` : ''}
</div>`;
}

/** Chrome often writes the screenshot but never exits; kill it once the file exists. */
function render(html, outPath, work, tag) {
  return new Promise((resolve_, reject) => {
    const htmlPath = join(work, `${tag}.html`);
    writeFileSync(htmlPath, html);
    const profile = mkdtempSync(join(work, `p-${tag}-`));
    rmSync(outPath, { force: true });
    const child = spawn(
      CHROME,
      [
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        '--hide-scrollbars',
        '--force-device-scale-factor=1',
        `--user-data-dir=${profile}`,
        '--virtual-time-budget=5000',
        '--window-size=1200,630',
        `--screenshot=${outPath}`,
        `file://${htmlPath}`,
      ],
      { stdio: 'ignore' }
    );
    const killer = setTimeout(() => {
      try {
        child.kill('SIGKILL');
      } catch {}
    }, 20000);
    child.on('exit', () => {
      clearTimeout(killer);
      existsSync(outPath) ? resolve_() : reject(new Error(`no screenshot for ${outPath}`));
    });
    child.on('error', (err) => {
      clearTimeout(killer);
      reject(err);
    });
  });
}

const notes = readdirSync(NOTES_DIR)
  .filter((f) => f.endsWith('.md'))
  .map((f) => ({ file: join(NOTES_DIR, f), slug: f.replace(/\.md$/, '') }))
  .map((n) => ({ ...n, data: readFrontmatter(n.file) }))
  .filter((n) => n.data && n.data.draft !== 'true');

function slugOf(note) {
  return note.slug.replace(/-(en|tr|es)$/, '');
}

const pending = notes.filter((n) => FORCE || !existsSync(join(OUT_DIR, `${slugOf(n)}.png`)));

if (pending.length === 0) {
  console.log('[og] up to date — nothing to render.');
  process.exit(0);
}

if (!CHROME) {
  console.log(`[og] ${pending.length} card(s) missing but no Chrome found — skipping (committed cards are used as-is).`);
  process.exit(0);
}

mkdirSync(OUT_DIR, { recursive: true });
const work = mkdtempSync(join(tmpdir(), 'atascap-og-'));
try {
  for (const note of pending) {
    const out = join(OUT_DIR, `${slugOf(note)}.png`);
    await render(
      cardHtml({ title: note.data.title, lang: note.data.lang, cover: note.data.cover }),
      out,
      work,
      slugOf(note)
    );
    console.log(`[og] ${out}`);
  }
  console.log(`[og] done — ${pending.length} card(s).`);
} finally {
  rmSync(work, { recursive: true, force: true });
}
