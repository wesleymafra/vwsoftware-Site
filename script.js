const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

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
const quotePopupTick = 1000;
let quotePopupActiveTime = 0;
let quotePopupTimer;
let quotePopupShown = false;

const closeQuotePopup = () => {
  quotePopup?.classList.remove('open');
};

const openQuotePopup = () => {
  if (quotePopupShown || !quotePopup) return;

  quotePopupShown = true;
  window.clearInterval(quotePopupTimer);
  quotePopup.classList.add('open');
};

const startQuotePopupTimer = () => {
  if (quotePopupShown || quotePopupTimer || document.visibilityState !== 'visible') return;

  quotePopupTimer = window.setInterval(() => {
    quotePopupActiveTime += quotePopupTick;
    if (quotePopupActiveTime >= quotePopupDelay) openQuotePopup();
  }, quotePopupTick);
};

const pauseQuotePopupTimer = () => {
  window.clearInterval(quotePopupTimer);
  quotePopupTimer = undefined;
};

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
