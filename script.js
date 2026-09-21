/* ============================================================
   Café Aroma del Valle · script.js
   Interacciones: navegación, tabs del menú, reveal, lightbox,
   pedidos por WhatsApp y datos dinámicos.
   ============================================================ */

(function () {
  'use strict';

  var WHATSAPP_NUMBER = '528112345678';

  function qs(selector, scope) { return (scope || document).querySelector(selector); }
  function qsa(selector, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(selector)); }

  /* ---------- Año dinámico en el footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Header: sombra al hacer scroll ---------- */
  var header = document.getElementById('header');
  function onScrollHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ---------- Navegación móvil ---------- */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');

  function closeNav() {
    if (!navToggle || !mainNav) return;
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('is-open');
  }

  function toggleNav() {
    var open = mainNav.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', toggleNav);
    qsa('a', mainNav).forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ---------- Tabs del menú ---------- */
  var tabs = qsa('.menu-tab');
  var panels = qsa('.menu-panel');

  function activateTab(tab) {
    if (!tab) return;
    var target = tab.getAttribute('data-tab');

    tabs.forEach(function (t) {
      var active = t === tab;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    panels.forEach(function (panel) {
      panel.classList.toggle('is-active', panel.getAttribute('data-tabpanel') === target);
    });

    var descriptors = qsa('.service-card [data-tab]');
    descriptors.forEach(function (d) {
      d.classList.toggle('is-active', d.getAttribute('data-tab') === target);
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () { activateTab(tab); });
  });

  /* CTA de "servicios" que apunta a una pestaña del menú */
  qsa('[data-tab]').forEach(function (el) {
    if (el.classList.contains('menu-tab')) return;
    el.addEventListener('click', function () {
      var targetTab = qs('.menu-tab[data-tab="' + el.getAttribute('data-tab') + '"]');
      if (targetTab) activateTab(targetTab);
    });
  });

  /* Desde un enlace externo con #?tab=… */
  function readTabFromHash() {
    var hash = window.location.hash;
    var match = hash && hash.match(/tab=([a-z]+)/);
    match.forEach && activateTab(qs('.menu-tab[data-tab="' + match[1] + '"]'));
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = qsa('.reveal');
  var scrollPadding = 26;

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px ' + scrollPadding + '% 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Pedidos por WhatsApp con plato pre-cargado ---------- */
  qsa('.wa-order').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var dish = link.getAttribute('data-dish');
      if (!dish) return;
      var message = 'Hola Café Aroma del Valle, quiero pedir: ' + dish;
      link.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
    });
  });

  /* ---------- Lightbox de galería ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  qsa('.gallery-item').forEach(function (item) {
    item.addEventListener('click', function () {
      var full = item.getAttribute('data-full');
      var img = qs('img', item);
      if (full) openLightbox(full, img ? img.getAttribute('alt') : '');
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && !lightbox.hidden) closeLightbox();
  });

  /* ---------- Preparación tras carga ---------- */
  window.addEventListener('DOMContentLoaded', function () {
    readTabFromHash();
  });
})();