import { useEffect, useRef, useState } from 'react';
import { 
  Globe, 
  FileCheck, 
  Landmark, 
  Hotel, 
  Calendar, 
  Users, 
  Heart, 
  UsersRound, 
  Ship,
  Route
} from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ServiceCard = ({ icon, title, description, delay }: ServiceCardProps) => {
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
      className={`group bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-secondary-light flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      <p className="text-gray-600 mb-5 text-sm leading-relaxed">
        {description}
      </p>

      {/* CTA */}
      <button
        onClick={scrollToContact}
        className="inline-flex items-center text-primary font-medium text-sm hover:text-secondary transition-colors duration-300"
      >
        <span>Ask for Quote</span>
        <svg 
          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Globe className="w-7 h-7" />,
      title: 'International Tour Packages',
      description: 'Curated journeys to the world\'s most captivating destinations with premium accommodations.',
    },
    {
      icon: <FileCheck className="w-7 h-7" />,
      title: 'Visa Assistance',
      description: 'Expert guidance for smooth visa processing worldwide with high success rates.',
    },
    {
      icon: <Landmark className="w-7 h-7" />,
      title: 'Umrah Packages',
      description: 'Spiritual journeys with comprehensive arrangements for a blessed experience.',
    },
    {
      icon: <Hotel className="w-7 h-7" />,
      title: 'Hotel Bookings',
      description: 'Premium accommodations at the best rates, from luxury resorts to budget stays.',
    },
    {
      icon: <Calendar className="w-7 h-7" />,
      title: 'Holiday Planning',
      description: 'Customized vacation plans for every traveler, tailored to your preferences.',
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: 'Family Tours',
      description: 'Memorable experiences for the whole family with activities for all ages.',
    },
    {
      icon: <Heart className="w-7 h-7" />,
      title: 'Honeymoon Trips',
      description: 'Romantic getaways for newlyweds in the most enchanting destinations.',
    },
    {
      icon: <UsersRound className="w-7 h-7" />,
      title: 'Group Travel',
      description: 'Seamless coordination for group adventures with special group rates.',
    },
    {
      icon: <Ship className="w-7 h-7" />,
      title: 'Cruise Tours',
      description: 'Luxury voyages across stunning waters with world-class amenities.',
    },
    {
      icon: <Route className="w-7 h-7" />,
      title: 'Custom Travel Itineraries',
      description: 'Personalized plans tailored to your dreams and travel style.',
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
    <section id="about" className="section-padding bg-muted relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-secondary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-14 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="section-title">What We Offer</h2>
          <p className="section-subtitle">
            From dream destinations to seamless travel experiences, we provide comprehensive 
            services to make your journey unforgettable.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index * 80}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
