/* ========================================
   Café Aroma Del Valle — Script
   ======================================== */

(function () {
  'use strict';

  // ---- Header scroll effect ----
  const header = document.getElementById('header');
  const handleScroll = () => {
    header.classList.toggle('header--scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ---- Mobile menu toggle ----
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('header__toggle--active');
    nav.classList.toggle('header__nav--open');
  });

  nav.querySelectorAll('.header__link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('header__toggle--active');
      nav.classList.remove('header__nav--open');
    });
  });

  // ---- Menu tabs ----
  const tabs = document.querySelectorAll('.menu__tab');
  const panels = document.querySelectorAll('.menu__panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('menu__tab--active'));
      tab.classList.add('menu__tab--active');

      panels.forEach(p => p.classList.remove('menu__panel--active'));
      const panel = document.querySelector(`[data-panel="${target}"]`);
      if (panel) panel.classList.add('menu__panel--active');
    });
  });

  // ---- Active nav link on scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header__link');

  const observeSections = () => {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('header__link--active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('header__link--active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', observeSections, { passive: true });

  // ---- Reveal on scroll (Intersection Observer) ----
  const revealElements = document.querySelectorAll(
    '.about__text, .about__images, .menu__header, .menu__tabs, .gallery__header, .gallery__grid, .contact__info, .contact__map'
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    revealObserver.observe(el);
  });

  // ---- Gallery lightbox ----
  const galleryItems = document.querySelectorAll('.gallery__item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;

      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position:fixed;inset:0;z-index:9999;
        background:rgba(0,0,0,0.9);
        display:flex;align-items:center;justify-content:center;
        cursor:pointer;
        animation:fadeIn 0.3s ease;
      `;

      const fullImg = document.createElement('img');
      fullImg.src = img.src;
      fullImg.alt = img.alt;
      fullImg.style.cssText = `
        max-width:90vw;max-height:90vh;
        object-fit:contain;border-radius:8px;
        box-shadow:0 8px 40px rgba(0,0,0,0.5);
      `;

      const caption = item.querySelector('.gallery__caption');
      if (caption) {
        const cap = document.createElement('p');
        cap.textContent = caption.textContent;
        cap.style.cssText = `
          position:absolute;bottom:32px;left:50%;
          transform:translateX(-50%);color:#fff;
          font-size:1rem;font-family:'Inter',sans-serif;
          background:rgba(0,0,0,0.5);padding:8px 20px;
          border-radius:8px;white-space:nowrap;
        `;
        overlay.appendChild(cap);
      }

      const closeBtn = document.createElement('div');
      closeBtn.innerHTML = '&times;';
      closeBtn.style.cssText = `
        position:absolute;top:20px;right:24px;
        color:#fff;font-size:2.5rem;cursor:pointer;
        width:48px;height:48px;display:flex;align-items:center;
        justify-content:center;transition:transform 0.2s;
        line-height:1;
      `;
      closeBtn.addEventListener('mouseenter', () => closeBtn.style.transform = 'scale(1.2)');
      closeBtn.addEventListener('mouseleave', () => closeBtn.style.transform = 'scale(1)');

      overlay.appendChild(fullImg);
      overlay.appendChild(closeBtn);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      const close = () => {
        overlay.remove();
        document.body.style.overflow = '';
      };

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target === closeBtn) close();
      });

      document.addEventListener('keydown', function handler(e) {
        if (e.key === 'Escape') {
          close();
          document.removeEventListener('keydown', handler);
        }
      });
    });
  });

})();
