export type Lang = 'en' | 'es' | 'tr';

export interface PageSlug {
  home: string;
  philosophy: string;
  trackRecord: string;
  letters: string;
  /** Shorter pieces between the letters. Named after the site's own tagline —
   *  "…distort reasoning" — rather than a generic "Notes" or "Insights". */
  notes: string;
  about: string;
  contact: string;
  legalNotice: string;
  privacy: string;
  terms: string;
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
  newsletter: {
    /** Short heading for the footer variant. */
    footerTitle: string;
    /** Heading for the full-width panel on the letters pages. */
    title: string;
    description: string;
    emailLabel: string;
    placeholder: string;
    button: string;
    /** Double opt-in + unsubscribe note shown under the field. */
    note: string;
    privacyLink: string;
    /** Landing pages the subscribe endpoint redirects to. */
    status: {
      pending: { title: string; body: string };
      confirmed: { title: string; body: string };
      error: { title: string; body: string };
      backLink: string;
    };
  };
  pages: PageSlug;
  monthLabels: [string, string, string, string, string, string, string, string, string, string, string, string];
  /** Cookie consent bar. Reject must read as plainly as accept — the AEPD
   *  treats a harder-to-refuse banner as no consent at all. */
  consent: {
    text: string;
    accept: string;
    reject: string;
    privacyLink: string;
    /** Footer link that reopens the bar so a choice can be withdrawn. */
    manage: string;
    /** Shown when there is nothing to consent to (cookieless analytics only). */
    noticeOnly: string;
    dismiss: string;
  };
  /** Shorter pieces published between the semi-annual letters. */
  notes: {
    sectionTitle: string;
    /** Hero line. Deliberately not the site tagline — that already sits in the
     *  footer of every page, so repeating it here would only dilute it. */
    heroSubtitle: string;
    sectionIntro: string;
    backLink: string;
    empty: string;
    readLabel: string;
  };
}

