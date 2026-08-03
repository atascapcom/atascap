/**
 * Ataş Capital — newsletter subscribe endpoint.
 *
 * The site is static (GitHub Pages) and cannot hold the Resend API key, so this
 * tiny service sits in front of Resend and owns the double opt-in flow:
 *
 *   POST /subscribe   form post from the site
 *                     → validate, sign a token, email a confirmation link
 *                     → 303 back to the site's "check your inbox" page
 *   GET  /confirm     link from that email
 *                     → verify signature + expiry, add contact to the Resend
 *                       audience, 303 to the site's "confirmed" page
 *   GET  /health      liveness probe
 *
 * The token is an HMAC of the address itself, so nothing needs storing between
 * the two steps — no database, and the audience only ever holds confirmed
 * addresses. Zero npm dependencies: Node's own crypto/http plus global fetch.
 */
import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { createToken, readToken } from './token.mjs';

const PORT = Number(process.env.PORT || 3010);
// Inside a container this must be 0.0.0.0, or Docker's port forwarding cannot
// reach the process. Public exposure is prevented on the host side instead, by
// publishing the port as 127.0.0.1:3010 so only the OpenLiteSpeed vhost can
// reach it. Set HOST=127.0.0.1 when running directly on a machine.
const HOST = process.env.HOST || '0.0.0.0';
const {
  RESEND_API_KEY,
  RESEND_AUDIENCE_ID,
  TOKEN_SECRET,
  FROM_EMAIL,
  SITE_ORIGIN = 'https://atascap.com',
  PUBLIC_ORIGIN = 'https://api.atascap.com',
  // A monitored address readers can actually reply to. Mail from a domain that
  // accepts no reply looks disposable to spam filters, so this is both courtesy
  // and deliverability.
  REPLY_TO = 'askin@atascap.com',
} = process.env;

// Fail fast and loudly: a missing secret must never degrade into silently
// dropping signups.
for (const [name, value] of Object.entries({
  RESEND_API_KEY,
  RESEND_AUDIENCE_ID,
  TOKEN_SECRET,
  FROM_EMAIL,
})) {
  if (!value) {
    console.error(`[fatal] missing required env var: ${name}`);
    process.exit(1);
  }
}

const LANGS = new Set(['en', 'tr', 'es']);
const MAX_BODY_BYTES = 4 * 1024;

/** Where the visitor lands after each step, per language. */
const LANDING = {
  pending: { en: '/subscribe-pending.html', tr: '/tr/kayit-bekliyor.html', es: '/es/suscripcion-pendiente.html' },
  confirmed: { en: '/subscribe-confirmed.html', tr: '/tr/kayit-onaylandi.html', es: '/es/suscripcion-confirmada.html' },
  error: { en: '/subscribe-error.html', tr: '/tr/kayit-hata.html', es: '/es/suscripcion-error.html' },
};

const CONFIRM_EMAIL = {
  en: {
    subject: 'Confirm your subscription — Ataş Capital',
    heading: 'One last step',
    body: 'Please confirm that you would like to receive our investor letters and occasional notes. Nothing will be sent until you do.',
    cta: 'Confirm subscription',
    ignore: 'If you did not request this, simply ignore this email — no list was joined.',
    fallback: 'If the button does not work, copy this link into your browser:',
  },
  tr: {
    subject: 'Aboneliğinizi onaylayın — Ataş Capital',
    heading: 'Son bir adım',
    body: 'Yatırımcı mektuplarımızı ve ara yazılarımızı almak istediğinizi onaylayın. Onaylamadan hiçbir gönderim yapılmayacak.',
    cta: 'Aboneliği onayla',
    ignore: 'Bu isteği siz yapmadıysanız bu e-postayı yok sayın — hiçbir listeye eklenmediniz.',
    fallback: 'Düğme çalışmazsa bu bağlantıyı tarayıcınıza kopyalayın:',
  },
  es: {
    subject: 'Confirme su suscripción — Ataş Capital',
    heading: 'Un último paso',
    body: 'Confirme que desea recibir nuestras cartas a los inversores y notas ocasionales. No se enviará nada hasta que lo haga.',
    cta: 'Confirmar suscripción',
    ignore: 'Si no solicitó esto, ignore este correo — no se ha unido a ninguna lista.',
    fallback: 'Si el botón no funciona, copie este enlace en su navegador:',
  },
};

// Deliberately conservative: one address, one @, no spaces, a real TLD.
const EMAIL_RE = /^[^\s@,;]+@[^\s@,;.]+(\.[^\s@,;.]+)+$/;
const isEmail = (value) => typeof value === 'string' && value.length <= 254 && EMAIL_RE.test(value);

/** Crude per-IP throttle. Enough for a letter list; not a WAF. */
const hits = new Map();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // bounded memory; a reset only forgives
  return recent.length > RATE_LIMIT;
}

