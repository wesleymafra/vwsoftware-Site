const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.textContent = open ? '✕' : '☰';
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const quotePopup = document.querySelector('.quote-popup');
const quotePopupClose = document.querySelector('.quote-popup-close');
const quotePopupButton = document.querySelector('.quote-popup-button');

const closeQuotePopup = () => {
  quotePopup.classList.remove('open');
};

window.addEventListener('load', () => {
  window.setTimeout(() => quotePopup.classList.add('open'), 900);
});

quotePopupClose.addEventListener('click', closeQuotePopup);

quotePopup.addEventListener('click', (event) => {
  if (event.target === quotePopup) closeQuotePopup();
});

quotePopupButton.addEventListener('click', closeQuotePopup);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && quotePopup.classList.contains('open')) closeQuotePopup();
});
