/* Café Aroma del Valle · Menú + pedido por WhatsApp */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "528112345678";
  var ASSET = function (id) {
    return "https://8f785f4a.itm-void-excepcional.pages.dev/api/itm-project-assets?file=" + id;
  };

  /* ---------- Datos del menú ---------- */
  var MENU = [
    /* Desayunos */
    {
      cat: "desayunos",
      name: "Chilaquiles con café de olla",
      desc: "Totopos crujientes con salsa de jitomate o verde, crema, queso fresco y huevo. Acompañados de café de olla.",
      price: 95,
      img: "bc41521f-3bce-417a-9e3e-bae88d760211",
      alt: "Chilaquiles con café",
      tag: "Desayuno"
    },
    {
      cat: "desayunos",
      name: "Bowl vegano de breakfast",
      desc: "Frijoles, guacamole, tofu revuelto, jitomate y pan integral. Opción 100% vegana.",
      price: 120,
      img: "6e4bfb6f-aa63-4c35-aea8-5c66a75dde8e",
      alt: "Bowl vegano de breakfast",
      tag: "Vegano"
    },
    {
      cat: "desayunos",
      name: "Bowl de açaí con granola",
      desc: "Açaí, granola artesanal, frutas frescas y semillas. Ligero, colorido y fresco.",
      price: 110,
      img: "8f706439-4477-416e-9daf-f9ce58ed35dd",
      alt: "Bowl vegano colorido con granola, frutas frescas y açaí",
      tag: "Vegano"
    },
    {
      cat: "desayunos",
      name: "Tofu scramble con vegetales",
      desc: "Tofu revuelto con cúrcuma, vegetales salteados y pan integral tostado.",
      price: 115,
      img: "5fcc3e0a-f201-428c-906e-e8ccf0062700",
      alt: "Tofu scramble vegano con vegetales y pan integral",
      tag: "Vegano"
    },
    {
      cat: "desayunos",
      name: "Huevos al gusto de la casa",
      desc: "Estilo ranchero, revueltos o tibios. Con frijoles refritos, aguacate y pan artesanal.",
      price: 89,
      img: null,
      alt: "",
      tag: "Desayuno",
      mono: "H"
    },

    /* Café & bebidas */
    {
      cat: "cafe",
      name: "Espresso de origen",
      desc: "Shot de espresso con notas de cacao y frutos secos. Extracción de especialidad.",
      price: 40,
      img: null,
      alt: "",
      tag: "Café",
      mono: "E"
    },
    {
      cat: "cafe",
      name: "Cappuccino clásico",
      desc: "Espresso balanceado con leche vaporizada y microfoam sedoso.",
      price: 55,
      img: null,
      alt: "",
      tag: "Café",
      mono: "C"
    },
    {
      cat: "cafe",
      name: "Latte con latte art",
      desc: "Espresso, leche aterciopelada y latte art servido con cariño.",
      price: 60,
      img: "beca28a3-0ed7-4b80-9182-da15dc597cf0",
      alt: "Café de especialidad con latte art",
      tag: "Café"
    },
    {
      cat: "cafe",
      name: "Pour over de especialidad",
      desc: "Método manual que resalta las notas de origen del grano. Servido en taza cerámica.",
      price: 70,
      img: "ae614cbc-ebee-4c3b-bb58-d9e4690dd2f9",
      alt: "Café de método pour over",
      tag: "Método"
    },
    {
      cat: "cafe",
      name: "Cold brew de 12 h",
      desc: "Extracción en frío durante 12 horas. Suave, dulce y muy refrescante.",
      price: 60,
      img: null,
      alt: "",
      tag: "Bebida",
      mono: "CB"
    },
    {
      cat: "cafe",
      name: "Matcha latte",
      desc: "Matcha ceremonial con leche, endulzado al gusto. Opción también en versión vegana.",
      price: 65,
      img: null,
      alt: "",
      tag: "Bebida",
      mono: "M"
    },

    /* Panadería & postres */
    {
      cat: "panaderia",
      name: "Panadería artesanal",
      desc: "Pan de masa madre, croissants y panes dulces horneados cada mañana. Precio por pieza.",
      price: 45,
      img: "8b6a5725-084e-4d52-92ba-28a61870b5e5",
      alt: "Panadería artesanal recién horneada",
      tag: "Panadería"
    },
    {
      cat: "panaderia",
      name: "Croissant de mantequilla",
      desc: "Laminado a mano, crujiente por fuera y suave por dentro.",
      price: 42,
      img: null,
      alt: "",
      tag: "Panadería",
      mono: "Cr"
    },
    {
      cat: "panaderia",
      name: "Cheesecake de la casa",
      desc: "Base de galleta especiada y crema suave. Acompaña con tu café favorito.",
      price: 78,
      img: null,
      alt: "",
      tag: "Postre",
      mono: "Cs"
    },
    {
      cat: "panaderia",
      name: "Brownie con nuez",
      desc: "Intenso, húmedo y con nuez. Porción generosa para compartir. Versión vegana disponible.",
      price: 55,
      img: null,
      alt: "",
      tag: "Postre",
      mono: "B"
    }
  ];

  var PARA_LLEVAR = [
    {
      cat: "para-llevar",
      name: "Granos de café de origen 250 g",
      desc: "Tostado de especialidad. Ideal para disfrutar el aroma de la casa en tu cocina.",
      price: 280,
      img: "0199d294-99dd-44e8-9a70-5e27dcd42ccc",
      alt: "Granos de café de origen",
      tag: "Para llevar"
    },
    {
      cat: "para-llevar",
      name: "Mezcla de la casa 250 g",
      desc: "Blend balanceado por nuestros baristas. Cuerpo medio, notas dulces.",
      price: 240,
      img: null,
      alt: "",
      tag: "Para llevar",
      mono: "C"
    },
    {
      cat: "para-llevar",
      name: "Frasco de miel de agave",
      desc: "Endulzante natural que complementa tus bebidas frías y calientes.",
      price: 90,
      img: null,
      alt: "",
      tag: "Tienda",
      mono: "M"
    }
  ];

  MENU = MENU.concat(PARA_LLEVAR);

  var CATEGORIES = {
    desayunos: "Desayunos",
    cafe: "Café & bebidas",
    panaderia: "Panadería & postres",
    "para-llevar": "Para llevar"
  };
  var CAT_ORDER = ["desayunos", "cafe", "panaderia", "para-llevar"];

  /* ---------- Estado del pedido ---------- */
  var cart = {}; // id -> qty
  var currentCat = "desayunos";

  var byId = {};
  MENU.forEach(function (item) {
    byId[item.name] = item;
  });

  function itemKey(item) {
    return item.name;
  }
  function money(n) {
    return "$" + n.toLocaleString("es-MX");
  }

  /* ---------- Render del menú ---------- */
  var grid = document.getElementById("menu-grid");

  function renderMenu() {
    grid.innerHTML = "";
    var items = MENU.filter(function (m) { return m.cat === currentCat; });
    items.forEach(function (item) {
      var card = document.createElement("article");
      card.className = "menu-card reveal in" + (item.img ? " has-img" : "");

      var media = document.createElement("div");
      media.className = "menu-card__img";
      if (item.img) {
        var im = document.createElement("img");
        im.src = ASSET(item.img);
        im.alt = item.alt || item.name;
        im.loading = "lazy";
        media.appendChild(im);
      } else {
        media.textContent = item.mono || "·";
      }

      var body = document.createElement("div");
      body.className = "menu-card__body";

      var tag = document.createElement("span");
      tag.className = "menu-card__tag";
      tag.textContent = item.tag || CATEGORIES[item.cat];
      body.appendChild(tag);

      var h3 = document.createElement("h3");
      h3.textContent = item.name;
      body.appendChild(h3);

      var p = document.createElement("p");
      p.textContent = item.desc;
      body.appendChild(p);

      var foot = document.createElement("div");
      foot.className = "menu-card__foot";

      var price = document.createElement("span");
      price.className = "menu-card__price";
      price.textContent = money(item.price);
      foot.appendChild(price);

      var add = document.createElement("button");
      add.className = "menu-card__add";
      add.type = "button";
      add.innerHTML = '<span class="plus" aria-hidden="true">＋</span> Agregar';
      add.setAttribute("aria-label", "Agregar " + item.name + " al pedido");
      add.addEventListener("click", function () {
        addToCart(item);
      });
      foot.appendChild(add);

      body.appendChild(foot);
      card.appendChild(media);
      card.appendChild(body);
      grid.appendChild(card);
    });
  }

  /* ---------- Pestañas de categoría ---------- */
  var tabs = document.querySelectorAll(".menu-tab");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      currentCat = tab.getAttribute("data-cat");
      renderMenu();
    });
  });

  /* ---------- Carrito ---------- */
  var panel = document.getElementById("cart-panel");
  var backdrop = document.getElementById("cart-backdrop");
  var fab = document.getElementById("cart-fab");
  var countEl = document.getElementById("cart-count");
  var itemsEl = document.getElementById("cart-items");
  var emptyEl = document.getElementById("cart-empty");
  var totalEl = document.getElementById("cart-total");
  var sendBtn = document.getElementById("cart-send");
  var cartOpen = false;

  function cartSize() {
    var n = 0;
    Object.keys(cart).forEach(function (k) { n += cart[k]; });
    return n;
  }
  function cartTotal() {
    var sum = 0;
    Object.keys(cart).forEach(function (k) {
      var it = byId[k];
      if (it) sum += it.price * cart[k];
    });
    return sum;
  }

  function addToCart(item) {
    var k = itemKey(item);
    cart[k] = (cart[k] || 0) + 1;
    updateCart();
    toast(item.name + " agregado al pedido.");
  }
  function setQty(k, q) {
    if (q <= 0) delete cart[k];
    else cart[k] = q;
    updateCart();
  }

  function updateCart() {
    var n = cartSize();
    countEl.hidden = n === 0;
    countEl.textContent = n;
    fab.classList.toggle("has-items", n > 0);

    itemsEl.innerHTML = "";
    Object.keys(cart).forEach(function (k) {
      var item = byId[k];
      if (!item) return;
      var q = cart[k];

      var li = document.createElement("li");
      li.className = "cart-item";

      var name = document.createElement("span");
      name.className = "cart-item__name";
      name.textContent = item.name;

      var line = document.createElement("span");
      line.className = "cart-item__line";
      line.textContent = money(item.price * q);

      var unit = document.createElement("span");
      unit.className = "cart-item__unit";
      unit.textContent = money(item.price) + " c/u";

      var controls = document.createElement("div");
      controls.className = "cart-item__controls";

      var minus = document.createElement("button");
      minus.type = "button";
      minus.textContent = "−";
      minus.setAttribute("aria-label", "Quitar uno de " + item.name);
      minus.addEventListener("click", function () { setQty(k, q - 1); });

      var qtyEl = document.createElement("span");
      qtyEl.className = "cart-item__qty";
      qtyEl.textContent = q;

      var plus = document.createElement("button");
      plus.type = "button";
      plus.textContent = "+";
      plus.setAttribute("aria-label", "Agregar uno a " + item.name);
      plus.addEventListener("click", function () { setQty(k, q + 1); });

      var remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "✕";
      remove.setAttribute("aria-label", "Quitar " + item.name + " del pedido");
      remove.addEventListener("click", function () { setQty(k, 0); });

      controls.appendChild(minus);
      controls.appendChild(qtyEl);
      controls.appendChild(plus);
      controls.appendChild(remove);

      li.appendChild(name);
      li.appendChild(line);
      li.appendChild(unit);
      li.appendChild(controls);
      itemsEl.appendChild(li);
    });

    emptyEl.style.display = n === 0 ? "block" : "none";
    sendBtn.disabled = n === 0;
    totalEl.textContent = money(cartTotal());
  }

  /* ---------- Enviar por WhatsApp ---------- */
  function openWhatsApp() {
    var lines = [];
    lines.push("Hola, Café Aroma del Valle ☕");
    lines.push("Quiero hacer el siguiente pedido:");
    lines.push("");

    Object.keys(cart).forEach(function (k) {
      var item = byId[k];
      if (!item) return;
      lines.push("• " + item.name + " ×" + cart[k] + " — " + money(item.price * cart[k]));
    });

    lines.push("");
    lines.push("Total estimado: " + money(cartTotal()));
    lines.push("");
    lines.push("¿Me confirman disponibilidad y tiempo de entrega?");

    var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank", "noopener");
  }

  sendBtn.addEventListener("click", openWhatsApp);

  /* ---------- Abrir / cerrar carrito ---------- */
  function setCartOpen(open) {
    cartOpen = open;
    panel.classList.toggle("open", open);
    panel.setAttribute("aria-hidden", String(!open));
    backdrop.hidden = false;
    backdrop.classList.toggle("show", open);
    document.body.classList.toggle("no-scroll", open);
  }
  fab.addEventListener("click", function () { setCartOpen(true); });
  document.getElementById("cart-close").addEventListener("click", function () { setCartOpen(false); });
  backdrop.addEventListener("click", function () { setCartOpen(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && cartOpen) setCartOpen(false);
  });

  /* ---------- Toast ---------- */
  var toastEl = document.getElementById("toast");
  var toastTimer = null;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2600);
  }

  /* ---------- Navegación móvil ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("main-nav");
  navToggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Header con scroll ---------- */
  var header = document.getElementById("site-header");
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Año en el pie ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Inicialización ---------- */
  renderMenu();
  updateCart();
})();