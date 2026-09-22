// Café Aroma Del Valle — interacciones (no interfiere con comments.js)
(function(){
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); });
    });
  }

  var header = document.querySelector('.site-header');
  function onScroll(){ if(header) header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Horario de hoy
  try{
    var day = new Date().getDay(); // 0 dom
    var label = day === 0 ? 'Dom · 9:00 - 15:00' : (day === 6 ? 'Sáb · 8:00 - 22:00' : 'Lun a Vie · 7:00 - 21:00');
    var el = document.getElementById('todaySchedule');
    if(el) el.textContent = 'Hoy: ' + label;
  }catch(e){}

  // Filtro de menú
  var chips = document.querySelectorAll('.chip');
  var cards = document.querySelectorAll('.menu-card');
  chips.forEach(function(chip){
    chip.addEventListener('click', function(){
      chips.forEach(function(c){ c.classList.remove('active'); });
      chip.classList.add('active');
      var f = chip.getAttribute('data-filter');
      cards.forEach(function(card){
        var show = f === 'all' || card.getAttribute('data-cat') === f;
        card.classList.toggle('hidden', !show);
      });
    });
  });

  // Reveal on scroll
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add('visible'); io.unobserve(en.target); }
    });
  }, {threshold: .12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // Estado activo de nav por sección
  var links = document.querySelectorAll('.nav a');
  var sections = ['inicio','menu','nosotros','galeria','visitanos','opiniones'].map(function(id){ return document.getElementById(id); }).filter(Boolean);
  var map = {};
  links.forEach(function(a){ map[a.getAttribute('href')] = a; });
  var so = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){
        links.forEach(function(a){ a.classList.remove('active'); });
        var a = map['#' + en.target.id];
        if(a) a.classList.add('active');
      }
    });
  }, {rootMargin:'-40% 0px -55% 0px'});
  sections.forEach(function(s){ so.observe(s); });
})();
