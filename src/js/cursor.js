export function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return;

  const cursorDot = document.createElement('span');
  const cursorRing = document.createElement('span');
  cursorDot.className = 'cursor-dot';
  cursorRing.className = 'cursor-ring';
  document.body.append(cursorDot, cursorRing);

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  window.addEventListener('pointermove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  const animate = () => {
    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);

  document.body.addEventListener('pointerover', (event) => {
    if (event.target.closest('a, button, .btn, .card')) {
      cursorRing.classList.add('hovered');
    }
  });
  document.body.addEventListener('pointerout', (event) => {
    if (event.target.closest('a, button, .btn, .card')) {
      cursorRing.classList.remove('hovered');
    }
  });
}
