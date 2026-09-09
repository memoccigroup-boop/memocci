// Skymundo website interactions
document.addEventListener('DOMContentLoaded', () => {
  initSalalahTourCard();
  initHeroSlider();
  initHeaderScroll();
  initMobileMenu();
  initSmoothScroll();
  initContactForm();
  initScrollAnimations();
  initStatsCounter();
});

// Keep Salalah discoverable inside the existing Tours section only.
function initSalalahTourCard() {
  const grid = document.querySelector('#tours .tours-grid');
  if (!grid || grid.querySelector('[data-tour="salalah"]')) return;
  const card = document.createElement('div');
  card.className = 'tour-card';
  card.dataset.tour = 'salalah';
  card.innerHTML = `
    <a href="/Tours/salalah" class="tour-image" aria-label="Explore Salalah tour package" style="display:block;text-decoration:none;color:inherit">
      <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Wadi%20Darbat%20salalah.jpg?width=900" alt="Salalah Oman during Khareef season" loading="lazy">
      <div class="tour-badge">Featured</div>
    </a>
    <div class="tour-content">
      <h3><a href="/Tours/salalah" style="color:inherit;text-decoration:none">Salalah</a></h3>
      <p>Discover Salalah's green Khareef landscapes, waterfalls, beaches and guided sightseeing with Skymundo.</p>
      <a href="/Tours/salalah" class="btn btn-primary"><i class="fas fa-map-marked-alt"></i> Explore Salalah</a>
    </div>`;
  grid.prepend(card);
}

function initHeroSlider() {
  const slides = [...document.querySelectorAll('.slide')];
  const dotsContainer = document.querySelector('.slider-dots');
  if (!slides.length || !dotsContainer) return;
  let current = 0, timer;
  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => go(i));
    dotsContainer.appendChild(dot);
  });
  const dots = [...dotsContainer.querySelectorAll('.dot')];
  const reset = () => { clearInterval(timer); timer = setInterval(() => go((current + 1) % slides.length), 5000); };
  const go = i => {
    slides[current].classList.remove('active'); dots[current].classList.remove('active');
    current = i; slides[current].classList.add('active'); dots[current].classList.add('active'); reset();
  };
  reset();
  const slider = document.querySelector('.hero-slider');
  if (slider) { slider.addEventListener('mouseenter', () => clearInterval(timer)); slider.addEventListener('mouseleave', reset); }
}

function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  const update = () => header.classList.toggle('scrolled', window.pageYOffset > 100);
  window.addEventListener('scroll', update, {passive:true}); update();
}

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('navMenu');
  if (!hamburger || !nav) return;
  const close = () => { hamburger.classList.remove('active'); nav.classList.remove('active'); document.body.style.overflow = ''; };
  hamburger.addEventListener('click', e => { e.stopPropagation(); hamburger.classList.toggle('active'); nav.classList.toggle('active'); document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : ''; });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('click', e => { if (!nav.contains(e.target) && !hamburger.contains(e.target)) close(); });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', function(e) {
    const href = this.getAttribute('href'); if (!href || href === '#') return;
    const target = document.querySelector(href); if (!target) return;
    e.preventDefault();
    const header = document.getElementById('header'); const top = document.querySelector('.top-bar');
    window.scrollTo({top: target.offsetTop - (header?.offsetHeight || 0) - (top?.offsetHeight || 0), behavior:'smooth'});
    document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active')); this.classList.add('active');
  }));
  window.addEventListener('scroll', () => {
    const y = window.pageYOffset + 200;
    document.querySelectorAll('section[id]').forEach(section => {
      if (y >= section.offsetTop && y < section.offsetTop + section.offsetHeight) {
        document.querySelectorAll('.nav-menu a').forEach(a => { a.classList.toggle('active', a.getAttribute('href') === '#' + section.id); });
      }
    });
  }, {passive:true});
}

function initContactForm() {
  const form = document.getElementById('contactForm'); if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault(); const d = Object.fromEntries(new FormData(form));
    const msg = `Hello Skymundo Tourism,%0A%0A*New Inquiry - Get Offer*%0A%0A*Name:* ${d.name}%0A*Email:* ${d.email}%0A*Phone:* ${d.phone}%0A*Service:* ${getServiceName(d.service)}%0A*Message:* ${d.message || 'No additional message'}%0A%0APlease send me the best offer. Thank you!`;
    window.open(`https://wa.me/971562168857?text=${msg}`, '_blank'); form.reset(); showNotification('Thank you! Redirecting to WhatsApp...', 'success');
  });
}
function getServiceName(v){return ({flight:'Flight Booking',hotel:'Hotel Reservation',visa:'Visa Assistance',tour:'Tour Package',umrah:'Umrah Package',insurance:'Travel Insurance'})[v] || v;}

function initStatsCounter() {
  const nums = [...document.querySelectorAll('.stat-number')], section = document.querySelector('.stats-section'); if (!section) return;
  let done = false;
  const obs = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting && !done) { done = true; nums.forEach(el => animateCounter(el, parseInt(el.dataset.count || '0',10))); obs.disconnect(); } }), {threshold:.5});
  obs.observe(section);
}
function animateCounter(el,target){const duration=2000,step=target/(duration/16);let current=0;const label=el.nextElementSibling?.textContent||'';const timer=setInterval(()=>{current+=step;if(current>=target){el.textContent=formatNumber(target,label);clearInterval(timer)}else el.textContent=formatNumber(Math.floor(current),label)},16)}
function formatNumber(n,label){if(label.includes('/7'))return n;if(n>=1000)return (n/1000).toFixed(0)+'K+';return n+(n===98?'%':'+')}

function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;
  const els = document.querySelectorAll('.service-card,.feature-card,.destination-card,.contact-item,.testimonial-card');
  const obs = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.style.opacity='1';entry.target.style.transform='translateY(0)';obs.unobserve(entry.target)}}),{threshold:.1,rootMargin:'0px 0px -50px 0px'});
  els.forEach(el=>{el.style.opacity='0';el.style.transform='translateY(30px)';el.style.transition='opacity .6s ease, transform .6s ease';obs.observe(el)});
}

function showNotification(message,type='info') {
  document.querySelector('.notification')?.remove(); const n=document.createElement('div'); n.className=`notification notification-${type}`; n.innerHTML=`<i class="fas ${type==='success'?'fa-check-circle':'fa-info-circle'}"></i><span>${message}</span>`;
  n.style.cssText=`position:fixed;top:20px;right:20px;background:${type==='success'?'#00a86b':'#0066cc'};color:#fff;padding:15px 25px;border-radius:12px;display:flex;align-items:center;gap:12px;box-shadow:0 8px 30px #0003;z-index:10000;font-weight:500`; document.body.appendChild(n); setTimeout(()=>n.remove(),3400);
}

if ('IntersectionObserver' in window) { const io=new IntersectionObserver((entries,o)=>entries.forEach(e=>{if(e.isIntersecting){const img=e.target;if(img.dataset.src){img.src=img.dataset.src;img.removeAttribute('data-src')}o.unobserve(img)}})); document.querySelectorAll('img[data-src]').forEach(img=>io.observe(img)); }
function preloadImages(){['images/hero-burj-khalifa.jpg','images/hero-burj-al-arab.jpg','images/hero-palm-jumeirah.jpg','images/hero-dubai-marina.jpg','images/hero-dubai-frame.jpg','images/hero-museum.jpg','images/hero-desert-safari.jpg','images/hero-ferrari-world.jpg','images/hero-grand-mosque.jpg','images/hero-umrah.jpg'].forEach(src=>{const i=new Image();i.src=src})}
window.addEventListener('load',preloadImages);