export const LANGUAGES: Record<Lang, LangData> = {
  en: {
    htmlLang: 'en',
    nav: {
      home: 'Home',
      philosophy: 'Philosophy',
      trackRecord: 'Track Record',
      letters: 'Letters',
      notes: 'Reasoning',
      about: 'About',
      contact: 'Contact',
      legalNotice: 'Legal Notice',
      privacy: 'Privacy',
      terms: 'Terms',
    },
    footer: {
      tagline: 'Fear, greed, pride, and the need to belong distort reasoning. A calm mind reaches more accurate conclusions.',
      colPages: 'Pages',
      colConnect: 'Connect',
      disclaimer:
        'Disclaimer: This website is intended solely for informational and educational purposes. Ataş Capital manages its own capital and operates on a private, invitation-only basis. The information presented here reflects general investment philosophy and research perspective; it does not constitute an offer, solicitation, or recommendation to buy or sell any securities. Past performance is not indicative of future results. All investments involve risk, including possible loss of principal. Ataş Capital is not a registered investment adviser and does not provide investment advisory services to the public.',
      rights: '© YEAR Ataş Capital. All rights reserved.',
    },
    newsletter: {
      footerTitle: 'Letters by email',
      title: 'Receive our letters',
      description:
        'Semi-annual investor letters and occasional notes on markets and businesses, sent when they are published. No promotions, no noise.',
      emailLabel: 'Email address',
      placeholder: 'your@email.com',
      button: 'Subscribe',
      note: 'You will receive a confirmation email before anything is sent. Unsubscribe at any time.',
      privacyLink: 'Privacy Policy',
      status: {
        pending: {
          title: 'Check your inbox',
          body: 'We have sent you a confirmation link. Please click it to complete your subscription — nothing will be sent until you do. If it does not arrive within a few minutes, check your spam folder.',
        },
        confirmed: {
          title: 'You are subscribed',
          body: 'Thank you. You will receive our investor letters and occasional notes as they are published. Every email carries an unsubscribe link.',
        },
        error: {
          title: 'Something went wrong',
          body: 'That link may have expired, or the address was not valid. Confirmation links are good for 24 hours — please try subscribing again.',
        },
        backLink: 'Return to letters →',
      },
    },
    pages: {
      home: 'index.html',
      philosophy: 'philosophy.html',
      trackRecord: 'track-record.html',
      letters: 'letters.html',
      notes: 'reasoning.html',
      about: 'about.html',
      contact: 'contact.html',
      legalNotice: 'legal-notice.html',
      privacy: 'privacy.html',
      terms: 'terms.html',
    },
    monthLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    consent: {
      text: 'We would like to use Google Analytics to understand how this site is read. It sets cookies, so it runs only if you agree. Declining changes nothing about the site.',
      accept: 'Accept',
      reject: 'Decline',
      privacyLink: 'Privacy Policy',
      manage: 'Cookie preferences',
      noticeOnly: 'We use privacy-friendly, cookieless analytics. No tracking cookies are set.',
      dismiss: 'Got it',
    },
    notes: {
      sectionTitle: 'Reasoning',
      heroSubtitle: 'How we arrive at a conclusion often matters as much as the conclusion.',
      sectionIntro: 'Our reasoning on the future, on sectors, and on individual businesses — together with the thinking that led there. Some of it becomes an investment; most of it does not.',
      backLink: 'All reasoning →',
      empty: 'The first pieces are being written.',
      readLabel: 'Read',
    },
  },
  es: {
    htmlLang: 'es',
    nav: {
      home: 'Inicio',
      philosophy: 'Filosofía',
      trackRecord: 'Historial',
      letters: 'Cartas',
      notes: 'Razonamiento',
      about: 'Nosotros',
      contact: 'Contacto',
      legalNotice: 'Aviso Legal',
      privacy: 'Privacidad',
      terms: 'Términos',
    },
    footer: {
      tagline: 'El miedo, la avaricia, el orgullo y la necesidad de pertenecer distorsionan el razonamiento. Una mente serena llega a conclusiones más acertadas.',
      colPages: 'Páginas',
      colConnect: 'Conectar',
      disclaimer:
        'Aviso legal: Este sitio web tiene fines exclusivamente informativos y educativos. Ataş Capital gestiona su propio capital y opera de forma privada, solo por invitación. La información aquí presentada refleja una filosofía y perspectiva de inversión general; no constituye una oferta, solicitud o recomendación para comprar o vender valores. El rendimiento pasado no es indicativo de resultados futuros. Todas las inversiones conllevan riesgos, incluida la posible pérdida del capital. Ataş Capital no es un asesor de inversiones registrado y no presta servicios de asesoramiento de inversiones al público.',
      rights: '© YEAR Ataş Capital. Todos los derechos reservados.',
    },
    newsletter: {
      footerTitle: 'Cartas por correo',
      title: 'Reciba nuestras cartas',
      description:
        'Cartas semestrales a los inversores y notas ocasionales sobre mercados y empresas, enviadas cuando se publican. Sin promociones, sin ruido.',
      emailLabel: 'Correo electrónico',
      placeholder: 'tu@email.com',
      button: 'Suscribirse',
      note: 'Recibirá un correo de confirmación antes de enviarle nada. Puede darse de baja en cualquier momento.',
      privacyLink: 'Política de Privacidad',
      status: {
        pending: {
          title: 'Revise su correo',
          body: 'Le hemos enviado un enlace de confirmación. Haga clic en él para completar su suscripción — no se enviará nada hasta que lo haga. Si no llega en unos minutos, revise su carpeta de spam.',
        },
        confirmed: {
          title: 'Suscripción confirmada',
          body: 'Gracias. Recibirá nuestras cartas a los inversores y notas ocasionales a medida que se publiquen. Todos los correos incluyen un enlace para darse de baja.',
        },
        error: {
          title: 'Algo ha salido mal',
          body: 'Es posible que el enlace haya caducado o que la dirección no fuera válida. Los enlaces de confirmación son válidos durante 24 horas — inténtelo de nuevo.',
        },
        backLink: 'Volver a las cartas →',
      },
    },
    pages: {
      home: 'es.html',          // Astro file-format: es/index.astro → /es.html
      philosophy: 'filosofia.html',
      trackRecord: 'historial.html',
      letters: 'cartas.html',
      notes: 'razonamiento.html',
      about: 'sobre.html',
      contact: 'contacto.html',
      legalNotice: 'aviso-legal.html',
      privacy: 'privacidad.html',
      terms: 'terminos.html',
    },
    monthLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    consent: {
      text: 'Nos gustaría usar Google Analytics para entender cómo se lee este sitio. Instala cookies, así que solo funciona si usted lo acepta. Rechazarlo no cambia nada del sitio.',
      accept: 'Aceptar',
      reject: 'Rechazar',
      privacyLink: 'Política de Privacidad',
      manage: 'Preferencias de cookies',
      noticeOnly: 'Usamos analítica respetuosa con la privacidad, sin cookies. No se instalan cookies de seguimiento.',
      dismiss: 'Entendido',
    },
    notes: {
      sectionTitle: 'Razonamiento',
      heroSubtitle: 'Cómo llegamos a una conclusión importa tanto como la conclusión misma.',
      sectionIntro: 'Nuestro razonamiento sobre el futuro, sobre sectores y sobre empresas concretas — junto con el camino que nos llevó hasta él. Algunas de estas ideas acaban en una inversión; la mayoría no.',
      backLink: 'Todo el razonamiento →',
      empty: 'Los primeros textos se están escribiendo.',
      readLabel: 'Leer',
    },
  },
  tr: {
    htmlLang: 'tr',
    nav: {
      home: 'Ana Sayfa',
      philosophy: 'Felsefe',
      trackRecord: 'Sicil',
      letters: 'Mektuplar',
      notes: 'Çıkarımlar',
      about: 'Hakkında',
      contact: 'İletişim',
      legalNotice: 'Künye',
      privacy: 'Gizlilik',
      terms: 'Koşullar',
    },
    footer: {
      tagline: 'Korku, açgözlülük, kibir ve aidiyet ihtiyacı çıkarımı bozar. Sakin zihin daha isabetli sonuç üretir.',
      colPages: 'Sayfalar',
      colConnect: 'İletişim',
      disclaimer:
        'Yasal Uyarı: Bu web sitesi yalnızca bilgilendirme ve eğitim amaçlıdır. Ataş Capital kendi sermayesini yönetir ve özel, yalnızca davetle çalışır. Burada sunulan bilgiler genel yatırım felsefesini ve araştırma perspektifini yansıtır; herhangi bir menkul kıymetin alınması veya satılması için teklif, talep veya tavsiye niteliği taşımaz. Geçmiş performans gelecekteki sonuçların göstergesi değildir. Tüm yatırımlar, ana paranın olası kaybı da dahil olmak üzere risk içerir. Ataş Capital kayıtlı bir yatırım danışmanı değildir ve halka yatırım danışmanlığı hizmeti sunmamaktadır.',
      rights: '© YEAR Ataş Capital. Tüm hakları saklıdır.',
    },
    newsletter: {
      footerTitle: 'Mektuplar e-posta ile',
      title: 'Mektuplarımızı alın',
      description:
        'Altı ayda bir yayımlanan yatırımcı mektupları ile piyasalar ve şirketler üzerine ara yazılar, yayımlandıklarında e-posta ile gönderilir. Reklam yok, gürültü yok.',
      emailLabel: 'E-posta adresi',
      placeholder: 'ornek@eposta.com',
      button: 'Kaydol',
      note: 'Herhangi bir gönderim yapılmadan önce onay e-postası alırsınız. Dilediğiniz zaman listeden çıkabilirsiniz.',
      privacyLink: 'Gizlilik Politikası',
      status: {
        pending: {
          title: 'Gelen kutunuzu kontrol edin',
          body: 'Size bir onay bağlantısı gönderdik. Aboneliğinizi tamamlamak için bağlantıya tıklayın — onaylamadan hiçbir gönderim yapılmayacak. Birkaç dakika içinde ulaşmazsa spam klasörünüze bakın.',
        },
        confirmed: {
          title: 'Aboneliğiniz onaylandı',
          body: 'Teşekkürler. Yatırımcı mektuplarımızı ve ara yazılarımızı yayımlandıkça alacaksınız. Her e-postada listeden çıkma bağlantısı bulunur.',
        },
        error: {
          title: 'Bir şeyler ters gitti',
          body: 'Bağlantının süresi dolmuş ya da adres geçersiz olabilir. Onay bağlantıları 24 saat geçerlidir — lütfen yeniden kaydolmayı deneyin.',
        },
        backLink: 'Mektuplara dön →',
      },
    },
    pages: {
      home: 'tr.html',          // Astro file-format: tr/index.astro → /tr.html
      philosophy: 'felsefe.html',
      trackRecord: 'sicil.html',
      letters: 'mektuplar.html',
      notes: 'cikarimlar.html',
      about: 'hakkinda.html',
      contact: 'iletisim.html',
      legalNotice: 'kunye.html',
      privacy: 'gizlilik.html',
      terms: 'kosullar.html',
    },
    monthLabels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
    consent: {
      text: 'Bu sitenin nasıl okunduğunu anlamak için Google Analytics kullanmak istiyoruz. Çerez yerleştirdiği için yalnızca siz kabul ederseniz çalışır. Reddetmeniz sitede hiçbir şeyi değiştirmez.',
      accept: 'Kabul et',
      reject: 'Reddet',
      privacyLink: 'Gizlilik Politikası',
      manage: 'Çerez tercihleri',
      noticeOnly: 'Gizlilik dostu, çerezsiz analitik kullanıyoruz. Hiçbir takip çerezi yerleştirilmez.',
      dismiss: 'Tamam',
    },
    notes: {
      sectionTitle: 'Çıkarımlar',
      heroSubtitle: 'Bir sonuca nasıl vardığımız, çoğu zaman sonucun kendisi kadar önemlidir.',
      sectionIntro: 'Gelecek, sektörler ve tek tek şirketler üzerine çıkarımlarımız — ve o çıkarımlara varırken izlediğimiz akıl yürütme. Bir kısmı bir yatırıma dönüşür; çoğu dönüşmez.',
      backLink: 'Tüm çıkarımlar →',
      empty: 'İlk metinler yazılıyor.',
      readLabel: 'Oku',
    },
  },
};

/** Main navigation order — used by the header and the footer "Pages" column. */
export const MAIN_NAV: (keyof PageSlug)[] = [
  'home', 'philosophy', 'trackRecord', 'letters', 'notes', 'about', 'contact',
];

/** Legal pages — linked only in the footer, never in the main navigation. */
export const LEGAL_NAV: (keyof PageSlug)[] = ['legalNotice', 'privacy', 'terms'];

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
