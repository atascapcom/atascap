import { defineCollection, z } from 'astro:content';

const letters = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    lang: z.enum(['en', 'es', 'tr']),
    description: z.string(),
    /** Reporting period, e.g. "2026-H1" (semi-annual). Optional. */
    period: z.string().optional(),
    /** Path to a downloadable PDF (e.g. "/pdf/2026-h1.pdf"). Optional —
     *  when set, the letter links to the file; the printable version always works. */
    pdf: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

/**
 * Shorter pieces published between the semi-annual letters. Deliberately leaner
 * than `letters`: no reporting period, no issue number, no PDF — and a note may
 * be published in one language without translations.
 */
const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    lang: z.enum(['en', 'tr', 'es']),
    description: z.string(),
    /** Ties translations of the same piece together, so each language can keep
     *  its own readable slug. Omit it for a note published in one language. */
    translationKey: z.string().optional(),
    /** Card image for the listing grid, e.g. "/images/reasoning/foo.jpg".
     *  Without one the card falls back to a typographic treatment. */
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { letters, notes };
