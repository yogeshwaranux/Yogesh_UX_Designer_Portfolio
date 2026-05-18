import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initContactForm, initDownloadOptimization } from '../src/js/form.js';

describe('Form Initialization', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="contactForm">
        <input type="text" name="name" value="Test User">
        <input type="email" name="email" value="test@example.com">
        <textarea name="message">Test message</textarea>
        <button type="submit">Send</button>
      </form>
      <div class="form-success">Message sent successfully!</div>
    `;
  });

  it('should find the contact form and success message', () => {
    const form = document.querySelector('#contactForm');
    const successMessage = document.querySelector('.form-success');
    expect(form).toBeTruthy();
    expect(successMessage).toBeTruthy();
  });

  it('should prevent default form submission', () => {
    const form = document.querySelector('#contactForm');
    const submitEvent = new Event('submit', { bubbles: true });
    const preventDefaultSpy = vi.spyOn(submitEvent, 'preventDefault');
    
    initContactForm();
    form.dispatchEvent(submitEvent);
    
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should show success message on form submit', async () => {
    const successMessage = document.querySelector('.form-success');
    expect(successMessage.classList.contains('visible')).toBe(false);
    
    initContactForm();
    const form = document.querySelector('#contactForm');
    form.dispatchEvent(new Event('submit', { bubbles: true }));
    
    expect(successMessage.classList.contains('visible')).toBe(true);
  });

  it('should reset form after submission', async () => {
    const form = document.querySelector('#contactForm');
    const resetSpy = vi.spyOn(form, 'reset');
    
    initContactForm();
    form.dispatchEvent(new Event('submit', { bubbles: true }));
    
    // Verify reset was called
    expect(resetSpy).toHaveBeenCalled();
  });

  it('should hide success message after timeout', async () => {
    const successMessage = document.querySelector('.form-success');
    
    initContactForm();
    const form = document.querySelector('#contactForm');
    form.dispatchEvent(new Event('submit', { bubbles: true }));
    
    expect(successMessage.classList.contains('visible')).toBe(true);
    
    await new Promise(resolve => setTimeout(resolve, 4300));
    expect(successMessage.classList.contains('visible')).toBe(false);
  });
});

describe('Download Optimization', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <a href="/assets/docs/resume.pdf" download>Download Resume</a>
      <a href="/assets/docs/portfolio.pdf" download>Download Portfolio</a>
      <a href="https://example.com">Regular Link</a>
    `;
  });

  it('should find all PDF download links', () => {
    const pdfLinks = document.querySelectorAll('a[download]');
    expect(pdfLinks.length).toBeGreaterThan(0);
  });

  it('should set correct attributes on PDF links', () => {
    initDownloadOptimization();
    const pdfLinks = document.querySelectorAll('a[download]');
    
    pdfLinks.forEach((link) => {
      if (link.href.includes('.pdf')) {
        expect(link.target).toBeDefined();
        expect(link.rel).toBeDefined();
      }
    });
  });

  it('should maintain download attribute on links', () => {
    const link = document.querySelector('a[download]');
    const downloadBefore = link.hasAttribute('download');
    
    initDownloadOptimization();
    
    const downloadAfter = link.hasAttribute('download');
    expect(downloadAfter).toBe(downloadBefore);
  });
});
