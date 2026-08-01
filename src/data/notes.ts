import type { CollectionEntry } from 'astro:content';

export type NoteEntry = CollectionEntry<'notes'>;

// Notes carry no issue number, period or PDF — they only need slug and date
// handling, which is shared with letters.
export { contentSlug as noteSlug, sortByDateDesc as sortNotesDesc } from './content';
