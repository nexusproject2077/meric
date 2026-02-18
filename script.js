// ===============================
// LOADER
// ===============================
window.addEventListener('load', () => {
  document.body.classList.add('loading');

  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    document.body.classList.remove('loading');
  }, 1500);
});

// ===============================
// CURRENT YEAR IN FOOTER
// ===============================
document.getElementById('year').textContent = new Date().getFullYear();

// ===============================
// HAMBURGER MENU
// ===============================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ===============================
// NAVBAR ACTIVE LINK ON SCROLL
// ===============================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -55% 0px',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// ===============================
// SCROLL REVEAL ANIMATION
// ===============================
const revealElements = document.querySelectorAll(
  '.skill-card, .project-card, .contact-item, .about-text, .about-terminal, .home-content'
);

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 80 * i);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ===============================
// CONTACT FORM
// ===============================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('.btn-submit');
  const originalText = btn.textContent;

  btn.textContent = 'Envoi en cours...';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  // Simulate sending (replace with actual fetch/ajax call)
  setTimeout(() => {
    btn.textContent = '✓ Message envoyé !';
    btn.style.background = '#22d3a5';
    btn.style.opacity = '1';

    contactForm.reset();

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }, 1500);
});

// ===============================
// TERMINAL TYPING EFFECT
// ===============================
function typewriterEffect(element, delay = 1800) {
  if (!element) return;

  const original = element.innerHTML;
  element.innerHTML = '';

  setTimeout(() => {
    let i = 0;
    const text = original;

    function type() {
      if (i < text.length) {
        element.innerHTML = text.substring(0, i + 1);
        i++;
        setTimeout(type, 12);
      }
    }
    type();
  }, delay);
}

// Apply to first terminal only after loader
setTimeout(() => {
  const firstCode = document.querySelector('#home .terminal-code code');
  if (firstCode) typewriterEffect(firstCode, 500);
}, 1600);
