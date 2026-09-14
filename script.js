(function () {
  'use strict';

  var header = document.getElementById('header');
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  var headerCta = document.querySelector('.header__cta');

  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  function toggleMenu() {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
    if (headerCta) headerCta.classList.toggle('active');
  }

  function closeMenu() {
    burger.classList.remove('active');
    nav.classList.remove('active');
    if (headerCta) headerCta.classList.remove('active');
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  burger.addEventListener('click', toggleMenu);

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* ---- Menu category tabs ---- */
  var tabs = document.querySelectorAll('.menu__tab');
  var items = document.querySelectorAll('.menu__item');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var category = tab.getAttribute('data-category');

      tabs.forEach(function (t) {
        t.classList.toggle('menu__tab--active', t === tab);
      });

      items.forEach(function (item) {
        var matches = item.getAttribute('data-category') === category;
        item.classList.toggle('menu__item--hidden', !matches);
        item.classList.toggle('menu__item--visible', matches);
      });
    });
  });
})();