// ==========================================================================
//   MAIN JS — Works with index.html, privacy.html, terms.html, 404.html
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {
  // Page load fade-in
  document.body.classList.add('loaded');

  // Mobile menu toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      navLinks.classList.toggle('open');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Portfolio modal
  const modal = document.getElementById('portfolio-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const closeModal = document.querySelector('.close-modal');

  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('h3')?.textContent || 'Project';
      const desc = item.querySelector('p')?.textContent || 'No description available.';

      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;

      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    });
  }

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });

  // Contact form handling
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.querySelector('.form-success');
  const formError = document.querySelector('.form-error');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.submit-btn');
      const spinner = submitBtn.querySelector('.fa-spinner') || document.createElement('i');
      if (!submitBtn.querySelector('.fa-spinner')) {
        spinner.className = 'fas fa-spinner';
        submitBtn.appendChild(spinner);
      }

      submitBtn.disabled = true;
      submitBtn.classList.add('loading');

      // Simulate form submission
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        spinner.remove();

        // Random success/failure for demo
        if (Math.random() > 0.3) {
          formSuccess.style.display = 'block';
          formError.style.display = 'none';
          contactForm.reset();
        } else {
          formError.style.display = 'block';
          formSuccess.style.display = 'none';
        }
      }, 1500);
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});