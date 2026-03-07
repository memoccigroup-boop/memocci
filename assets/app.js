const header = document.querySelector('.header');
const toggle = document.querySelector('.mobile-toggle');
if (toggle && header) {
  toggle.addEventListener('click', () => header.classList.toggle('open'));
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => header?.classList.remove('open'));
});

const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
