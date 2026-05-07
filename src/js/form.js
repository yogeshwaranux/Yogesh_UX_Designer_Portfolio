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
