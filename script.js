/* Café Aroma Del Valle — interacciones del sitio */

(function () {
  "use strict";

  var WHATSAPP_NUMBER = "528112345678";

  function phone(text) {
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
  }

  /* ---------- Header: sombra al hacer scroll ---------- */

  var header = document.getElementById("site-header");
  function onScroll() {
    if (window.scrollY > 10) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menú móvil ---------- */

  var navToggle = document.getElementById("nav-toggle");
  var mobileMenu = document.getElementById("mobile-menu");

  navToggle.addEventListener("click", function () {
    var open = mobileMenu.hidden;
    mobileMenu.hidden = !open;
    navToggle.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  mobileMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      mobileMenu.hidden = true;
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Tabs del menú ---------- */

  var tabs = Array.prototype.slice.call(document.querySelectorAll(".menu-tab"));
  var categories = Array.prototype.slice.call(document.querySelectorAll(".menu-category"));

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var cat = tab.getAttribute("data-cat");
      tabs.forEach(function (t) {
        var active = t === tab;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", active ? "true" : "false");
      });
      categories.forEach(function (c) {
        c.hidden = c.getAttribute("data-cat") !== cat;
        c.classList.remove("is-active");
        if (c.getAttribute("data-cat") === cat) c.classList.add("is-active");
      });
    });
  });

  /* ---------- Carrito / pedido ---------- */

  var cart = {};
  var cartHandle = document.getElementById("cart-handle");
  var cartPanel = document.getElementById("cart-panel");
  var cartCount = document.getElementById("cart-count");
  var cartItems = document.getElementById("cart-items");
  var cartEmpty = document.getElementById("cart-empty");
  var cartTotal = document.getElementById("cart-total");
  var cartSend = document.getElementById("cart-send");
  var cartClear = document.getElementById("cart-clear");

  cartHandle.addEventListener("click", function () {
    var open = cartPanel.hidden;
    cartPanel.hidden = !open;
    cartHandle.setAttribute("aria-expanded", !open ? "true" : "false");
  });

  function fmt(n) {
    return "$" + n.toLocaleString("es-MX");
  }

  function render() {
    var names = Object.keys(cart);
    cartItems.innerHTML = "";

    names.forEach(function (name) {
      var item = cart[name];
      var li = document.createElement("li");
      li.className = "cart-item";

      var nameEl = document.createElement("span");
      nameEl.className = "cart-item-name";

      var nameText = document.createElement("span");
      nameText.textContent = name;
      nameEl.appendChild(nameText);

      var em = document.createElement("em");
      em.textContent = " × " + item.qty;
      nameEl.appendChild(em);

      var priceEl = document.createElement("span");
      priceEl.className = "cart-item-price";
      priceEl.textContent = fmt(item.price * item.qty);

      var removeEl = document.createElement("button");
      removeEl.className = "cart-item-remove";
      removeEl.setAttribute("aria-label", "Quitar " + name);
      removeEl.textContent = "✕";
      removeEl.addEventListener("click", function () {
        delete cart[name];
        render();
      });

      li.appendChild(nameEl);
      li.appendChild(priceEl);
      li.appendChild(removeEl);
      cartItems.appendChild(li);
    });

    var total = Object.keys(cart).reduce(function (sum, name) {
      return sum + cart[name].price * cart[name].qty;
    }, 0);
    cartTotal.textContent = fmt(total);

    var count = Object.keys(cart).reduce(function (sum, name) {
      return sum + cart[name].qty;
    }, 0);
    cartCount.hidden = count === 0;
    cartCount.textContent = count;

    cartEmpty.hidden = count !== 0;
    cartSend.disabled = count === 0;
  }

  function addItem(name, price) {
    if (!cart[name]) cart[name] = { price: price, qty: 0 };
    cart[name].qty += 1;
    render();
    toast("Agregado: " + name);
  }

  /* Botones "Agregar al pedido" */
  document.querySelectorAll(".btn-add").forEach(function (btn) {
    btn.addEventListener("click", function () {
      addItem(btn.getAttribute("data-name"), parseFloat(btn.getAttribute("data-price")));
    });
  });

  cartClear.addEventListener("click", function () {
    cart = {};
    render();
  });

  /* Enviar pedido por WhatsApp */
  cartSend.addEventListener("click", function () {
    var lines = ["Hola Café Aroma Del Valle, quiero hacer este pedido:"];
    Object.keys(cart).forEach(function (name) {
      var item = cart[name];
      lines.push("• " + item.qty + " × " + name + " (" + fmt(item.price * item.qty) + ")");
    });
    var total = Object.keys(cart).reduce(function (s, n) {
      return s + cart[n].price * cart[n].qty;
    }, 0);
    lines.push("Total: " + fmt(total));
    lines.push("");
    lines.push(
      "Nombre: ____" +
        "\nDirección de entrega: ____" +
        "\nPago: ____"
    );
    window.open(phone(lines.join("\n")), "_blank", "noopener");
  });

  /* ---------- Toast ---------- */

  var toastTimer;
  function toast(msg) {
    var el = document.getElementById("toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.classList.remove("is-visible");
    }, 1600);
  }

  render();
})();