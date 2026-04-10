import { useEffect, useRef, useState } from 'react';
import { FileCheck, Clock, Shield, ChevronRight } from 'lucide-react';

interface VisaCardProps {
  country: string;
  flag: string;
  delay: number;
}

const VisaCard = ({ country, flag, delay }: VisaCardProps) => {
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
      className={`group bg-white rounded-xl p-5 shadow-card hover:shadow-card-hover border-2 border-transparent hover:border-secondary/30 transition-all duration-500 hover:-translate-y-1 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* Flag */}
        <div className="w-14 h-14 rounded-full overflow-hidden shadow-md flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
          <img
            src={flag}
            alt={`${country} flag`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-gray-900 truncate">{country}</h3>
          <p className="text-gray-500 text-sm">Visa Assistance</p>
        </div>

        {/* CTA */}
        <button
          onClick={scrollToContact}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-secondary group-hover:text-white transition-all duration-300 flex-shrink-0"
          aria-label={`Ask for quote for ${country}`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const VisaAssistance = () => {
  const visaDestinations = [
    { country: 'United Kingdom', flag: 'https://flagcdn.com/w160/gb.png' },
    { country: 'Schengen Europe', flag: 'https://flagcdn.com/w160/eu.png' },
    { country: 'Turkey', flag: 'https://flagcdn.com/w160/tr.png' },
    { country: 'Japan', flag: 'https://flagcdn.com/w160/jp.png' },
    { country: 'China', flag: 'https://flagcdn.com/w160/cn.png' },
    { country: 'South Korea', flag: 'https://flagcdn.com/w160/kr.png' },
    { country: 'Philippines', flag: 'https://flagcdn.com/w160/ph.png' },
    { country: 'Thailand', flag: 'https://flagcdn.com/w160/th.png' },
    { country: 'Vietnam', flag: 'https://flagcdn.com/w160/vn.png' },
    { country: 'Indonesia', flag: 'https://flagcdn.com/w160/id.png' },
    { country: 'Georgia', flag: 'https://flagcdn.com/w160/ge.png' },
    { country: 'Azerbaijan', flag: 'https://flagcdn.com/w160/az.png' },
    { country: 'Armenia', flag: 'https://flagcdn.com/w160/am.png' },
    { country: 'Kazakhstan', flag: 'https://flagcdn.com/w160/kz.png' },
    { country: 'Uzbekistan', flag: 'https://flagcdn.com/w160/uz.png' },
    { country: 'Kyrgyzstan', flag: 'https://flagcdn.com/w160/kg.png' },
    { country: 'Maldives', flag: 'https://flagcdn.com/w160/mv.png' },
  ];

  const features = [
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: 'Document Support',
      description: 'Complete guidance on required documents',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Fast Processing',
      description: 'Quick turnaround times',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'High Success Rate',
      description: 'Professional assistance guaranteed',
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
    <section id="visa" className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
            Visa Services
          </span>
          <h2 className="section-title">Visa Assistance</h2>
          <p className="section-subtitle">
            Professional visa support for international destinations. We guide you through 
            every step for a hassle-free application process.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex items-center gap-4 p-5 bg-muted rounded-xl transition-all duration-700 ${
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-display font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Visa Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {visaDestinations.map((destination, index) => (
            <VisaCard
              key={destination.country}
              country={destination.country}
              flag={destination.flag}
              delay={index * 50}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Need help with your visa application? Contact us for personalized assistance.
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary gap-2 inline-flex"
          >
            <span>Get Visa Assistance</span>
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default VisaAssistance;
