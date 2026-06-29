/* =============================================
   NIHITH KOLLAPUDI — LUXURY PORTFOLIO
   Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Loader ────────────────────────────────── */
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 1500);
  }

  /* ─── Navigation Scroll Effect ──────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const handleScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /* ─── Active Nav Link ───────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ─── Hamburger Menu ────────────────────────── */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileNav = document.querySelector('.nav__mobile');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('show');
      document.body.style.overflow = mobileNav.classList.contains('show') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('show');
        document.body.style.overflow = '';
      });
    });
  }

  /* ─── Scroll Reveal ─────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => revealObs.observe(el));

  /* ─── Custom Cursor ─────────────────────────── */
  const cursorDot  = document.querySelector('.cursor__dot');
  const cursorRing = document.querySelector('.cursor__ring');
  const cursorWrap = document.querySelector('.cursor');
  if (cursorWrap) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      if (cursorDot) { cursorDot.style.left = mx + 'px'; cursorDot.style.top = my + 'px'; }
    });
    const animRing = () => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      if (cursorRing) { cursorRing.style.left = rx + 'px'; cursorRing.style.top = ry + 'px'; }
      requestAnimationFrame(animRing);
    };
    animRing();

    document.querySelectorAll('a, button, .card, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursorWrap.classList.add('expand'));
      el.addEventListener('mouseleave', () => cursorWrap.classList.remove('expand'));
    });
  }

  /* ─── Number Counter Animation ──────────────── */
  const counters = document.querySelectorAll('[data-count]');
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const duration = 1800;
        const step = 16;
        const steps = duration / step;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = Number.isInteger(target) ? Math.floor(current) : current.toFixed(1);
        }, step);
        countObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => countObs.observe(el));

  /* ─── Smooth hover tilt on cards ────────────── */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -8;
      card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ─── Form ──────────────────────────────────── */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '✓ Message Sent!';
      btn.style.background = '#4CAF50';
      setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; form.reset(); }, 3000);
    });
  }

  /* ─── Skill Bars Animation ──────────────────── */
  const skillBars = document.querySelectorAll('.skill-bar');
  if (skillBars.length > 0) {
    const barObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          barObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    skillBars.forEach(bar => barObs.observe(bar));
  }

  /* ─── Mobile: remove cursor ─────────────────── */
  if (window.matchMedia('(hover: none)').matches) {
    const cursor = document.querySelector('.cursor');
    if (cursor) cursor.style.display = 'none';
  }
});
