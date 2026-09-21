/* ================================================================
   Café Aroma Del Valle · Interacciones
   Nav móvil, filtros de carta, galería con lightbox, animaciones.
================================================================= */

(function () {
  "use strict";

  /* ---------- Año del pie de página ---------- */
  document.querySelectorAll("[data-anio]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Cabecera compacta al hacer scroll ---------- */
  var cabecera = document.getElementById("cabecera");
  var enScroll = function () {
    if (window.scrollY > 30) {
      cabecera.classList.add("compacta");
    } else {
      cabecera.classList.remove("compacta");
    }
  };
  enScroll();
  window.addEventListener("scroll", enScroll, { passive: true });

  /* ---------- Navegación móvil ---------- */
  var nav = document.getElementById("nav");
  var botonMovil = document.querySelector("[data-nav-movil]");
  var botonCerrar = document.querySelector("[data-nav-cerrar]");

  function abrirNav(abierta) {
    nav.classList.toggle("abierta", abierta);
    botonMovil.setAttribute("aria-expanded", abierta ? "true" : "false");
    document.body.style.overflow = abierta ? "hidden" : "";
  }

  if (botonMovil && botonCerrar) {
    botonMovil.addEventListener("click", function () {
      abrirNav(true);
    });
    botonCerrar.addEventListener("click", function () {
      abrirNav(false);
    });
    nav.querySelectorAll("a").forEach(function (enlace) {
      enlace.addEventListener("click", function () {
        abrirNav(false);
      });
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("abierta")) {
        abrirNav(false);
      }
    });
  }

  /* ---------- Filtros de la carta ---------- */
  var filtros = document.querySelectorAll("[data-filtro]");
  var platillos = document.querySelectorAll("[data-categoria]");

  filtros.forEach(function (boton) {
    boton.addEventListener("click", function () {
      filtros.forEach(function (b) {
        var activo = b === boton;
        b.classList.toggle("activo", activo);
        b.setAttribute("aria-selected", activo ? "true" : "false");
      });

      var criterio = boton.getAttribute("data-filtro");
      platillos.forEach(function (platillo) {
        var categorias = platillo.getAttribute("data-categoria").split(" ");
        var coincide = criterio === "todos" || categorias.indexOf(criterio) !== -1;
        platillo.classList.toggle("fuera", !coincide);
      });
    });
  });

  /* ---------- Galería con lightbox ---------- */
  var boveda = document.getElementById("boveda");
  var botonesFoto = document.querySelectorAll("[data-abre-foto]");
  var botonCerrarBoveda = document.querySelector("[data-boveda-cerrar]");

  function abrirBoveda(fuente, alt) {
    var imagen = boveda.querySelector(".boveda-imagen");
    imagen.src = fuente;
    imagen.alt = alt || "";
    boveda.hidden = false;
    document.body.style.overflow = "hidden";
    botonCerrarBoveda.focus();
  }

  function cerrarBoveda() {
    boveda.hidden = true;
    document.body.style.overflow = "";
    var imagen = boveda.querySelector(".boveda-imagen");
    imagen.src = "";
  }

  botonesFoto.forEach(function (boton) {
    boton.addEventListener("click", function () {
      var img = boton.querySelector("img");
      if (img) {
        abrirBoveda(img.currentSrc || img.src, img.alt);
      }
    });
  });

  if (botonCerrarBoveda) {
    botonCerrarBoveda.addEventListener("click", cerrarBoveda);
    boveda.addEventListener("click", function (e) {
      if (e.target === boveda) {
        cerrarBoveda();
      }
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !boveda.hidden) {
        cerrarBoveda();
      }
    });
  }

  /* ---------- Aparición suave al hacer scroll ---------- */
  var elementosRevelar = document.querySelectorAll(
    ".seccion, .sello, .filtros, .resenas-perfil, .resenas-comentarios, .pedidos, .pie"
  );

  if ("IntersectionObserver" in window) {
    var observadorRevelar = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
            observadorRevelar.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    elementosRevelar.forEach(function (el) {
      el.classList.add("revelar");
      observadorRevelar.observe(el);
    });
  } else {
    elementosRevelar.forEach(function (el) {
      el.classList.add("visible");
    });
  }
})();