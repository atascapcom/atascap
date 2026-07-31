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

**Sağlayıcı: Resend** (26 Temmuz 2026'da Buttondown yerine seçildi). Gerekçe:
ücretsiz katmanı **1.000 kontak + sınırsız gönderim** (Buttondown'ın ücretsizi 100
abonede biterdi — bizim tavanımız tam orası), zaten başka projelerde kullanılıyor,
ve barındırılan arşiv/keşif özelliklerine ihtiyacımız yok (arşiv zaten sitede).
Bedeli: Resend'in API'si gizli anahtar istediği için araya kendi uç noktamız giriyor.

### Kod tarafı — tamamlandı (3 Temmuz 2026)

Tümü `NEWSLETTER.endpoint` ayarına bağlı: **ayar boşken hiçbir form, script veya
gizlilik metni yayınlanmaz.** Böylece hiçbir zaman boşluğa post eden bir form ya da
formu olmayan bir gizlilik bildirimi yayına çıkmaz. Doğrulandı: ayar boşken `dist`
içinde 0 `<form>`, dolduğunda 31 sayfada form + 3 dilde gizlilik bildirimi.

- [x] **`SubscribeForm.astro`** — statik `<form>` POST → kendi uç noktamız (sunucu
      tarafı JS yok, GitHub Pages uyumlu), gizli `tag` alanı ile dil etiketi, ekran
      dışı honeypot + `is:inline` koruma script'i (idempotent; aynı sayfadaki iki
      forma tek kez bağlanır), görünmez `<label>` ile erişilebilirlik. Çerez yok,
      üçüncü taraf script yok, CORS yok (303 yönlendirme ile geri dönüş).
- [x] **Metinler** `translations.ts` → `newsletter.*` (EN/TR/ES, hepsi çevrildi).
- [x] **Yerleşim:** footer (tüm sayfalar, koyu zemin varyantı) + mektup listeleri (3 dil)
      + mektup detay sayfalarının sonu (3 dil).
- [x] **Stiller** `style.css` → `.subscribe*` (açık/koyu mod, mobil yığılma,
      hover/focus durumları, `@media print`te gizli) + `.visually-hidden` yardımcı sınıfı.
- [x] **Gizlilik sayfaları (3 dil):** toplanan veri (e-posta + dil), sağlayıcının
      işleyici olarak adı, açık rıza + double opt-in, saklama ve listeden çıkma hakkı.
- [x] **`subscribe-api/`** — bağımlılıksız Node servisi: `POST /subscribe` imzalı
      (HMAC) onay bağlantısı yollar, `GET /confirm` doğrulayıp kişiyi Resend
      audience'ına ekler. Veritabanı yok (jeton adresi kendisi taşıyor), fail-fast
      env kontrolü, IP başına hız sınırı, gövde boyutu sınırı, Docker + healthcheck.
      7 birim testi (`npm test`): sahte imza, kurcalama, süre aşımı, bozuk girdi.
- [x] **Durum sayfaları** — 9 sayfa (bekliyor/onaylandı/hata × 3 dil), ortak
      `SubscribeStatus.astro` bileşeni, `noindex` + sitemap'ten dışlanmış.
- [x] **Uçtan uca doğrulandı** (yerel): form → uç nokta → 303 → doğru dildeki sayfa;
      bot gönderimi honeypot'a takılıyor, Resend hatası hata sayfasına düşüyor.

### Altyapı — kuruldu (31 Temmuz 2026)

Domain Hostinger'a taşındı, artık DNS'i MCP ile yönetiliyor. Ayrıntı:
[`subscribe-api/README.md`](subscribe-api/README.md).

- [x] **DNS:** `api.atascap.com` → `147.93.121.36`. Mevcut kayıtlar (GitHub Pages
      A kayıtları, `www` CNAME, ImprovMX MX/SPF) korundu ve doğrulandı.
- [x] **CyberPanel sitesi + Let's Encrypt sertifikası** `api.atascap.com` için.
- [x] **vhost proxy'ye çevrildi** (`127.0.0.1:3010`), ACME challenge context'i
      korunarak — sertifika yenilemesi çalışmaya devam eder.
- [x] **Docker imajı** sunucuda derlendi, `.env` üretildi (600, TOKEN_SECRET otomatik).
- [x] **Üretimde doğrulandı:** `https://api.atascap.com/health` → 200; honeypot ve
      sahte token yolları doğru yönlendiriyor; port 3010 dışarıya kapalı;
      sunucudaki diğer 14 site ve mail etkilenmedi.

### Resend + yayına alma — tamamlandı (31 Temmuz 2026)

- [x] **`news.atascap.com` doğrulandı** (Resend, eu-west-1). DKIM + SPF + MX
      kayıtları Hostinger DNS'e eklendi — hepsi alt alanlarda, kök alandaki
      ImprovMX mail kayıtları ve GitHub Pages A kayıtları doğrulanarak korundu.
- [x] **Audience "General"** oluşturuldu, kimlik bilgileri sunucudaki `.env`'e yazıldı.
- [x] **Servis yayında:** `atascap-subscribe-api` konteyneri `--restart unless-stopped`
      ile çalışıyor. `https://api.atascap.com/health` → 200.
- [x] **Üretimde uçtan uca doğrulandı:** gerçek onay e-postası gönderildi,
      `/confirm` kişiyi audience'a ekledi ve jetondaki dili koruyarak doğru dildeki
      onay sayfasına yönlendirdi. Test kaydı sonra silindi (liste temiz).
- [x] **`NEWSLETTER.endpoint` açıldı** → form üç dilde yayında, gizlilik sayfalarındaki
      newsletter paragrafları da otomatik göründü.

**Kalan tek şey:** değişiklikleri commit + push etmek. Push edilene kadar ne form
ne de durum sayfaları canlıda — ikisi birlikte yayına girer.

### Yayın sonrası

- [ ] Resend API anahtarını yenile (sohbete girdiği için) → sunucudaki `.env`'i
      güncelle → `docker restart atascap-subscribe-api`.
- [ ] `news.atascap.com` için DMARC kaydı ekle (`_dmarc.news` TXT,
      `v=DMARC1; p=none; rua=mailto:...` ile başlayıp sonra sıkılaştır).
- [ ] Gizlilik sayfalarındaki "son güncelleme" tarihini yayın ayına çek.
- [ ] İlk gerçek gönderimden önce kendi adresinle tam akışı bir kez dene.

Ek işler (yayına aldıktan sonra):

- [ ] Onay/karşılama e-postası metinleri (en az EN+TR).
- [ ] Gizlilik sayfalarındaki "son güncelleme" tarihini yayın ayına çek.
- [ ] **Dil stratejisi:** tek liste + `tag` alanıyla gelen dil etiketine göre segment.
      Basit başla — ilk yıl tek dilde göndermek de kabul.
- [ ] **Yayın akışı:** mektup merge → RSS güncellenir → ESP taslağı otomatik oluşturur →
      gözden geçir → gönder. Yılda ~2 mektup + ara yazılar için manuel onay yeterli.
      (RSS-to-email şu an yalnızca EN feed'i görür — TR/ES feed'leri Faz 2'de.)
- [ ] İsteğe bağlı: nav'a Oaktree tarzı "Subscribe" butonu.

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
