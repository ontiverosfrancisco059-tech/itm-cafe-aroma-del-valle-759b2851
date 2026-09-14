document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  function handleScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  navToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      navToggle.classList.remove("active");
    });
  });

  const tabs = document.querySelectorAll(".menu-tab");
  const cards = document.querySelectorAll(".menu-card");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        t.classList.remove("active");
      });
      tab.classList.add("active");

      const cat = tab.dataset.cat;
      cards.forEach(function (card) {
        const show = card.dataset.cat === cat || cat === "todos";
        if (show) {
          card.classList.remove("hidden");
          card.style.animation = "none";
          void card.offsetWidth;
          card.style.animation = "";
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
});