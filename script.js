(() => {
  "use strict";

  const PHONE = "528112345678";

  /* ---------- Navegación móvil ---------- */
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");

  const closeMobileNav = () => {
    hamburger.classList.remove("active");
    mobileNav.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  };

  hamburger.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    hamburger.classList.toggle("active", open);
    hamburger.setAttribute("aria-expanded", String(open));
  });

  mobileNav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMobileNav));

  /* ---------- Navbar al hacer scroll + sección activa ---------- */
  const navbar = document.getElementById("navbar");
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".navbar-links a");

  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 24);

    let current = "";
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    navLinks.forEach(link =>
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`)
    );
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Filtros del menú ---------- */
  const filters = document.querySelectorAll(".menu-filter");
  const cards = document.querySelectorAll(".menu-card");

  filters.forEach(btn => {
    btn.addEventListener("click", () => {
      filters.forEach(b => {
        const isActive = b === btn;
        b.classList.toggle("active", isActive);
        b.setAttribute("aria-pressed", String(isActive));
      });

      const cat = btn.dataset.filter;
      cards.forEach(card => {
        const cats = (card.dataset.cats || "").split(" ").filter(Boolean);
        const show = cat === "all" || cats.includes(cat);
        card.style.display = show ? "" : "none";
        if (show) {
          card.classList.remove("card-in");
          void card.offsetWidth;
          card.classList.add("card-in");
        }
      });
    });
  });

  /* ---------- Carrito para pedido por WhatsApp ---------- */
  const cart = new Map(); // name -> { price, qty }

  const cartFabWrap = document.getElementById("cartFabWrap");
  const cartCount = document.getElementById("cartCount");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartBody = document.getElementById("cartBody");
  const cartTotal = document.getElementById("cartTotal");
  const cartSend = document.getElementById("cartSend");
  const cartClose = document.getElementById("cartClose");
  const cartBackdrop = document.getElementById("cartBackdrop");

  const money = n => `$${n}`;

  const renderCart = () => {
    const entries = [...cart.entries()];
    const count = entries.reduce((sum, [, item]) => sum + item.qty, 0);
    const total = entries.reduce((sum, [, item]) => sum + item.price * item.qty, 0);

    cartCount.textContent = count;
    cartTotal.textContent = money(total);
    cartFabWrap.hidden = count === 0;

    if (!entries.length) {
      cartBody.innerHTML = `<p class="cart-empty">Tu carrito está vacío. Agrega algo delicioso del menú.</p>`;
      cartSend.disabled = true;
      return;
    }

    cartSend.disabled = false;
    cartBody.innerHTML = entries.map(([name, item]) => `
      <div class="cart-item">
        <div class="cart-item-info">
          <p class="cart-item-name">${name}</p>
          <p class="cart-item-price">${money(item.price)} · <b>${money(item.price * item.qty)}</b></p>
        </div>
        <div class="stepper">
          <button type="button" data-dec="${name}" aria-label="Quitar uno">−</button>
          <span>${item.qty}</span>
          <button type="button" data-inc="${name}" aria-label="Agregar uno">+</button>
        </div>
        <button type="button" class="cart-item-remove" data-remove="${name}" aria-label="Eliminar">×</button>
      </div>
    `).join("");

    cartBody.querySelectorAll("[data-inc]").forEach(btn =>
      btn.addEventListener("click", () => { bump(btn.dataset.inc, 1); })
    );
    cartBody.querySelectorAll("[data-dec]").forEach(btn =>
      btn.addEventListener("click", () => { bump(btn.dataset.dec, -1); })
    );
    cartBody.querySelectorAll("[data-remove]").forEach(btn =>
      btn.addEventListener("click", () => {
        cart.delete(btn.dataset.remove);
        renderCart();
      })
    );
  };

  const bump = (name, delta) => {
    const item = cart.get(name);
    if (!item) return;
    item.qty = Math.min(99, Math.max(0, item.qty + delta));
    if (item.qty === 0) cart.delete(name);
    renderCart();
  };

  const openCart = () => {
    cartDrawer.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
    cartBackdrop.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const closeCart = () => {
    cartDrawer.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
    cartBackdrop.hidden = true;
    document.body.style.overflow = "";
  };

  document.querySelectorAll(".menu-add").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const price = Number(btn.dataset.price) || 0;
      const item = cart.get(name);
      if (item) {
        item.qty += 1;
      } else {
        cart.set(name, { price, qty: 1 });
      }
      renderCart();

      btn.classList.add("added");
      btn.textContent = "Agregado ✓";
      setTimeout(() => {
        btn.classList.remove("added");
        btn.textContent = "Agregar";
      }, 900);
    });
  });

  document.getElementById("cartFab").addEventListener("click", openCart);
  cartClose.addEventListener("click", closeCart);
  cartBackdrop.addEventListener("click", closeCart);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeCart();
  });

  cartSend.addEventListener("click", () => {
    const entries = [...cart.entries()];
    if (!entries.length) return;

    const lines = entries.map(([name, item], i) =>
      `${i + 1}. ${name} × ${item.qty} — ${money(item.price * item.qty)}`
    );
    const total = entries.reduce((sum, [, item]) => sum + item.price * item.qty, 0);
    const text = encodeURIComponent(
      `Hola, quiero hacer un pedido:\n\n${lines.join("\n")}\n\nTotal: ${money(total)}\n¿Me confirman disponibilidad y entrega?`
    );
    window.open(`https://wa.me/${PHONE}?text=${text}`, "_blank", "noopener");
  });

  renderCart();

  /* ---------- Galería / Lightbox ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");

  const openLightbox = (full, caption) => {
    lightboxImg.src = full;
    lightboxImg.alt = caption;
    lightboxCaption.textContent = caption;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    lightboxImg.src = "";
  };

  document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => {
      openLightbox(item.dataset.full, item.querySelector("img").alt);
    });
  });

  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox();
  });

  /* ---------- Reveal al hacer scroll ---------- */
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
})();