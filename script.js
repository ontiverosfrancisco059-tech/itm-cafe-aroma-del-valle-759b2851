(function () {
  "use strict";

  var body = document.body;
  var header = document.getElementById("site-header");
  var navToggle = document.getElementById("nav-toggle");
  var siteNav = document.getElementById("site-nav");

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var open = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  var filters = document.querySelectorAll(".menu-filter");
  var cards = document.querySelectorAll(".menu-card");

  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = btn.getAttribute("data-filter");
      filters.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-selected", active ? "true" : "false");
      });
      cards.forEach(function (card) {
        var cats = (card.getAttribute("data-category") || "").trim();
        var show = filter === "todo" || cats.indexOf(filter) !== -1;
        card.style.display = show ? "" : "none";
      });
    });
  });

  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxCaption = document.getElementById("lightbox-caption");
  var lightboxClose = document.querySelector(".lightbox-close");

  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = caption;
    if (lightboxCaption) lightboxCaption.textContent = caption;
    lightbox.hidden = false;
    body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    body.style.overflow = "";
    if (lightboxImg) lightboxImg.src = "";
  }

  document.querySelectorAll(".gallery-item").forEach(function (item) {
    item.addEventListener("click", function () {
      var src = item.getAttribute("data-full");
      var fig = item.querySelector(".gallery-caption");
      openLightbox(src, fig ? fig.textContent : "");
    });
  });

  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target === lightboxImg) closeLightbox();
    });
  }
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var profileAction = document.getElementById("profile-action");
  if (profileAction) {
    profileAction.addEventListener("click", function () {
      if (typeof window.startITMProfile === "function") {
        window.startITMProfile();
        return;
      }
      var hint = document.querySelector(".profile-hint");
      if (hint) {
        hint.textContent =
          "El acceso con Google se activó. Tu teléfono no se muestra a otros visitantes.";
      }
      profileAction.textContent = "Conectando…";
    });
  }

  var commentsRoot = document.querySelector("[data-itm-comments]");
  function ensureComments() {
    if (typeof window.ITMCommentWidget === "function") {
      try { window.ITMCommentWidget.init(); } catch (e) { }
    }
    if (commentsRoot && !commentsRoot.querySelector(".itm-comments") && window.ITMComments && window.ITMComments.mount) {
      try { window.ITMComments.mount(commentsRoot); } catch (e) { }
    }
  }

  window.addEventListener("DOMContentLoaded", ensureComments);
  window.addEventListener("load", ensureComments);
  setTimeout(ensureComments, 1200);
})();