async function resend(path, body) {
  const res = await fetch(`https://api.resend.com${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': randomUUID(),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`resend ${path} → ${res.status} ${detail.slice(0, 300)}`);
  }
  return res.json().catch(() => ({}));
}

function confirmationHtml(lang, link) {
  const t = CONFIRM_EMAIL[lang] ?? CONFIRM_EMAIL.en;
  return `<!doctype html><html lang="${lang}"><body style="margin:0;padding:32px;background:#faf9f5;font-family:Georgia,'Times New Roman',serif;color:#1a1a1a">
<div style="max-width:520px;margin:0 auto">
<p style="font-family:Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#6b6b6b;margin:0 0 32px">ATAŞ CAPITAL</p>
<h1 style="font-size:24px;font-weight:400;margin:0 0 16px">${t.heading}</h1>
<p style="font-size:16px;line-height:1.7;margin:0 0 28px">${t.body}</p>
<p style="margin:0 0 28px"><a href="${link}" style="display:inline-block;padding:12px 28px;background:#1a1a1a;color:#faf9f5;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase">${t.cta}</a></p>
<p style="font-size:13px;line-height:1.6;color:#6b6b6b;margin:0 0 8px">${t.ignore}</p>
<p style="font-size:13px;line-height:1.6;color:#6b6b6b;margin:0 0 24px">${t.fallback}</p>
<p style="font-size:12px;color:#999;margin:0;word-break:break-all">${link}</p>
<p style="font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:#999;margin:32px 0 0;border-top:1px solid #e5e0d5;padding-top:16px">Ataş Capital · Calle Alcalá 124, Madrid · <a href="${SITE_ORIGIN}" style="color:#999">atascap.com</a></p>
</div></body></html>`;
}

/**
 * Plain-text alternative. Sending HTML alone is a long-standing spam signal, and
 * some readers prefer text anyway — so every message goes out as both.
 */
function confirmationText(lang, link) {
  const t = CONFIRM_EMAIL[lang] ?? CONFIRM_EMAIL.en;
  return [
    'ATAŞ CAPITAL',
    '',
    t.heading,
    '',
    t.body,
    '',
    `${t.cta}:`,
    link,
    '',
    t.ignore,
    '',
    '—',
    'Ataş Capital · Calle Alcalá 124, Madrid',
    SITE_ORIGIN,
  ].join('\n');
}

const redirect = (res, url) => {
  res.writeHead(303, { Location: url, 'Cache-Control': 'no-store' });
  res.end();
};

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error('body too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString()));
    req.on('error', reject);
  });
}

async function handleSubscribe(req, res, ip) {
  const params = new URLSearchParams(await readBody(req));
  const email = (params.get('email') || '').trim().toLowerCase();
  const lang = LANGS.has(params.get('tag')) ? params.get('tag') : 'en';

  // Honeypot: answer exactly like the success path so bots learn nothing.
  if ((params.get('website') || '') !== '') {
    console.log(`[subscribe] honeypot rejected (${ip})`);
    return redirect(res, SITE_ORIGIN + LANDING.pending[lang]);
  }

  if (!isEmail(email)) return redirect(res, SITE_ORIGIN + LANDING.error[lang]);
  if (rateLimited(ip)) {
    console.warn(`[subscribe] rate limited ${ip}`);
    return redirect(res, SITE_ORIGIN + LANDING.error[lang]);
  }

  const link = `${PUBLIC_ORIGIN}/confirm?token=${encodeURIComponent(createToken(email, lang, TOKEN_SECRET))}`;
  await resend('/emails', {
    from: FROM_EMAIL,
    to: email,
    subject: (CONFIRM_EMAIL[lang] ?? CONFIRM_EMAIL.en).subject,
    html: confirmationHtml(lang, link),
    text: confirmationText(lang, link),
    reply_to: REPLY_TO,
  });

  console.log(`[subscribe] confirmation sent (${lang})`);
  redirect(res, SITE_ORIGIN + LANDING.pending[lang]);
}

async function handleConfirm(req, res, url) {
  const claim = readToken(url.searchParams.get('token'), TOKEN_SECRET);
  if (!claim) return redirect(res, SITE_ORIGIN + LANDING.error.en);

  try {
    await resend(`/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
      email: claim.email,
      unsubscribed: false,
    });
  } catch (error) {
    // A repeat click on an existing contact is a success from the reader's
    // point of view; anything else is a real failure worth surfacing.
    const alreadyThere = /already|exists|conflict/i.test(String(error.message));
    if (!alreadyThere) throw error;
  }

  console.log(`[confirm] subscribed (${claim.lang})`);
  redirect(res, SITE_ORIGIN + LANDING.confirmed[claim.lang]);
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, PUBLIC_ORIGIN);
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || 'unknown';

  try {
    if (req.method === 'GET' && url.pathname === '/health') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      return res.end('ok');
    }
    if (req.method === 'POST' && url.pathname === '/subscribe') return await handleSubscribe(req, res, ip);
    if (req.method === 'GET' && url.pathname === '/confirm') return await handleConfirm(req, res, url);

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('not found');
  } catch (error) {
    console.error('[error]', error.message);
    if (!res.headersSent) redirect(res, SITE_ORIGIN + LANDING.error.en);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`[ready] subscribe-api on ${HOST}:${PORT}`);
});

for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
