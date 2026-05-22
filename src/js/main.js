import '../scss/main.scss';
import { initCursor } from './cursor.js';
import { initContactForm, initDownloadOptimization } from './form.js';

// Theme Switch functionality
function initThemeSwitch() {
  const toggleSwitch = document.querySelector('#checkbox');
  const themeLabel = document.querySelector('.theme-switch');
  const html = document.documentElement;
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Function to apply theme
  function applyTheme(theme) {
    if (theme === 'light') {
      html.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      if (toggleSwitch) toggleSwitch.checked = true;
    } else {
      html.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
      if (toggleSwitch) toggleSwitch.checked = false;
    }
  }

  // Check for saved theme preference or default to dark
  const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
  applyTheme(currentTheme);

  // Handle theme toggle via checkbox change
  if (toggleSwitch) {
    toggleSwitch.addEventListener('change', function (e) {
      applyTheme(e.target.checked ? 'light' : 'dark');
    });
  }

  // Handle theme toggle via label click (for better UX)
  if (themeLabel) {
    themeLabel.addEventListener('click', function (e) {
      // Prevent double-triggering if clicking on the checkbox directly
      if (e.target.tagName === 'INPUT') return;
      
      setTimeout(() => {
        applyTheme(toggleSwitch?.checked ? 'light' : 'dark');
      }, 50);
    });
  }

  // Listen for system theme changes (only if user hasn't manually set a preference)
  prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initThemeSwitch();
  if (!document.body.classList.contains('page-work')) {
    initCursor();
  }
  initContactForm();
  initDownloadOptimization();
});
