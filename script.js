(function () {
  "use strict";

  var header = document.getElementById("site-header");
  var navToggle = document.getElementById("nav-toggle");
  var siteNav = document.getElementById("site-nav");

  header.classList.toggle("scrolled", window.scrollY > 8);

  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 8);
  }, { passive: true });

  function closeNav() {
    siteNav.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú");
  }

  navToggle.addEventListener("click", function () {
    var open = siteNav.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });

  siteNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeNav();
  });

  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  var sections = document.querySelectorAll("main section[id]");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-list a"));

  if ("IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();