# Ataş Capital — Yol Haritası

> Durum tespiti: 2 Temmuz 2026. Site sağlam bir çekirdeğe sahip: 3 dil (EN/TR/ES),
> yarıyıl mektup sistemi (HTML kanonik + PDF), MSCI ACWI karşılaştırmalı track record,
> Plausible (çerezsiz) analitik, GitHub Pages deploy. Aşağıdaki fazlar önem sırasına göre.

## Faz 0 — Teknik düzeltmeler (yarım gün)

Küçük ama kullanıcıya/aramaya görünür hatalar. **Tümü tamamlandı — 3 Temmuz 2026.**

- [x] **OG görseli PNG olmalı.** `scripts/generate-assets.mjs` (`npm run assets`) kaynak
      `og-image.svg`'yi 1200×630 `public/og-image.png`'ye render ediyor; `BaseHead.astro`
      artık PNG'ye işaret ediyor + Twitter Card (`summary_large_image`) ve `og:locale` eklendi.
- [x] **Eksik favicon dosyaları.** Aynı script `favicon.ico` (32×32 PNG-in-ICO) ve
      `apple-touch-icon.png` (180×180 full-bleed) üretiyor → artık 404 yok.
- [x] **Sitemap otomatiğe geçti.** `@astrojs/sitemap` `astro.config.mjs`'e entegre edildi;
      `serialize` ile URL'ler `.html` uzantısına düzeltildi (kanonikle eşleşiyor), mektuplar
      otomatik dâhil. Elle tutulan `public/sitemap.xml` silindi; `robots.txt` → `sitemap-index.xml`.
      (Sürüm notu: Astro 4 için `~3.2.1`'e sabitlendi; 3.7.x Astro 5 gerektiriyor.)
- [x] **404 sayfası eklendi.** `src/pages/404.astro` (GitHub Pages otomatik kullanır).
- [x] **hreflang `x-default` eklendi.** `BaseHead.astro` alternates'ine EN x-default olarak.
- [x] **Hardcoded linkler kaldırıldı.** 6 link (en/tr/es index) `pageHref()` kullanıyor.
- [x] **Ölü bağımlılık silindi.** `chart.js` package.json + lockfile'dan kaldırıldı.
- [x] **CLAUDE.md güncellendi.** Deploy = GitHub Pages; grafik bileşen referansları çıkarıldı;
      yeni script komutları (`assets`, `fonts`, `pdf`) eklendi.
- [x] **Google Fonts self-host edildi.** `scripts/fetch-fonts.mjs` (`npm run fonts`) EB Garamond +
      Inter'i latin+latin-ext woff2 olarak indiriyor (20 dosya) → `public/fonts/` + `public/fonts.css`;
      `style.css`'teki `@import` ve BaseHead'deki Google `<link>` kaldırıldı, kritik latin ağırlıkları
      preload ediliyor. Tarayıcıda doğrulandı: artık hiçbir fonts.googleapis/gstatic isteği yok.

## Faz 1 — Newsletter (1–2 gün) — ana öncelik

**Karar çerçevesi:** İçerik atascap.com'da kalır (Oaktree Insights modeli: arşiv sitede,
e-posta yalnızca dağıtım kanalı). Substack'e taşınmıyor — gerekçe: kurumsal kimlik,
kanonik SEO'nun tek adreste kalması, tasarım ve veri sahipliği.

- [ ] **ESP seçimi.** Öneri: Buttondown (sade şablon, markdown, RSS-to-email, kendi
      domainden gönderim; ~$9/ay). Ücretsiz alternatifler: MailerLite (AB şirketi,
      1.000 aboneye kadar ücretsiz) veya Kit. Fiyat/limitleri karar anında doğrula.
- [ ] **Gönderim DNS'i.** `news.atascap.com` (veya `mail.`) alt alanı için SPF + DKIM + DMARC.
      Ana domain itibarını ve `askin@atascap.com` teslim edilebilirliğini korur.
