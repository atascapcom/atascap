# subscribe-api

Newsletter signup endpoint for atascap.com. The site is static (GitHub Pages) and
cannot hold the Resend API key, so this service sits in front of Resend and owns
the double opt-in flow.

```
POST /subscribe   form post from the site → emails a signed confirmation link
GET  /confirm     that link → adds the contact to the Resend audience
GET  /health      liveness probe
```

No database: the confirmation link is an HMAC of the address itself, so the
audience only ever contains confirmed addresses. No npm dependencies either —
only Node built-ins.

## Local

```bash
npm test    # token signing/expiry/tampering tests (from the repo root)
```

```bash
cd subscribe-api && cp .env.example .env   # fill it in, then:
set -a && source .env && set +a && node server.mjs
```

## Deployment status (31 July 2026)

The box is AlmaLinux 9 + CyberPanel/OpenLiteSpeed with Docker, shared with
several unrelated production sites. Everything here is additive and none of
those sites were touched (all verified responding afterwards).

**Done:**

- DNS — `api.atascap.com` → `147.93.121.36`. atascap.com is now on Hostinger
  DNS, so records are managed through the Hostinger MCP. The GitHub Pages A
  records, `www` CNAME and ImprovMX MX/SPF records were all preserved.
- CyberPanel website `api.atascap.com` with a Let's Encrypt certificate.
- vhost rewritten as a proxy to `127.0.0.1:3010`, keeping the ACME challenge
  context so renewals keep working. Backup alongside it as `vhost.conf.bak-*`.
- Image built on the server; the code lives in `/root/atascap-subscribe-api`.
- `/root/atascap-subscribe-api/.env` created (mode 600) with a generated
  `TOKEN_SECRET`. Verified over HTTPS: `/health` returns 200, the honeypot and
  forged-token paths redirect correctly, and port 3010 is unreachable from the
  public internet.

**Remaining — needs a Resend account:**

1. Verify the sending subdomain `news.atascap.com` in Resend, then add the
   DKIM/SPF records it gives you (plus a DMARC record) to Hostinger DNS. Use the
   subdomain so the root domain's ImprovMX SPF record stays untouched.
2. Create an audience.
3. Put the API key and audience ID into `/root/atascap-subscribe-api/.env`.
4. Start the service:

```bash
docker run -d --name atascap-subscribe-api --restart unless-stopped --env-file /root/atascap-subscribe-api/.env -p 127.0.0.1:3010:3010 atascap-subscribe-api
```

5. Switch the site on: set `NEWSLETTER.endpoint` in `src/data/site.ts` to
   `https://api.atascap.com/subscribe`, then commit and push. That single line
   renders the form in all three languages and publishes the matching newsletter
   paragraphs in the privacy pages.

Port 3010 was chosen because 3000, 3002, 8082, 8085, 8000, 5432 and 6543 are
already taken here — check `ss -tlnp` before changing it. Publishing the port as
`127.0.0.1:3010` is what keeps the service off the public internet; the process
itself listens on `0.0.0.0` inside the container, which is required for Docker's
port forwarding to reach it.

## Redeploying after a code change

```bash
scp subscribe-api/{server.mjs,token.mjs,Dockerfile} atascap:/root/atascap-subscribe-api/
```

```bash
ssh atascap 'cd /root/atascap-subscribe-api && docker build -t atascap-subscribe-api . && docker restart atascap-subscribe-api'
```

## Verifying

```bash
curl -s https://api.atascap.com/health
```

Then subscribe with a real address and confirm the email arrives, the link
works, and the contact appears in the Resend audience. Logs:

```bash
docker logs -f atascap-subscribe-api
```

## Deliverability

The confirmation mail is transactional, but spam filters do not care about that
distinction. What is already in place: DKIM, SPF and DMARC on
`news.atascap.com` (all verified), a plain-text alternative alongside the HTML —
HTML-only mail is a long-standing spam signal — a postal address in the footer,
and a `Reply-To` pointing at a monitored mailbox.

The dominant remaining factor is reputation: the sending domain is new and has
no history, so early messages may land in junk regardless. It improves as
recipients open, click and reply. Apple/iCloud is the strictest of the large
providers and the slowest to warm up.

Worth doing if junk placement persists:

- Add `news.atascap.com` to ImprovMX and give it MX records, so the From domain
  can receive mail rather than only claim to.
- Once DMARC reports show only legitimate sources, tighten
  `_dmarc.news.atascap.com` from `p=none` to `p=quarantine`.
- Keep sending consistently. A dormant domain that suddenly sends looks worse
  than one that sends a little, regularly.

## Secrets

`.env` lives only on the server and is gitignored. This repo is public — never
commit a filled-in copy. See `.env.example` for the required values.
