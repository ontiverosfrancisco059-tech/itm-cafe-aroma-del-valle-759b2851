/* ============================================================
   Café Aroma Del Valle — Interactividad
   ============================================================ */

(function () {
    'use strict';

    var header = document.getElementById('header');
    var navToggle = document.getElementById('navToggle');
    var navMenu = document.getElementById('navMenu');

    function onScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
    });

    navMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.classList.remove('no-scroll');
        });
    });

    var tabs = document.querySelectorAll('.menu-tab');
    var categories = document.querySelectorAll('.menu-category');

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            tabs.forEach(function (t) { t.classList.remove('active'); });
            tab.classList.add('active');

            var target = tab.getAttribute('data-tab');
            categories.forEach(function (category) {
                if (category.getAttribute('data-category') === target) {
                    category.classList.add('active');
                } else {
                    category.classList.remove('active');
                }
            });
        });
    });

    function loadComments() {
        var widgetUrl = 'https://itm-void-excepcional.pages.dev/comments.js';
        var widget = document.querySelector('.comments-widget');

        if (!widget) return;

        var script = document.createElement('script');
        script.src = widgetUrl;
        script.async = true;

        script.onload = function () {
            var loader = widget.querySelector('.comments-loading');
            if (loader) loader.style.display = 'none';
        };

        script.onerror = function () {
            var loader = widget.querySelector('.comments-loading');
            if (loader) {
                loader.innerHTML = '<p>Los comentarios no están disponibles en este momento. Intenta más tarde.</p>';
            }
        };

        widget.appendChild(script);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadComments);
    } else {
        loadComments();
    }
})();