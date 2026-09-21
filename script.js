const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

// Redes sociais: somente o WhatsApp fica flutuante; Instagram e Facebook ficam no rodapé.
const floatingInstagram = document.querySelector('.floating-social .instagram');
if (floatingInstagram) {
  floatingInstagram.remove();
}

const footerBrand = document.querySelector('.footer-brand');
if (footerBrand) {
  const footerSocial = document.createElement('div');
  footerSocial.className = 'footer-social';
  footerSocial.setAttribute('aria-label', 'Redes sociais');
  footerSocial.innerHTML = `
    <a class="footer-social-link instagram" href="https://www.instagram.com/vwsoftware.com.br/" target="_blank" rel="noreferrer" aria-label="Abrir o Instagram da VW Software" title="Instagram">
      <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle class="instagram-dot" cx="17.5" cy="6.5" r="1" /></svg>
    </a>
    <a class="footer-social-link facebook" href="https://www.facebook.com/vwsoftware.com.br/" target="_blank" rel="noreferrer" aria-label="Abrir o Facebook da VW Software" title="Facebook">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.7 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V4a22 22 0 0 0-2.4-.1c-2.4 0-4.1 1.5-4.1 4.2V10H8v3h2.5v8h3.2Z" /></svg>
    </a>`;
  footerBrand.appendChild(footerSocial);
}

const supportLink = document.querySelector('.support-actions .text-link');
if (supportLink) {
  supportLink.href = 'mailto:suporte@vwsoftware.com.br';
  supportLink.textContent = 'suporte@vwsoftware.com.br →';
}

const contactColumn = document.querySelector('footer .footer-grid > div:last-child');
if (contactColumn && !contactColumn.querySelector('a[href="mailto:suporte@vwsoftware.com.br"]')) {
  const supportEmail = document.createElement('a');
  supportEmail.href = 'mailto:suporte@vwsoftware.com.br';
  supportEmail.textContent = 'suporte@vwsoftware.com.br';
  contactColumn.appendChild(supportEmail);
}

const setMenuState = (open) => {
  if (!toggle || !nav) return;

  nav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  toggle.textContent = open ? '✕' : '☰';
};

if (toggle && nav) {
  toggle.addEventListener('click', () => setMenuState(!nav.classList.contains('open')));

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });
}

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

const erpFeatures = document.querySelector('.erp-copy ul');
if (erpFeatures) {
  ['Sistema de Ponto, RH e DP com assinatura digital e validade jurídica', 'Sistema de PDV'].forEach((feature) => {
    const item = document.createElement('li');
    item.textContent = feature;
    erpFeatures.appendChild(item);
  });
}

const quotePopup = document.querySelector('.quote-popup');
const quotePopupClose = document.querySelector('.quote-popup-close');
const quotePopupButton = document.querySelector('.quote-popup-button');
const quotePopupDelay = 45 * 1000;
let quotePopupActiveTime = 0;
let quotePopupTimer;
let quotePopupStartedAt;
let quotePopupShown = false;
let quotePopupReturnFocus;

const closeQuotePopup = () => {
  if (!quotePopup) return;

  quotePopup.classList.remove('open');
  quotePopup.setAttribute('aria-hidden', 'true');
  quotePopupReturnFocus?.focus({ preventScroll: true });
};

const openQuotePopup = () => {
  if (quotePopupShown || !quotePopup) return;

  quotePopupShown = true;
  quotePopupReturnFocus = document.activeElement instanceof HTMLElement
    ? document.activeElement
    : null;
  window.clearTimeout(quotePopupTimer);
  quotePopup.classList.add('open');
  quotePopup.setAttribute('aria-hidden', 'false');
  quotePopupClose?.focus({ preventScroll: true });
};

const startQuotePopupTimer = () => {
  if (quotePopupShown || quotePopupTimer || document.visibilityState !== 'visible') return;

  quotePopupStartedAt = Date.now();
  quotePopupTimer = window.setTimeout(() => {
    quotePopupActiveTime += Date.now() - quotePopupStartedAt;
    openQuotePopup();
  }, Math.max(quotePopupDelay - quotePopupActiveTime, 0));
};

const pauseQuotePopupTimer = () => {
  if (!quotePopupTimer) return;

  quotePopupActiveTime += Date.now() - quotePopupStartedAt;
  window.clearTimeout(quotePopupTimer);
  quotePopupTimer = undefined;
};

quotePopup?.setAttribute('aria-hidden', 'true');

window.addEventListener('load', startQuotePopupTimer);

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    startQuotePopupTimer();
  } else {
    pauseQuotePopupTimer();
  }
});

quotePopupClose?.addEventListener('click', closeQuotePopup);

quotePopup?.addEventListener('click', (event) => {
  if (event.target === quotePopup) closeQuotePopup();
});

quotePopupButton?.addEventListener('click', closeQuotePopup);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && quotePopup?.classList.contains('open')) closeQuotePopup();
});
