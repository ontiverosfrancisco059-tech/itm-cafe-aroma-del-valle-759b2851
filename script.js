/* =====================================================================
   Café Aroma Del Valle — script.js
   Menú interactivo · Carrito de pedido · Galería · WhatsApp
   ===================================================================== */

(function () {
  "use strict";

  var PHONE = "528112345678";
  var BIZ_NAME = "Café Aroma Del Valle";
  var BASE_WA =
    "https://wa.me/" + PHONE + "?text=" + encodeURIComponent("Hola, quiero hacer un pedido en " + BIZ_NAME);

  /* ---------- Utilidades ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function money(n) { return "$" + n.toLocaleString("es-MX"); }

  /* ---------- Header + menú móvil ---------- */
  var header = $("#site-header");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var navToggle = $("#nav-toggle");
  var navLinks = $("#nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $all("a", navLinks).forEach(function (a) {
      a.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = $all(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Tabs del menú ---------- */
  var tabs = $all(".menu-tab");
  var panels = $all("[data-panel]");

  function switchTab(cat) {
    tabs.forEach(function (t) {
      t.classList.toggle("active", t.getAttribute("data-cat") === cat);
      t.setAttribute("aria-selected", t.getAttribute("data-cat") === cat ? "true" : "false");
    });
    panels.forEach(function (p) {
      p.hidden = p.getAttribute("data-panel") !== cat;
    });
  }
  tabs.forEach(function (t) {
    t.addEventListener("click", function () { switchTab(t.getAttribute("data-cat")); });
  });

  /* ---------- Carrito / pedido por WhatsApp ---------- */
  var cart = {}; // name -> { name, price, qty }

  var cartBar = $("#cart-bar");
  var cartCount = $("#cart-count");
  var cartTotal = $("#cart-total");
  var cartCheckout = $("#cart-checkout");
  var cartClear = $("#cart-clear");

  function cartSummary() {
    var totalItems = 0;
    var total = 0;
    Object.keys(cart).forEach(function (k) {
      var it = cart[k];
      totalItems += it.qty;
      total += it.qty * it.price;
    });
    return { items: totalItems, total: total };
  }

  function renderCart(open) {
    var s = cartSummary();
    if (cartCount) {
      cartCount.textContent = s.items;
      cartCount.style.display = s.items ? "grid" : "none";
    }
    if (cartTotal) cartTotal.textContent = money(s.total);
    if (cartBar) {
      cartBar.classList.toggle("open", s.items > 0 || open);
    }
    if (cartCheckout) {
      cartCheckout.href = s.items ? buildOrderUrl() : BASE_WA;
    }
  }

  function buildOrderUrl() {
    var lines = [];
    lines.push("*Pedido* " + BIZ_NAME + " " + window.location.origin + "/");
    lines.push("Hola, quiero ordenar:");
    lines.push("");
    Object.keys(cart).forEach(function (k) {
      var it = cart[k];
      lines.push(
        "- " + it.qty + "x " + it.name + " (" + money(it.price * it.qty) + ")"
      );
    });
    var s = cartSummary();
    lines.push("");
    lines.push("*Total:* " + money(s.total));
    lines.push("");
    lines.push("¿Me confirman disponibilidad y tiempo de entrega?");
    return "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(lines.join("\n"));
  }

  function addToCart(name, price) {
    if (!cart[name]) {
      cart[name] = { name: name, price: price, qty: 0 };
    }
    cart[name].qty += 1;
    renderCart(true);
  }

  function clearCart() {
    cart = {};
    renderCart(false);
  }

  $all("[data-add]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest("[data-item]");
      if (!item) return;
      addToCart(item.getAttribute("data-name"), parseInt(item.getAttribute("data-price"), 10));
      flashButton(btn);
    });
  });

  if (cartClear) cartClear.addEventListener("click", clearCart);

  function flashButton(btn) {
    var original = btn.innerHTML;
    btn.innerHTML = "✓ Agregado";
    btn.style.background = "#4CAF50";
    btn.style.color = "#fff";
    setTimeout(function () {
      btn.innerHTML = original;
      btn.style.background = "";
      btn.style.color = "";
    }, 900);
  }

  renderCart(false);

  /* ---------- Galería / Lightbox ---------- */
  var gItems = $all(".g-item");
  var lightbox = $("#lightbox");
  var lbImg = $("#lb-img");
  var lbCap = $("#lb-cap");
  var lbIndex = -1;

  if (lightbox && gItems.length) {
    function openLb(i) {
      if (i < 0) i = 0;
      if (i > gItems.length - 1) i = gItems.length - 1;
      lbIndex = i;
      var img = $("img", gItems[i]);
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = gItems[i].getAttribute("data-cap") || "";
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function closeLb() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
    gItems.forEach(function (g, i) {
      g.addEventListener("click", function () { openLb(i); });
    });
    $("#lb-close").addEventListener("click", closeLb);
    $("#lb-prev").addEventListener("click", function () {
      openLb(lbIndex - 1);
    });
    $("#lb-next").addEventListener("click", function () {
      openLb(lbIndex + 1);
    });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLb();
    });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") openLb(lbIndex - 1);
      if (e.key === "ArrowRight") openLb(lbIndex + 1);
    });
  }

  /* ---------- Año en footer ---------- */
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();