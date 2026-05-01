/* ====================================================
   ANIMATIONS.JS — MIKO TECH
   ==================================================== */

// ─── 1. SCROLL REVEAL ───────────────────────────────
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('[data-animate]').forEach((el) => {
    observer.observe(el);
  });
}

// ─── 2. NAVBAR SCROLL ────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const update = () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ─── 3. MOBILE MENU ──────────────────────────────────
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn   = document.getElementById('closeMenu');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const close = () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', close);
  mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
}

// ─── 4. SCROLL TO TOP ────────────────────────────────
function initScrollToTop() {
  const btn = document.getElementById('scrollToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── 5. COUNTER ANIMATION ────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();

      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach((el) => observer.observe(el));
}

// ─── 6. HERO ENTRANCE ANIMATION ──────────────────────
function initHeroAnimation() {
  const elements = document.querySelectorAll('[data-hero-animate]');
  elements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)';
    el.style.transitionDelay = `${i * 0.15 + 0.2}s`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 50);
  });
}

// ─── 7. TESTIMONIAL SLIDER ────────────────────────────
function initTestimonialSlider() {
  const slides   = document.querySelectorAll('.testimonial-slide');
  const prevBtn  = document.getElementById('testimonialPrev');
  const nextBtn  = document.getElementById('testimonialNext');
  const counter  = document.getElementById('testimonialCounter');
  if (!slides.length) return;

  let current = 0;
  const total = slides.length;

  const show = (index) => {
    slides.forEach((s, i) => {
      s.style.opacity    = i === index ? '1' : '0';
      s.style.transform  = i === index ? 'translateX(0)' : 'translateX(40px)';
      s.style.position   = i === index ? 'relative' : 'absolute';
      s.style.pointerEvents = i === index ? 'auto' : 'none';
    });
    if (counter) counter.textContent = `${index + 1} / ${total}`;
  };

  slides.forEach((s) => {
    s.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  show(0);

  nextBtn?.addEventListener('click', () => { current = (current + 1) % total; show(current); });
  prevBtn?.addEventListener('click', () => { current = (current - 1 + total) % total; show(current); });

  // auto-play
  setInterval(() => { current = (current + 1) % total; show(current); }, 5500);
}

// ─── 8. ACTIVE NAV LINK ──────────────────────────────
function initActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path || (href !== '/' && path.startsWith(href))) {
      link.classList.add('active');
    }
  });
}

// ─── INIT ALL ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initNavbar();
  initMobileMenu();
  initScrollToTop();
  initCounters();
  initHeroAnimation();
  initTestimonialSlider();
  initActiveNav();
});
