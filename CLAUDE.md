# CLAUDE.md — Ataş Capital (atascap.com)

## Proje Özeti

Ataş Capital'in kurumsal web sitesi. Statik, çok dilli (TR/EN/ES) bir Astro projesi.

- **URL**: https://atascap.com
- **Kurucu**: Aşkın Ataş
- **Teknoloji**: Astro 4, TypeScript, Chart.js
- **Çıktı**: Tamamen statik (`output: 'static'`)
- **Deploy**: Netlify/static hosting

## Dizin Yapısı

```
src/
├── components/       # Yeniden kullanılabilir Astro bileşenleri
├── content/letters/  # Yatırımcı mektupları (Markdown)
├── data/             # site.ts, translations.ts, performance.ts
├── layouts/          # BaseLayout.astro
└── pages/
    ├── *.astro       # İngilizce (varsayılan dil)
    ├── tr/*.astro    # Türkçe sayfalar
    └── es/*.astro    # İspanyolca sayfalar
```

## Çok Dil Mimarisi

Her dil kendi dizininde. Tüm çeviriler `src/data/translations.ts` içinde `LANGUAGES` objesinde tanımlı.
Yeni sayfa eklerken mutlaka üç dilde (en/tr/es) oluştur.

```ts
// src/data/translations.ts
export type Lang = 'en' | 'es' | 'tr';
```

## Sık Kullanılan Komutlar

```bash
npm run dev      # Geliştirme sunucusu
npm run build    # Production build (dist/)
npm run preview  # Build önizleme
```

## Geliştirme Kuralları

- Yeni bileşen eklerken: `src/components/BilesenAdi.astro`
- Yeni sayfa eklerken: `/pages/slug.astro` + `/pages/tr/slug.astro` + `/pages/es/slug.astro`
- Stil: Inline CSS veya `<style>` bloğu içinde — ayrı CSS dosyası yok
- TypeScript strict modu aktif (`tsconfig.json`)
- Trailing slash yok (`trailingSlash: 'never'`)

## İçerik

- **Yatırımcı mektupları**: `src/content/letters/*.md` (Markdown)
- **Site bilgileri**: `src/data/site.ts` → `SITE` sabiti
- **Performans verisi**: `src/data/performance.ts`

## ECC Skill & Komutları

Bu projede kullanılacak ECC komutları:

| Komut | Ne zaman |
|-------|----------|
| `/plan` | Yeni özellik geliştirmeden önce |
| `/code-review` | Kod yazıldıktan sonra |
| `/security-review` | Commit öncesi |
| `/build-fix` | `npm run build` hata verince |
| `/update-docs` | CLAUDE.md güncellemesi gerekince |

## Önemli Notlar

- Chart.js ile performans grafikleri: `PerformanceChart.astro`, `PerformanceHeatmap.astro`
- Cookie banner GDPR uyumlu: `CookieBanner.astro`
- RSS feed: `src/pages/rss.xml.js`
- Sitemap: `@astrojs/sitemap` ile otomatik
