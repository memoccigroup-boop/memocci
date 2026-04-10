import { useEffect, useRef, useState } from 'react';
import { MapPin, ChevronRight, ChevronLeft } from 'lucide-react';

interface DestinationCardProps {
  image: string;
  name: string;
  description: string;
  delay: number;
}

const DestinationCard = ({ image, name, description, delay }: DestinationCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={ref}
      className={`group flex-shrink-0 w-[300px] md:w-[350px] bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Name Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-1.5 text-white/90 text-sm mb-1">
            <MapPin className="w-4 h-4" />
            <span>International</span>
          </div>
          <h3 className="text-2xl font-display font-bold text-white">{name}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* CTA */}
        <button
          onClick={scrollToContact}
          className="w-full py-3 px-4 bg-gray-100 hover:bg-primary hover:text-white text-gray-800 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2"
        >
          <span>Ask for Quote</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const Destinations = () => {
  const destinations = [
    {
      image: '/dest-armenia.jpg',
      name: 'Armenia',
      description: 'Discover ancient monasteries, stunning mountain landscapes, and rich cultural heritage.',
    },
    {
      image: '/dest-azerbaijan.jpg',
      name: 'Azerbaijan',
      description: 'Experience the Land of Fire with modern architecture and historic old city charm.',
    },
    {
      image: '/dest-kazakhstan.jpg',
      name: 'Kazakhstan',
      description: 'Explore vast steppes, modern cities, and the beauty of Central Asia.',
    },
    {
      image: '/dest-georgia.jpg',
      name: 'Georgia',
      description: 'Wine country with breathtaking Caucasus mountains and warm hospitality.',
    },
    {
      image: '/dest-kyrgyzstan.jpg',
      name: 'Kyrgyzstan',
      description: 'Alpine lakes, nomadic culture, and untouched natural beauty await.',
    },
    {
      image: '/dest-uzbekistan.jpg',
      name: 'Uzbekistan',
      description: 'Walk the ancient Silk Road through magnificent Islamic architecture.',
    },
    {
      image: '/dest-uk.jpg',
      name: 'United Kingdom',
      description: 'Historic landmarks, royal heritage, and vibrant city life in London and beyond.',
    },
    {
      image: '/dest-schengen.jpg',
      name: 'Schengen Europe',
      description: 'Multiple European destinations with one visa - France, Italy, Germany & more.',
    },
    {
      image: '/dest-turkey.jpg',
      name: 'Turkey',
      description: 'Where East meets West - Istanbul, Cappadocia, and Mediterranean coasts.',
    },
    {
      image: '/dest-maldives.jpg',
      name: 'Maldives',
      description: 'Paradise on Earth with crystal-clear waters and luxury overwater villas.',
    },
    {
      image: '/dest-thailand.jpg',
      name: 'Thailand',
      description: 'Tropical beaches, ancient temples, and world-renowned Thai hospitality.',
    },
    {
      image: '/dest-vietnam.jpg',
      name: 'Vietnam',
      description: 'Ha Long Bay, historic cities, and rich cultural experiences.',
    },
    {
      image: '/dest-indonesia.jpg',
      name: 'Indonesia',
      description: 'Bali\'s rice terraces, temples, and tropical paradise experiences.',
    },
    {
      image: '/dest-korea.jpg',
      name: 'South Korea',
      description: 'K-pop culture, ancient palaces, and cutting-edge technology.',
    },
    {
      image: '/dest-china.jpg',
      name: 'China',
      description: 'Great Wall, Forbidden City, and millennia of history and culture.',
    },
    {
      image: '/dest-philippines.jpg',
      name: 'Philippines',
      description: 'Pristine beaches, diving spots, and tropical island adventures.',
    },
    {
      image: '/dest-japan.jpg',
      name: 'Japan',
      description: 'Ancient traditions meet modern innovation - temples, sushi, and cherry blossoms.',
    },
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons, { passive: true });
      checkScrollButtons();
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollButtons);
      }
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="destinations" className="section-padding bg-muted relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`flex flex-col md:flex-row md:items-end md:justify-between mb-10 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-6 md:mb-0">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              International Destinations
            </span>
            <h2 className="section-title mb-2">Explore the World</h2>
            <p className="text-gray-600 max-w-xl">
              From exotic getaways to cultural adventures, discover our curated selection 
              of international destinations.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                canScrollLeft
                  ? 'border-primary text-primary hover:bg-primary hover:text-white'
                  : 'border-gray-300 text-gray-300 cursor-not-allowed'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                canScrollRight
                  ? 'border-primary text-primary hover:bg-primary hover:text-white'
                  : 'border-gray-300 text-gray-300 cursor-not-allowed'
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Destinations Slider */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {destinations.map((destination, index) => (
            <div key={destination.name} className="snap-start">
              <DestinationCard
                image={destination.image}
                name={destination.name}
                description={destination.description}
                delay={index * 50}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
