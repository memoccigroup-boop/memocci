// ========================================
// SKYMUNDO Tourism - Premium Travel Agency
// Interactive JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Header Scroll Effect
    // ========================================
    const header = document.getElementById('header');
    const scrollTop = document.getElementById('scrollTop');
    
    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            scrollTop.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            scrollTop.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // ========================================
    // Mobile Navigation
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // ========================================
    // Active Navigation Link
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // ========================================
    // Hero Slider
    // ========================================
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    // Auto slide
    let slideTimer = setInterval(nextSlide, slideInterval);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            clearInterval(slideTimer);
            showSlide(index);
            slideTimer = setInterval(nextSlide, slideInterval);
        });
    });
    
    // ========================================
    // Stats Counter Animation
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        
        const statsSection = document.getElementById('stats');
        const sectionTop = statsSection.offsetTop;
        const sectionHeight = statsSection.offsetHeight;
        const windowHeight = window.innerHeight;
        
        if (window.scrollY + windowHeight > sectionTop + sectionHeight / 4) {
            statsAnimated = true;
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.ceil(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target + '+';
                    }
                };
                
                updateCounter();
            });
        }
    }
    
    window.addEventListener('scroll', animateStats);
    
    // ========================================
    // Scroll to Top
    // ========================================
    scrollTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========================================
    // Contact Form Handling
    // ========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.phone || !data.email || !data.destination) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Thank you! Your inquiry has been sent. We will contact you shortly.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // ========================================
    // Notification System
    // ========================================
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 10000;
            font-weight: 500;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
    
    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ========================================
    // Lazy Loading Images
    // ========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ========================================
    // Parallax Effect for Hero
    // ========================================
    const hero = document.querySelector('.hero');
    
    if (hero && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            
            document.querySelectorAll('.slide').forEach(slide => {
                if (slide.classList.contains('active')) {
                    slide.style.transform = `translateY(${rate}px)`;
                }
            });
        });
    }
    
    // ========================================
    // Gallery Lightbox (Simple)
    // ========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const src = img.getAttribute('src');
            const title = this.querySelector('.gallery-overlay span').textContent;
            
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <button class="lightbox-close"><i class="fas fa-times"></i></button>
                    <img src="${src}" alt="${title}">
                    <p>${title}</p>
                </div>
            `;
            
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10001;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            lightbox.querySelector('.lightbox-content').style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
                text-align: center;
            `;
            
            lightbox.querySelector('img').style.cssText = `
                max-width: 100%;
                max-height: 80vh;
                border-radius: 8px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            `;
            
            lightbox.querySelector('p').style.cssText = `
                color: white;
                margin-top: 16px;
                font-size: 1.25rem;
                font-weight: 500;
            `;
            
            lightbox.querySelector('.lightbox-close').style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 8px;
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Fade in
            setTimeout(() => lightbox.style.opacity = '1', 10);
            
            // Close handlers
            lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) closeLightbox();
            });
            
            function closeLightbox() {
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    lightbox.remove();
                    document.body.style.overflow = '';
                }, 300);
            }
            
            // Close on escape key
            document.addEventListener('keydown', function escapeHandler(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', escapeHandler);
                }
            });
        });
    });
    
    // ========================================
    // Performance: Preload critical resources
    // ========================================
    const criticalImages = [
        'https://images.unsplash.com/photo-1512453979798-5ea904ac66de?w=1920',
        'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1920'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
    
});
