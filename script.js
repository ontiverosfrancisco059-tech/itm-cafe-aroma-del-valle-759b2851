(function () {
  "use strict";

  const WHATSAPP_NUMBER = "528112345678";
  const CURRENCY = n => "$" + n.toLocaleString("es-MX");

  const MENU = [
    {
      id: "cafe",
      label: "Café de especialidad",
      items: [
        { id: "espresso", name: "Espresso de origen", price: 45, image: "assets/granos-cafe.webp", desc: "De granos mexicanos de origen, tostado medio. Intenso y balanceado.", popular: true },
        { id: "cappuccino", name: "Cappuccino", price: 60, image: "assets/latte-art.webp", desc: "Doble shot con leche al vapor y microespuma sedosa." },
        { id: "latte", name: "Latte de la casa", price: 65, image: "assets/latte-art-detalle.webp", desc: "Arte latte sobre café de origen con leche cremosa." },
        { id: "pourover", name: "Pour over · V60", price: 70, image: "assets/pour-over.webp", desc: "Método de filtrado por goteo, taza limpia con notas florales.", popular: true },
        { id: "coldbrew", name: "Cold brew 12 h", price: 65, image: "assets/interior-cafe.jpg", desc: "Extracción en frío durante 12 horas, dulce y refrescante." },
        { id: "moka", name: "Moka artesanal", price: 72, image: "assets/barista-sirviendo.jpg", desc: "Espresso con chocolate y leche, coronado con crema." }
      ]
    },
    {
      id: "desayunos",
      label: "Desayunos",
      items: [
        { id: "chilaquiles", name: "Chilaquiles con café", price: 120, image: "assets/chilaquiles.jpg", desc: "Totopos con salsa verde o roja, crema, queso y huevo. Incluye café americano.", popular: true },
        { id: "tostadas", name: "Tostadas de aguacate", price: 98, image: "assets/panaderia.webp", desc: "Pan de masa madre tostado con aguacate, huevo y cebolla encurtida." },
        { id: "hotcakes", name: "Hotcakes de plátano", price: 92, image: "assets/panaderia.webp", desc: "Esponjosos, con plátano caramelizado y miel de maple." },
        { id: "molletes", name: "Molletes del bosque", price: 85, image: "assets/panaderia.webp", desc: "Bolillo artesanal con frijoles, queso gratinado y pico de gallo." }
      ]
    },
    {
      id: "panaderia",
      label: "Panadería artesanal",
      items: [
        { id: "croissant", name: "Croissant de mantequilla", price: 48, image: "assets/panaderia.webp", desc: "Hojaldrado, horneado cada mañana con mantequilla de primera.", popular: true },
        { id: "masamadre", name: "Pan de masa madre", price: 42, image: "assets/panaderia.webp", desc: "Fermentación lenta de 24 horas, corteza crujiente." },
        { id: "concha", name: "Concha artesanal", price: 28, image: "assets/panaderia.webp", desc: "Panadería tradicional con costra de vainilla o chocolate." },
        { id: "panplatanonuez", name: "Pan de plátano con nuez", price: 58, image: "assets/panaderia.webp", desc: "Húmedo y aromático, con nuez tostada." },
        { id: "panelote", name: "Pan de elote", price: 40, image: "assets/panaderia.webp", desc: "Suave, dulce y con granos de elote." }
      ]
    },
    {
      id: "vegano",
      label: "Opciones veganas",
      items: [
        { id: "bowlacai", name: "Bowl de açaí", price: 115, image: "assets/bowl-acai.webp", desc: "Açaí con granola, frutas frescas y plátano.", popular: true },
        { id: "tofu", name: "Tofu scramble", price: 135, image: "assets/tofu-scramble.webp", desc: "Revuelto de tofu con cúrcuma, vegetales y pan integral.", vegan: true },
        { id: "bowlvegano", name: "Bowl de breakfast vegano", price: 120, image: "assets/bowl-vegano.webp", desc: "Quinoa, verduras asadas, aguacate y vinagreta de la casa.", vegan: true },
        { id: "leches", name: "Leches vegetales", price: 18, image: "assets/granos-cafe.webp", desc: "Extra de soya, almendra, avena o coco para tu bebida.", vegan: true }
      ]
    }
  ];

  const GALLERY = [
    { src: "assets/interior-cafe.jpg", alt: "Interior con mesas y luz cálida", label: "Luz cálida y mesas de madera" },
    { src: "assets/terraza.jpg", alt: "Terraza de la cafetería con plantas", label: "Terraza rodeada de plantas" },
    { src: "assets/interior-brick.webp", alt: "Pared de ladrillo y estantería de café", label: "Muro de ladrillo y café a granel" },
    { src: "assets/vitrina-panaderia.webp", alt: "Vitrina de panadería artesanal", label: "Vitrina de panadería artesanal" },
    { src: "assets/catacion.jpg", alt: "Mesas de catación de café", label: "Mesas de catación" },
    { src: "assets/barista-sirviendo.jpg", alt: "Barista sirviendo café", label: "Barista al servicio" },
    { src: "assets/exterior.webp", alt: "Exterior de la cafetería", label: "Nuestra fachada" },
    { src: "assets/latte-art-detalle.webp", alt: "Detalle de latte art", label: "Latte art" }
  ];

  const cart = {};
  let activeCategory = MENU[0].id;

  const $ = sel => document.querySelector(sel);
  const byId = id => MENU.flatMap(c => c.items).find(i => i.id === id);

  function cartCount() { return Object.values(cart).reduce((a, b) => a + b, 0); }
  function cartSum() {
    return Object.entries(cart).reduce((sum, [id, qty]) => sum + byId(id).price * qty, 0);
  }
  function buildMessage() {
    const lines = Object.entries(cart).map(([id, qty]) => {
      const item = byId(id);
      return "• " + qty + "x " + item.name + " — " + CURRENCY(item.price * qty);
    });
    const parts = ["Hola Café Aroma Del Valle ☕", "Quiero realizar el siguiente pedido:", ""];
    parts.push(lines.join("\n"));
    parts.push("");
    parts.push("Total: " + CURRENCY(cartSum()));
    const notes = $("#cartNotes").value.trim();
    if (notes) { parts.push(""); parts.push("Notas: " + notes); }
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(parts.join("\n"));
  }

  function openWhatsApp() {
    if (cartCount() === 0) {
      showToast("Agrega algo al pedido primero 🙂");
      return;
    }
    window.open(buildMessage(), "_blank", "noopener");
  }

  function showToast(text) {
    const t = $("#toast");
    t.textContent = text;
    t.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => t.classList.remove("show"), 2600);
  }

  function updateCartUI() {
    const count = cartCount();
    const total = cartSum();
    $("#cartCount").textContent = count;
    $("#cartTotal").textContent = CURRENCY(total);
    $("#cartTotalDrawer").textContent = CURRENCY(total);
    $("#cartBar").hidden = count === 0;
    document.body.classList.toggle("has-cart", count > 0);

    const list = $("#cartItems");
    list.innerHTML = "";
    if (count === 0) {
      list.innerHTML = '<li class="cart-empty">Tu pedido está vacío. Agrega algo del menú 🍂</li>';
      $("#cartSendBtn2").disabled = true;
      return;
    }
    $("#cartSendBtn2").disabled = false;
    Object.entries(cart).forEach(([id, qty]) => {
      const item = byId(id);
      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML =
        '<div><div class="cart-item-name">' + item.name + '</div>' +
        '<div class="cart-item-price">' + CURRENCY(item.price) + " c/u</div></div>" +
        '<div class="cart-item-qty">' +
          '<button class="cart-stepper" data-id="' + id + '" data-delta="-1" aria-label="Quitar uno">−</button>' +
          '<span class="cart-qty-num">' + qty + "</span>" +
          '<button class="cart-stepper" data-id="' + id + '" data-delta="1" aria-label="Agregar uno">+</button>' +
        "</div>" +
        '<button class="cart-remove" data-id="' + id + '" aria-label="Quitar del pedido">✕</button>';
      list.appendChild(li);
    });
  }

  function adjustCart(id, delta) {
    const next = (cart[id] || 0) + delta;
    if (next <= 0) delete cart[id];
    else cart[id] = next;
    updateCartUI();
    if (delta > 0) showToast(byId(id).name + " agregado al pedido");
  }

  function setActiveCategory(id) {
    activeCategory = id;
    document.querySelectorAll(".menu-tab").forEach(t => {
      const active = t.dataset.cat === id;
      t.classList.toggle("active", active);
      t.setAttribute("aria-selected", String(active));
      t.setAttribute("tabindex", active ? "0" : "-1");
    });
    renderMenuItems();
  }

  function renderMenuItems() {
    const cat = MENU.find(c => c.id === activeCategory);
    const grid = $("#menuGrid");
    grid.innerHTML = "";
    cat.items.forEach(item => {
      const article = document.createElement("article");
      article.className = "menu-card";
      const badges = [];
      if (item.vegan) badges.push('<span class="menu-card-badge">100% vegano</span>');
      if (item.popular) badges.push('<span class="menu-card-badge popular">Favorito</span>');
      article.innerHTML =
        '<div class="menu-card-img">' +
          (badges.join("") || "") +
          '<img src="' + item.image + '" alt="' + item.name + '" loading="lazy">' +
        "</div>" +
        '<div class="menu-card-body">' +
          '<div class="menu-card-top"><h3>' + item.name + "</h3></div>" +
          '<p class="menu-card-desc">' + item.desc + "</p>" +
          '<div class="menu-card-foot">' +
            '<span class="menu-card-price">' + CURRENCY(item.price) + " <small>MXN</small></span>" +
            '<button class="add-btn" data-id="' + item.id + '" data-name="' + item.name.replace(/"/g, "&quot;") + '">Agregar</button>' +
          "</div>" +
        "</div>";
      grid.appendChild(article);
    });
  }

  function renderTabs() {
    const tabs = $("#menuTabs");
    tabs.innerHTML = "";
    MENU.forEach((cat, i) => {
      const btn = document.createElement("button");
      btn.className = "menu-tab" + (i === 0 ? " active" : "");
      btn.dataset.cat = cat.id;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", String(i === 0));
      btn.setAttribute("tabindex", i === 0 ? "0" : "-1");
      btn.textContent = cat.label;
      btn.addEventListener("click", () => setActiveCategory(cat.id));
      tabs.appendChild(btn);
    });
  }

  function renderGallery() {
    const grid = $("#galleryGrid");
    grid.innerHTML = "";
    GALLERY.forEach(g => {
      const fig = document.createElement("figure");
      fig.className = "gallery-item";
      fig.innerHTML =
        '<img src="' + g.src + '" alt="' + g.alt + '" loading="lazy">' +
        "<figcaption>" + g.label + "</figcaption>";
      grid.appendChild(fig);
    });
  }

  function initNav() {
    const header = $("#siteHeader");
    const toggle = $("#navToggle");
    const menu = $("#navMenu");

    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    menu.addEventListener("click", e => {
      if (e.target.closest("a")) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initCartUI() {
    $("#menuGrid").addEventListener("click", e => {
      const btn = e.target.closest(".add-btn");
      if (!btn) return;
      adjustCart(btn.dataset.id, 1);
      const html = btn.innerHTML;
      btn.textContent = "✓ Agregado";
      btn.classList.add("added");
      setTimeout(() => {
        btn.innerHTML = html;
        btn.classList.remove("added");
      }, 1000);
    });

    $("#cartItems").addEventListener("click", e => {
      const stepper = e.target.closest(".cart-stepper");
      if (stepper) adjustCart(stepper.dataset.id, Number(stepper.dataset.delta));
      const remove = e.target.closest(".cart-remove");
      if (remove) { delete cart[remove.dataset.id]; updateCartUI(); }
    });

    const drawer = $("#cartDrawer");
    const backdrop = $("#drawerBackdrop");
    const open = () => {
      updateCartUI();
      drawer.classList.add("open");
      backdrop.classList.add("show");
      backdrop.hidden = false;
      drawer.hidden = false;
      $("#cartBarToggle").setAttribute("aria-expanded", "true");
    };
    const close = () => {
      drawer.classList.remove("open");
      backdrop.classList.remove("show");
      setTimeout(() => { if (!drawer.classList.contains("open")) drawer.hidden = true; }, 350);
      setTimeout(() => { backdrop.hidden = true; }, 350);
      $("#cartBarToggle").setAttribute("aria-expanded", "false");
    };

    $("#cartBarToggle").addEventListener("click", () => {
      drawer.classList.contains("open") ? close() : open();
    });
    $("#cartClose").addEventListener("click", close);
    $("#drawerBackdrop").addEventListener("click", close);
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });

    $("#cartSendBtn").addEventListener("click", openWhatsApp);
    $("#cartSendBtn2").addEventListener("click", openWhatsApp);

    $("#cartNotes").addEventListener("input", () => {});
  }

  function initExtras() {
    $("#yearNow").textContent = new Date().getFullYear();
    const heroOrder = $("#heroOrderBtn");
    const waFloat = $("#waFloat");
    waFloat.addEventListener("click", () => {});
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderTabs();
    renderMenuItems();
    renderGallery();
    updateCartUI();
    initNav();
    initCartUI();
    initExtras();
  });
})();