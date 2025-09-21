/* ==========================================================================
   Document Ready
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     Scroll Animations
     ========================================================================== */
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    },
    { threshold: 0.2 }
  );

  animateElements.forEach((el) => observer.observe(el));

  /* ==========================================================================
     Page Load Animation
     ========================================================================== */
  document.body.classList.add('loaded');

  /* ==========================================================================
     Contact Form Submission
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const submitButton = contactForm.querySelector('button');
  const buttonText = submitButton.querySelector('span');
  const spinner = submitButton.querySelector('.fa-spinner');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      buttonText.style.display = 'none';
      spinner.style.display = 'inline-block';
      submitButton.disabled = true;

      try {
        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();

        if (!name || !email || !message) {
          throw new Error('All fields are required.');
        }

        const subject = encodeURIComponent('Custom Solution Inquiry');
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
        const mailtoLink = `mailto:sages.services@outlook.com?subject=${subject}&body=${body}`;

        window.location.href = mailtoLink;

        setTimeout(() => {
          contactForm.reset();
          alert('Your inquiry has been sent! Please check your email client to complete the submission.');
          buttonText.style.display = 'inline-block';
          spinner.style.display = 'none';
          submitButton.disabled = false;
        }, 1000);
      } catch (error) {
        alert(`Error: ${error.message}`);
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

portfolioItems.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default to ensure clean modal trigger
        const project = item.dataset.project;
        const data = projectData[project];
        if (data) {
            modalImg.src = data.img;
            modalImg.alt = `${data.title} Website`;
            modalTitle.textContent = data.title;
            modalDescription.textContent = data.description;
            modalLink.href = data.link;
            modalLink.setAttribute('aria-label', `Visit ${data.title} Website`);
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('show'), 10);
            modalLink.focus(); // Improve accessibility
        }
    });
});

modalLink.addEventListener('click', (e) => {
    // Ensure the link navigates without interference
    const url = modalLink.getAttribute('href');
    if (url && url !== '#') {
        window.location.href = url; // Navigate to the URL in the same tab
    }
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    }
});

// Keyboard accessibility for modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    }
});

  /* ==========================================================================
     Smooth Scrolling for Navigation Links
     ========================================================================== */
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ==========================================================================
     Footer Navigation (Optional Enhancement)
     ========================================================================== */
  const footerNavLinks = document.querySelectorAll('.footer-nav .nav-links a');
  footerNavLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        // Update active state
        footerNavLinks.forEach((navLink) => navLink.removeAttribute('aria-current'));
        link.setAttribute('aria-current', 'page');
      }
    });
  });
});