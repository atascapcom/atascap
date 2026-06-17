/**
 * Post-build: render each published letter to a print-quality PDF (Option B).
 *
 * Runs after `astro build`. Uses a locally-installed Chrome/Chromium — no npm
 * dependency. Behaviour:
 *   - No browser found (e.g. Netlify CI) → skips silently; the committed PDFs in
 *     public/pdf/ (copied into dist/ by astro build) are used as-is.
 *   - PDF already exists → skipped (no churn). Set FORCE_PDF=1 to regenerate.
 *   - Missing PDF → rendered via the site's @media print stylesheet.
 *
 * Override the browser with CHROME_PATH=/path/to/chrome.
 */
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, copyFileSync, rmSync } from 'node:fs';
import { join, extname } from 'node:path';
import { tmpdir } from 'node:os';

const DIST = 'dist';
const PUBLIC_PDF = 'public/pdf';
const DIST_PDF = join(DIST, 'pdf');
const PORT = Number(process.env.PDF_PORT || 4329);
const FORCE = process.env.FORCE_PDF === '1';

// route prefix → language (matches the letter detail routes)
const ROUTE_LANG = { letters: 'en', 'tr/mektuplar': 'tr', 'es/cartas': 'es' };

const CHROME = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].find((p) => p && existsSync(p));

// Discover published letter pages from the build output.
const targets = [];
for (const [route, lang] of Object.entries(ROUTE_LANG)) {
  const dir = join(DIST, route);
  if (!existsSync(dir)) continue;
  for (const file of readdirSync(dir)) {
    if (extname(file) !== '.html') continue;
    const slug = file.replace(/\.html$/, '');
    targets.push({ route, lang, slug, name: `${slug}-${lang}.pdf` });
  }
}

const pending = targets.filter((t) => FORCE || !existsSync(join(PUBLIC_PDF, t.name)));

if (pending.length === 0) {
  console.log('[pdf] up to date — nothing to render.');
  process.exit(0);
}

if (!CHROME) {
  console.log(
    `[pdf] ${pending.length} letter PDF(s) missing but no Chrome/Chromium found — skipping ` +
      '(set CHROME_PATH to enable). Committed PDFs are used as-is.'
  );
  process.exit(0);
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
};

const server = createServer((req, res) => {
  let path = decodeURIComponent((req.url || '/').split('?')[0]);
  if (path.endsWith('/')) path += 'index.html';
  const file = join(DIST, path);
  if (!file.startsWith(DIST) || !existsSync(file)) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.writeHead(200, {
    'content-type': MIME[extname(file)] || 'application/octet-stream',
    // Avoid HTTP keep-alive: it can keep headless Chrome from reaching
    // "network idle", so it prints the PDF but never exits.
    connection: 'close',
  });
  res.end(readFileSync(file));
});

await new Promise((resolve) => server.listen(PORT, '127.0.0.1', resolve));
mkdirSync(PUBLIC_PDF, { recursive: true });
mkdirSync(DIST_PDF, { recursive: true });

// Async spawn (not spawnSync): the in-process HTTP server must keep serving
// while Chrome fetches the page — a synchronous child would deadlock the loop.
const render = (args) =>
  new Promise((resolve) => {
    const child = spawn(CHROME, args, { stdio: 'ignore' });
    // Watchdog: headless Chrome sometimes writes the PDF but never exits.
    // The file is complete long before this fires, so killing is safe.
    const killer = setTimeout(() => {
      try {
        child.kill('SIGKILL');
      } catch {}
    }, 20000);
    child.on('exit', () => {
      clearTimeout(killer);
      resolve();
    });
    child.on('error', () => {
      clearTimeout(killer);
      resolve();
    });
  });

let ok = 0;
for (const t of pending) {
  // Unique profile PER render — a shared profile keeps a SingletonLock that
  // blocks the next Chrome launch, hanging every render after the first.
  const profile = mkdtempSync(join(tmpdir(), 'atascap-pdf-'));
  const out = join(PUBLIC_PDF, t.name);
  const url = `http://127.0.0.1:${PORT}/${t.route}/${t.slug}.html`;
  await render([
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    `--user-data-dir=${profile}`,
    '--no-pdf-header-footer',
    '--virtual-time-budget=8000',
    `--print-to-pdf=${out}`,
    url,
  ]);
  rmSync(profile, { recursive: true, force: true });
  if (existsSync(out)) {
    copyFileSync(out, join(DIST_PDF, t.name));
    ok++;
    console.log(`[pdf] rendered ${t.route}/${t.slug} → ${out}`);
  } else {
    console.warn(`[pdf] WARN: could not render ${t.route}/${t.slug} (page still works without a PDF)`);
  }
}

server.close();
console.log(`[pdf] done — ${ok}/${pending.length} rendered.`);
process.exit(0);
