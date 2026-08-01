import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { detailHref } from './content';

/**
 * One feed per language, carrying both collections: a reader following the
 * newsletter should see the letters and the notes in between, not just letters.
 *
 * Shared by rss.xml.js / rss-tr.xml.js / rss-es.xml.js.
 */
const FEED_META = {
  en: {
    title: 'Ataş Capital — Letters & Notes',
    description: 'Investor letters and notes on markets, businesses and long-term investing.',
    language: 'en',
  },
  tr: {
    title: 'Ataş Capital — Mektuplar ve Yazılar',
    description: 'Yatırımcı mektupları ile piyasalar, şirketler ve uzun vadeli yatırım üzerine yazılar.',
    language: 'tr',
  },
  es: {
    title: 'Ataş Capital — Cartas y Notas',
    description: 'Cartas a los inversores y notas sobre mercados, empresas e inversión a largo plazo.',
    language: 'es',
  },
};

export async function buildFeed(lang, context) {
  const published = ({ data }) => data.lang === lang && !data.draft;
  const [letters, notes] = await Promise.all([
    getCollection('letters', published),
    getCollection('notes', published),
  ]);

  const items = [
    ...letters.map((entry) => ({ entry, kind: 'letters' })),
    ...notes.map((entry) => ({ entry, kind: 'notes' })),
  ]
    .sort((a, b) => b.entry.data.date.valueOf() - a.entry.data.date.valueOf())
    .map(({ entry, kind }) => ({
      title: entry.data.title,
      pubDate: entry.data.date,
      description: entry.data.description,
      // The language suffix is stripped so the link matches the published page.
      link: detailHref(kind, lang, entry.slug.replace(/-(en|tr|es)$/, '')),
    }));

  const meta = FEED_META[lang];
  return rss({
    title: meta.title,
    description: meta.description,
    site: context.site,
    items,
    customData: `<language>${meta.language}</language>`,
  });
}
