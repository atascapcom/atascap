// ============================================
// ATAŞ CAPITAL — Shared Components & Interactions
// ============================================

(function () {
  'use strict';

  // ── Configuration ──
  const LANGUAGES = {
    en: {
      nav: {
        home: 'Home',
        philosophy: 'Philosophy',
        trackRecord: 'Track Record',
        letters: 'Letters',
        about: 'About',
        contact: 'Contact'
      },
      footer: {
        tagline: 'A quiet pursuit of enduring value.',
        colPages: 'Pages',
        colConnect: 'Connect',
        disclaimer: 'Disclaimer: This website is intended solely for informational and educational purposes. Ataş Capital manages its own capital and operates on a private, invitation-only basis. The information presented here reflects general investment philosophy and research perspective; it does not constitute an offer, solicitation, or recommendation to buy or sell any securities. Past performance is not indicative of future results. All investments involve risk, including possible loss of principal. Ataş Capital is not a registered investment adviser and does not provide investment advisory services to the public.',
        rights: '© YEAR Ataş Capital. All rights reserved.'
      },
      pages: {
        home: 'index.html',
        philosophy: 'philosophy.html',
        trackRecord: 'track-record.html',
        letters: 'letters.html',
        about: 'about.html',
        contact: 'contact.html'
      }
    },
    es: {
      nav: {
        home: 'Inicio',
        philosophy: 'Filosofía',
        trackRecord: 'Historial',
        letters: 'Cartas',
        about: 'Nosotros',
        contact: 'Contacto'
      },
      footer: {
        tagline: 'Una búsqueda silenciosa de valor duradero.',
        colPages: 'Páginas',
        colConnect: 'Conectar',
        disclaimer: 'Aviso legal: Este sitio web tiene fines exclusivamente informativos y educativos. Ataş Capital gestiona su propio capital y opera de forma privada, solo por invitación. La información aquí presentada refleja una filosofía y perspectiva de inversión general; no constituye una oferta, solicitud o recomendación para comprar o vender valores. El rendimiento pasado no es indicativo de resultados futuros. Todas las inversiones conllevan riesgos, incluida la posible pérdida del capital. Ataş Capital no es un asesor de inversiones registrado y no presta servicios de asesoramiento de inversiones al público.',
        rights: '© YEAR Ataş Capital. Todos los derechos reservados.'
      },
      pages: {
        home: 'index.html',
        philosophy: 'filosofia.html',
        trackRecord: 'historial.html',
        letters: 'cartas.html',
        about: 'sobre.html',
        contact: 'contacto.html'
      }
    },
    tr: {
      nav: {
        home: 'Ana Sayfa',
        philosophy: 'Felsefe',
        trackRecord: 'Sicil',
        letters: 'Mektuplar',
        about: 'Hakkında',
        contact: 'İletişim'
      },
      footer: {
        tagline: 'Kalıcı değerin sessiz arayışı.',
        colPages: 'Sayfalar',
        colConnect: 'İletişim',
        disclaimer: 'Yasal Uyarı: Bu web sitesi yalnızca bilgilendirme ve eğitim amaçlıdır. Ataş Capital kendi sermayesini yönetir ve özel, yalnızca davetle çalışır. Burada sunulan bilgiler genel yatırım felsefesini ve araştırma perspektifini yansıtır; herhangi bir menkul kıymetin alınması veya satılması için teklif, talep veya tavsiye niteliği taşımaz. Geçmiş performans gelecekteki sonuçların göstergesi değildir. Tüm yatırımlar, ana paranın olası kaybı da dahil olmak üzere risk içerir. Ataş Capital kayıtlı bir yatırım danışmanı değildir ve halka yatırım danışmanlığı hizmeti sunmamaktadır.',
        rights: '© YEAR Ataş Capital. Tüm hakları saklıdır.'
      },
      pages: {
        home: 'index.html',
        philosophy: 'felsefe.html',
        trackRecord: 'sicil.html',
        letters: 'mektuplar.html',
        about: 'hakkinda.html',
        contact: 'iletisim.html'
      }
    }
  };

  // ── Detect Language ──
  function detectLanguage() {
    const path = window.location.pathname;
    if (path.includes('/es/')) return 'es';
    if (path.includes('/tr/')) return 'tr';
    return 'en';
  }

  // ── Get Path Prefix ──
  function getPathPrefix(lang) {
    const current = detectLanguage();
    if (lang === 'en') {
      if (current === 'en') return '';
      return '../';
    }
    if (current === lang) return '';
    if (current === 'en') return lang + '/';
    return '../' + lang + '/';
  }

  // ── Get Current Page Key ──
  function getCurrentPageKey() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';

    // Check across all languages for matching filenames
    for (const lang of Object.values(LANGUAGES)) {
      for (const [key, file] of Object.entries(lang.pages)) {
        if (filename === file) return key;
      }
    }
    return 'home';
  }

  // ── Render Header ──
  function renderHeader() {
    const lang = detectLanguage();
    const t = LANGUAGES[lang];
    const currentPage = getCurrentPageKey();
    const prefix = (lang === 'en') ? '' : '';

    // Build nav links
    const navLinks = Object.entries(t.nav).map(([key, label]) => {
      const href = (lang === 'en' ? '' : '') + t.pages[key];
      const isActive = key === currentPage ? ' class="active"' : '';
      return `<li><a href="${href}"${isActive}>${label}</a></li>`;
    }).join('');

    // Build language switcher
    const langLinks = ['en', 'es', 'tr'].map(l => {
      const isActive = l === lang ? ' class="active"' : '';
      const prefix = getPathPrefix(l);
      const targetPage = LANGUAGES[l].pages[currentPage] || 'index.html';
      return `<a href="${prefix}${targetPage}"${isActive}>${l.toUpperCase()}</a>`;
    }).join('<span class="lang-switcher__sep">·</span>');

    const headerHTML = `
      <header class="site-header">
        <div class="container">
          <a href="${t.pages.home}" class="logo">ATAŞ CAPITAL</a>
          <nav class="site-nav" id="siteNav">
            <ul class="site-nav__links">
              ${navLinks}
            </ul>
            <div class="lang-switcher">
              ${langLinks}
            </div>
          </nav>
          <button class="menu-toggle" id="menuToggle" aria-label="Menu">☰</button>
        </div>
      </header>
      <div class="nav-overlay" id="navOverlay"></div>
    `;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }

  // ── Render Footer ──
  function renderFooter() {
    const lang = detectLanguage();
    const t = LANGUAGES[lang];
    const year = new Date().getFullYear();

    const navLinks = Object.entries(t.nav).map(([key, label]) => {
      const href = t.pages[key];
      return `<li><a href="${href}">${label}</a></li>`;
    }).join('');

    const langLinks = ['en', 'es', 'tr'].map(l => {
      const isActive = l === lang ? ' class="active"' : '';
      const prefix = getPathPrefix(l);
      const currentPage = getCurrentPageKey();
      const targetPage = LANGUAGES[l].pages[currentPage] || 'index.html';
      return `<a href="${prefix}${targetPage}"${isActive}>${l.toUpperCase()}</a>`;
    }).join('<span class="lang-switcher__sep">·</span>');

    const footerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-top">
            <div class="footer-brand">
              <a href="${t.pages.home}" class="logo">ATAŞ CAPITAL</a>
              <p>${t.tagline || t.footer.tagline}</p>
            </div>
            <div class="footer-nav">
              <div class="footer-nav__col">
                <h4>${t.footer.colPages}</h4>
                <ul>${navLinks}</ul>
              </div>
              <div class="footer-nav__col">
                <h4>${t.footer.colConnect}</h4>
                <ul>
                  <li><a href="mailto:askin@atascap.com">askin@atascap.com</a></li>
                  <li><a href="https://linkedin.com/in/askinatas" target="_blank" rel="noopener">LinkedIn</a></li>
                  <li><a href="https://x.com/asaborsa" target="_blank" rel="noopener">X / Twitter</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-disclaimer">
            ${t.footer.disclaimer}
          </div>
          <div class="footer-bottom">
            <span>${t.footer.rights.replace('YEAR', year)}</span>
            <div class="lang-switcher">
              ${langLinks}
            </div>
          </div>
        </div>
      </footer>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

  // ── Mobile Menu ──
  function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('siteNav');
    const overlay = document.getElementById('navOverlay');

    if (!toggle || !nav) return;

    function openMenu(e) {
      e.preventDefault();
      e.stopPropagation();
      nav.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active');
    }

    function closeMenu() {
      nav.classList.remove('open');
      if (overlay) overlay.classList.remove('active');
    }

    toggle.addEventListener('click', openMenu);
    toggle.addEventListener('touchstart', openMenu);

    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // ── Cookie Banner ──
  function initCookieBanner() {
    if (localStorage.getItem('cookiesAccepted') !== null) {
      const banner = document.getElementById('cookieBanner');
      if (banner) banner.style.display = 'none';
    }
  }

  window.acceptCookies = function () {
    localStorage.setItem('cookiesAccepted', 'true');
    const banner = document.getElementById('cookieBanner');
    if (banner) banner.style.display = 'none';
  };

  window.declineCookies = function () {
    localStorage.setItem('cookiesAccepted', 'false');
    const banner = document.getElementById('cookieBanner');
    if (banner) banner.style.display = 'none';
  };

  // ── Initialize ──
  document.addEventListener('DOMContentLoaded', function () {
    renderHeader();
    renderFooter();
    initMobileMenu();
    initCookieBanner();
  });
})();