(function () {
  "use strict";

  var WHATSAPP_NUMBER = "528112345678";
  var MONEDA = "$";

  /* ---------- Header ---------- */
  var header = document.getElementById("site-header");
  var menuToggle = document.getElementById("menu-toggle");
  var mainNav = document.getElementById("main-nav");

  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 12);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  menuToggle.addEventListener("click", function () {
    var open = mainNav.classList.toggle("open");
    menuToggle.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  mainNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      mainNav.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Fecha en footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---------- Tabs del menú ---------- */
  var tabs = document.querySelectorAll(".tab");
  var dishCards = document.querySelectorAll(".dish-card");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        t.classList.toggle("active", t === tab);
        t.setAttribute("aria-selected", t === tab ? "true" : "false");
      });
      var cat = tab.dataset.cat;
      dishCards.forEach(function (card) {
        var show = cat === "todos" || card.dataset.cat === cat;
        card.style.display = show ? "" : "none";
      });
    });
  });

  /* ---------- Carrito / Pedido ---------- */
  var cartItems = [];
  var cartBtn = document.getElementById("cart-btn");
  var cartBadge = document.getElementById("cart-badge");
  var fab = document.getElementById("fab");
  var fabBadge = document.getElementById("fab-badge");
  var drawer = document.getElementById("cart-drawer");
  var backdrop = document.getElementById("drawer-backdrop");
  var cartClose = document.getElementById("cart-close");
  var cartItemsEl = document.getElementById("cart-items");
  var cartEmpty = document.getElementById("cart-empty");
  var cartFoot = document.getElementById("cart-foot");
  var cartTotalEl = document.getElementById("cart-total");
  var orderTypeWrap = document.getElementById("order-type-wrap");
  var orderName = document.getElementById("order-name");
  var orderNote = document.getElementById("order-note");
  var cartSend = document.getElementById("cart-send");

  function findItem(name) {
    return cartItems.find(function (it) { return it.name === name; });
  }

  function totalQty() {
    return cartItems.reduce(function (sum, it) { return sum + it.qty; }, 0);
  }

  function totalPrice() {
    return cartItems.reduce(function (sum, it) { return sum + it.price * it.qty; }, 0);
  }

  function fmt(n) {
    return MONEDA + n.toLocaleString("es-MX");
  }

  function renderCart() {
    var count = totalQty();
    var badgeText = String(count);

    cartBadge.textContent = badgeText;
    cartBadge.hidden = count === 0;
    fabBadge.textContent = badgeText;
    fab.hidden = count === 0;

    cartEmpty.style.display = count === 0 ? "block" : "none";
    cartItemsEl.style.display = count === 0 ? "none" : "";
    cartFoot.hidden = count === 0;
    orderTypeWrap.hidden = count === 0;
    cartBackdropDismissNeeded();

    if (count === 0) {
      cartItemsEl.innerHTML = "";
      cartTotalEl.textContent = fmt(0);
      return;
    }

    cartItemsEl.innerHTML = cartItems.map(function (it) {
      var line = it.qty + " x " + it.name;
      return (
        '<li class="cart-item">' +
          '<div class="cart-item-info">' +
            "<strong>" + line + "</strong>" +
            "<span>" + fmt(it.price) + " c/u · " + fmt(it.price * it.qty) + "</span>" +
          "</div>" +
          '<div class="qty">' +
            '<button type="button" data-dec="' + it.name.replace(/"/g, "&quot;") + '" aria-label="Quitar uno">−</button>' +
            "<strong>" + it.qty + "</strong>" +
            '<button type="button" data-inc="' + it.name.replace(/"/g, "&quot;") + '" aria-label="Agregar uno">+</button>' +
          "</div>" +
          '<button type="button" class="item-remove" data-rm="' + it.name.replace(/"/g, "&quot;") + '" aria-label="Eliminar">×</button>' +
        "</li>"
      );
    }).join("");

    cartTotalEl.textContent = fmt(totalPrice());
  }

  function addItem(name, price) {
    var item = findItem(name);
    if (item) {
      item.qty += 1;
    } else {
      cartItems.push({ name: name, price: price, qty: 1 });
    }
    renderCart();
  }

  function changeQty(name, delta) {
    var item = findItem(name);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cartItems = cartItems.filter(function (i) { return i !== item; });
    renderCart();
  }

  function removeItem(name) {
    cartItems = cartItems.filter(function (i) { return i.name !== name; });
    renderCart();
  }

  document.addEventListener("click", function (e) {
    var addBtn = e.target.closest(".add-btn");
    if (addBtn) {
      addItem(addBtn.dataset.name, parseInt(addBtn.dataset.price, 10));
      return;
    }
    var inc = e.target.closest("[data-inc]");
    if (inc) {
      changeQty(inc.dataset.inc, 1);
      return;
    }
    var dec = e.target.closest("[data-dec]");
    if (dec) {
      changeQty(dec.dataset.dec, -1);
      return;
    }
    var rm = e.target.closest("[data-rm]");
    if (rm) {
      removeItem(rm.dataset.rm);
    }
  });

  /* ---------- Apertura / cierre del drawer ---------- */
  var lastFocused = null;

  function openDrawer() {
    lastFocused = document.activeElement;
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    backdrop.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    backdrop.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  function cartBackdropDismissNeeded() {
    if (backdrop.hidden === false && totalQty() === 0) closeDrawer();
  }

  cartBtn.addEventListener("click", openDrawer);
  fab.addEventListener("click", openDrawer);
  cartClose.addEventListener("click", closeDrawer);
  backdrop.addEventListener("click", closeDrawer);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDrawer();
  });

  /* ---------- Enviar por WhatsApp ---------- */
  cartSend.addEventListener("click", function () {
    if (!cartItems.length) return;

    var otype = document.querySelector('input[name="otype"]:checked');
    var modo = otype ? otype.value : "Para llevar";
    var nombre = orderName ? orderName.value.trim() : "";
    var nota = orderNote ? orderNote.value.trim() : "";

    var lines = cartItems.map(function (it) {
      return "• " + it.qty + "× " + it.name + "  (" + fmt(it.price) + " c/u)";
    });

    var msgLines = ["¡Hola Café Aroma Del Valle!", "Quiero hacer un pedido:", ""];
    msgLines = msgLines.concat(lines);
    msgLines.push("");
    msgLines.push("Modo: " + modo);
    if (nombre) msgLines.push("A nombre de: " + nombre);
    msgLines.push("Total: " + fmt(totalPrice()));
    if (nota) msgLines.push("Nota: " + nota);

    var url =
      "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msgLines.join("\n"));

    window.open(url, "_blank", "noopener");
  });

  renderCart();
})();