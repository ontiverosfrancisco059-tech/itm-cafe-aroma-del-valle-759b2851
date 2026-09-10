/* ========================================
   CAFÉ AROMA DEL VALLE — JS
   ======================================== */

(function () {
  'use strict';

  // ── STATE ──
  const cart = [];

  // ── ELEMENTS ──
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');
  const addOrderBtns = document.querySelectorAll('.add-order-btn');
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');
  const cartTotalPrice = document.getElementById('cartTotalPrice');
  const sendWhatsApp = document.getElementById('sendWhatsApp');
  const hero = document.getElementById('hero');

  // ── NAVBAR SCROLL ──
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 50);
    lastScroll = scrollY;

    // Update active nav link
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (scrollY >= top) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  });

  // ── MOBILE NAV ──
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });

  // ── HERO ANIMATION ──
  window.addEventListener('load', () => {
    hero.classList.add('loaded');
  });

  // ── SCROLL REVEAL ──
  const revealElements = document.querySelectorAll(
    '.about-images, .about-text, .section-header, .menu-card, .gallery-item, .order-info, .detail-item'
  );
  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => observer.observe(el));

  // ── MENU FILTERS ──
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      menuCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
        if (match) {
          card.classList.remove('visible');
          observer.observe(card);
        }
      });
    });
  });

  // ── CART ──
  function findCartItem(name) {
    return cart.find(item => item.name === name);
  }

  function addToCart(name, price) {
    const existing = findCartItem(name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price: Number(price), qty: 1 });
    }
    renderCart();
    showToast(`${name} agregado al pedido`);
  }

  function removeFromCart(name) {
    const idx = cart.findIndex(item => item.name === name);
    if (idx !== -1) cart.splice(idx, 1);
    renderCart();
  }

  function updateQty(name, delta) {
    const item = findCartItem(name);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(name);
    } else {
      renderCart();
    }
  }

  function getTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  function renderCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
      cartItems.innerHTML = '<p class="cart-empty">Aún no has agregado productos. Explora el menú y agrega lo que más te guste.</p>';
      cartTotal.style.display = 'none';
      sendWhatsApp.style.display = 'none';
      return;
    }

    cartItems.innerHTML = cart
      .map(
        item => `
      <div class="cart-item">
        <div class="cart-item-info">
          <span class="cart-item-name">${item.name}</span>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" data-name="${item.name}" data-delta="-1">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn" data-name="${item.name}" data-delta="1">+</button>
        </div>
        <span class="cart-item-price">$${item.price * item.qty}</span>
        <button class="cart-item-remove" data-name="${item.name}" title="Eliminar">✕</button>
      </div>
    `
      )
      .join('');

    cartTotal.style.display = 'flex';
    cartTotalPrice.textContent = '$' + getTotal();
    sendWhatsApp.style.display = 'flex';
    sendWhatsApp.disabled = false;

    // Bind qty buttons
    cartItems.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        updateQty(btn.dataset.name, Number(btn.dataset.delta));
      });
    });

    // Bind remove buttons
    cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        removeFromCart(btn.dataset.name);
      });
    });
  }

  // ── ADD ORDER BUTTONS ──
  addOrderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.name, btn.dataset.price);
      btn.textContent = '✓ Agregado';
      btn.classList.add('added');
      setTimeout(() => {
        btn.textContent = '+ Ordenar';
        btn.classList.remove('added');
      }, 1200);
    });
  });

  // ── WHATSAPP SEND ──
  sendWhatsApp.addEventListener('click', () => {
    if (cart.length === 0) return;

    const phone = '528112345678';
    let msg = '☕ *Nuevo Pedido — Café Aroma Del Valle*\n\n';
    msg += '━━━━━━━━━━━━━━━━━━━━━━━━\n';
    cart.forEach(item => {
      msg += `• ${item.name} × ${item.qty}  —  $${item.price * item.qty}\n`;
    });
    msg += '━━━━━━━━━━━━━━━━━━━━━━━━\n';
    msg += `*Total: $${getTotal()}*\n\n`;
    msg += '📍 Entrega a domicilio\n';
    msg += '⏰ ' + (new Date().toLocaleDateString('es-MX', { weekday: 'long', hour: '2-digit', minute: '2-digit' }));

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  });

  // ── TOAST ──
  function showToast(msg) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2000);
  }

  // ── SMOOTH ANCHOR CLOSE ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });

})();
