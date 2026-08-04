import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://atascap.com',
  base: '/',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      // Subscribe status pages are noindex transactional pages; listing them in
      // the sitemap would contradict their robots meta.
      // Subscribe status pages are noindex transactional pages; listing them in
      // the sitemap would contradict their robots meta.
      filter: (page) => !/\/(subscribe-|tr\/kayit-|es\/suscripcion-)/.test(page),
      // build.format: 'file' means pages are served at /about.html, /es.html, etc.
      // The integration drops the extension, which would mismatch the canonical
      // URLs (BaseHead uses .html). Rewrite each entry back to its real .html URL.
      serialize(item) {
        const url = new URL(item.url);
        let path = url.pathname.replace(/\/$/, '');
        if (path === '') path = '/index.html';
        else if (!path.endsWith('.html')) path += '.html';
        url.pathname = path;
        item.url = url.href;
        return item;
      },
    }),
  ],
});
