(function () {
  'use strict';

  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  var navEl = document.getElementById('nav');
  var onScrollHeader = function () {
    if (window.scrollY > 8) {
      navEl.classList.add('is-scrolled');
    } else {
      navEl.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  var body = document.body;

  var closeMenu = function () {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
    body.style.overflow = '';
  };

  var openMenu = function () {
    links.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Cerrar menú');
    body.style.overflow = 'hidden';
  };

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      body.style.overflow = open ? 'hidden' : '';
    });

    links.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });
  }

  var filterButtons = Array.prototype.slice.call(document.querySelectorAll('#menuFilters .chip'));
  var menuCards = Array.prototype.slice.call(document.querySelectorAll('#menuGrid .menu-card'));

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      filterButtons.forEach(function (btn) {
        btn.classList.remove('chip--active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('chip--active');
      button.setAttribute('aria-selected', 'true');

      var filter = button.getAttribute('data-filter');
      menuCards.forEach(function (card) {
        var match = filter === 'all' || card.getAttribute('data-category') === filter;
        card.classList.toggle('is-hidden', !match);
      });
    });
  });

  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-revealed');
    });
  }

  var navLinkEls = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
  var sections = [];

  window.addEventListener('load', function () {
    navLinkEls.forEach(function (link) {
      var id = link.getAttribute('href');
      if (id && id.charAt(0) === '#') {
        var section = document.querySelector(id);
        if (section) {
          sections.push({ id: id, section: section, link: link });
        }
      }
    });

    if ('IntersectionObserver' in window && sections.length) {
      var linkObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              sections.forEach(function (item) {
                item.link.classList.toggle('is-active', item.section === entry.target);
              });
            }
          });
        },
        { rootMargin: '-45% 0px -50% 0px' }
      );

      sections.forEach(function (item) {
        linkObserver.observe(item.section);
      });
    }
  });
})();