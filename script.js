/* ==========================================================================
   Café Aroma Del Valle — script.js
   Menú dinámico, pedidos por WhatsApp, navegación y galería.
   ========================================================================== */

const PHONE = "528112345678";

const MENU = [
  // Desayunos
  {
    id: "chilaquiles",
    cat: "desayunos",
    name: "Chilaquiles con Café",
    desc: "Tortilla crocante, salsa roja o verde, crema, queso y frijoles. Acompañado de café de la casa.",
    price: 95,
    tag: "Clásico",
    img: "https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=ee3d98af-9adb-4d76-9c01-5e8f0b47ce57",
    alt: "Chilaquiles con café",
  },
  {
    id: "bowl-breakfast",
    cat: "desayunos",
    name: "Bowl de Breakfast Vegano",
    desc: "Granola, frutas frescas, açaí y mantequilla de almendra. Energía limpia para tu mañana.",
    price: 115,
    tag: "Vegano",
    img: "https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=a599b91a-a465-4595-8264-1552299a7720",
    alt: "Bowl vegano de breakfast",
  },
  {
    id: "tofu-scramble",
    cat: "desayunos",
    name: "Tofu Scramble",
    desc: "Tofu sazonado con cúrcuma, vegetales salteados y pan integral tostado.",
    price: 105,
    tag: "Vegano",
    img: "https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=435575ff-8529-4fc0-b84f-02cf22dfd14d",
    alt: "Tofu scramble vegano con vegetales y pan integral",
  },
  {
    id: "bowl-acai",
    cat: "desayunos",
    name: "Bowl de Granola y Açaí",
    desc: "Granola crujiente, frutas de temporada y açaí, con un toque de miel orgánica.",
    price: 99,
    tag: "Vegano",
    img: "https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=79455095-fa5d-47f5-8d58-bb03013393f0",
    alt: "Bowl vegano colorido con granola, frutas frescas y açaí",
  },
  // Cafés y bebidas
  {
    id: "cappuccino",
    cat: "bebidas",
    name: "Cappuccino de Especialidad",
    desc: "Espresso de origen con leche vaporizada y latte art. Doble shot como se debe.",
    price: 62,
    tag: "Caliente",
    img: "https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=6a8996e6-e2ce-473c-b45a-f9d8ef2d9ca5",
    alt: "Café de especialidad con latte art",
  },
  {
    id: "pour-over",
    cat: "bebidas",
    name: "Café Pour Over",
    desc: "Método de filtrado que resalta las notas del grano de origen. Pregunta por los orígenes del día.",
    price: 78,
    tag: "Método",
    img: "https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=4c34b17a-580b-4ada-aa77-c538ec0db4cc",
    alt: "Café de método pour over",
  },
  {
    id: "espresso-origen",
    cat: "bebidas",
    name: "Espresso de Origen",
    desc: "Granos seleccionados de productores mexicanos, tostado medio con cuerpo y dulzor.",
    price: 42,
    tag: "Corto",
    img: "https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=17eb13cb-a7ee-49a7-a109-41243b6ce3ab",
    alt: "Granos de café de origen",
  },
  {
    id: "latte-casa",
    cat: "bebidas",
    name: "Latte Tostado de la Casa",
    desc: "Espresso, leche cremosa y un toque de caramelo tostado. Ideal con panadería.",
    price: 65,
    tag: "Popular",
    img: "https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=d18438c6-9d62-4551-8b85-8c607fa4b947",
    alt: "Detalle de latte art",
  },
  // Panadería y postres
  {
    id: "panaderia",
    cat: "panaderia",
    name: "Panadería Artesanal",
    desc: "Croissants, cuernitos y pan de masa madre horneados cada mañana.",
    price: 45,
    tag: "Fresco",
    img: "https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=4a40467c-8717-4b0f-994e-df0ed84c121d",
    alt: "Panadería artesanal recién horneada",
  },
  {
    id: "postre-dia",
    cat: "panaderia",
    name: "Postres del Día",
    desc: "Cheesecake, tartas y brownies de la casa. Pregunta por las opciones veganas.",
    price: 55,
    tag: "Del día",
    img: "https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=be5dd427-9355-4c82-8a78-1943d4a0c821",
    alt: "Vitrina de panadería artesanal",
  },
];

/* ==================== Estado del carrito ==================== */

const cart = {};

function buildMessage() {
  const lines = Object.values(cart).map(
    (item) => `• ${item.qty} × ${item.name} — $${item.qty * item.price}`
  );
  const total = Object.values(cart).reduce((acc, i) => acc + i.qty * i.price, 0);
  return (
    `Hola, Café Aroma Del Valle 👋\n\nQuiero hacer este pedido:\n\n${lines.join("\n")}\n\n` +
    `Total: $${total}\n\nMi nombre y dirección: ` 
  );
}

function sendOrder() {
  const msg = encodeURIComponent(buildMessage());
  window.open(`https://wa.me/${PHONE}?text=${msg}`, "_blank", "noopener");
}

/* ==================== Render del menú ==================== */

const menuGrid = document.getElementById("menuGrid");

function renderMenu(filter = "desayunos") {
  const items = filter === "todo" ? MENU : MENU.filter((i) => i.cat === filter);
  menuGrid.innerHTML = items
    .map(
      (item) => `
      <article class="menu-item">
        <img class="menu-item__img" src="${item.img}" alt="${item.alt}" loading="lazy" data-zoom="${item.img}" data-alt="${item.alt}">
        <div class="menu-item__body">
          <div class="menu-item__top">
            <h3 class="menu-item__name">${item.name}</h3>
            ${item.tag ? `<span class="menu-item__tag">${item.tag}</span>` : ""}
          </div>
          <p class="menu-item__desc">${item.desc}</p>
          <div class="menu-item__foot">
            <span class="menu-item__price">$${item.price} <small>MXN</small></span>
            <button class="menu-item__add" data-add="${item.id}">Agregar</button>
          </div>
        </div>
      </article>`
    )
    .join("");
}

