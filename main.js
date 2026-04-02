/* =============================================
   Aline Haelberg — main.js
   ============================================= */

// --- Reveal on scroll ---
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// --- Mobile nav ---
const burger = document.querySelector('.nav-burger');
const navLinks = document.querySelector('.nav-links');

if (burger) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    burger.classList.toggle('active');
  });
}

// Fermer le menu si on clique sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// --- Header shadow on scroll ---
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
  } else {
    header.style.boxShadow = 'none';
  }
}, { passive: true });

// --- Formulaire Netlify (gestion succès) ---
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString()
      });
      form.innerHTML = `
        <div style="text-align:center; padding: 3rem 1rem;">
          <div style="font-size: 2.5rem; margin-bottom: 1rem;">✓</div>
          <h3 style="font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; margin-bottom: 0.75rem;">
            Message envoyé !
          </h3>
          <p style="color: var(--mid); font-size: 0.95rem; line-height: 1.7;">
            Merci pour votre message. Aline vous répondra dans les meilleurs délais.
          </p>
        </div>
      `;
    } catch (err) {
      alert('Une erreur est survenue. Merci de réessayer ou de contacter directement par email.');
    }
  });
}
