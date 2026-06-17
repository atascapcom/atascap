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

export const collections = { letters };
