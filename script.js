(function () {
  'use strict';

  var WHATSAPP_NUMBER = '528112345678';

  var header = document.getElementById('siteHeader');
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');

  document.getElementById('year').textContent = new Date().getFullYear();

  function onScroll() {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      mainNav.classList.toggle('open', !isOpen);
    });

    mainNav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        navToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('open');
      }
    });
  }

  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.tab-panel'));

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.getAttribute('data-tab');

      tabs.forEach(function (t) {
        var active = t === tab;
        t.classList.toggle('active', active);
        t.setAttribute('aria-selected', String(active));
      });

      panels.forEach(function (panel) {
        panel.classList.toggle('active', panel.getAttribute('data-panel') === target);
      });
    });
  });

  function buildMessage(itemName, price) {
    var texto =
      'Hola Café Aroma Del Valle, me gustaría pedir:' +
      '\n\n• ' + itemName + (price ? '  —  $' + price + ' MXN' : '') +
      '\n\n¿Me confirmas disponibilidad y envío a domicilio?';
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(texto);
  }

  var orderButtons = Array.prototype.slice.call(document.querySelectorAll('.order-btn'));
  orderButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var name = btn.getAttribute('data-name') || 'un producto del menú';
      var price = btn.getAttribute('data-price') || '';
      window.open(buildMessage(name, price), '_blank', 'noopener');
    });
  });
})();