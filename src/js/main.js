import '../scss/main.scss';
import { initCursor } from './cursor.js';
import { initContactForm } from './form.js';

window.addEventListener('DOMContentLoaded', () => {
  if (!document.body.classList.contains('page-work')) {
    initCursor();
  }
  initContactForm();
});
