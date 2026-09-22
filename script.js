// Café Aroma Del Valle — interacciones del sitio (sin sistema propio de comentarios).
(function () {
  "use strict";

  // Nav móvil
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("is-open"); });
    });
  }

  // Filtro de menú
  var chips = document.querySelectorAll(".menu-filters .chip");
  var cards = document.querySelectorAll("#menuGrid .menu-card[data-cat]");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) { c.classList.remove("is-active"); });
      chip.classList.add("is-active");
      var f = chip.getAttribute("data-filter");
      cards.forEach(function (card) {
        var cats = (card.getAttribute("data-cat") || "").split(/\s+/);
        var show = f === "all" || cats.indexOf(f) !== -1;
        card.style.display = show ? "" : "none";
      });
    });
  });

  // Reveal on scroll
  var revealEls = document.querySelectorAll(".section-head, .menu-card, .g-item, .about-copy, .about-media, .visit-copy, .visit-media, .reviews-how article, .reviews-panels > div");
  revealEls.forEach(function (el) { el.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Año dinámico si se usa en el futuro (sin tocar el contrato de comentarios).
  // comments.js controla login Google, perfil, estrellas, publicar, editar/eliminar y cierre de sesión.
})();
