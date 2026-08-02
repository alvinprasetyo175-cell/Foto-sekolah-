// Interactive behavior: mobile nav toggle, reveal-on-scroll, contact form mock submit, year update.

document.addEventListener('DOMContentLoaded', () => {
  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.classList.toggle('show');
    });
  }

  // Reveal on scroll using IntersectionObserver
  const revealElems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealElems.length) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElems.forEach(el => io.observe(el));
  } else {
    // Fallback: show immediately
    revealElems.forEach(el => el.classList.add('is-visible'));
  }

  // Contact form: mock submit (no backend) — replace with real endpoint as needed
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (status) { status.textContent = 'Mengirim...'; }
      const formData = new FormData(form);
      // Basic client-side validation (HTML already does most)
      const payload = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      };
      try {
        // Simulate network delay
        await new Promise(r => setTimeout(r, 900));
        // In production: send payload to server via fetch(...)
        form.reset();
        if (status) { status.textContent = 'Terima kasih — pesan Anda telah dikirim.'; }
      } catch (err) {
        if (status) { status.textContent = 'Gagal mengirim. Silakan coba lagi.'; }
      }
    });
  }

  // Smooth scroll focus handling for deep links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        // Close mobile nav if open
        if (mainNav && mainNav.classList.contains('show')) {
          mainNav.classList.remove('show');
          if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        }
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Move focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });
});
