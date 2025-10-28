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
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-description');
  const modalLink = document.getElementById('modal-link');
  const closeModal = document.querySelector('.close-modal');

  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('h3')?.textContent || 'Project';
      const desc = item.querySelector('p')?.textContent || 'No description available.';
      const project = item.dataset.project;

      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;

      // Set project-specific links
      const projectLinks = {
        eastcoastpets: 'https://eastcoastpets.example.com',
        riffs: 'https://riffs.example.com',
      };
      modalLink.href = projectLinks[project] || '#';
      modalLink.style.display = projectLinks[project] ? 'inline-block' : 'none';

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
  const formMessage = document.getElementById('form-message');

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.cta-button');
      const spinner = submitBtn.querySelector('.fa-spinner');

      submitBtn.disabled = true;
      spinner.style.display = 'inline-block';

      try {
        const formData = new FormData(contactForm);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          formMessage.textContent = 'Thank you! Your inquiry has been sent successfully.';
          formMessage.className = 'form-message form-success';
          formMessage.style.display = 'block';
          contactForm.reset();
        } else {
          throw new Error(result.message || 'Form submission failed.');
        }
      } catch (error) {
        formMessage.textContent = 'Sorry, something went wrong. Please try again or email us directly.';
        formMessage.className = 'form-message form-error';
        formMessage.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        spinner.style.display = 'none';
      }
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