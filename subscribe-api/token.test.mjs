/**
 * Token tests — run with: node --test subscribe-api/
 *
 * These cover the only security boundary in the service: a confirmation link
 * must prove the address was signed by us and is still fresh.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createToken, readToken, TOKEN_TTL_MS } from './token.mjs';

const SECRET = 'test-secret-do-not-use-in-production';

test('round-trips the address and language', () => {
  const token = createToken('reader@example.com', 'tr', SECRET);
  assert.deepEqual(readToken(token, SECRET), { email: 'reader@example.com', lang: 'tr' });
});

test('rejects a token signed with a different secret', () => {
  const token = createToken('reader@example.com', 'en', 'someone-elses-secret');
  assert.equal(readToken(token, SECRET), null);
});

test('rejects a tampered payload', () => {
  const token = createToken('reader@example.com', 'en', SECRET);
  const [, mac] = token.split('.');
  const forged = Buffer.from(JSON.stringify({ e: 'attacker@evil.com', l: 'en', x: Date.now() + 1000 })).toString('base64url');
  assert.equal(readToken(`${forged}.${mac}`, SECRET), null);
});

test('rejects an expired token', () => {
  const issued = Date.now() - TOKEN_TTL_MS - 1000;
  const token = createToken('reader@example.com', 'en', SECRET, issued);
  assert.equal(readToken(token, SECRET), null);
});

test('accepts a token that is still inside its window', () => {
  const issued = Date.now() - TOKEN_TTL_MS + 60_000;
  const token = createToken('reader@example.com', 'es', SECRET, issued);
  assert.deepEqual(readToken(token, SECRET), { email: 'reader@example.com', lang: 'es' });
});

test('rejects malformed input without throwing', () => {
  for (const bad of ['', null, undefined, 'nodot', 'a.b', '...', 'x'.repeat(500)]) {
    assert.equal(readToken(bad, SECRET), null);
  }
});

test('falls back to English for an unknown language', () => {
  const token = createToken('reader@example.com', 'de', SECRET);
  assert.equal(readToken(token, SECRET).lang, 'en');
});
