/* ========================================
   Café Aroma Del Valle - Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Header scroll effect ---
    const header = document.getElementById('header');
    let lastScroll = 0;

    const handleScroll = () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- Mobile navigation toggle ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // --- Menu category filter ---
    const filterButtons = document.querySelectorAll('.menu__filter');
    const menuItems = document.querySelectorAll('.menu__item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('menu__filter--active'));
            button.classList.add('menu__filter--active');

            // Filter items
            menuItems.forEach(item => {
                const category = item.dataset.category;
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        });
                    });
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // --- Scroll animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in class to sections
    const sections = document.querySelectorAll('.about__content, .about__images, .section__header, .menu__filters, .gallery__grid, .contact__info, .contact__whatsapp, .menu__item');
    sections.forEach(section => {
        section.classList.add('fade-in');
        fadeObserver.observe(section);
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Active nav link on scroll ---
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    const observerNav = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('nav__link--active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('nav__link--active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    });

    document.querySelectorAll('section[id]').forEach(section => {
        observerNav.observe(section);
    });

    // --- Gallery lightbox ---
    const galleryItems = document.querySelectorAll('.gallery__item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (!img) return;

            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                inset: 0;
                z-index: 2000;
                background: rgba(44, 24, 16, 0.92);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 40px;
                cursor: pointer;
                animation: fadeIn 0.3s ease;
            `;

            const lightboxImg = document.createElement('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxImg.style.cssText = `
                max-width: 90%;
                max-height: 85vh;
                object-fit: contain;
                border-radius: 12px;
                box-shadow: 0 8px 40px rgba(0,0,0,0.4);
                animation: scaleIn 0.3s ease;
            `;

            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '&times;';
            closeBtn.style.cssText = `
                position: absolute;
                top: 20px;
                right: 24px;
                background: none;
                border: none;
                color: white;
                font-size: 2.5rem;
                cursor: pointer;
                line-height: 1;
                padding: 0 8px;
            `;

            const caption = document.createElement('p');
            const captionText = item.querySelector('.gallery__item-overlay span');
            if (captionText) {
                caption.textContent = captionText.textContent;
                caption.style.cssText = `
                    position: absolute;
                    bottom: 24px;
                    left: 50%;
                    transform: translateX(-50%);
                    color: white;
                    font-family: 'Playfair Display', serif;
                    font-size: 1.2rem;
                    font-weight: 600;
                `;
            }

            overlay.appendChild(lightboxImg);
            overlay.appendChild(closeBtn);
            if (captionText) overlay.appendChild(caption);
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';

            const closeLightbox = () => {
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 0.2s ease';
                setTimeout(() => {
                    overlay.remove();
                    document.body.style.overflow = '';
                }, 200);
            };

            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) closeLightbox();
            });
            closeBtn.addEventListener('click', closeLightbox);
            document.addEventListener('keydown', function handler(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', handler);
                }
            });
        });
    });

    // --- Add CSS animations for lightbox ---
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .nav__link--active {
            color: var(--color-brown-900) !important;
            font-weight: 600;
        }
    `;
    document.head.appendChild(styleSheet);

    // --- WhatsApp order tracking ---
    document.querySelectorAll('.menu__item-order').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.menu__item');
            const name = item.querySelector('.menu__item-name').textContent;

            // Visual feedback
            btn.textContent = '¡Enviado!';
            btn.style.background = '#1DA851';
            setTimeout(() => {
                btn.textContent = 'Pedir';
                btn.style.background = '';
            }, 2000);
        });
    });
});