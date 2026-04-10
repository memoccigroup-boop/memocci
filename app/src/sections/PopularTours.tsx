import { useEffect, useRef, useState } from 'react';
import { MapPin, ChevronRight } from 'lucide-react';

interface TourCardProps {
  image: string;
  title: string;
  description: string;
  location: string;
  delay: number;
}

const TourCard = ({ image, title, description, location, delay }: TourCardProps) => {
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
      className={`group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-2">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-display font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* CTA */}
        <button
          onClick={scrollToContact}
          className="w-full btn-secondary gap-2 text-sm py-3"
        >
          <span>Ask for Quote</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const PopularTours = () => {
  const tours = [
    {
      image: '/tour-desert-safari.jpg',
      title: 'Dubai Desert Safari',
      description: 'Experience the magic of Arabian dunes with dune bashing, camel rides, and traditional BBQ dinner under the stars.',
      location: 'Dubai Desert',
    },
    {
      image: '/tour-burj-khalifa.jpg',
      title: 'Burj Khalifa Tour',
      description: 'Reach the sky at the world\'s tallest building with panoramic views of Dubai from the observation deck.',
      location: 'Downtown Dubai',
    },
    {
      image: '/tour-burj-alarab.jpg',
      title: 'Burj Al Arab Experience',
      description: 'Luxury at its finest. Experience the iconic sail-shaped hotel with world-class dining and service.',
      location: 'Jumeirah',
    },
    {
      image: '/tour-marina-cruise.jpg',
      title: 'Dubai Marina Cruise',
      description: 'Sail through the stunning marina on a luxury dinner cruise with spectacular city views.',
      location: 'Dubai Marina',
    },
    {
      image: '/tour-grand-mosque.jpg',
      title: 'Abu Dhabi Grand Mosque Tour',
      description: 'Marvel at architectural brilliance of Sheikh Zayed Grand Mosque, a masterpiece of Islamic architecture.',
      location: 'Abu Dhabi',
    },
    {
      image: '/tour-ferrari-world.jpg',
      title: 'Ferrari World Abu Dhabi',
      description: 'Experience thrills at the world\'s fastest roller coaster and immersive Ferrari-themed attractions.',
      location: 'Yas Island, Abu Dhabi',
    },
    {
      image: '/tour-city-tour.jpg',
      title: 'Dubai City Tour',
      description: 'See the best of Dubai in one day - from historic districts to modern marvels and everything in between.',
      location: 'Dubai',
    },
    {
      image: '/tour-yacht.jpg',
      title: 'Luxury Yacht Experience',
      description: 'Cruise in style along the Dubai coastline with premium amenities and breathtaking views.',
      location: 'Dubai Marina',
    },
    {
      image: '/tour-abu-dhabi.jpg',
      title: 'Abu Dhabi City Tour',
      description: 'Explore the UAE capital - visit Emirates Palace, Corniche, and cultural landmarks.',
      location: 'Abu Dhabi',
    },
    {
      image: '/tour-cultural.jpg',
      title: 'Cultural Heritage Tour',
      description: 'Experience authentic Emirati culture with visits to historic sites, museums, and traditional markets.',
      location: 'Old Dubai',
    },
  ];

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
    <section id="tours" className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl -translate-y-1/2" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-14 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
            Popular Tours
          </span>
          <h2 className="section-title">Explore Our Best Experiences</h2>
          <p className="section-subtitle">
            Discover the most sought-after tours in Dubai and beyond. Each experience is 
            carefully crafted to create unforgettable memories.
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tours.map((tour, index) => (
            <TourCard
              key={tour.title}
              image={tour.image}
              title={tour.title}
              description={tour.description}
              location={tour.location}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularTours;
