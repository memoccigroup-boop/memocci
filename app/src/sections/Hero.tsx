import { useState, useEffect, useCallback } from 'react';
import { ChevronRight, MessageCircle, Phone } from 'lucide-react';

const heroSlides = [
  {
    image: '/hero-burj-khalifa.jpg',
    alt: 'Burj Khalifa Dubai',
  },
  {
    image: '/hero-burj-alarab.jpg',
    alt: 'Burj Al Arab Dubai',
  },
  {
    image: '/hero-marina-boat.jpg',
    alt: 'Dubai Marina with Boat',
  },
  {
    image: '/hero-palm-jumeirah.jpg',
    alt: 'Palm Jumeirah',
  },
  {
    image: '/hero-museum.jpg',
    alt: 'Museum of the Future',
  },
  {
    image: '/hero-ferrari-world.jpg',
    alt: 'Ferrari World Abu Dhabi',
  },
  {
    image: '/hero-desert-safari.jpg',
    alt: 'Desert Safari',
  },
  {
    image: '/hero-umrah.jpg',
    alt: 'Umrah Kaaba Mecca',
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setTimeout(() => setIsAnimating(false), 1000);
  }, [isAnimating]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 z-10" />
            <img
              src={slide.image}
              alt={slide.alt}
              className={`w-full h-full object-cover transition-transform duration-[20000ms] ${
                index === currentSlide ? 'scale-110' : 'scale-100'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 container-custom pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6">
            <span className="block overflow-hidden">
              <span className="block animate-slide-up">Explore the World</span>
            </span>
            <span className="block overflow-hidden">
              <span className="block animate-slide-up animate-delay-200">
                <span className="text-gradient bg-gradient-to-r from-secondary to-orange-300 bg-clip-text text-transparent">
                  Beyond Boundaries
                </span>
              </span>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl animate-fade-in animate-delay-400">
            From Dubai to the world's most unforgettable destinations, SKYMUNDO creates 
            exceptional travel experiences tailored to every traveler.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-10 animate-fade-in animate-delay-500">
            <button
              onClick={() => scrollToSection('#tours')}
              className="btn-secondary gap-2 text-base px-8 py-4"
            >
              <span>Explore Tours</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollToSection('#contact')}
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-medium rounded-lg border border-white/30 transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
            >
              Ask for Quote
            </button>
          </div>

          {/* Quick Contact */}
          <div className="flex flex-wrap gap-4 animate-fade-in animate-delay-500">
            <a
              href="https://wa.me/971562168857"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-whatsapp text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </a>
            <a
              href="tel:+971562168857"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium border border-white/30 transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
            >
              <Phone className="w-5 h-5" />
              <span>+971 56 216 8857</span>
            </a>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentSlide(index);
                  setTimeout(() => setIsAnimating(false), 1000);
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-secondary'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
};

export default Hero;
