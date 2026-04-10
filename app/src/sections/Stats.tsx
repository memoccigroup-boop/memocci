import { useEffect, useRef, useState } from 'react';
import { Users, MapPin, Package, Headphones } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

const StatItem = ({ icon, value, suffix, label, delay }: StatItemProps) => {
  const [count, setCount] = useState(0);
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
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const counter = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, value, delay]);

  return (
    <div
      ref={ref}
      className={`group relative bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
        {icon}
      </div>

      {/* Value */}
      <div className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-2">
        {count}
        <span className="text-secondary">{suffix}</span>
      </div>

      {/* Label */}
      <p className="text-gray-600 font-medium">{label}</p>

      {/* Decorative gradient */}
      <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-secondary/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

const Stats = () => {
  const stats = [
    {
      icon: <Users className="w-7 h-7" />,
      value: 2500,
      suffix: '+',
      label: 'Happy Customers',
    },
    {
      icon: <MapPin className="w-7 h-7" />,
      value: 200,
      suffix: '+',
      label: 'Destinations',
    },
    {
      icon: <Package className="w-7 h-7" />,
      value: 95,
      suffix: '+',
      label: 'Tour Packages',
    },
    {
      icon: <Headphones className="w-7 h-7" />,
      value: 24,
      suffix: '/7',
      label: 'Support',
    },
  ];

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">Trusted by Travelers Worldwide</h2>
          <p className="section-subtitle">
            Our numbers speak for themselves. Join thousands of satisfied customers who have 
            explored the world with SKYMUNDO.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
