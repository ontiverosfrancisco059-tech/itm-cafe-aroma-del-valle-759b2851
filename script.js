(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var navToggle = document.getElementById("navToggle");
  var primaryNav = document.getElementById("primaryNav");

  function onScrollHeader() {
    if (window.scrollY > 24) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  function closeNav() {
    document.body.classList.remove("nav-open");
    primaryNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú de navegación");
  }

  function openNav() {
    document.body.classList.add("nav-open");
    primaryNav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Cerrar menú de navegación");
  }

  function toggleNav() {
    var open = document.body.classList.contains("nav-open");
    if (open) {
      closeNav();
    } else {
      openNav();
    }
  }

  navToggle.addEventListener("click", toggleNav);

  primaryNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 900) {
        closeNav();
      }
    });
  });

  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  var menuTabs = document.querySelectorAll(".menu-tab");
  var menuPanels = document.querySelectorAll(".menu-panel");

  menuTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var target = tab.getAttribute("data-tab");
      menuTabs.forEach(function (t) {
        var active = t === tab;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", active ? "true" : "false");
      });
      menuPanels.forEach(function (panel) {
        panel.classList.toggle("is-active", panel.getAttribute("data-panel") === target);
      });
    });
  });

  function revealOnScroll() {
    var elements = document.querySelectorAll("[data-reveal]");
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      elements.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      elements.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  }

  var revealTargets = [
    ".about-grid",
    ".section-head",
    ".menu-card",
    ".gallery-item",
    ".order-inner",
    ".info-card",
    ".itm-profile-slot",
    ".itm-comments-slot"
  ];

  revealTargets.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (el) {
      if (!el.hasAttribute("data-reveal")) {
        el.setAttribute("data-reveal", "");
      }
    });
  });

  revealOnScroll();

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  window.addEventListener("message", function (event) {
    try {
      var data = event.data;
      if (data && data.type === "itm-comments-ready") {
        var badge = document.querySelector(".primary-nav .nav-cta");
        if (badge) {
          badge.setAttribute("aria-label", "Pedir por WhatsApp");
        }
      }
    } catch (err) {
      // ignore cross-origin messages not intended for this page
    }
  });
})();