import type { CollectionEntry } from 'astro:content';
import { contentSlug, detailHref } from './content';
import type { Lang } from './translations';

export type NoteEntry = CollectionEntry<'notes'>;

// Notes carry no issue number, period or PDF — they only need slug and date
// handling, which is shared with letters.
export { contentSlug as noteSlug, sortByDateDesc as sortNotesDesc } from './content';

/**
 * Groups translations of the same note. Unlike letters — whose slug is the
 * period, identical in every language — notes keep a readable slug per
 * language, so `translationKey` is what links them. A note without one simply
 * stands alone.
 */
export function noteGroupKey(entry: NoteEntry): string {
  return entry.data.translationKey ?? contentSlug(entry);
}

/** hreflang alternates for a note: only the languages it was published in. */
export function noteAlternates(
  entry: NoteEntry,
  published: NoteEntry[]
): Array<{ lang: Lang; href: string }> {
  const key = noteGroupKey(entry);
  return published
    .filter((other) => noteGroupKey(other) === key)
    .map((other) => ({
      lang: other.data.lang,
      href: detailHref('notes', other.data.lang, contentSlug(other)),
    }));
}
