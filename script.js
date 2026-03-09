const slides = document.querySelectorAll('.hero-slide');
const dotsWrap = document.getElementById('sliderDots');
let current = 0;

slides.forEach((_, index) => {
  const btn = document.createElement('button');
  btn.setAttribute('aria-label', `Go to slide ${index + 1}`);
  btn.addEventListener('click', () => showSlide(index));
  dotsWrap.appendChild(btn);
});
const dots = dotsWrap.querySelectorAll('button');

function showSlide(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = index;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

if (slides.length) {
  showSlide(0);
  setInterval(() => showSlide((current + 1) % slides.length), 5000);
}

document.getElementById('year').textContent = new Date().getFullYear();

const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle?.addEventListener('click', () => nav.classList.toggle('open'));
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
