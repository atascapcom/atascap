export type Lang = 'en' | 'es' | 'tr';

export interface PageSlug {
  home: string;
  philosophy: string;
  trackRecord: string;
  letters: string;
  about: string;
  contact: string;
}

export interface LangData {
  htmlLang: string;
  nav: Record<keyof PageSlug, string>;
  footer: {
    tagline: string;
    colPages: string;
    colConnect: string;
    disclaimer: string;
    rights: string;
  };
  pages: PageSlug;
  monthLabels: [string, string, string, string, string, string, string, string, string, string, string, string];
}

export const LANGUAGES: Record<Lang, LangData> = {
  en: {
    htmlLang: 'en',
    nav: {
      home: 'Home',
      philosophy: 'Philosophy',
      trackRecord: 'Track Record',
      letters: 'Letters',
      about: 'About',
      contact: 'Contact',
    },
    footer: {
      tagline: 'A quiet pursuit of enduring value.',
      colPages: 'Pages',
      colConnect: 'Connect',
      disclaimer:
        'Disclaimer: This website is intended solely for informational and educational purposes. Ataş Capital manages its own capital and operates on a private, invitation-only basis. The information presented here reflects general investment philosophy and research perspective; it does not constitute an offer, solicitation, or recommendation to buy or sell any securities. Past performance is not indicative of future results. All investments involve risk, including possible loss of principal. Ataş Capital is not a registered investment adviser and does not provide investment advisory services to the public.',
      rights: '© YEAR Ataş Capital. All rights reserved.',
    },
    pages: {
      home: 'index.html',
      philosophy: 'philosophy.html',
      trackRecord: 'track-record.html',
      letters: 'letters.html',
      about: 'about.html',
      contact: 'contact.html',
    },
    monthLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  es: {
    htmlLang: 'es',
    nav: {
      home: 'Inicio',
      philosophy: 'Filosofía',
      trackRecord: 'Historial',
      letters: 'Cartas',
      about: 'Nosotros',
      contact: 'Contacto',
    },
    footer: {
      tagline: 'Una búsqueda silenciosa de valor duradero.',
      colPages: 'Páginas',
      colConnect: 'Conectar',
      disclaimer:
        'Aviso legal: Este sitio web tiene fines exclusivamente informativos y educativos. Ataş Capital gestiona su propio capital y opera de forma privada, solo por invitación. La información aquí presentada refleja una filosofía y perspectiva de inversión general; no constituye una oferta, solicitud o recomendación para comprar o vender valores. El rendimiento pasado no es indicativo de resultados futuros. Todas las inversiones conllevan riesgos, incluida la posible pérdida del capital. Ataş Capital no es un asesor de inversiones registrado y no presta servicios de asesoramiento de inversiones al público.',
      rights: '© YEAR Ataş Capital. Todos los derechos reservados.',
    },
    pages: {
      home: 'es.html',          // Astro file-format: es/index.astro → /es.html
      philosophy: 'filosofia.html',
      trackRecord: 'historial.html',
      letters: 'cartas.html',
      about: 'sobre.html',
      contact: 'contacto.html',
    },
    monthLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  },
  tr: {
    htmlLang: 'tr',
    nav: {
      home: 'Ana Sayfa',
      philosophy: 'Felsefe',
      trackRecord: 'Sicil',
      letters: 'Mektuplar',
      about: 'Hakkında',
      contact: 'İletişim',
    },
    footer: {
      tagline: 'Kalıcı değerin sessiz arayışı.',
      colPages: 'Sayfalar',
      colConnect: 'İletişim',
      disclaimer:
        'Yasal Uyarı: Bu web sitesi yalnızca bilgilendirme ve eğitim amaçlıdır. Ataş Capital kendi sermayesini yönetir ve özel, yalnızca davetle çalışır. Burada sunulan bilgiler genel yatırım felsefesini ve araştırma perspektifini yansıtır; herhangi bir menkul kıymetin alınması veya satılması için teklif, talep veya tavsiye niteliği taşımaz. Geçmiş performans gelecekteki sonuçların göstergesi değildir. Tüm yatırımlar, ana paranın olası kaybı da dahil olmak üzere risk içerir. Ataş Capital kayıtlı bir yatırım danışmanı değildir ve halka yatırım danışmanlığı hizmeti sunmamaktadır.',
      rights: '© YEAR Ataş Capital. Tüm hakları saklıdır.',
    },
    pages: {
      home: 'tr.html',          // Astro file-format: tr/index.astro → /tr.html
      philosophy: 'felsefe.html',
      trackRecord: 'sicil.html',
      letters: 'mektuplar.html',
      about: 'hakkinda.html',
      contact: 'iletisim.html',
    },
    monthLabels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
  },
};

export function getLang(pathname: string): Lang {
  if (pathname.includes('/es/') || pathname.startsWith('/es')) return 'es';
  if (pathname.includes('/tr/') || pathname.startsWith('/tr')) return 'tr';
  return 'en';
}

export function getPrefix(lang: Lang): string {
  return lang === 'en' ? '/' : `/${lang}/`;
}

export function pageHref(lang: Lang, pageKey: keyof PageSlug): string {
  const filename = LANGUAGES[lang].pages[pageKey];
  if (pageKey === 'home') {
    // home filenames are root-relative (index.html, es.html, tr.html)
    return `/${filename}`;
  }
  const prefix = lang === 'en' ? '/' : `/${lang}/`;
  return `${prefix}${filename}`;
}

export function buildLangSwitcher(
  pageKey: keyof PageSlug,
  currentLang: Lang
): Array<{ lang: Lang; href: string; label: string; isActive: boolean }> {
  return (['en', 'es', 'tr'] as Lang[]).map((l) => ({
    lang: l,
    href: pageHref(l, pageKey),
    label: l.toUpperCase(),
    isActive: l === currentLang,
  }));
}
