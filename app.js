/* ==========================================================================
   Café Aroma Del Valle — interacción: menú, carrito y pedidos por WhatsApp
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Recursos (assets del usuario) ---------- */
  var ASSETS_BASE = "https://8f785f4a.itm-void-excepcional.pages.dev/api/itm-project-assets?file=";
  var IMG = {
    interior: ASSETS_BASE + "9d6c26b2-7205-488f-87eb-b3991c91f366",
    exterior: ASSETS_BASE + "404842e9-411a-4fba-87fc-8ba09de68d27",
    terraza: ASSETS_BASE + "bf8acfac-24d4-4635-8dac-7ce6345f83d4",
    chilaquiles: ASSETS_BASE + "bc41521f-3bce-417a-9e3e-bae88d760211",
    latte: ASSETS_BASE + "beca28a3-0ed7-4b80-9182-da15dc597cf0",
    pourover: ASSETS_BASE + "ae614cbc-ebee-4c3b-bb58-d9e4690dd2f9",
    panaderia: ASSETS_BASE + "8b6a5725-084e-4d52-92ba-28a61870b5e5",
    acai: ASSETS_BASE + "8f706439-4477-416e-9daf-f9ce58ed35dd",
    tofu: ASSETS_BASE + "5fcc3e0a-f201-428c-906e-e8ccf0062700",
    bowlV: ASSETS_BASE + "6e4bfb6f-aa63-4c35-aea8-5c66a75dde8e",
    vitrina: ASSETS_BASE + "1907cb0f-858d-46e8-b27c-07da893815f4",
    granos: ASSETS_BASE + "0199d294-99dd-44e8-9a70-5e27dcd42ccc",
    barista: ASSETS_BASE + "e10d7c70-3fc3-4cae-8dee-23ba30b5ed49",
    barista2: ASSETS_BASE + "3e4a4e9a-502e-440d-a991-2102d09468d0",
    latteArt: ASSETS_BASE + "8ba57022-551a-4698-a989-95a5e28d510b",
    ladrillo1: ASSETS_BASE + "a2c7e93c-dbf4-4e60-a1e8-6622e1e4df63",
    ladrillo2: ASSETS_BASE + "8479aa43-af82-4ad7-b0c3-3e2a7e291659",
    catacion: ASSETS_BASE + "257c33fb-e18e-4b60-b0dc-321124c1c2ad"
  };

  var WHATSAPP_NUMBER = "528112345678";
  var WHATSAPP_URL = "https://wa.me/" + WHATSAPP_NUMBER;

  /* ---------- Menú ---------- */
  var MENU = [
    {
      id: "desayunos",
      label: "Desayunos",
      tagline: "Todo el día, hasta las 15:00 los domingos.",
      banner: { src: IMG.chilaquiles, alt: "Chilaquiles con café" },
      items: [
        { name: "Chilaquiles Verdes", price: 120, desc: "Totopos crujientes, salsa verde de tomatillo, crema, queso fresco y huevo estrellado.", tags: [] },
        { name: "Huevos al Gusto", price: 95, desc: "Revueltos, estrellados o en torta, con frijoles de la casa y pan de nuestra panadería.", tags: [] },
        { name: "Avocado Toast", price: 110, desc: "Pan de masa madre, aguacate, queso de cabra, microvegetales y toques cítricos.", tags: [] },
        { name: "Panqueques de Avena", price: 115, desc: "Esponjositos con miel de agave, frutas de temporada y yogurt.", tags: [] },
        { name: "Hot Cakes con Miel", price: 120, desc: "Clásicos con mantequilla, miel local y plátano caramelizado.", tags: [] },
        { name: "Bowl de Desayuno Vegano", price: 135, desc: "Quinoa, portobello, aguacate, espinaca y vinagreta de limón.", tags: ["vegan"] },
        { name: "Bowl de Açaí", price: 130, desc: "Granola, frutas frescas, açaí y semillas para empezar con energía.", tags: ["vegan"] },
        { name: "Tofu Scramble", price: 125, desc: "Tofu revuelto con cúrcuma, vegetales salteados y pan integral.", tags: ["vegan"] }
      ]
    },
    {
      id: "cafe",
      label: "Cafés",
      tagline: "Espresso de origen tostado en lotes pequeños.",
      banner: { src: IMG.latte, alt: "Café de especialidad con latte art" },
      items: [
        { name: "Espresso", price: 45, desc: "Doble shot, tueste medio y notas a chocolate.", tags: [] },
        { name: "Americano", price: 55, desc: "Espresso con agua caliente, suave y aromático.", tags: [] },
        { name: "Cappuccino", price: 65, desc: "Espresso, leche al vapor y una capa sedosa de espuma.", tags: [] },
        { name: "Latte Artesanal", price: 70, desc: "Doble espresso con leche cremosa y nuestro latte art.", tags: [] },
        { name: "Latte de Vainilla", price: 78, desc: "Latte con sirope de vainilla natural, sin aromas artificiales.", tags: [] },
        { name: "Mocha", price: 82, desc: "Chocolate, espresso y leche vaporizada.", tags: [] },
        { name: "Café de Olla Especial", price: 72, desc: "Con panela, canela y anís, receta de casa.", tags: [] },
        { name: "Carajillo", price: 88, desc: "Espresso con licor 43, servido con hielo.", tags: ["note"] }
      ]
    },
    {
      id: "metodos",
      label: "Métodos",
      tagline: "Extracción lenta que respeta el origen.",
      banner: { src: IMG.pourover, alt: "Café de método pour over" },
      items: [
        { name: "V60 Pour Over", price: 85, desc: "Filtrado manual que resalta notas florales y cítricas.", tags: [] },
        { name: "Chemex para Dos", price: 145, desc: "Filtración completa, ideal para compartir en la terraza.", tags: [] },
        { name: "Prensa Francesa", price: 80, desc: "Cuerpo completo y textura aterciopelada.", tags: [] },
        { name: "Aeropress", price: 75, desc: "Rápido, limpio y con una taza redonda.", tags: [] },
        { name: "Cold Brew", price: 78, desc: "Extracción en frío durante 18 horas.", tags: [] },
        { name: "Cold Brew con Leche de Avena", price: 88, desc: "Cremosidad vegetal y toques de cacao.", tags: ["vegan"] },
        { name: "Chai Latte", price: 70, desc: "Especias de la casa con leche al vapor.", tags: ["vegan"] }
      ]
    },
    {
      id: "panaderia",
      label: "Panadería",
      tagline: "Horneada cada mañana en nuestra cocina.",
      banner: { src: IMG.panaderia, alt: "Panadería artesanal recién horneada" },
      items: [
        { name: "Croissant de Mantequilla", price: 45, desc: "Laminado clásico, hojaldrado y dorado.", tags: [] },
        { name: "Concha de Vainilla", price: 32, desc: "Suave y esponjosa, con costra crujiente.", tags: [] },
        { name: "Pan de Plátano", price: 55, desc: "Con nueces y un toque de canela.", tags: ["vegan"] },
        { name: "Scone de Arándano", price: 52, desc: "Perfecto con tu café de la mañana.", tags: [] },
        { name: "Cookie de Chocolate y Café", price: 40, desc: "Bordes crujientes, corazón suave.", tags: [] },
        { name: "Galleta de Avena Vegana", price: 38, desc: "Con plátano, avena y pasas.", tags: ["vegan"] }
      ]
    },
    {
      id: "postres",
      label: "Postres",
      tagline: "El final dulce de cada visita.",
      banner: { src: IMG.acai, alt: "Postre colorido con frutas frescas y granola" },
      items: [
        { name: "Cheesecake de Frutos Rojos", price: 78, desc: "Base crujiente y salsa de frutos rojos.", tags: [] },
        { name: "Tiramisú Clásico", price: 85, desc: "Mascarpone, café espresso y cacao.", tags: [] },
        { name: "Brownie de Café", price: 68, desc: "Chocolate intenso con extracto de café.", tags: [] },
        { name: "Flan de Coco", price: 62, desc: "Crema de coco y caramelo casero.", tags: [] },
        { name: "Crème Brûlée de Vainilla", price: 90, desc: "Capa de azúcar caramelizado al momento.", tags: [] }
      ]
    }
  ];

  /* ---------- Galería ---------- */
  var GALLERY = [
    { src: IMG.interior, alt: "Interior de la cafetería con mesas y luz cálida", cls: "tall" },
    { src: IMG.exterior, alt: "Vista exterior de la cafetería en el Valle de Monterrey", cls: "" },
    { src: IMG.barista, alt: "Barista sirviendo café de especialidad", cls: "" },
    { src: IMG.terraza, alt: "Terraza de la cafetería con plantas y mesas de madera", cls: "wide" },
    { src: IMG.ladrillo1, alt: "Interior con pared de ladrillo y clientes relajados", cls: "" },
    { src: IMG.vitrina, alt: "Vitrina de panadería artesanal", cls: "" },
    { src: IMG.ladrillo2, alt: "Interior con pared de ladrillo y estantería de café", cls: "tall" },
    { src: IMG.barista2, alt: "Barista preparando café", cls: "" },
    { src: IMG.latteArt, alt: "Detalle de latte art", cls: "" },
    { src: IMG.catacion, alt: "Mesas de catación de café con cucharas y tazas", cls: "" },
    { src: IMG.granos, alt: "Granos de café de origen", cls: "" }
  ];

  /* ---------- Estado del carrito ---------- */
  var CART_KEY = "aroma-cart-v1";
  var cart = loadCart();

  function loadCart() {
    try {
      var raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }
  function saveCart() {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) { /* sin almacenamiento disponible */ }
  }

  function fmt(n) {
    return "$" + Number(n).toLocaleString("es-MX");
  }

  /* ---------- Nodos ---------- */
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  var menuPanel = $("#menu-panel");
  var cartBody = $("#cart-body");
  var cartCount = $("#cart-count");
  var cartTotal = $("#cart-total");
  var cartWa = $("#cart-wa");
  var cartDrawer = $("#cart-drawer");
  var cartBackdrop = $("#cart-backdrop");
  var toast = $("#toast");

  /* ==================================================================
     MENÚ
     ================================================================== */
  function renderMenu(catId) {
    var cat = MENU.find(function (c) { return c.id === catId; }) || MENU[0];

    var banner = document.createElement("div");
    banner.className = "menu-banner";
    banner.innerHTML =
      '<img src="' + cat.banner.src + '" alt="' + escapeHtml(cat.banner.alt) + '" loading="lazy">' +
      '<div class="menu-banner-copy"><h3>' + escapeHtml(cat.label) + "</h3>" +
      (cat.tagline ? "<p>" + escapeHtml(cat.tagline) + "</p>" : "") + "</div>";

    var grid = document.createElement("div");
    grid.className = "menu-items";
    cat.items.forEach(function (item) {
      var el = document.createElement("article");
      el.className = "menu-item";
      el.setAttribute("data-name", item.name);
      el.setAttribute("data-price", item.price);

      var tags = "";
      item.tags.forEach(function (t) {
        tags += t === "vegan"
          ? '<span class="tag tag-vegan">Vegano</span>'
          : '<span class="tag tag-note">' + escapeHtml(t) + "</span>";
      });

      el.innerHTML =
        '<div class="menu-item-top">' +
          '<h3 class="menu-item-name">' + escapeHtml(item.name) + "</h3>" +
          '<span class="menu-item-price">' + fmt(item.price) + "</span>" +
        "</div>" +
        '<p class="menu-item-desc">' + escapeHtml(item.desc) + "</p>" +
        (tags ? '<div class="menu-item-tags">' + tags + "</div>" : "") +
        '<button type="button" class="menu-item-add" data-add="' + escapeHtml(item.name) + '">Añadir al carrito +</button>';

      grid.appendChild(el);
    });

    menuPanel.innerHTML = "";
    menuPanel.appendChild(banner);
    menuPanel.appendChild(grid);
  }

  function switchTab(catId) {
    $$(".menu-tab").forEach(function (tab) {
      var active = tab.getAttribute("data-cat") === catId;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });
    renderMenu(catId);
  }

  function initTabs() {
    $(".menu-tabs").addEventListener("click", function (e) {
      var tab = e.target.closest(".menu-tab");
      if (tab) switchTab(tab.getAttribute("data-cat"));
    });
    // Navegación con teclado
    $(".menu-tabs").addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      var tabs = $$(".menu-tab");
      var i = tabs.indexOf(document.activeElement);
      var next = e.key === "ArrowRight"
        ? (i + 1) % tabs.length
        : (i - 1 + tabs.length) % tabs.length;
      tabs[next].focus();
      switchTab(tabs[next].getAttribute("data-cat"));
      e.preventDefault();
    });
  }

  /* ---------- Galería + lightbox ---------- */
  function initGallery() {
    var grid = $("#gallery-grid");
    var lb = $("#lightbox");
    var lbImg = $("#lb-img");
    var lbCap = $("#lb-cap");

    GALLERY.forEach(function (g) {
      var fig = document.createElement("figure");
      fig.className = g.cls;
      fig.setAttribute("data-src", g.src);
      fig.setAttribute("data-alt", g.alt);
      fig.innerHTML =
        '<img src="' + g.src + '" alt="' + escapeHtml(g.alt) + '" loading="lazy">' +
        '<figcaption>' + escapeHtml(g.alt) + "</figcaption>";
      fig.addEventListener("click", function () {
        lbImg.src = g.src;
        lbImg.alt = g.alt;
        lbCap.textContent = g.alt;
        lb.hidden = false;
        lb.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      });
      grid.appendChild(fig);
    });

    function closeLb() {
      lb.hidden = true;
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
    $("#lb-close").addEventListener("click", closeLb);
    lb.addEventListener("click", function (e) {
      if (e.target === lb) closeLb();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLb();
    });
  }

  /* ==================================================================
     CARRITO
     ================================================================== */
  function renderCart() {
    var list = $("#cart-items");
    var empty = $("#cart-empty");
    var foot = cartDrawer.querySelector(".cart-foot");

    list.innerHTML = "";
    var count = 0;
    var total = 0;

    cart.forEach(function (it) {
      count += it.qty;
      total += it.qty * it.price;

      var li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML =
        '<div class="cart-item-info">' +
          '<p class="cart-item-name">' + escapeHtml(it.name) + "</p>" +
          '<p class="cart-item-price">' + fmt(it.price) + " c/u</p>" +
          '<div class="cart-qty">' +
            '<button type="button" class="qty-btn" data-qty="-1" data-name="' + escapeHtml(it.name) + '">−</button>' +
            '<span class="qty-num">' + it.qty + "</span>" +
            '<button type="button" class="qty-btn" data-qty="+1" data-name="' + escapeHtml(it.name) + '">+</button>' +
          "</div>" +
        "</div>" +
        '<div class="cart-item-line">' + fmt(it.qty * it.price) + "</div>" +
        '<button type="button" class="cart-item-remove" data-remove="' + escapeHtml(it.name) + '" aria-label="Quitar ' + escapeHtml(it.name) + '">✕</button>';

      list.appendChild(li);
    });

    empty.style.display = cart.length ? "none" : "";
    foot.style.display = cart.length ? "" : "none";
    cartCount.textContent = count;
    cartCount.className = cartCount.className.replace(" pop", "") + (count ? " pop" : "");
    cartTotal.textContent = fmt(total);

    cartWa.disabled = cart.length === 0;

    // El pie del carrito queda visible solo con artículos
    var drawerFoot = $("#cart-wa").closest(".cart-foot");
    if (drawerFoot) drawerFoot.style.display = cart.length ? "" : "none";
  }

  function addItem(name, price) {
    var found = cart.find(function (it) { return it.name === name; });
    if (found) {
      found.qty += 1;
    } else {
      cart.push({ name: name, price: price, qty: 1 });
    }
    saveCart();
    renderCart();
    showToast("Añadido: " + name);
  }

  function changeQty(name, delta) {
    var found = cart.find(function (it) { return it.name === name; });
    if (!found) return;
    found.qty += delta;
    if (found.qty <= 0) cart = cart.filter(function (it) { return it.name !== name; });
    saveCart();
    renderCart();
  }

  function removeItem(name) {
    cart = cart.filter(function (it) { return it.name !== name; });
    saveCart();
    renderCart();
    showToast("Quitado: " + name);
  }

  function clearCart() {
    cart = [];
    saveCart();
    renderCart();
    showToast("Carrito vaciado");
  }

  function buildMessage() {
    var lines = cart.map(function (it, i) {
      return (i + 1) + ". " + it.name + " ×" + it.qty + " — " + fmt(it.qty * it.price);
    });
    var total = cart.reduce(function (s, it) { return s + it.qty * it.price; }, 0);

    var msg =
      "*Pedido para Café Aroma Del Valle* ☕\n\n" +
      lines.join("\n") +
      "\n\n*Total estimado:* " + fmt(total) +
      "\n\nRecoger en tienda / Entrega a domicilio:\n" +
      "Dirección u observaciones:\n" +
      "Nombre:";

    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
  }

  function sendOrder() {
    window.open(buildMessage(), "_blank", "noopener");
    showToast("Abriendo WhatsApp con tu pedido…");
  }

  function toggleCart(forceOpen) {
    var open = typeof forceOpen === "boolean" ? forceOpen : !cartDrawer.classList.contains("open");
    cartDrawer.classList.toggle("open", open);
    cartBackdrop.hidden = !open;
    cartDrawer.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.style.overflow = open ? "hidden" : "";
  }

  function initCart() {
    $("#cart-btn").addEventListener("click", function () { toggleCart(true); });
    $("#cart-close").addEventListener("click", function () { toggleCart(false); });
    cartBackdrop.addEventListener("click", function () { toggleCart(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") toggleCart(false);
    });

    // Delegación de eventos en el documento para botones del menú y carrito
    document.addEventListener("click", function (e) {
      var addBtn = e.target.closest("[data-add]");
      var qtyBtn = e.target.closest("[data-qty]");
      var rmBtn = e.target.closest("[data-remove]");

      if (addBtn) {
        var itemEl = addBtn.closest(".menu-item");
        addItem(itemEl.getAttribute("data-name"), parseInt(itemEl.getAttribute("data-price"), 10));
      }
      if (qtyBtn) {
        changeQty(qtyBtn.getAttribute("data-name"), parseInt(qtyBtn.getAttribute("data-qty"), 10));
      }
      if (rmBtn) {
        removeItem(rmBtn.getAttribute("data-remove"));
      }
    });

    cartWa.addEventListener("click", sendOrder);
    $("#cart-clear").addEventListener("click", clearCart);

    renderCart();
  }

  /* ---------- Toast ---------- */
  var toastTimer = null;
  function showToast(text) {
    if (toastTimer) clearTimeout(toastTimer);
    toast.textContent = text;
    toast.hidden = false;
    requestAnimationFrame(function () { toast.classList.add("show"); });
    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
      toast.hidden = true;
    }, 2200);
  }

  /* ==================================================================
     CHROME: header, nav móvil, reveal
     ================================================================== */
  function initNav() {
    var toggle = $("#nav-toggle");
    var nav = $("#main-nav");
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Cerrar menú de navegación" : "Abrir menú de navegación");
    });
    $$("#main-nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initHeader() {
    var header = $("#site-header");
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initReveal() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach(function (el) { el.classList.add("in-view"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /* ---------- Arranque ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    switchTab("desayunos");
    initTabs();
    initGallery();
    initCart();
    initNav();
    initHeader();
    initReveal();
  });
})();