/* ==================== Tabs del menú ==================== */

document.getElementById("menuTabs").addEventListener("click", (e) => {
  const btn = e.target.closest(".menu__tab");
  if (!btn) return;
  document.querySelectorAll(".menu__tab").forEach((t) => t.classList.remove("is-active"));
  btn.classList.add("is-active");
  renderMenu(btn.dataset.cat);
});

/* ==================== Delegación del menú ==================== */

menuGrid.addEventListener("click", (e) => {
  const addBtn = e.target.closest("[data-add]");
  if (addBtn) {
    const id = addBtn.dataset.add;
    cart[id] = cart[id] || { ...MENU.find((m) => m.id === id), qty: 0 };
    cart[id].qty += 1;
    updateCart();
    if (cartCount.textContent === "1" && !cart.classList.contains("is-open")) {
      pulseFloating();
    } else {
      openCart();
    }
    return;
  }

  const zoomImg = e.target.closest("[data-zoom]");
  if (zoomImg) openLightbox(zoomImg.dataset.zoom, zoomImg.dataset.alt);
});

/* ==================== Carrito ==================== */

const cartEl = document.getElementById("cart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const cartBtn = document.getElementById("cartBtn");
const cartClose = document.getElementById("cartClose");
const cartBackdrop = document.getElementById("cartBackdrop");
const cartSend = document.getElementById("cartSend");

function updateCart() {
  const ids = Object.keys(cart);
  const count = ids.reduce((acc, id) => acc + cart[id].qty, 0);
  cartCount.textContent = count;

  cartItems.innerHTML =
    count === 0
      ? `<li class="cart__empty">Tu pedido está vacío.<br>Agrega algo rico del menú ☕</li>`
      : ids.map(
          (id) => `
          <li class="cart-line">
            <div class="cart-line__info">
              <p class="cart-line__name">${cart[id].name}</p>
              <p class="cart-line__price">$${cart[id].price} c/u</p>
            </div>
            <div class="cart-line__controls">
              <button class="cart-line__btn" data-dec="${id}" aria-label="Quitar uno">−</button>
              <span class="cart-line__qty">${cart[id].qty}</span>
              <button class="cart-line__btn" data-inc="${id}" aria-label="Agregar uno">+</button>
              <button class="cart-line__remove" data-rm="${id}" aria-label="Eliminar">×</button>
            </div>
          </li>`
        )
        .join("");

  const total = ids.reduce((acc, id) => acc + cart[id].qty * cart[id].price, 0);
  cartTotal.textContent = `$${total}`;
  cartSend.disabled = count === 0;
}

cartItems.addEventListener("click", (e) => {
  const inc = e.target.closest("[data-inc]");
  const dec = e.target.closest("[data-dec]");
  const rm = e.target.closest("[data-rm]");
  if (inc) {
    cart[inc.dataset.inc].qty += 1;
  } else if (dec) {
    cart[dec.dataset.dec].qty -= 1;
    if (cart[dec.dataset.dec].qty <= 0) delete cart[dec.dataset.dec];
  } else if (rm) {
    delete cart[rm.dataset.rm];
  } else {
    return;
  }
  updateCart();
});

function openCart() {
  cartEl.classList.add("is-open");
  cartBackdrop.classList.add("is-visible");
  cartEl.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  cartEl.classList.remove("is-open");
  cartBackdrop.classList.remove("is-visible");
  cartEl.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

let pulseTimer;
function pulseFloating() {
  cartBtn.style.transform = "translateY(-6px) scale(1.06)";
  clearTimeout(pulseTimer);
  pulseTimer = setTimeout(() => (cartBtn.style.transform = ""), 400);
}

cartBtn.addEventListener("click", () => {
  if (cartCount.textContent === "0") {
    pulseFloating();
  } else {
    openCart();
  }
});
cartClose.addEventListener("click", closeCart);
cartBackdrop.addEventListener("click", closeCart);
cartSend.addEventListener("click", () => {
  if (Object.keys(cart).length === 0) return;
  openWhatsApp();
});

function openWhatsApp() {
  sendOrder();
  setTimeout(() => {
    closeCart();
    clearCart();
  }, 1200);
}

function clearCart() {
  Object.keys(cart).forEach((k) => delete cart[k]);
  updateCart();
}

/* ==================== Lightbox ==================== */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
}

lightbox.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightbox();
    closeCart();
  }
});

/* Galería click → lightbox */
document.getElementById("galleryGrid").addEventListener("click", (e) => {
  const img = e.target.closest("img");
  if (img) {
    openLightbox(img.src, img.alt);
  }
});

/* ==================== Navegación ==================== */

const nav = document.getElementById("nav");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  nav.classList.toggle("is-scrolled", window.scrollY > 40);
});

document.getElementById("navToggle").addEventListener("click", function () {
  const open = navLinks.classList.toggle("is-open");
  this.classList.toggle("is-open", open);
  this.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
});

navLinks.addEventListener("click", (e) => {
  if (e.target.closest("a")) {
    navLinks.classList.remove("is-open");
    document.getElementById("navToggle").classList.remove("is-open");
    document.body.style.overflow = "";
  }
});

/* ==================== Inicialización ==================== */

document.getElementById("year").textContent = new Date().getFullYear();
renderMenu("desayunos");
updateCart();