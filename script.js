(() => {
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
    mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Horario de hoy
  const hoursEl = document.getElementById('todayHours');
  if (hoursEl) {
    const d = new Date().getDay(); // 0 dom
    let txt = 'Lun–Vie 7:00–21:00';
    if (d === 6) txt = 'Hoy Sáb 8:00–22:00';
    else if (d === 0) txt = 'Hoy Dom 9:00–15:00';
    else txt = 'Hoy 7:00–21:00';
    hoursEl.textContent = txt;
  }

  // Filtro menú
  const chips = document.querySelectorAll('.chip');
  const dishes = document.querySelectorAll('#menuGrid .dish[data-cat]');
  chips.forEach(ch => ch.addEventListener('click', () => {
    chips.forEach(c => { c.classList.remove('is-active'); c.setAttribute('aria-selected', 'false'); });
    ch.classList.add('is-active');
    ch.setAttribute('aria-selected', 'true');
    const f = ch.dataset.filter;
    dishes.forEach(card => {
      const show = f === 'all' || (card.dataset.cat || '').split(' ').includes(f);
      card.style.display = show ? '' : 'none';
    });
  }));

  // Nav activa por scroll
  const links = [...document.querySelectorAll('.nav-link')];
  const secs = ['inicio', 'nosotros', 'menu', 'galeria', 'visitanos', 'opiniones']
    .map(id => document.getElementById(id)).filter(Boolean);
  const onScroll = () => {
    const y = window.scrollY + 140;
    let current = 'inicio';
    secs.forEach(s => { if (s.offsetTop <= y) current = s.id; });
    links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + current));
    const toTop = document.getElementById('toTop');
    if (toTop) toTop.classList.toggle('show', window.scrollY > 700);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const toTop = document.getElementById('toTop');
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Reveal
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll('.section-head, .dish, .g-item, .values article, .reviews-explainer, .profile-card, .comments-card')
    .forEach(el => { el.classList.add('reveal'); io.observe(el); });

  // Botón informativo: lleva al perfil ITM (login gestionado por comments.js)
  const hint = document.getElementById('logoutHint');
  if (hint) hint.addEventListener('click', () => {
    const p = document.querySelector('[data-itm-profile]');
    if (p) p.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
})();
