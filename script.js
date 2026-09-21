const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const nome = String(formData.get('nome') || '').trim();
    const empresa = String(formData.get('empresa') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const solucao = String(formData.get('solucao') || '').trim();
    const mensagem = String(formData.get('mensagem') || '').trim();
    const subject = `Solicitação de contato${empresa ? ` - ${empresa}` : ''}`;
    const body = [
      `Nome: ${nome}`,
      `Empresa: ${empresa || 'Não informado'}`,
      `E-mail: ${email}`,
      `Solução de interesse: ${solucao}`,
      '',
      'Mensagem:',
      mensagem || 'Não informado'
    ].join('\n');

    window.location.href = `mailto:contato@vwsoftware.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
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
