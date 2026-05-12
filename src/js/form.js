export function initContactForm() {
  const form = document.querySelector('#contactForm');
  const successMessage = document.querySelector('.form-success');

  if (!form || !successMessage) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    successMessage.classList.add('visible');
    form.reset();
    setTimeout(() => successMessage.classList.remove('visible'), 4200);
  });
}

// Optimize PDF downloads
export function initDownloadOptimization() {
  document.querySelectorAll('a[download]').forEach((link) => {
    if (link.href.includes('.pdf')) {
      link.addEventListener('click', (e) => {
        // Ensure immediate download without opening in browser
        link.target = '';
        link.rel = 'noopener noreferrer';
      });
    }
  });
}