- [ ] **SubscribeForm.astro** bileşeni: statik `<form>` POST → ESP endpoint'i (sunucu gerekmez,
      GitHub Pages ile uyumlu), honeypot alanı, çerez yok. Metinler `translations.ts`'e
      (`newsletter.title/placeholder/button/privacyNote` anahtarları, 3 dil).
- [ ] **Yerleşim:** footer (tüm sayfalar) + mektup listesi + mektup detayının sonu.
      İsteğe bağlı: nav'a Oaktree tarzı "Subscribe" butonu.
- [ ] **Double opt-in** aç (AB'de fiilen zorunlu). Onay/karşılama e-postaları en az EN+TR.
- [ ] **Gizlilik sayfalarını güncelle** (3 dilde): toplanan veri, ESP'nin adı ve rolü,
      açık rıza, listeden ayrılma hakkı.
- [ ] **Dil stratejisi:** tek liste + kayıt anında dil etiketi (form gizli alanla `lang` yollar);
      gönderimde dile göre segment. Basit başla — ilk yıl tek dilde göndermek de kabul.
- [ ] **Yayın akışı:** mektup merge → RSS güncellenir → ESP taslağı otomatik oluşturur →
      gözden geçir → gönder. Yılda ~2 mektup + ara yazılar için manuel onay yeterli.

## Faz 2 — İçerik genişlemesi: "Insights" (2–3 gün)

Yarıyıl mektupları dışındaki ara yazılar için altyapı (şu an tek içerik tipi `letters`
ve yarıyıl formatına bağlı):

- [ ] **İkinci koleksiyon: `notes`** (kısa yazılar; `period`/`pdf` yok, tek dilde yayın serbest,
      her dilde çeviri zorunlu değil).
- [ ] **Listeleme:** Letters sayfasının yanına Notes/Yazılar bölümü veya ikisini birleştiren
      bir "Insights" görünümü.
- [ ] **RSS genişlet:** `rss-tr.xml` ve `rss-es.xml` (veya tek feed'de tüm diller).
      Newsletter otomasyonu bu feed'lere bağlanacağı için Faz 1 ile birlikte düşün.
- [ ] **Mektup sayfalarına Article JSON-LD** + `og:type=article` + `article:published_time`.
- [ ] **Mektup başına OG görseli** (başlık + mektup no) — PDF script'ine benzer build-time üretim (opsiyonel).
- [ ] **borsaadam.com sınırı:** kişisel/piyasa yazıları orada, Ataş Capital mektup + yatırım
      notları burada. Tek cümlelik yayın politikası yaz, iki listeyi karıştırma.

## Faz 3 — Kurumsallaşma

- [ ] **Marka tescili:** "Ataş Capital" için EUIPO başvurusu (sınıf 36; ~€850, 10 yıl).
      Şirket kurulmasa da ünvanı koruyan en ucuz resmi adım.
- [ ] **Legal sayfalara avukat kontrolü** (LSSI/RGPD) — bekleyen iş.
- [ ] **Contact metnini yumuşat:** "we welcome inquiries from serious investors" ifadesi
      izinsiz pazarlama (CNMV) algısı yaratmasın; "özel, davetle; kamuya hizmet sunulmaz"
      çerçevesi korunarak yeniden yazılmalı.
- [ ] **Şirket/yapı kararı:** danışman süreci repo dışında yürüyor (ayrı not).
- [ ] **Track record rutini:** yarıyıl güncelleme takvimi + ACWI benchmark rakamlarının
      doğrulanması (bekleyen iş).

## Faz 4 — Otomasyon ve kalite (ölçek gerektikçe)

- [ ] CI'da `astro check` + kırık link taraması (build'e ek adım).
- [ ] Lighthouse bütçe kontrolü (statik site; hedefler zaten rahat karşılanmalı).
- [ ] `performance.ts` yarıyıl güncellemesi için şablon/script.
- [ ] Tüm mektupları tek ciltte toplayan yıllık PDF derlemesi (Buffett "compendium" tarzı).
