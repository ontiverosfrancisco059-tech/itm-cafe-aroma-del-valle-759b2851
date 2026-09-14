/* =========================================================
   Café Aroma Del Valle — script.js
   Cafetería de especialidad · Monterrey, N.L.
   ========================================================= */

(function () {
  "use strict";

  const WA_PHONE = "528112345678";
  const WA_BASE  = "https://wa.me/" + WA_PHONE + "?text=";

  /* ===== Utility: encode a WhatsApp message and open ===== */
  function openWA(message) {
    window.open(WA_BASE + encodeURIComponent(message), "_blank", "noopener");
  }

  /* ===== Attach click listeners to all WhatsApp buttons ===== */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-wa], [data-wa-name]");
    if (!btn) return;
    e.preventDefault();
    if (btn.dataset.waName) {
      var name  = btn.dataset.waName;
      var price = btn.dataset.waPrice || "";
      openWA("Hola! Me gustaria pedir:\n- " + name + " (" + price + ")");
    } else {
      openWA(btn.dataset.wa || "Hola, quiero hacer un pedido.");
    }
  });

  /* ===== Sticky header scroll state ===== */
  var header = document.getElementById("header");
  if (header) {
    window.addEventListener("scroll", function () {
      header.classList.toggle("is-scrolled", window.scrollY > 36);
    }, { passive: true });
  }

  /* ===== Mobile nav toggle ===== */
  var navToggle = document.getElementById("nav-toggle");
  var mainNav   = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      mainNav.classList.toggle("is-open", !open);
      document.body.style.overflow = open ? "" : "hidden";
    });
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.setAttribute("aria-expanded", "false");
        mainNav.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ===== Menu category filter ===== */
  var tabs    = document.querySelectorAll(".menu__tab");
  var cards   = document.querySelectorAll(".menu-card");

  function filterMenu(cat) {
    tabs.forEach(function (t) {
      t.classList.toggle("is-active", t.dataset.filter === cat);
      t.setAttribute("aria-selected", t.dataset.filter === cat ? "true" : "false");
    });
    cards.forEach(function (card) {
      var match = cat === "all" || (card.dataset.category || "").includes(cat);
      card.classList.toggle("is-hidden", !match);
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () { filterMenu(tab.dataset.filter); });
  });

  // Expose for footer links
  document.querySelectorAll("[data-filter-target]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var cat = a.dataset.filterTarget;
      filterMenu(cat);
      document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ===== Gallery lightbox ===== */
  var lightbox     = document.getElementById("lightbox");
  var lightboxImg  = document.getElementById("lightbox-img");
  var lightboxCap  = document.getElementById("lightbox-caption");
  var lightboxClose = document.getElementById("lightbox-close");

  if (lightbox && lightboxImg) {
    document.getElementById("gallery-grid").addEventListener("click", function (e) {
      var figure = e.target.closest("figure");
      if (!figure) return;
      var img = figure.querySelector("img");
      if (!img) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCap.textContent = img.alt;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImg.src = "";
      document.body.style.overflow = "";
    }

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target === lightboxClose) closeLightbox();
    });
    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
    });
  }

  /* ===== Reveal on scroll ===== */
  var reveals = document.querySelectorAll(".section, .menu-card, .how__step, .gallery__item, .feature");
  reveals.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { revealObs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ===== Footer year ===== */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();