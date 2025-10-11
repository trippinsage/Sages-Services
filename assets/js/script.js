document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     Utility Functions
     ========================================================================== */
  const trapFocus = (container, firstFocusable, lastFocusable) => {
    const handleFocus = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    };
    container.addEventListener('keydown', handleFocus);
    return () => container.removeEventListener('keydown', handleFocus);
  };

  /* ==========================================================================
     Scroll Animations
     ========================================================================== */
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
  );

  animateElements.forEach((el) => observer.observe(el));

  /* ==========================================================================
     Page Load Animation
     ========================================================================== */
  setTimeout(() => document.body.classList.add('loaded'), 100);

  /* ==========================================================================
     Navigation Toggle
     ========================================================================== */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    const navLinksList = navLinks.querySelectorAll('a');
    const firstNavLink = navLinksList[0];
    const lastNavLink = navLinksList[navLinksList.length - 1];

    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('open');
      if (!isExpanded && firstNavLink) {
        firstNavLink.focus();
      }
    });

    navLinksList.forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      });
    });

    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });

    const removeFocusTrap = trapFocus(navLinks, firstNavLink, lastNavLink);
    navToggle.addEventListener('click', () => {
      if (!navLinks.classList.contains('open')) {
        removeFocusTrap();
      }
    });
  }

  /* ==========================================================================
     Contact Form Submission
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const submitButton = contactForm?.querySelector('button');
  const buttonText = submitButton?.querySelector('span');
  const spinner = submitButton?.querySelector('.fa-spinner');

  if (contactForm && submitButton && buttonText && spinner) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent default to handle submission manually
      buttonText.style.display = 'none';
      spinner.style.display = 'inline-block';
      submitButton.disabled = true;

      try {
        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();

        // Validate inputs
        if (!name || !email || !message) {
          throw new Error('Please fill in all required fields.');
        }

        // Enhanced email validation
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
        if (!emailRegex.test(email)) {
          throw new Error('Please enter a valid email address.');
        }

        // Log submission attempt (NDT timezone)
        console.log(`Form submission attempt at ${new Date().toLocaleString('en-CA', { timeZone: 'America/St_Johns' })}`);

        // Submit to Web3Forms
        const formData = new FormData(contactForm);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json',
          },
        });

        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error('Failed to send form. Please try again.');
        }

        // Reset form and show success message
        contactForm.reset();
        const successMessage = document.createElement('p');
        successMessage.className = 'form-success';
        successMessage.textContent = 'Form sent successfully';
        successMessage.setAttribute('role', 'alert');
        contactForm.insertAdjacentElement('afterend', successMessage);
        successMessage.focus();
        setTimeout(() => successMessage.remove(), 5000);

        buttonText.style.display = 'inline-block';
        spinner.style.display = 'none';
        submitButton.disabled = false;

      } catch (error) {
        console.error(`Form submission error at ${new Date().toLocaleString('en-CA', { timeZone: 'America/St_Johns' })}:`, error);
        const errorMessage = document.createElement('p');
        errorMessage.className = 'form-error';
        errorMessage.textContent = 'Error: Failed to send form. Please try again or email sages.services@outlook.com.';
        errorMessage.setAttribute('role', 'alert');
        contactForm.insertAdjacentElement('afterend', errorMessage);
        errorMessage.focus();
        setTimeout(() => errorMessage.remove(), 5000);
        buttonText.style.display = 'inline-block';
        spinner.style.display = 'none';
        submitButton.disabled = false;
      }
    });
  }

  /* ==========================================================================
     Portfolio Modals
     ========================================================================== */
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalLink = document.getElementById('modal-link');
  const closeModal = document.querySelector('.close-modal');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  const projectData = {
    eastcoastpets: {
      img: 'assets/img/branding/ecp-logo.webp',
      title: 'East Coast Pets',
      description: 'A vibrant, SEO-optimized website for a local pet care business, enhancing client engagement.',
      link: 'https://eastcoastpets.ca',
    },
    riffs: {
      img: 'assets/img/branding/riffs.webp',
      title: 'Riffs',
      description: 'A mobile-optimized, user-friendly website for Riffs, built for maximum SEO impact.',
      link: 'https://riffs.ca',
    },
  };

  if (modal && modalImg && modalTitle && modalDescription && modalLink && closeModal) {
    portfolioItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const project = item.dataset.project;
        const data = projectData[project];
        if (data) {
          modalImg.src = data.img;
          modalImg.alt = `${data.title} Website`;
          modalTitle.textContent = data.title;
          modalDescription.textContent = data.description;
          modalLink.href = data.link || '#';
          modalLink.setAttribute('aria-label', `Visit ${data.title} Website`);
          modal.classList.add('show');
          modal.focus();
          const focusableElements = modal.querySelectorAll('a[href], button, [tabindex="0"]');
          const firstFocusable = focusableElements[0];
          const lastFocusable = focusableElements[focusableElements.length - 1];
          const removeModalFocusTrap = trapFocus(modal, firstFocusable, lastFocusable);
          closeModal.addEventListener('click', removeModalFocusTrap, { once: true });
        }
      });
    });

    modalLink.addEventListener('click', (e) => {
      const url = modalLink.getAttribute('href');
      if (url && url !== '#') {
        window.open(url, '_blank');
      }
    });

    closeModal.addEventListener('click', () => {
      modal.classList.remove('show');
      setTimeout(() => modal.classList.remove('show'), 300);
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.classList.remove('show'), 300);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove('show');
        setTimeout(() => modal.classList.remove('show'), 300);
        document.querySelector(`[data-project="${modalImg.alt.split(' ')[0].toLowerCase()}"]`)?.focus();
      }
    });
  }

  /* ==========================================================================
     Smooth Scrolling for Navigation Links
     ========================================================================== */
  const navLinksSmooth = document.querySelectorAll('a[href^="#"]');
  navLinksSmooth.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerOffset = document.querySelector('header').offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - headerOffset,
          behavior: 'smooth',
        });
      }
    });
  });
});