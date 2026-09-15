(function () {
  'use strict';

  var WA_NUMBER = '528112345678';
  var WA_PRE_TEXT = 'Hola, me gustaría hacer un pedido en Café Aroma Del Valle.';
  var ordered = {}; // key: menu item name -> { name, price, qty }

  /* ---------------- Header / mobile nav ---------------- */
  var header = document.getElementById('header');
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  function onScroll() {
    header.classList.toggle('header--scrolled', window.scrollY > 30);
  }

  function closeMenu() {
    burger.classList.remove('active');
    nav.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('active');
    burger.classList.toggle('active', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Menu category tabs ---------------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.menu__tab'));
  var items = Array.prototype.slice.call(document.querySelectorAll('.menu__item'));

  function showCategory(category) {
    tabs.forEach(function (tab) {
      var active = tab.getAttribute('data-category') === category;
      tab.classList.toggle('menu__tab--active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    items.forEach(function (item) {
      var show = item.getAttribute('data-category') === category;
      item.style.display = show ? '' : 'none';
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      showCategory(tab.getAttribute('data-category'));
    });
  });

  // Footer links that jump to a menu category
  document.querySelectorAll('[data-category-link]').forEach(function (link) {
    link.addEventListener('click', function () {
      showCategory(link.getAttribute('data-category-link'));
    });
  });

  showCategory('cafe'); // initial state

  /* ---------------- Order bar / WhatsApp order ---------------- */
  var orderbar = document.getElementById('orderbar');
  var orderSummary = document.getElementById('orderSummary');
  var orderLink = document.getElementById('orderLink');

  function orderCount() {
    return Object.keys(ordered).reduce(function (acc, key) {
      return acc + ordered[key].qty;
    }, 0);
  }

  function orderTotal() {
    return Object.keys(ordered).reduce(function (acc, key) {
      return acc + ordered[key].price * ordered[key].qty;
    }, 0);
  }

  function buildMessage() {
    var lines = Object.keys(ordered).map(function (key) {
      var item = ordered[key];
      return item.qty + 'x ' + item.name + ' ($' + item.price + ')';
    });
    lines.push('Total: $' + orderTotal());
    return WA_PRE_TEXT + '\n\n' + lines.join('\n');
  }

  function updateOrderBar() {
    var count = orderCount();
    orderSummary.textContent = count + (count === 1 ? ' artículo' : ' artículos') + ' · $' + orderTotal();
    orderLink.href =
      'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(buildMessage());
    orderbar.classList.toggle('orderbar--open', count > 0);
    orderbar.setAttribute('aria-hidden', count > 0 ? 'false' : 'true');
  }

  document.querySelectorAll('.menu__add').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var name = btn.getAttribute('data-name');
      var price = Number(btn.getAttribute('data-price'));

      if (!ordered[name]) {
        ordered[name] = { name: name, price: price, qty: 0 };
      }
      ordered[name].qty += 1;

      btn.classList.add('menu__add--added');
      btn.textContent = 'Añadido ✓';
      window.setTimeout(function () {
        btn.classList.remove('menu__add--added');
        btn.textContent = 'Añadir';
      }, 1200);

      updateOrderBar();
    });
  });

  /* ---------------- Gallery lightbox ---------------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxCaption = document.getElementById('lightbox-caption');
  var lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(src, alt, caption) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('lightbox--open');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    lightbox.classList.remove('lightbox--open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
  }

  document.querySelectorAll('.gallery__item').forEach(function (figure) {
    figure.addEventListener('click', function () {
      var img = figure.querySelector('img');
      if (img) openLightbox(img.src, img.alt, figure.getAttribute('data-caption'));
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu();
      closeLightbox();
    }
  });
})();