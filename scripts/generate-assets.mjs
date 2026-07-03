/**
 * Generate raster assets from source SVGs, so social cards and legacy/iOS icons
 * work everywhere (SVG-only favicons and SVG OG images are not rendered by
 * X/WhatsApp/older browsers/iOS).
 *
 * Outputs (committed to the repo, served as-is on CI):
 *   public/og-image.png        1200×630  ← public/og-image.svg
 *   public/apple-touch-icon.png 180×180  ← inline full-bleed mark
 *   public/favicon.ico          32×32    ← public/favicon.svg (PNG wrapped in ICO)
 *
 * Uses a locally-installed Chrome/Chromium (no npm dependency), same policy as
 * scripts/generate-pdfs.mjs. Run with `npm run assets`. Skips gracefully when no
 * browser is found (CI keeps the committed files).
 *
 * Override the browser with CHROME_PATH=/path/to/chrome.
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const PUBLIC = 'public';

const CHROME = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].find((p) => p && existsSync(p));

if (!CHROME) {
  console.log('[assets] no Chrome/Chromium found — skipping (committed assets are used as-is).');
  process.exit(0);
}

const APPLE_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#faf9f5"/>
  <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle"
    font-family="Georgia, serif" font-size="108" font-weight="600" fill="#b8952a">A</text>
</svg>`;

/** Wrap an inline SVG in a full-viewport HTML page for pixel-exact screenshots. */
function pageHtml(svg) {
  return `<!doctype html><meta charset="utf-8">
<style>html,body{margin:0;padding:0}svg{display:block;width:100vw;height:100vh}</style>
${svg}`;
}

/**
 * Render an SVG string to a PNG file at exactly w×h via headless Chrome.
 *
 * Uses async spawn + a watchdog that SIGKILLs Chrome: headless Chrome often
 * writes the screenshot but never exits, which would hang a synchronous call
 * (same lesson as scripts/generate-pdfs.mjs). The file is complete before the
 * kill fires, so we resolve on any exit as long as the output exists. A fresh
 * profile per render avoids a shared SingletonLock stalling the next launch.
 */
function renderPng(svg, width, height, outPath, work, tag) {
  return new Promise((resolve, reject) => {
    const htmlPath = join(work, `page-${tag}.html`);
    writeFileSync(htmlPath, pageHtml(svg));
    const profile = mkdtempSync(join(work, `profile-${tag}-`));
    rmSync(outPath, { force: true });
    const child = spawn(
      CHROME,
      [
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        '--hide-scrollbars',
        '--force-device-scale-factor=1',
        '--default-background-color=00000000',
        `--user-data-dir=${profile}`,
        '--virtual-time-budget=5000',
        `--window-size=${width},${height}`,
        `--screenshot=${outPath}`,
        `file://${htmlPath}`,
      ],
      { stdio: 'ignore' }
    );
    const killer = setTimeout(() => {
      try {
        child.kill('SIGKILL');
      } catch {}
    }, 15000);
    child.on('exit', () => {
      clearTimeout(killer);
      existsSync(outPath)
        ? resolve()
        : reject(new Error(`Chrome produced no screenshot for ${outPath}`));
    });
    child.on('error', (err) => {
      clearTimeout(killer);
      reject(err);
    });
  });
}

/** Wrap a PNG buffer in a single-image .ico container (PNG-in-ICO, modern browsers). */
function pngToIco(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 = 256)
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2); // palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8); // image size
  entry.writeUInt32LE(22, 12); // offset (6 + 16)
  return Buffer.concat([header, entry, png]);
}

const work = mkdtempSync(join(tmpdir(), 'atascap-assets-'));
try {
  // 1. OG image (1200×630) from the source SVG.
  const ogSvg = readFileSync(join(PUBLIC, 'og-image.svg'), 'utf8');
  await renderPng(ogSvg, 1200, 630, join(PUBLIC, 'og-image.png'), work, 'og');
  console.log('[assets] wrote public/og-image.png (1200×630)');

  // 2. Apple touch icon (180×180), full-bleed for iOS home screen.
  await renderPng(APPLE_ICON_SVG, 180, 180, join(PUBLIC, 'apple-touch-icon.png'), work, 'apple');
  console.log('[assets] wrote public/apple-touch-icon.png (180×180)');

  // 3. favicon.ico (32×32) from the source SVG.
  const faviconSvg = readFileSync(join(PUBLIC, 'favicon.svg'), 'utf8');
  const icoPngPath = join(work, 'favicon-32.png');
  await renderPng(faviconSvg, 32, 32, icoPngPath, work, 'favicon');
  writeFileSync(join(PUBLIC, 'favicon.ico'), pngToIco(readFileSync(icoPngPath), 32));
  console.log('[assets] wrote public/favicon.ico (32×32)');
} finally {
  rmSync(work, { recursive: true, force: true });
}
