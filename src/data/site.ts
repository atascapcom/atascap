/**
 * Newsletter (see ROADMAP.md Faz 1). Content stays canonical on atascap.com;
 * email is only the delivery channel. Resend holds the confirmed list, fronted
 * by our own subscribe service (subscribe-api/) which owns the double opt-in —
 * a static site cannot hold the Resend API key.
 *
 * While `endpoint` is empty the subscribe form and the newsletter paragraphs in
 * the privacy pages are not rendered at all, so the site can never ship a form
 * that posts nowhere, nor a disclosure for data it does not collect.
 *
 * To activate, once subscribe-api is deployed:
 *   endpoint: 'https://api.atascap.com/subscribe'
 */
export const NEWSLETTER: {
  readonly endpoint: string;
  readonly providerName: string;
  readonly archiveUrl: string;
} = {
  endpoint: 'https://api.atascap.com/subscribe',
  // Named in the privacy pages as the data processor — keep it in step with
  // whatever actually stores the list.
  providerName: 'Resend',
  archiveUrl: '',
};

export const SITE = {
  domain: 'https://atascap.com',
  name: 'Ataş Capital',
  email: 'askin@atascap.com',
  linkedin: 'https://linkedin.com/in/askinatas',
  twitter: 'https://x.com/borsa_adami',
  founderName: 'Aşkın Ataş',
  founderLinkedin: 'https://linkedin.com/in/askinatas',
  borsaadam: 'https://borsaadam.com',
  founded: 2024,
} as const;
