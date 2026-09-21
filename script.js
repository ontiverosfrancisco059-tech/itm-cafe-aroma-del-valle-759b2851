(function () {
  "use strict";

  var WHATSAPP = "528112345678";
  var BUSINESS = "Café Aroma Del Valle";

  var menuItems = {};
  var cart = {};
  var currentFilter = "all";

  var qs = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var qsa = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  document.querySelectorAll(".menu-item").forEach(function (item) {
    var id = item.getAttribute("data-id");
    var titleEl = qs(".item-title h3", item);
    var priceEl = qs(".price", item);
    menuItems[id] = {
      id: id,
      name: titleEl ? titleEl.textContent.trim() : id,
      price: priceEl ? parseFloat(priceEl.textContent.replace(/[^\d]/g, "")) || 0 : 0,
      cat: item.getAttribute("data-cat")
    };
  });

  function money(n) {
    return "$" + n.toLocaleString("es-MX");
  }

  function cartCount() {
    return Object.keys(cart).reduce(function (sum, id) { return sum + cart[id].qty; }, 0);
  }

  function cartTotal() {
    return Object.keys(cart).reduce(function (sum, id) {
      return sum + (menuItems[id] ? menuItems[id].price : 0) * cart[id].qty;
    }, 0);
  }

  function addItem(id) {
    if (!cart[id]) cart[id] = { qty: 0 };
    cart[id].qty += 1;
    updateCart();
  }

  function setQty(id, qty) {
    if (qty <= 0) {
      delete cart[id];
    } else {
      if (!cart[id]) cart[id] = { qty: 0 };
      cart[id].qty = qty;
    }
    updateCart();
  }

  function clearCart() {
    cart = {};
    updateCart();
  }

  function updateCart() {
    var count = cartCount();
    var total = cartTotal();

    var bar = qs("#orderBar");
    if (count > 0) {
      bar.hidden = false;
      qs("#orderCount").textContent = String(count);
      qs("#orderTotal").textContent = money(total);
    } else {
      bar.hidden = true;
    }

document.addEventListener("error", function (e) {
    if (e.target.tagName !== "IMG") return;
    var img = e.target;
    var ph = document.createElement("div");
    ph.className = "img-fallback";
    ph.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 8h1a3 3 0 0 1 0 6h-1"/><path d="M3 8h14v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Z"/><path d="M7 2v2M11 2v2M15 2v2"/></svg>';
    var parent = img.parentElement;
    if (parent && parent.classList.contains("about-media")) {
      ph.style.aspectRatio = "4 / 4.4";
    }
    if (parent) parent.replaceChild(ph, img);
  }, true);

  qsa(".add-btn").forEach(function (btn) {
      var id = btn.getAttribute("data-add");
      if (cart[id]) {
        btn.textContent = "Agregado (" + cart[id].qty + ")";
        btn.classList.add("added");
      } else {
        btn.textContent = "Añadir";
        btn.classList.remove("added");
      }
    });

    renderCartLines();
    qs("#cartTotal").textContent = money(total);
  }

  function renderCartLines() {
    var wrap = qs("#cartItems");
    var ids = Object.keys(cart);

    if (ids.length === 0) {
      wrap.innerHTML = '<p class="drawer-empty">Tu pedido está vacío. Agrega algo del menú.</p>';
      return;
    }

    var html = '';
    ids.forEach(function (id) {
      var item = menuItems[id];
      if (!item) return;
      var lineTotal = item.price * cart[id].qty;
      var priceTxt = item.price ? " · " + money(item.price) + " c/u" : "";
      html +=
        '<div class="cart-line">' +
          '<div class="cart-line-info">' +
            '<strong>' + item.name + '</strong>' +
            '<span>' + item.catLabel + priceTxt + '</span>' +
          '</div>' +
          '<div class="step">' +
            '<button type="button" data-dec="' + id + '" aria-label="Quitar uno">-</button>' +
            '<b>' + cart[id].qty + '</b>' +
            '<button type="button" data-inc="' + id + '" aria-label="Agregar uno">+</button>' +
          '</div>' +
        '</div>';
    });
    wrap.innerHTML = html;
  }

  function buildMessage() {
    var lines = Object.keys(cart).map(function (id) {
      var item = menuItems[id];
      var lineTotal = item.price * cart[id].qty;
      var pricePart = item.price ? " — " + money(lineTotal) : "";
      return "• " + cart[id].qty + "x " + item.name + pricePart;
    });

    var text =
      "Hola " + BUSINESS + ", me gustaría ordenar:\n\n" +
      lines.join("\n") +
      "\n\nTotal: " + money(cartTotal()) +
      "\nEntrega a domicilio: Sí" +
      "\nNombre: " +
      "\nDirección / zona: ";

    return encodeURIComponent(text);
  }

  function sendOrder() {
    var url = "https://wa.me/" + WHATSAPP + "?text=" + buildMessage();
    window.open(url, "_blank", "noopener");
  }

  function openDrawer() {
    qs("#cartDrawer").classList.add("open");
    qs("#cartDrawer").setAttribute("aria-hidden", "false");
    qs("#drawerBackdrop").hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    qs("#cartDrawer").classList.remove("open");
    qs("#cartDrawer").setAttribute("aria-hidden", "true");
    qs("#drawerBackdrop").hidden = true;
    document.body.style.overflow = "";
  }

  qsa(".add-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      addItem(btn.getAttribute("data-add"));
      pulse(btn);
    });
  });

  qs("#openDrawer").addEventListener("click", openDrawer);
  qs("#drawerClose").addEventListener("click", closeDrawer);
  qs("#drawerBackdrop").addEventListener("click", closeDrawer);
  qs("#sendOrder").addEventListener("click", sendOrder);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDrawer();
  });

  qs("#cartItems").addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-inc], button[data-dec]");
    if (!btn) return;
    var id = btn.getAttribute("data-inc") || btn.getAttribute("data-dec");
    var delta = btn.hasAttribute("data-inc") ? 1 : -1;
    setQty(id, (cart[id] ? cart[id].qty : 0) + delta);
  });

  function pulse(btn) {
    btn.style.transform = "scale(0.92)";
    setTimeout(function () { btn.style.transform = ""; }, 120);
  }

  qsa(".menu-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      qsa(".menu-tab").forEach(function (t) {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      currentFilter = tab.getAttribute("data-filter");
      qsa(".menu-item").forEach(function (item) {
        var match = currentFilter === "all" || item.getAttribute("data-cat") === currentFilter;
        item.classList.toggle("hide", !match);
        if (match) animateIn(item);
      });
    });
  });

  function animateIn(el) {
    el.style.opacity = "0";
    el.style.transform = "translateY(10px)";
    requestAnimationFrame(function () {
      el.style.transition = "opacity 0.35s ease, transform 0.35s ease";
      el.style.opacity = "1";
      el.style.transform = "none";
      setTimeout(function () { el.style.transition = ""; }, 360);
    });
  }

  var nav = qs("#mainNav");
  var toggle = qs("#navToggle");
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) {
      nav.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  var header = qs("#siteHeader");
  var onScroll = function () {
    header.classList.toggle("scrolled", window.scrollY > 12);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if ("IntersectionObserver" in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    qsa(".reveal").forEach(function (el) { revealObs.observe(el); });
  } else {
    qsa(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  }

  qs("#year").textContent = String(new Date().getFullYear());

  Object.keys(menuItems).forEach(function (id) {
    var item = menuItems[id];
    var labels = { cafe: "Café de especialidad", desayunos: "Desayunos", panaderia: "Panadería", tienda: "Tienda" };
    item.catLabel = labels[item.cat] || item.cat;
  });

  updateCart();
})();