/**
 * Signed confirmation tokens.
 *
 * The token carries the address itself, authenticated by an HMAC, which is what
 * lets the double opt-in flow stay stateless: nothing is written anywhere until
 * the reader clicks confirm, and the audience only ever holds confirmed people.
 *
 * Kept separate from server.mjs so the signing rules can be tested directly.
 */
import { createHmac, timingSafeEqual } from 'node:crypto';

export const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

const LANGS = new Set(['en', 'tr', 'es']);
const b64url = (value) => Buffer.from(value).toString('base64url');
const sign = (payload, secret) => createHmac('sha256', secret).update(payload).digest('base64url');

export function createToken(email, lang, secret, now = Date.now()) {
  const payload = b64url(JSON.stringify({ e: email, l: lang, x: now + TOKEN_TTL_MS }));
  return `${payload}.${sign(payload, secret)}`;
}

/** Returns {email, lang}, or null if forged, malformed, or expired. */
export function readToken(token, secret, now = Date.now()) {
  const [payload, mac] = String(token || '').split('.');
  if (!payload || !mac) return null;

  const expected = Buffer.from(sign(payload, secret));
  const given = Buffer.from(mac);
  // timingSafeEqual throws when lengths differ, so check that first.
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;

  try {
    const { e, l, x } = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (!e || typeof x !== 'number' || now > x) return null;
    return { email: e, lang: LANGS.has(l) ? l : 'en' };
  } catch {
    return null;
  }
}
