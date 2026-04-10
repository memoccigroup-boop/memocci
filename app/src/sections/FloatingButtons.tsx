import { useState, useEffect } from 'react';
import { MessageCircle, Phone, ChevronUp } from 'lucide-react';

const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`w-12 h-12 rounded-full bg-primary text-white shadow-lg flex items-center justify-center transition-all duration-500 hover:bg-primary-light hover:-translate-y-1 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      {/* Call Button */}
      <a
        href="tel:+971562168857"
        className="w-12 h-12 rounded-full bg-primary text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-primary-light hover:-translate-y-1 hover:shadow-xl animate-pulse-glow"
        aria-label="Call us"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/971562168857"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-whatsapp text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-xl relative"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-20" />
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
};

export default FloatingButtons;
