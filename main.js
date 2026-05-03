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

  // ─── JOURNEY SCROLL ENGINE (Enhanced) ───
  function initJourney() {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;
      const windowH = window.innerHeight;
      const journeyPercent = Math.min(scrollPos / windowH, 1.5); // Reveal completes over ~1.5 screens

      // Layer 1: Sky (Reveals 0-25%)
      const skyOpacity = Math.max(0, Math.min(journeyPercent * 4, 1));
      if (studio.layers.sky) {
        studio.layers.sky.style.opacity = skyOpacity;
        studio.layers.sky.style.transform = `scale(${1 - (journeyPercent * 0.03)})`;
      }

      // Layer 2: Window (Reveals 15-55%)
      const windowOpacity = Math.max(0, Math.min((journeyPercent - 0.15) * 2.8, 1));
      if (studio.layers.window) {
        studio.layers.window.style.opacity = windowOpacity;
        studio.layers.window.style.transform = `scale(${1.02 - (windowOpacity * 0.04)}) translateY(${8 - (windowOpacity * 8)}px)`;
      }

      // Layer 3: Desk (Reveals 40-85%)
      const deskOpacity = Math.max(0, Math.min((journeyPercent - 0.4) * 2.2, 1));
      if (studio.layers.desk) {
        studio.layers.desk.style.opacity = deskOpacity;
        studio.layers.desk.style.transform = `translateY(${24 - (deskOpacity * 24)}px) scaleY(${0.95 + (deskOpacity * 0.05)})`;
      }

      // Layer 4: Props (Reveals 60-100%)
      const propsOpacity = Math.max(0, Math.min((journeyPercent - 0.6) * 2.5, 1));
      if (studio.layers.props) {
        studio.layers.props.style.opacity = propsOpacity;
        studio.layers.props.style.transform = `scale(${0.98 + (propsOpacity * 0.02)})`;
      }

      // Hero content fade & parallax
      const hero = document.querySelector('.hero-typography');
      if (hero) {
        hero.style.opacity = Math.max(0, 1 - (journeyPercent * 1.2));
        hero.style.transform = `translateY(${journeyPercent * -60}px) scale(${1 - (journeyPercent * 0.05)})`;
      }

      // Scroll indicator fade
      const scrollInd = document.querySelector('.scroll-indicator');
      if (scrollInd) {
        scrollInd.style.opacity = Math.max(0, 1 - (journeyPercent * 2));
        scrollInd.style.pointerEvents = journeyPercent > 0.5 ? 'none' : 'auto';
      }
    }, { passive: true });
  }

  // ─── SCROLL REVEAL (Enhanced IntersectionObserver) ───
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add small delay for stagger effect
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, index * 50);
        }
      });
    }, { 
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    // Observe all reveal elements
    document.querySelectorAll(
      '[data-reveal], .about-card, .project-tile, .secondary-tile, .creative-tile, .projects-group'
    ).forEach(el => observer.observe(el));
  }

  // ─── INITIAL HERO REVEAL ───
  function startHeroReveal() {
    setTimeout(() => {
      const heroElements = document.querySelectorAll('.hero-typography [data-reveal]');
      heroElements.forEach((el, idx) => {
        setTimeout(() => {
          el.classList.add('revealed');
        }, idx * 150);
      });
    }, 200);
  }

  // ─── PARALLAX ON PROJECT TILES ───
  function initTileParallax() {
    document.querySelectorAll('.project-tile, .secondary-tile, .creative-tile').forEach(tile => {
      tile.addEventListener('mousemove', (e) => {
        const rect = tile.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const rotX = (y - 0.5) * 5;
        const rotY = (x - 0.5) * 5;
        
        tile.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      });
      
      tile.addEventListener('mouseleave', () => {
        tile.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      });
    });
  }

  // ─── INIT ───
  function init() {
    initJourney();
    initScrollReveal();
    startHeroReveal();
    initTileParallax();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
