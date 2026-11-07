/**
 * Render the LinkedIn profile banner (1584×396) in the site's own palette.
 *
 * LinkedIn's default is a stock gradient, which reads as nothing at all next to
 * a site built on #f0ede5 and EB Garamond. This draws the same wordmark, rule
 * and tagline the rest of the brand uses, so the profile and atascap.com look
 * like one practice rather than two.
 *
 * Layout is centred on purpose: the desktop avatar covers the bottom-left
 * corner and mobile crops the sides, so the middle band is the only region both
 * clients show in full. Nothing meaningful is placed outside it.
 *
 * Output: public/images/social/linkedin-banner.png — committed, like the OG
 * cards, so nothing has to be re-rendered to use it. FORCE_BANNER=1 redraws.
 *
 * Uses a locally-installed Chrome, same policy as the other scripts here.
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const OUT_DIR = join('public', 'images', 'social');
const OUT = join(OUT_DIR, 'linkedin-banner.png');
const FORCE = process.env.FORCE_BANNER === '1';

const CHROME = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].find((p) => p && existsSync(p));

/** The site tagline, trimmed to its second sentence — the first names the
 *  distortions, which needs more room than a banner has. */
const TAGLINE = 'A calm mind reaches more accurate conclusions.';

function bannerHtml() {
  const fontDir = resolve('public/fonts');
  return `<!doctype html><meta charset="utf-8">
<style>
  @font-face {
    font-family: 'EB Garamond';
    src: url('file://${fontDir}/eb-garamond-400-italic-latin-ext.woff2') format('woff2');
    font-weight: 400; font-style: italic;
  }
  @font-face {
    font-family: 'Inter';
    src: url('file://${fontDir}/inter-600-normal-latin-ext.woff2') format('woff2');
    font-weight: 600;
  }
  @font-face {
    font-family: 'Inter';
    src: url('file://${fontDir}/inter-400-normal-latin-ext.woff2') format('woff2');
    font-weight: 400;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1584px; height: 396px; background: #f0ede5;
    display: flex; align-items: center; justify-content: center;
    position: relative;
  }
  .block { text-align: center; }
  .brand {
    font-family: 'Inter', Helvetica, sans-serif;
    font-size: 38px; font-weight: 600; letter-spacing: 9px;
    color: #1a1a1a;
  }
  .rule { width: 72px; height: 1px; background: #b8952a; margin: 26px auto; }
  .tagline {
    font-family: 'EB Garamond', Georgia, serif;
    font-size: 36px; font-style: italic; font-weight: 400;
    color: #4a4740; letter-spacing: 0.2px;
  }
  .url {
    position: absolute; right: 56px; bottom: 40px;
    font-family: 'Inter', Helvetica, sans-serif;
    font-size: 17px; font-weight: 400; letter-spacing: 2.5px;
    color: #8a8578;
  }
  .edge { position: absolute; left: 0; right: 0; bottom: 0; height: 3px; background: #b8952a; }
</style>
<div class="block">
  <p class="brand">ATAŞ CAPITAL</p>
  <div class="rule"></div>
  <p class="tagline">${TAGLINE}</p>
</div>
<p class="url">ATASCAP.COM</p>
<div class="edge"></div>`;
}

/** Chrome often writes the screenshot but never exits; kill it once it has. */
function render(html, outPath, work) {
  return new Promise((resolve_, reject) => {
    const htmlPath = join(work, 'banner.html');
    writeFileSync(htmlPath, html);
    const profile = mkdtempSync(join(work, 'p-'));
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
        '--window-size=1584,396',
        `--screenshot=${outPath}`,
        `file://${htmlPath}`,
      ],
      { stdio: 'ignore' }
    );
    const killer = setTimeout(() => {
      try { child.kill('SIGKILL'); } catch {}
    }, 20000);
    child.on('exit', () => {
      clearTimeout(killer);
      existsSync(outPath) ? resolve_() : reject(new Error('no screenshot written'));
    });
    child.on('error', (err) => { clearTimeout(killer); reject(err); });
  });
}

if (!FORCE && existsSync(OUT)) {
  console.log('[banner] already drawn — FORCE_BANNER=1 to redraw.');
  process.exit(0);
}
if (!CHROME) {
  console.error('[banner] no local Chrome found; set CHROME_PATH.');
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });
const work = mkdtempSync(join(tmpdir(), 'atascap-banner-'));
try {
  await render(bannerHtml(), OUT, work);
  console.log(`[banner] wrote ${OUT}`);
} finally {
  rmSync(work, { recursive: true, force: true });
}
