/**
 * Self-host the Google Fonts used by the site (GDPR: no fonts.gstatic.com
 * request from EU visitors; perf: one fewer third-party origin, preloadable).
 *
 * Fetches the Google Fonts CSS with a modern-Chrome UA (so woff2 is served),
 * downloads every subset (incl. latin-ext for Turkish ş/ğ/İ and Spanish ñ/á),
 * rewrites the URLs to /fonts/*.woff2, and writes public/fonts.css.
 *
 * Run once with `npm run fonts`; commit public/fonts/ + public/fonts.css.
 * CI needs no network — the committed files are served as-is.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const CSS_URL =
  'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap';
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const FONTS_DIR = join('public', 'fonts');
mkdirSync(FONTS_DIR, { recursive: true });

const cssRes = await fetch(CSS_URL, { headers: { 'User-Agent': UA } });
if (!cssRes.ok) throw new Error(`Google Fonts CSS fetch failed: ${cssRes.status}`);
let css = await cssRes.text();

// Only latin + latin-ext are needed for EN/ES/TR (latin-ext covers ş ğ İ ı ç ñ á…).
// Google also serves cyrillic/greek/vietnamese subsets; drop them to keep the repo lean.
const KEEP = new Set(['latin', 'latin-ext']);

// Each block: /* subset */ @font-face { font-family:'X'; font-style:S; font-weight:W; src: url(URL) ...; }
const blockRe = /\/\*\s*([^*]+?)\s*\*\/\s*@font-face\s*\{([^}]+)\}/g;
const outBlocks = [];
const seen = new Set();
for (const [full, subsetRaw, body] of css.matchAll(blockRe)) {
  const subset = subsetRaw.replace(/\s+/g, '-');
  if (!KEEP.has(subset)) continue;
  const family = (body.match(/font-family:\s*'([^']+)'/) || [])[1];
  const style = (body.match(/font-style:\s*(\w+)/) || [])[1];
  const weight = (body.match(/font-weight:\s*(\d+)/) || [])[1];
  const url = (body.match(/src:\s*url\(([^)]+)\)/) || [])[1];
  if (!family || !url) continue;
  const slug = family.toLowerCase().replace(/\s+/g, '-');
  const name = `${slug}-${weight}-${style}-${subset}.woff2`;
  if (!seen.has(name)) {
    seen.add(name);
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`font download failed (${res.status}): ${url}`);
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(join(FONTS_DIR, name), buf);
    console.log(`[fonts] ${name} (${(buf.length / 1024).toFixed(1)} KB)`);
  }
  outBlocks.push(full.replace(url, `/fonts/${name}`));
}

writeFileSync(join('public', 'fonts.css'), outBlocks.join('\n') + '\n');
console.log(`[fonts] wrote public/fonts.css — ${seen.size} files, ${outBlocks.length} @font-face rules`);
