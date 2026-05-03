(function () {
  'use strict';

  // ─── CONFIG & STATE ───
  const studio = {
    scene: document.getElementById('studio-scene'),
    layers: {
      sky: document.querySelector('.layer-sky'),
      window: document.querySelector('.layer-window'),
      desk: document.querySelector('.layer-desk'),
      props: document.querySelector('.layer-props')
    }
  };

  // ─── JOURNEY SCROLL ENGINE ───
  function initJourney() {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;
      const windowH = window.innerHeight;
      const journeyPercent = Math.min(scrollPos / windowH, 1.2); // Reveal completes over ~1.2 screens

      // Layer 1: Sky (Reveals 0-30%)
      const skyOpacity = Math.min(journeyPercent * 3, 1);
      if (studio.layers.sky) studio.layers.sky.style.opacity = skyOpacity;

      // Layer 2: Window (Reveals 20-60%)
      const windowOpacity = Math.max(0, Math.min((journeyPercent - 0.2) * 2.5, 1));
      if (studio.layers.window) {
        studio.layers.window.style.opacity = windowOpacity;
        studio.layers.window.style.transform = `scale(${1.05 - (windowOpacity * 0.05)})`;
      }

      // Layer 3: Desk (Reveals 50-90%)
      const deskOpacity = Math.max(0, Math.min((journeyPercent - 0.5) * 2.5, 1));
      if (studio.layers.desk) {
        studio.layers.desk.style.opacity = deskOpacity;
        studio.layers.desk.style.transform = `translateY(${20 - (deskOpacity * 20)}px)`;
      }

      // Layer 4: Props (Reveals 70-100%)
      const propsOpacity = Math.max(0, Math.min((journeyPercent - 0.7) * 3, 1));
      if (studio.layers.props) studio.layers.props.style.opacity = propsOpacity;

      // Fade Hero Typography
      const hero = document.querySelector('.hero-typography');
      if (hero) {
        hero.style.opacity = 1 - (journeyPercent * 1.5);
        hero.style.transform = `translateY(${journeyPercent * -50}px)`;
      }
    }, { passive: true });
  }

  // ─── SCROLL REVEAL (IntersectionObserver) ───
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-reveal], .about-card, .project-tile, .secondary-tile, .creative-tile').forEach(el => observer.observe(el));
  }

  // ─── INITIAL REVEAL ───
  function startHeroReveal() {
    setTimeout(() => {
      document.querySelectorAll('.hero-typography [data-reveal]').forEach(el => el.classList.add('revealed'));
    }, 300);
  }

  // ─── INIT ───
  function init() {
    initJourney();
    initScrollReveal();
    startHeroReveal();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
