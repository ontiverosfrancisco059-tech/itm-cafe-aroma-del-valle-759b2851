/* ==========================================================================
   Café Aroma Del Valle — script.js
   Menú dinámico, pedidos por WhatsApp, galería y navegación
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Configuración ---------- */
  var WHATSAPP_NUMBER = "528112345678";
  var BUSINESS_NAME = "Café Aroma Del Valle";
  var CART_STORAGE_KEY = "cadv-cart-v1";

  var waBase = "https://wa.me/" + WHATSAPP_NUMBER + "?text=";

  function waLink(message) {
    return waBase + encodeURIComponent(message);
  }

  function formatMXN(n) {
    return "$" + Number(n).toLocaleString("es-MX");
  }

  /* ---------- Datos del menú ---------- */
  var MENU = [
    {
      id: "desayunos",
      label: "Desayunos",
      icon: "\u{1F953}",
      items: [
        {
          id: "chilaquiles",
          name: "Chilaquiles con café",
          price: 95,
          img: "assets/chilaquiles.jpg",
          alt: "Chilaquiles con café",
          tags: ["favorite"],
          desc: "Totopos bañados en salsa roja o verde, frijoles, huevo al gusto, crema y queso. Incluye café de la casa."
        },
        {
          id: "bowl-vegano",
          name: "Bowl vegano de breakfast",
          price: 115,
          img: "assets/bowl-vegano.webp",
          alt: "Bowl vegano de breakfast",
          tags: ["vegan"],
          desc: "Avena con leche vegetal, granola crujiente, frutas frescas y semillas. Endulzado con miel de agave."
        },
        {
          id: "bowl-acai",
          name: "Bowl de açaí con granola",
          price: 125,
          img: "assets/bowl-acai.webp",
          alt: "Bowl vegano colorido con granola, frutas frescas y açaí",
          tags: ["vegan"],
          desc: "Granola crujiente, frutas frescas de temporada, crema de açaí y semillas."
        },
        {
          id: "tofu-scramble",
          name: "Tofu scramble vegano",
          price: 125,
          img: "assets/tofu-scramble.webp",
          alt: "Tofu scramble vegano con vegetales y pan integral",
          tags: ["vegan"],
          desc: "Tofu revuelto con vegetales salteados y cúrcuma, acompañado de pan integral tostado."
        },
        {
          id: "omelet",
          name: "Omelet de campo",
          price: 105,
          tags: [],
          desc: "Tres huevos con espinaca, champiñones y queso panela. Incluye pan tostado."
        },
        {
          id: "tostada-aguacate",
          name: "Tostada de aguacate",
          price: 90,
          tags: ["nuevo"],
          desc: "Pan artesanal con guacamole, jitomate cherry, rábano y huevo poché opcional."
        }
      ]
    },
    {
      id: "bebidas",
      label: "Bebidas",
      icon: "\u2615",
      items: [
        {
          id: "espresso",
          name: "Espresso doble",
          price: 45,
          tags: ["favorite"],
          desc: "Doble shot de nuestras mezclas de origen, extraído al momento en taza caliente."
        },
        {
          id: "americano",
          name: "Americano",
          price: 50,
          tags: [],
          desc: "Espresso diluido con agua caliente, suave y aromático."
        },
        {
          id: "cappuccino",
          name: "Cappuccino",
          price: 60,
          img: "assets/latte-art.webp",
          alt: "Café de especialidad con latte art",
          tags: ["favorite"],
          desc: "Espresso con leche vaporizada y espuma sedosa, terminado con arte latte."
        },
        {
          id: "latte-casa",
          name: "Latte de la casa",
          price: 60,
          img: "assets/latte-art-detalle.webp",
          alt: "Detalle de latte art",
          tags: [],
          desc: "Suave, cremoso y delicadamente dulce. Con vainilla o caramelo a elección."
        },
        {
          id: "flat-white",
          name: "Flat white",
          price: 65,
          tags: [],
          desc: "Doble ristretto con microespuma aterciopelada. Intenso y balanceado."
        },
        {
          id: "pour-over",
          name: "Café de método (V60 / Chemex)",
          price: 75,
          img: "assets/pour-over.webp",
          alt: "Café de método pour over",
          tags: [],
          desc: "Granos de temporada preparados en taza. Pregunta por el origen del día."
        },
        {
          id: "cold-brew",
          name: "Cold brew",
          price: 65,
          tags: [],
          desc: "Extracción en frío por 18 horas. Suave y redondo. Con leche si lo prefieres."
        },
        {
          id: "mocha",
          name: "Mocha artesanal",
          price: 70,
          tags: [],
          desc: "Espresso con chocolate, leche vaporizada y crema. Decadentemente delicioso."
        },
        {
          id: "cafe-olla",
          name: "Café de olla",
          price: 55,
          tags: [],
          desc: "Clásico mexicano con piloncillo y canela, servido bien caliente."
        },
        {
          id: "chai-latte",
          name: "Chai latte",
          price: 70,
          tags: [],
          desc: "Té chai especiado con espuma de leche. Versión vegetal disponible."
        },
        {
          id: "matcha-latte",
          name: "Matcha latte",
          price: 75,
          tags: [],
          desc: "Matcha ceremonial con leche vaporizada. Dulce, cremoso y lleno de energía."
        }
      ]
    },
    {
      id: "postres",
      label: "Postres y panadería",
      icon: "\u{1F9C1}",
      items: [
        {
          id: "panaderia",
          name: "Panadería artesanal",
          price: 48,
          img: "assets/panaderia.webp",
          alt: "Panadería artesanal recién horneada",
          tags: ["favorite"],
          desc: "Croissants, conchas, cuernitos y más, horneados cada mañana en nuestra vitrina."
        },
        {
          id: "croissant",
          name: "Croissant de mantequilla",
          price: 45,
          tags: [],
          desc: "Hojaldrado, crujiente por fuera y suave por dentro. Perfecto con tu café."
        },
        {
          id: "brownie",
          name: "Brownie de chocolate",
          price: 65,
          tags: [],
          desc: "Chocolate intenso, corona crujiente y centro suave y fondant."
        },
        {
          id: "cheesecake",
          name: "Cheesecake de la casa",
          price: 75,
          tags: [],
          desc: "Horneado al estilo neoyorquino con base de galleta y mermelada de temporada."
        },
        {
          id: "galletas",
          name: "Galletas artesanales",
          price: 38,
          tags: [],
          desc: "Chispas de chocolate o avena con nuez. Venta por pieza."
        }
      ]
    }
  ];

  var TAG_LABELS = {
    favorite: "\u2605 Favorito",
    vegan: "\uD83C\uDF31 Vegano",
    nuevo: "\u2728 Nuevo"
  };

  /* ---------- Galería ---------- */
  var GALLERY = [
    { src: "assets/exterior.webp", alt: "Vista exterior de la cafetería en el Valle de Monterrey", caption: "Vista exterior de la cafetería", span: "wide" },
    { src: "assets/barista-sirviendo.jpg", alt: "Barista preparando café de especialidad", caption: "La barra, en acción", span: "tall" },
    { src: "assets/interior.jpg", alt: "Interior de la cafetería con mesas y luz cálida", caption: "Luz cálida en el interior", span: "tall" },
    { src: "assets/vitrina-panaderia.webp", alt: "Vitrina de panadería artesanal", caption: "Vitrina de panadería", span: "" },
    { src: "assets/interior-ladrillo.webp", alt: "Interior con pared de ladrillo y estantería de café", caption: "Rincón de ladrillo y café", span: "" },
    { src: "assets/latte-art-detalle.webp", alt: "Detalle de latte art", caption: "Latte art, un detalle a la vez", span: "" },
    { src: "assets/catacion.jpg", alt: "Mesas de catación de café con cucharas y tazas", caption: "Catación de café de origen", span: "wide" },
    { src: "assets/interior-estanteria.jpg", alt: "Interior con pared de ladrillo y estantería de café", caption: "Estantería de café", span: "tall" },
    { src: "assets/barista-preparando.jpg", alt: "Barista preparando café", caption: "Preparación en barra", span: "" },
    { src: "assets/terraza.jpg", alt: "Terraza de cafetería con plantas y mesas de madera bajo luz natural", caption: "Terraza con luz natural", span: "tall" },
    { src: "assets/latte-art.webp", alt: "Café de especialidad con latte art", caption: "Cappuccino de especialidad", span: "" }
  ];

  /* ---------- Estado del carrito ---------- */
  var cart = loadCart();

  function loadCart() {
    try {
      var raw = localStorage.getItem(CART_STORAGE_KEY);
      var data = raw ? JSON.parse(raw) : {};
      var clean = {};
      Object.keys(data).forEach(function (id) {
        var q = parseInt(data[id], 10);
        if (q > 0) clean[id] = q;
      });
      return clean;
    } catch (e) {
      return {};
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) { /* almacenamiento no disponible */ }
  }

  function findItem(id) {
    for (var c = 0; c < MENU.length; c++) {
      for (var i = 0; i < MENU[c].items.length; i++) {
        if (MENU[c].items[i].id === id) return MENU[c].items[i];
      }
    }
    return null;
  }

  function itemQty(id) {
    return cart[id] || 0;
  }

  function cartCount() {
    return Object.keys(cart).reduce(function (sum, id) { return sum + cart[id]; }, 0);
  }

  function cartTotal() {
    return Object.keys(cart).reduce(function (sum, id) {
      var it = findItem(id);
      return sum + (it ? it.price * cart[id] : 0);
    }, 0);
  }

  function addToCart(id, delta) {
    var qty = itemQty(id) + delta;
    if (qty <= 0) {
      delete cart[id];
    } else {
      cart[id] = qty;
    }
    saveCart();
    renderCart();
    syncCard(id);
    updateCartCount();
  }

  /* ---------- Referencias DOM ---------- */
  var els = {
    body: document.body,
    header: document.getElementById("siteHeader"),
    navToggle: document.getElementById("navToggle"),
    navLinks: document.getElementById("navLinks"),
    menuTabs: document.getElementById("menuTabs"),
    menuGrid: document.getElementById("menuGrid"),
    galleryGrid: document.getElementById("galleryGrid"),
    cartBtn: document.getElementById("cartBtn"),
    cartCount: document.getElementById("cartCount"),
    cartDrawer: document.getElementById("cartDrawer"),
    cartClose: document.getElementById("cartClose"),
    cartItems: document.getElementById("cartItems"),
    cartEmpty: document.getElementById("cartEmpty"),
    cartForm: document.getElementById("cartForm"),
    cartFoot: document.getElementById("cartFoot"),
    cartTotal: document.getElementById("cartTotal"),
    cartCountLabel: document.getElementById("cartCountLabel"),
    cartName: document.getElementById("cartName"),
    cartAddress: document.getElementById("cartAddress"),
    cartNote: document.getElementById("cartNote"),
    cartSend: document.getElementById("cartSend"),
    overlay: document.getElementById("overlay"),
    lightbox: document.getElementById("lightbox"),
    lightboxImg: document.getElementById("lightboxImg"),
    lightboxCaption: document.getElementById("lightboxCaption"),
    lightboxClose: document.getElementById("lightboxClose"),
    toTop: document.getElementById("toTop"),
    year: document.getElementById("year")
  };

  var cardNodes = {}; // id -> { addBtn, stepper, qtyEl }

  /* ---------- Render del menú ---------- */
  function renderTabs() {
    els.menuTabs.innerHTML = "";
    MENU.forEach(function (cat, index) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "menu-tab";
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", index === 0 ? "true" : "false");
      btn.setAttribute("aria-controls", "menuGrid");
      btn.textContent = cat.icon + "  " + cat.label;
      btn.addEventListener("click", function () { setActiveCategory(cat.id, btn); });
      els.menuTabs.appendChild(btn);
    });
  }

  function setActiveCategory(catId) {
    var buttons = els.menuTabs.querySelectorAll(".menu-tab");
    buttons.forEach(function (btn) {
      var isActive = btn.textContent === (catByName(catId).icon + "  " + catByName(catId).label);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });
    renderGrid(catId);
  }

  function catByName(id) {
    for (var c = 0; c < MENU.length; c++) if (MENU[c].id === id) return MENU[c];
    return MENU[0];
  }

  var activeCategory = MENU[0].id;

  function renderGrid(catId) {
    activeCategory = catId;
    var cat = catByName(catId);
    els.menuGrid.innerHTML = "";
    cat.items.forEach(function (item, index) {
      els.menuGrid.appendChild(buildCard(item, index));
    });
  }

  function buildCard(item, index) {
    var card = document.createElement("article");
    card.className = "menu-card";
    card.style.animationDelay = Math.min(index * 0.05, 0.4) + "s";
    card.dataset.id = item.id;

    var photo = document.createElement("div");
    photo.className = "menu-card-photo";

    if (item.img) {
      var img = document.createElement("img");
      img.src = item.img;
      img.alt = item.alt || item.name;
      img.loading = "lazy";
      photo.appendChild(img);
    } else {
      var ph = document.createElement("div");
      ph.className = "photo-placeholder";
      ph.setAttribute("aria-hidden", "true");
      ph.textContent = "\u2615";
      photo.appendChild(ph);
    }

    if (item.tags && item.tags.length) {
      var tag = document.createElement("span");
      tag.className = "menu-tag " + item.tags[0];
      tag.textContent = TAG_LABELS[item.tags[0]];
      photo.appendChild(tag);
    }

    var body = document.createElement("div");
    body.className = "menu-card-body";

    var line = document.createElement("div");
    line.className = "menu-card-line";
    var name = document.createElement("h3");
    name.className = "menu-card-name";
    name.textContent = item.name;
    var dots = document.createElement("span");
    dots.className = "menu-card-dots";
    dots.setAttribute("aria-hidden", "true");
    var price = document.createElement("span");
    price.className = "menu-card-price";
    price.textContent = formatMXN(item.price);
    line.appendChild(name);
    line.appendChild(dots);
    line.appendChild(price);

    var desc = document.createElement("p");
    desc.className = "menu-card-desc";
    desc.textContent = item.desc;

    var cta = document.createElement("div");
    cta.className = "menu-card-cta";

    var addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "add-btn";
    addBtn.innerHTML = '<span class="plus" aria-hidden="true">+</span> Agregar';
    addBtn.setAttribute("aria-label", "Agregar " + item.name + " por " + formatMXN(item.price));
    addBtn.addEventListener("click", function () { addToCart(item.id, 1); });

    var stepper = document.createElement("div");
    stepper.className = "qty-stepper";
    var minus = document.createElement("button");
    minus.type = "button";
    minus.setAttribute("aria-label", "Quitar " + item.name);
    minus.textContent = "\u2212";
    var qtyEl = document.createElement("span");
    qtyEl.className = "qty";
    qtyEl.setAttribute("aria-live", "polite");
    var plus = document.createElement("button");
    plus.type = "button";
    plus.setAttribute("aria-label", "Agregar más " + item.name);
    plus.textContent = "+";
    minus.addEventListener("click", function () { addToCart(item.id, -1); });
    plus.addEventListener("click", function () { addToCart(item.id, 1); });
    stepper.appendChild(minus);
    stepper.appendChild(qtyEl);
    stepper.appendChild(plus);

    cta.appendChild(addBtn);
    cta.appendChild(stepper);

    body.appendChild(line);
    body.appendChild(desc);
    body.appendChild(cta);

    card.appendChild(photo);
    card.appendChild(body);

    cardNodes[item.id] = { addBtn: addBtn, stepper: stepper, qtyEl: qtyEl };
    syncCard(item.id);
    return card;
  }

  function syncCard(id) {
    var node = cardNodes[id];
    if (!node) return;
    var qty = itemQty(id);
    var has = qty > 0;
    node.qtyEl.textContent = qty;
    node.addBtn.parentNode.classList.toggle("has-qty", has);
  }

  /* ---------- Render del carrito ---------- */
  function renderCart() {
    var ids = Object.keys(cart);
    els.cartItems.innerHTML = "";
    els.cartForm.hidden = ids.length === 0;
    els.cartFoot.hidden = ids.length === 0;
    els.cartEmpty.hidden = ids.length > 0;

    if (ids.length === 0) {
      els.cartCountLabel.textContent = "Tu carrito está vacío";
      updateCartCount();
      return;
    }

    var n = cartCount();
    els.cartCountLabel.textContent = n === 1 ? "1 artículo" : n + " artículos";

    ids.forEach(function (id) {
      var item = findItem(id);
      if (!item) return;
      els.cartItems.appendChild(buildCartRow(item, cart[id]));
    });

    els.cartTotal.textContent = formatMXN(cartTotal());
    updateCartCount();
  }

  function buildCartRow(item, qty) {
    var row = document.createElement("div");
    row.className = "cart-item";

    var thumb = document.createElement("div");
    thumb.className = "cart-item-thumb";
    if (item.img) {
      var img = document.createElement("img");
      img.src = item.img;
      img.alt = item.alt || item.name;
      thumb.appendChild(img);
    } else {
      var ph = document.createElement("div");
      ph.className = "ph";
      ph.textContent = "\u2615";
      thumb.appendChild(ph);
    }

    var info = document.createElement("div");
    info.className = "cart-item-info";
    var nEl = document.createElement("p");
    nEl.className = "cart-item-name";
    nEl.textContent = item.name;
    var pEl = document.createElement("p");
    pEl.className = "cart-item-price";
    pEl.textContent = formatMXN(item.price) + " c/u";
    info.appendChild(nEl);
    info.appendChild(pEl);

    var side = document.createElement("div");
    side.className = "cart-item-side";
    var totalEl = document.createElement("span");
    totalEl.className = "cart-item-line-total";
    totalEl.textContent = formatMXN(item.price * qty);
    var qStepper = document.createElement("div");
    qStepper.className = "qty-stepper";
    var minus = document.createElement("button");
    minus.type = "button";
    minus.setAttribute("aria-label", "Quitar un " + item.name);
    minus.textContent = "\u2212";
    minus.addEventListener("click", function () { addToCart(item.id, -1); });
    var qtyEl = document.createElement("span");
    qtyEl.className = "qty";
    qtyEl.textContent = qty;
    var plus = document.createElement("button");
    plus.type = "button";
    plus.setAttribute("aria-label", "Agregar otro " + item.name);
    plus.textContent = "+";
    plus.addEventListener("click", function () { addToCart(item.id, 1); });
    qStepper.appendChild(minus);
    qStepper.appendChild(qtyEl);
    qStepper.appendChild(plus);
    side.appendChild(totalEl);
    side.appendChild(qStepper);

    row.appendChild(thumb);
    row.appendChild(info);
    row.appendChild(side);
    return row;
  }

  function updateCartCount() {
    var n = cartCount();
    els.cartCount.textContent = n;
    els.cartCount.hidden = n === 0;
  }

  /* ---------- Carrito: apertura y cierre ---------- */
  function openDrawer() {
    els.cartDrawer.setAttribute("aria-hidden", "false");
    els.body.classList.add("drawer-open");
    els.overlay.hidden = false;
  }

  function closeDrawer() {
    els.cartDrawer.setAttribute("aria-hidden", "true");
    els.body.classList.remove("drawer-open");
    els.overlay.hidden = true;
  }

  els.cartBtn.addEventListener("click", openDrawer);
  els.cartClose.addEventListener("click", closeDrawer);
  els.overlay.addEventListener("click", closeDrawer);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (!els.lightbox.hidden) closeLightbox();
      if (els.body.classList.contains("drawer-open")) closeDrawer();
      if (els.navLinks.classList.contains("open")) toggleNav(false);
    }
  });

  /* ---------- Enviar pedido por WhatsApp ---------- */
  els.cartSend.addEventListener("click", function () {
    var ids = Object.keys(cart);
    if (ids.length === 0) return;

    var lines = ids.map(function (id) {
      var item = findItem(id);
      var qty = cart[id];
      return "\u2022 " + qty + "x " + item.name + " \u2014 " + formatMXN(item.price * qty);
    });

    var name = els.cartName.value.trim();
    var address = els.cartAddress.value.trim();
    var note = els.cartNote.value.trim();

    var msg = "\u00A1Hola " + BUSINESS_NAME + "! \u2615 Quiero hacer un pedido:\n\n";
    msg += lines.join("\n") + "\n\n";
    msg += "Total estimado: " + formatMXN(cartTotal()) + "\n\n";
    if (name) msg += "Nombre: " + name + "\n";
    if (address) msg += "Direcci\u00F3n para entrega a domicilio: " + address + "\n";
    else msg += "Recogida en tienda: S\u00ED\n";
    if (note) msg += "Nota: " + note + "\n";
    msg += "\n\u00A1Gracias!";

    window.open(waLink(msg), "_blank", "noopener");
  });

  /* ---------- Galería + lightbox ---------- */
  function renderGallery() {
    els.galleryGrid.innerHTML = "";
    GALLERY.forEach(function (g) {
      var figure = document.createElement("figure");
      figure.className = "gallery-item" + (g.span ? " " + g.span : "");
      figure.tabIndex = 0;

      var img = document.createElement("img");
      img.src = g.src;
      img.alt = g.alt;
      img.loading = "lazy";

      var cap = document.createElement("figcaption");
      cap.textContent = g.caption;

      function open() { openLightbox(g); }
      figure.appendChild(img);
      figure.appendChild(cap);
      figure.addEventListener("click", open);
      figure.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });
      els.galleryGrid.appendChild(figure);
    });
  }

  function openLightbox(g) {
    els.lightboxImg.src = g.src;
    els.lightboxImg.alt = g.alt;
    els.lightboxCaption.textContent = g.caption;
    els.lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    els.lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  els.lightboxClose.addEventListener("click", closeLightbox);
  els.lightbox.addEventListener("click", function (e) {
    if (e.target === els.lightbox) closeLightbox();
  });

  /* ---------- Navegación ---------- */
  function toggleNav(force) {
    var open = typeof force === "boolean" ? force : !els.navLinks.classList.contains("open");
    els.navLinks.classList.toggle("open", open);
    els.navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  els.navToggle.addEventListener("click", function () { toggleNav(); });
  els.navLinks.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { toggleNav(false); });
  });

  var headerScroll = function () {
    els.header.classList.toggle("is-scrolled", window.scrollY > 24);
    var show = window.scrollY > 640;
    els.toTop.classList.toggle("is-visible", show);
  };
  window.addEventListener("scroll", headerScroll, { passive: true });
  headerScroll();

  els.toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Reveal on scroll ---------- */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".reveal").forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ---------- Footer año ---------- */
  if (els.year) els.year.textContent = new Date().getFullYear();

  /* ---------- Init ---------- */
  renderTabs();
  renderGrid(MENU[0].id);
  renderGallery();
  renderCart();

  /* Resaltar enlace de navegación activo */
  var sectionLinks = els.navLinks.querySelectorAll("a[href^='#']");
  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        sectionLinks.forEach(function (link) {
          link.style.color = link.getAttribute("href") === "#" + entry.target.id ? "var(--gold)" : "";
        });
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  ["inicio", "menu", "nosotros", "galeria", "visitanos"].forEach(function (id) {
    var sec = document.getElementById(id);
    if (sec) sectionObserver.observe(sec);
  });
})();