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
npm run assets   # Genel OG görseli + favicon.ico + apple-touch-icon üret
npm run og       # Yazı başına sosyal paylaşım kartı (FORCE_OG=1 yeniden üretir)
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
- **Çıkarımlar** (`src/content/notes/*.md`) — mektuplar arasındaki kısa metinler.
  Dönem/numara/PDF yok; **tek dilde yayınlanabilir**. Kendi menü öğesi ve
  sayfası var: `/reasoning`, `/tr/cikarimlar`, `/es/razonamiento`.
  Bölüm adı sitenin kendi tagline'ından türetildi ("…çıkarımı bozar" →
  Çıkarımlar / Reasoning / Razonamiento).

```markdown
---
title: "Yazının Başlığı"
date: 2026-08-15          # gerçek yayın tarihi — asla geriye alma
lang: "tr"
description: "Listede ve arama sonuçlarında görünen tek cümlelik özet."
draft: false
---
```

Çıkarımlarda iki opsiyonel alan daha var:
- `translationKey` — çevirileri birbirine bağlar, böylece her dil kendi
  okunabilir slug'ını tutar (`ucuz-cikarim-pahali-muhakeme` / `cheap-inference-…`).
  Tek dilde yayınlanan metinlerde gerekmez.
- `cover: "/images/reasoning/dosya.jpg"` + `coverAlt` — kart görseli.
  Verilmezse kart tipografik alternatife düşer (grid bozulmaz).

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

## Yeni Çıkarım Yazısı Eklerken (Claude için yönerge)

Aşkın **yalnızca Türkçe metni** verir — bazen ayda bir, bazen iki ayda bir.
Geri kalan her şeyi Claude yapar. Sırasıyla:

**1. Üç dosya oluştur.** `src/content/notes/` altına:
`<slug>-tr.md`, `<slug>-en.md`, `<slug>-es.md`.
Her dil **kendi okunabilir slug'ını** alır (`ucuz-cikarim-pahali-muhakeme` /
`cheap-inference-expensive-judgment` / `inferencia-barata-criterio-caro`);
üçünü birbirine bağlayan şey ortak `translationKey` alanıdır. Slug'ları
paylaştırma — Türkçe okuyucu İngilizce adres görmemeli.

**2. Çeviriyi kendin yap.** Ton: ölçülü, kurumsal, birinci çoğul şahıs.
Teknik terimleri çevirme (`speculative decoding`, `hyperscaler`, `capex`).
Rakamları birebir koru. Türkçe metinde açık yazım hatası varsa düzelt, ama
**anlamı bozuk bir cümleyi sessizce yeniden yazma** — sor.

**3. Başlığı sorgula.** Yazıya uygun mu, tezi taşıyor mu? Türkçe/İspanyolcada
soyut yeti adları (`muhakeme`, `criterio`) sayılabilir isimlerden
(`karar`, `decisión`) daha net olur — "pahalı karar" yanlışlıkla "pahalıya
patlayan karar" diye okunabilir. Görüşünü söyle, kararı Aşkın'a bırak.

**4. Görseli kendin çiz.** Stok fotoğraf kullanma — sitede başka fotoğraf yok,
tonu bozar. Yazının kendi imgesini SVG olarak çiz, sitenin paletiyle:
zemin `#f0ede5`, vurgu `#b8952a`, çizgi `#1a1a1a`. `public/images/reasoning/`
altına, **ne çizdiğini anlatan** bir adla kaydet (`line-shaft.svg` gibi) —
başlık adıyla değil, çünkü başlık değişebilir. Frontmatter'a `cover` +
`coverAlt` ekle. Görsel vermezsen kart tipografik alternatife düşer, o da
kabul edilebilir bir sonuçtur.

**5. Sosyal kartı üret:** `npm run og` — her yazı için 1200×630 paylaşım kartı
çizer (`public/images/og/<slug>.png`), detay sayfaları otomatik bağlar.
Aşkın linki X ve LinkedIn'de paylaştığında görünen görsel budur; üretmezsen
genel site kartı çıkar. Mevcut kartlara dokunmaz; `FORCE_OG=1` yeniden üretir.

**6. Build al ve doğrula:** üç sayfa da üretildi mi, canonical kendini
gösteriyor mu, hreflang üç çeviriyi bağlıyor mu, `og:image` yazıya özel mi,
üç RSS feed'inde göründü mü, sitemap'e girdi mi.

**7. Commit + push.** Mesajı açıklayıcı yaz (ne + neden), `güncelleme` deme.

**8. Gönderim Aşkın’da:** Resend → Broadcasts. Claude bunu yapmaz.

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
- Yazı başına sosyal kart: `scripts/generate-og-cards.mjs` → `public/images/og/`;
  `BaseHead` `ogImage` propuyla bağlar, verilmezse genel karta düşer
- Çerez onayı: `CookieBanner.astro`. `ANALYTICS.ga4Id` boşken yalnızca çerezsiz
  analitik bildirimi çıkar. Dolduğunda gerçek onay bandına döner: **Google
  etiketi onay verilmeden hiç yüklenmez** (dize olarak bile sayfada geçmez),
  "Reddet" ile "Kabul et" görsel olarak eşittir (AEPD karanlık desen sayar),
  tercih footer'daki bağlantıyla geri alınabilir. Gizlilik sayfalarındaki GA
  metinleri de aynı ayara bağlı — biri açıkken diğeri eksik kalamaz.
- RSS: dil başına bir feed (`/rss.xml`, `/rss-tr.xml`, `/rss-es.xml`) — mektuplar
  ve yazılar birlikte; ortak üretici `src/data/feed.js`
- Newsletter: `SubscribeForm.astro` + `subscribe-api/` (kendi sunucumuzda,
  Resend'e çift onaylı kayıt). `NEWSLETTER.endpoint` boşsa form hiç render edilmez.
- Sitemap: `@astrojs/sitemap` ile otomatik (`astro.config.mjs`); abonelik durum
  sayfaları `noindex` olduğu için dışlanır
- Detay sayfaları (mektup/yazı) `canonicalPath` ve `alternates` proplarını
  vermek zorunda — yoksa canonical listeye işaret eder ve sayfa indekslenmez
- Yol haritası: `ROADMAP.md`
