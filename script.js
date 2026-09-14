/* ═══════════════════════════════════════════
   Café Aroma Del Valle – Scripts
   Cafetería de Especialidad · Monterrey
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Header scroll ─────────────────────── */
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('header--scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Active nav link ───────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header__nav-link');
  const highlightNav = () => {
    const y = window.scrollY + 120;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const h = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (y >= top && y < top + h) {
        navLinks.forEach(l => {
          l.classList.toggle('header__nav-link--active',
            l.getAttribute('href') === '#' + id);
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ── Mobile menu ───────────────────────── */
  const menuBtn = document.getElementById('menuBtn');
  const mainNav = document.getElementById('mainNav');
  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
      const open = mainNav.classList.toggle('header__nav--open');
      menuBtn.classList.toggle('header__menu-btn--open', open);
      menuBtn.setAttribute('aria-expanded', open);
    });
    mainNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mainNav.classList.remove('header__nav--open');
        menuBtn.classList.remove('header__menu-btn--open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Menu category filter ──────────────── */
  const catBtns = document.querySelectorAll('.menu__cat-btn');
  const menuItems = document.querySelectorAll('.menu__item');
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('menu__cat-btn--active'));
      btn.classList.add('menu__cat-btn--active');
      const cat = btn.dataset.category;
      menuItems.forEach(item => {
        if (cat === 'all' || item.dataset.category === cat) {
          item.style.display = '';
          item.style.opacity = '0';
          requestAnimationFrame(() => {
            item.style.transition = 'opacity 0.4s ease';
            item.style.opacity = '1';
          });
        } else {
          item.style.opacity = '0';
          setTimeout(() => { item.style.display = 'none'; }, 350);
        }
      });
    });
  });

  /* ── Gallery lightbox ──────────────────── */
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox__close" aria-label="Cerrar">&times;</button>
    <img src="" alt="">
  `;
  document.body.appendChild(lightbox);

  const lbImg = lightbox.querySelector('img');
  const lbClose = lightbox.querySelector('.lightbox__close');

  document.querySelectorAll('.gallery__item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lightbox.classList.add('lightbox--active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('lightbox--active');
    document.body.style.overflow = '';
  };
  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ── Scroll fade-in ────────────────────── */
  const fadeEls = document.querySelectorAll(
    '.about__text, .about__img-wrap, .menu__item, .gallery__item, .contact__info, .contact__map, .section-tag, .section-title'
  );
  fadeEls.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('fade-in--visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  fadeEls.forEach(el => observer.observe(el));

  /* ── Smooth scroll for anchor links ────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();