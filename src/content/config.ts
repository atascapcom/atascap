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
    draft: z.boolean().default(false),
  }),
});

export const collections = { letters, notes };
