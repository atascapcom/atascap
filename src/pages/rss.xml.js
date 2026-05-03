import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const letters = await getCollection('letters', ({ data }) =>
    data.lang === 'en' && !data.draft
  );

  return rss({
    title: 'Ataş Capital — Letters & Insights',
    description: 'Investor letters, market commentary, and investment insights from Ataş Capital.',
    site: context.site,
    items: letters
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((letter) => ({
        title: letter.data.title,
        pubDate: letter.data.date,
        description: letter.data.description,
        link: `/letters/${letter.slug}/`,
      })),
    customData: '<language>en-us</language>',
  });
}
