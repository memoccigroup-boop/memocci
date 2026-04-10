import { useEffect, useRef, useState } from 'react';
import { 
  Compass, 
  MapPin, 
  FileCheck, 
  Headphones, 
  UserCheck, 
  CalendarCheck, 
  Users, 
  MessageCircle 
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
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

  return (
    <div
      ref={ref}
      className={`group bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-lg font-display font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Compass className="w-7 h-7" />,
      title: 'Carefully Curated Experiences',
      description: 'Every journey crafted with attention to detail for unforgettable memories.',
    },
    {
      icon: <MapPin className="w-7 h-7" />,
      title: 'Attractive Destinations',
      description: 'Access to the world\'s most sought-after locations and hidden gems.',
    },
    {
      icon: <FileCheck className="w-7 h-7" />,
      title: 'Fast Visa Support',
      description: 'Professional assistance for hassle-free visa processing worldwide.',
    },
    {
      icon: <Headphones className="w-7 h-7" />,
      title: '24/7 Customer Assistance',
      description: 'Always here when you need us, anytime, anywhere in the world.',
    },
    {
      icon: <UserCheck className="w-7 h-7" />,
      title: 'Personalized Service',
      description: 'Tailored to your unique preferences and travel style.',
    },
    {
      icon: <CalendarCheck className="w-7 h-7" />,
      title: 'Smooth Booking',
      description: 'Seamless process from inquiry to departure and beyond.',
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: 'Family-Friendly Options',
      description: 'Perfect for travelers of all ages with special family packages.',
    },
    {
      icon: <MessageCircle className="w-7 h-7" />,
      title: 'Easy Communication',
      description: 'Reach us anytime on WhatsApp for quick responses.',
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
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-14 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="section-title">The SKYMUNDO Difference</h2>
          <p className="section-subtitle">
            We go above and beyond to ensure your travel experience is nothing short of 
            extraordinary. Here's why thousands trust us with their journeys.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 80}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
