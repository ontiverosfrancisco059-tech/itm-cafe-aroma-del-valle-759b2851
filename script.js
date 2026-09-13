(() => {
  const nav = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  const onScroll = () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const closeMenu = () => {
    if (hamburger) {
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
    if (navLinks) navLinks.classList.remove('active');
  };

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = !navLinks.classList.contains('active');
      hamburger.classList.toggle('active', open);
      hamburger.setAttribute('aria-expanded', String(open));
      navLinks.classList.toggle('active', open);
    });
    navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  }

  document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active') && !navLinks.contains(e.target) && e.target !== hamburger && !hamburger.contains(e.target)) {
      closeMenu();
    }
  });

  const filterButtons = document.querySelectorAll('#menuFilters .filter-btn');
  const dishCards = document.querySelectorAll('#menuGrid .dish-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      dishCards.forEach((card) => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.hidden = !show;
      });
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', targetId);
    });
  });

  const triggerTabs = document.querySelectorAll('a[href$="-tab"]');
  triggerTabs.forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      const btn = document.querySelector(id);
      if (!btn) return;
      setTimeout(() => btn.click(), 350);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document
    .querySelectorAll('.fade-in, .fade-in-left, .fade-in-right')
    .forEach((el) => observer.observe(el));

  const sectionIds = ['inicio', 'nosotros', 'servicios', 'menu', 'galeria', 'ubicacion'];
  const navAnchors = navLinks ? navLinks.querySelectorAll('a[href^="#"]') : [];
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach((a) => a.classList.remove('active'));
        const match = navLinks.querySelector(`a[href="#${entry.target.id}"]`);
        if (match) match.classList.add('active');
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sectionIds.forEach((id) => {
    const section = document.getElementById(id);
    if (section) spy.observe(section);
  });
})();