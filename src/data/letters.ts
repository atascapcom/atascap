import type { CollectionEntry } from 'astro:content';
import type { Lang } from './translations';

export type LetterEntry = CollectionEntry<'letters'>;

/** Strip the trailing language suffix (e.g. "2026-h1-en" → "2026-h1") for clean URLs. */
export function letterSlug(entry: LetterEntry): string {
  return entry.slug.replace(/-(en|tr|es)$/, '');
}

/** Newest first — for listings. */
export function sortLettersDesc(entries: LetterEntry[]): LetterEntry[] {
  return [...entries].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Issue number by chronological order (oldest published = No. 01), keyed by entry.slug. */
export function letterNumbers(entries: LetterEntry[]): Map<string, number> {
  const asc = [...entries].sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());
  return new Map(asc.map((entry, i) => [entry.slug, i + 1]));
}

export function letterNo(n: number): string {
  return `No. ${String(n).padStart(2, '0')}`;
}

const HALF_LABELS: Record<Lang, [string, string]> = {
  en: ['First Half', 'Second Half'],
  tr: ['İlk Yarı', 'İkinci Yarı'],
  es: ['Primer Semestre', 'Segundo Semestre'],
};

/** "2026-H1" → "2026 · First Half" (localized). Returns '' when no period is set. */
export function periodLabel(period: string | undefined, lang: Lang): string {
  if (!period) return '';
  const match = period.match(/^(\d{4})-H([12])$/i);
  if (!match) return period;
  return `${match[1]} · ${HALF_LABELS[lang][Number(match[2]) - 1]}`;
}
