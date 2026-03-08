const mobileToggle = document.querySelector('[data-mobile-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
}
const yearNode = document.querySelector('[data-year]');
if (yearNode) yearNode.textContent = new Date().getFullYear();