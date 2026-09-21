/* ==========================================================================
   Café Aroma del Valle · Interacciones
   Nav móvil · Filtro de carta · Reveal on scroll · Guard de imágenes
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Año del footer ---------- */
  var yearEls = document.querySelectorAll("[data-year]");
  yearEls.forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Nav fijo con sombra ---------- */
  var header = document.getElementById("site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Menú móvil ---------- */
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });
  }

  /* ---------- Filtro de la carta ---------- */
  var filters = document.querySelectorAll(".filter");
  var cards = document.querySelectorAll(".menu-card");

  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cat = btn.getAttribute("data-filter");

      filters.forEach(function (f) {
        f.classList.toggle("is-active", f === btn);
        f.setAttribute("aria-selected", String(f === btn));
      });

      cards.forEach(function (card) {
        var show = cat === "todos" || card.getAttribute("data-category") === cat;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Guard de imágenes ---------- */
  /* Si un recurso remoto no carga, la imagen se oculta en vez de
     dejar un marcador roto. Nunca se sustituye el asset del usuario. */
  document.querySelectorAll("img[data-img-guard]").forEach(function (img) {
    img.addEventListener("error", function () {
      img.closest(".menu-card-media, .hero-media, .cta-media, .gallery-item, .producto-media, .nosotros-media")?.style.removeProperty("background");
      img.hidden = true;
      img.removeAttribute("src");
    });
  });
})();