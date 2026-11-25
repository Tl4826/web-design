import ScrollReveal from 'scrollreveal';
export default function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const sr = ScrollReveal({ distance: '24px', duration: 650, easing: 'ease-out', reset: false });
  sr.reveal('.banner-text', { origin: 'bottom', interval: 120 });
  sr.reveal('.banner-cta', { delay: 200 });
  sr.reveal('.section-title', { distance: '12px' });
  sr.reveal('.section-content', { delay: 100, interval: 100 });
}
