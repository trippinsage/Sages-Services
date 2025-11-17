/**
 * Sages Services – Main JavaScript
 * Clean, accessible, and professional functionality
 * Handles: page load animation, mobile menu, and contact form submission
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Page fade-in animation
  document.body.classList.add('loaded');

  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const submitBtn = this.querySelector('.cta-button');
      const originalHTML = submitBtn.innerHTML;

      // Disable button and show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span>';

      try {
        const formData = new FormData(this);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (result.success) {
          formMessage.textContent = 'Thank you! Your message has been sent successfully.';
          formMessage.className = 'form-message form-success';
          contactForm.reset();
        } else {
          throw new Error(result.message || 'Submission failed');
        }
      } catch (error) {
        formMessage.textContent = 'Something went wrong. Please try again or call 709-277-6986.';
        formMessage.className = 'form-message form-error';
      } finally {
        formMessage.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
      }
    });
  }
});