/* ============================================================
   Café Aroma Del Valle — script.js
   ============================================================ */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "528112345678";

  /* ---------- helpers ---------- */
  function $(sel, scope) { return (scope || document).querySelector(sel); }
  function $all(sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); }
  function formatMoney(n) { return "$" + n.toLocaleString("es-MX"); }

  var store = {
    items: {}, // key -> { name, price, qty }
    added: 0
  };

  var toastTimer = null;

  function showToast(msg) {
    var el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2200);
  }

  /* ---------- header scroll state ---------- */
  var header = $("#siteHeader");
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile nav ---------- */
  var navToggle = $("#navToggle");
  var mainNav = $("#mainNav");

  navToggle.addEventListener("click", function () {
    var open = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  $all(".main-nav a").forEach(function (a) {
    a.addEventListener("click", function () {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- reveal on scroll ---------- */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  $all(".reveal").forEach(function (el) { revealObserver.observe(el); });

  /* ---------- active nav link ---------- */
  var sections = $all("section[id]");
  var navLinks = $all(".nav-link");

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute("id");
        navLinks.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(function (s) { sectionObserver.observe(s); });

  /* ---------- menu tabs ---------- */
  var tabs = $all(".menu-tab");
  var grids = $all(".menu-grid");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      var cat = tab.getAttribute("data-cat");
      grids.forEach(function (grid) {
        var show = grid.getAttribute("data-cat") === cat;
        grid.hidden = !show;
      });
    });
  });

  /* ---------- cart / order tray ---------- */
  var cartFab = $("#cartFab");
  var cartCount = $("#cartCount");
  var orderTray = $("#orderTray");
  var trayBackdrop = $("#trayBackdrop");
  var trayClose = $("#trayClose");
  var trayItems = $("#trayItems");
  var trayEmpty = $("#trayEmpty");
  var trayTotal = $("#trayTotal");
  var trayWhatsapp = $("#trayWhatsapp");
  var trayClear = $("#trayClear");

  function addItem(name, price) {
    var key = name.toLowerCase();
    if (store.items[key]) {
      store.items[key].qty += 1;
    } else {
      store.items[key] = { name: name, price: price, qty: 1 };
    }
    store.added += 1;
    renderCart();
    showToast("✓ " + name + " agregado a tu pedido");
    cartFab.classList.remove("bump");
    void cartFab.offsetWidth;
    cartFab.classList.add("bump");
  }

  function removeItem(key) { delete store.items[key]; renderCart(); }

  function changeQty(key, delta) {
    var item = store.items[key];
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) { delete store.items[key]; }
    renderCart();
  }

  function updateFab() {
    var total = Object.keys(store.items).reduce(function (sum, k) {
      return sum + store.items[k].qty;
    }, 0);
    if (total > 0) {
      cartCount.hidden = false;
      cartCount.textContent = total;
    } else {
      cartCount.hidden = true;
    }
  }

  var PRICE_RX = /^\$?([\d,.]+)\s*$/;

  function parsePrice(raw) {
    var m = String(raw || "").replace(/desde\s*/i, "").match(PRICE_RX);
    return m ? parseFloat(m[1].replace(/,/g, ".")) : 0;
  }

  function renderCart() {
    updateFab();
    var keys = Object.keys(store.items);
    trayEmpty.hidden = keys.length > 0;
    trayItems.innerHTML = "";
    var total = 0;

    keys.forEach(function (k) {
      var item = store.items[k];
      total += item.price * item.qty;

      var li = document.createElement("li");
      li.className = "tray-item";

      var nameBox = document.createElement("div");
      nameBox.className = "tray-item-name";
      nameBox.innerHTML = item.name + "<small>" + formatMoney(item.price) + " c/u</small>";

      var qtyBox = document.createElement("div");
      qtyBox.className = "qty";
      var btnMinus = document.createElement("button");
      btnMinus.textContent = "−";
      btnMinus.setAttribute("aria-label", "Quitar uno de " + item.name);
      btnMinus.addEventListener("click", function () { changeQty(k, -1); });
      var qtySpan = document.createElement("span");
      qtySpan.textContent = item.qty;
      var btnPlus = document.createElement("button");
      btnPlus.textContent = "+";
      btnPlus.setAttribute("aria-label", "Agregar uno más de " + item.name);
      btnPlus.addEventListener("click", function () { changeQty(k, 1); });
      qtyBox.appendChild(btnMinus);
      qtyBox.appendChild(qtySpan);
      qtyBox.appendChild(btnPlus);

      var priceEl = document.createElement("span");
      priceEl.className = "tray-item-price";
      priceEl.textContent = formatMoney(item.price * item.qty);

      li.appendChild(nameBox);
      li.appendChild(qtyBox);
      li.appendChild(priceEl);
      trayItems.appendChild(li);
    });

    trayTotal.textContent = formatMoney(total);
    trayWhatsapp.disabled = keys.length === 0;
  }

  function openTray() {
    orderTray.classList.add("open");
    trayBackdrop.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeTray() {
    orderTray.classList.remove("open");
    trayBackdrop.hidden = true;
    document.body.style.overflow = "";
  }

  cartFab.addEventListener("click", openTray);
  trayClose.addEventListener("click", closeTray);
  trayBackdrop.addEventListener("click", closeTray);
  trayClear.addEventListener("click", function () {
    store.items = {};
    renderCart();
    showToast("Pedido vaciado");
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeTray();
      closeLightbox();
    }
  });

  /* add buttons (delegation) */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".add-btn");
    if (!btn) return;
    e.preventDefault();
    var card = btn.closest("[data-name]");
    if (!card) return;
    var raw = card.getAttribute("data-price");
    addItem(card.getAttribute("data-name"), parsePrice(raw));
  });

  /* whatsapp order */
  function buildWhatsAppUrl(message) {
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  }

  trayWhatsapp.addEventListener("click", function () {
    var keys = Object.keys(store.items);
    if (!keys.length) return;

    var lines = ["¡Hola Café Aroma Del Valle! ☕ Quiero hacer un pedido:"];
    var total = 0;
    keys.forEach(function (k) {
      var item = store.items[k];
      lines.push("• " + item.qty + "x " + item.name + " — " + formatMoney(item.price * item.qty));
      total += item.price * item.qty;
    });
    lines.push("");
    lines.push("Total estimado: " + formatMoney(total));
    lines.push("");
    lines.push("¿Me confirman disponibilidad y envío? Gracias.");

    window.open(buildWhatsAppUrl(lines.join("\n")), "_blank", "noopener");
  });

  /* ---------- gallery lightbox ---------- */
  var lightbox = $("#lightbox");
  var lbImg = $("#lbImg");
  var lbCaption = $("#lbCaption");
  var galleryFigures = $all(".gallery-item");
  var lbIndex = 0;

  function openLightbox(index) {
    lbIndex = index;
    updateLightbox();
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function updateLightbox() {
    var fig = galleryFigures[lbIndex];
    var img = fig ? fig.querySelector("img") : null;
    var cap = fig ? fig.querySelector("figcaption") : null;
    if (!img) return;
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCaption.textContent = cap ? cap.textContent : img.alt;
  }

  function closeLightbox() {
    if (lightbox.hidden) return;
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  galleryFigures.forEach(function (fig, i) {
    fig.addEventListener("click", function () { openLightbox(i); });
  });

  $("#lbClose").addEventListener("click", closeLightbox);
  $("#lbPrev").addEventListener("click", function () {
    lbIndex = (lbIndex - 1 + galleryFigures.length) % galleryFigures.length;
    updateLightbox();
  });
  $("#lbNext").addEventListener("click", function () {
    lbIndex = (lbIndex + 1) % galleryFigures.length;
    updateLightbox();
  });
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  /* ---------- footer year ---------- */
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- init ---------- */
  renderCart();
})();