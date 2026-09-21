/* ==========================================================================
   Café Aroma Del Valle — script.js
   Interacciones: nav móvil, menú por categorías, pedidos por WhatsApp,
   reveal on scroll, lightbox y header sticky.
   ========================================================================== */

(function () {
  "use strict";

  var WHATSAPP_NUMBER = "5218112345678";

  function whatsappLink(message) {
    return (
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message)
    );
  }

  /* ---------- Header: sombra al hacer scroll ---------- */
  var header = document.getElementById("site-header");

  function onScrollHeader() {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* ---------- Navegación móvil ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var mainNav = document.getElementById("main-nav");

  function closeNav() {
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú de navegación");
  }

  navToggle.addEventListener("click", function () {
    var isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"
    );
  });

  /* ---------- Navegación activa con IntersectionObserver ---------- */
  var navLinks = document.querySelectorAll(".nav-link");
  var sections = [];

  navLinks.forEach(function (link) {
    var target = document.querySelector(link.getAttribute("href"));
    if (target) sections.push(target);
  });

  if ("IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute("id");
            navLinks.forEach(function (link) {
              link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + id
              );
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }

  /* ---------- Cerrar menú al hacer clic en un enlace ---------- */
  mainNav.addEventListener("click", function (e) {
    if (e.target.classList.contains("nav-link")) closeNav();
  });

  /* ---------- Menú: filtro por categorías ---------- */
  var menuTabs = document.querySelectorAll(".menu-tab");
  var menuCards = document.querySelectorAll(".menu-card");

  menuTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      menuTabs.forEach(function (t) {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      var category = tab.getAttribute("data-category");

      menuCards.forEach(function (card) {
        var match =
          category === "all" || card.getAttribute("data-category") === category;
        card.classList.toggle("hide", !match);

        if (match) {
          card.classList.remove("visible");
          void card.offsetWidth;
          card.classList.add("visible");
        }
      });
    });
  });

  /* ---------- Pedidos: botón "Pedir por WhatsApp" por platillo ---------- */
  var orderButtons = document.querySelectorAll(".btn-order");

  orderButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.getAttribute("data-order") || "un platillo del menú";
      var message =
        "Hola, quiero hacer un pedido en Café Aroma Del Valle  (encantado de atenderte)\n\nMe gustaría: " +
        item +
        "\n\n¿Está disponible a domicilio?";
      window.open(whatsappLink(message), "_blank", "noopener");
    });
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ---------- Galería: lightbox ---------- */
  var galleryItems = document.querySelectorAll(".gallery-item img");
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxClose = document.getElementById("lightbox-close");

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  galleryItems.forEach(function (img) {
    img.addEventListener("click", function () {
      openLightbox(img.src, img.alt);
    });
  });

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeLightbox();
      closeNav();
    }
  });

  /* ---------- Año en el footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Guardado del pedido (mejora UX en móviles) ---------- */
  var defaultWaLink = document.querySelector(
    'a[href^="https://wa.me/"]'
  );
  if (defaultWaLink && !defaultWaLink.dataset.bound) {
    defaultWaLink.setAttribute("target", "_blank");
    defaultWaLink.setAttribute("rel", "noopener");
  }
})();