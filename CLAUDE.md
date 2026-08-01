# CLAUDE.md — Ataş Capital (atascap.com)

## Proje Özeti

Ataş Capital'in kurumsal web sitesi. Statik, çok dilli (TR/EN/ES) bir Astro projesi.

- **URL**: https://atascap.com
- **Kurucu**: Aşkın Ataş
- **Teknoloji**: Astro 4, TypeScript
- **Çıktı**: Tamamen statik (`output: 'static'`)
- **Deploy**: GitHub Pages (`.github/workflows/deploy.yml`, `public/CNAME`)

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
npm run build    # Production build (dist/) + eksik mektup PDF'lerini üretir
npm run preview  # Build önizleme
npm run pdf      # Mektup PDF'lerini üret (FORCE_PDF=1 ile yeniden üretir)
npm run assets   # OG görseli + favicon.ico + apple-touch-icon üret
```

## Geliştirme Kuralları

- Yeni bileşen eklerken: `src/components/BilesenAdi.astro`
- Yeni sayfa eklerken: `/pages/slug.astro` + `/pages/tr/slug.astro` + `/pages/es/slug.astro`
- Stil: Inline CSS veya `<style>` bloğu içinde — ayrı CSS dosyası yok
- TypeScript strict modu aktif (`tsconfig.json`)
- Trailing slash yok (`trailingSlash: 'never'`)

## İçerik

İki koleksiyon var:

- **Mektuplar** (`src/content/letters/*.md`) — altı ayda bir, numaralı, PDF'li.
  Üç dilde de yazılır. Dosya adı: `<dönem>-<dil>.md` (ör. `2027-h1-tr.md`).
- **Yazılar** (`src/content/notes/*.md`) — mektuplar arasındaki kısa metinler.
  Dönem/numara/PDF yok; **tek dilde yayınlanabilir**.

```markdown
---
title: "Yazının Başlığı"
date: 2026-08-15          # gerçek yayın tarihi — asla geriye alma
lang: "tr"
description: "Listede ve arama sonuçlarında görünen tek cümlelik özet."
draft: false
---
```

Mektuplarda ek olarak `period: "2027-H1"` ve `pdf: "/pdf/2027-h1-tr.pdf"` alanları bulunur.
Mektup numarası (`No. 02`) tarih sırasından otomatik hesaplanır, elle verilmez.
İmza sayfa şablonundan basılır — gövdeye tekrar yazma.

- **Site bilgileri**: `src/data/site.ts` → `SITE` ve `NEWSLETTER` sabitleri
- **Performans verisi**: `src/data/performance.ts`

## Yayın Akışı

1. İçeriği `letters/` veya `notes/` altına ekle (`draft: false`)
2. `npm run build` — eksik mektup PDF'lerini üretir
3. Commit + push — GitHub Pages yayınlar, sitemap ve RSS otomatik güncellenir
4. Resend → Broadcasts ile bültene gönder (manuel; gövdeye
   `{{{RESEND_UNSUBSCRIBE_URL}}}` eklemeyi unutma)

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

- Performans tablosu: `PerformanceTable.astro` (MSCI ACWI karşılaştırması; eski grafik/heatmap bileşenleri kaldırıldı)
- Mektup PDF'leri: `scripts/generate-pdfs.mjs` (build sonrası, yerel Chrome ile eksik olanları üretir)
- OG görseli & ikonlar: `scripts/generate-assets.mjs` (kaynak SVG → PNG/ICO)
- Cookie banner: `CookieBanner.astro` (Plausible çerezsiz — bilgilendirme amaçlı)
- RSS: dil başına bir feed (`/rss.xml`, `/rss-tr.xml`, `/rss-es.xml`) — mektuplar
  ve yazılar birlikte; ortak üretici `src/data/feed.js`
- Newsletter: `SubscribeForm.astro` + `subscribe-api/` (kendi sunucumuzda,
  Resend'e çift onaylı kayıt). `NEWSLETTER.endpoint` boşsa form hiç render edilmez.
- Sitemap: `@astrojs/sitemap` ile otomatik (`astro.config.mjs`); abonelik durum
  sayfaları `noindex` olduğu için dışlanır
- Detay sayfaları (mektup/yazı) `canonicalPath` ve `alternates` proplarını
  vermek zorunda — yoksa canonical listeye işaret eder ve sayfa indekslenmez
- Yol haritası: `ROADMAP.md`
