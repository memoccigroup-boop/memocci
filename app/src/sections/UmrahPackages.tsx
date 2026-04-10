import { useEffect, useRef, useState } from 'react';
import { Plane, Hotel, MapPin, Car, Headphones, Check, ChevronRight } from 'lucide-react';

const UmrahPackages = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    { icon: <Plane className="w-5 h-5" />, text: 'Round-trip flights' },
    { icon: <Hotel className="w-5 h-5" />, text: 'Hotel accommodations near Haram' },
    { icon: <MapPin className="w-5 h-5" />, text: 'Guided tours' },
    { icon: <Car className="w-5 h-5" />, text: 'Transportation' },
    { icon: <Headphones className="w-5 h-5" />, text: '24/7 support' },
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="umrah" 
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-blue-900" />
      
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div 
            className={`text-white transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              Spiritual Journeys
            </span>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Umrah Packages
            </h2>
            
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Experience the profound blessing of Umrah with our carefully crafted packages. 
              We handle every detail so you can focus on your spiritual connection.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div 
                  key={feature.text}
                  className={`flex items-center gap-3 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <span className="text-blue-100">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Package Highlights */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
              <h3 className="font-display font-semibold text-lg mb-4">Package Includes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Umrah visa processing',
                  '5-star hotel accommodation',
                  'Daily meals included',
                  'Airport transfers',
                  'Ziyarat tours',
                  'Scholar guidance',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="text-sm text-blue-100">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={scrollToContact}
              className="bg-secondary hover:bg-secondary-light text-white px-8 py-4 rounded-xl font-medium inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <span>Ask for Quote</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Images */}
          <div 
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Main Image */}
              <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/umrah-kaaba.jpg"
                  alt="Kaaba in Mecca"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm opacity-80">Masjid Al Haram</p>
                  <p className="font-display font-semibold">Mecca</p>
                </div>
              </div>

              {/* Secondary Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/umrah-madinah.jpg"
                  alt="Masjid Al Nabawi"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="text-xs opacity-80">Masjid Al Nabawi</p>
                  <p className="font-display font-semibold text-sm">Madinah</p>
                </div>
              </div>

              {/* Tertiary Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/umrah-family.jpg"
                  alt="Family Umrah"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="text-xs opacity-80">Spiritual Journey</p>
                  <p className="font-display font-semibold text-sm">Family Packages</p>
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UmrahPackages;
