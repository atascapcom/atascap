import type { Lang } from './translations';

/**
 * Helpers shared by the two content collections.
 *
 * `letters` are the semi-annual investor letters (numbered, with PDFs); `notes`
 * are the shorter pieces in between. They differ in presentation but share slug
 * and date handling, so that logic lives here.
 */

export type ContentKind = 'letters' | 'notes';

/** Route prefix for each collection's detail pages, per language. */
export const CONTENT_ROUTES: Record<ContentKind, Record<Lang, string>> = {
  letters: { en: '/letters', tr: '/tr/mektuplar', es: '/es/cartas' },
  notes: { en: '/notes', tr: '/tr/yazilar', es: '/es/notas' },
};

/** Strip the trailing language suffix ("2026-h1-en" → "2026-h1") for clean URLs. */
export function contentSlug(entry: { slug: string }): string {
  return entry.slug.replace(/-(en|tr|es)$/, '');
}

/** Newest first — for listings. */
export function sortByDateDesc<T extends { data: { date: Date } }>(entries: T[]): T[] {
  return [...entries].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function detailHref(kind: ContentKind, lang: Lang, slug: string): string {
  return `${CONTENT_ROUTES[kind][lang]}/${slug}.html`;
}

/**
 * hreflang alternates for a detail page — only the languages the piece was
 * actually published in. A note may exist in Turkish alone, and pointing search
 * engines at translations that do not exist is worse than omitting them.
 */
export function detailAlternates(
  kind: ContentKind,
  slug: string,
  availableLangs: Lang[]
): Array<{ lang: Lang; href: string }> {
  return availableLangs.map((lang) => ({ lang, href: detailHref(kind, lang, slug) }));
}
