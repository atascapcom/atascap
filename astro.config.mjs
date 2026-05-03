import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://atascap.com',
  base: '/',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
});
