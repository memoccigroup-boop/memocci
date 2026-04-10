import { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ahmed Al-Rashid',
    location: 'Dubai',
    image: '/reviewer-1.jpg',
    rating: 5,
    text: 'SKYMUNDO made our family trip to Georgia absolutely perfect. From visa assistance to hotel bookings, everything was seamless. Highly recommended!',
  },
  {
    id: 2,
    name: 'Fatima Hassan',
    location: 'Abu Dhabi',
    image: '/reviewer-2.jpg',
    rating: 5,
    text: 'The Umrah package was beyond our expectations. Every detail was taken care of, allowing us to focus entirely on our spiritual journey.',
  },
  {
    id: 3,
    name: 'Rajesh Kumar',
    location: 'Sharjah',
    image: '/reviewer-3.jpg',
    rating: 5,
    text: 'Professional service from start to finish. Our Europe tour was well-organized with excellent accommodations and guided tours. Will book again!',
  },
  {
    id: 4,
    name: 'Maria Santos',
    location: 'Ajman',
    image: '/reviewer-4.jpg',
    rating: 5,
    text: 'The team at SKYMUNDO went above and beyond for our honeymoon in Maldives. It was truly a magical experience we will never forget.',
  },
  {
    id: 5,
    name: 'Omar Abdullah',
    location: 'Ras Al Khaimah',
    image: '/reviewer-5.jpg',
    rating: 5,
    text: 'Best travel agency in Dubai! Their visa assistance for Japan was quick and hassle-free. The entire process was smooth and professional.',
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
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

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push({ ...testimonials[index], position: i });
    }
    return visible;
  };

  return (
    <section className="section-padding bg-muted relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-primary/10 to-transparent rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-14 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">
            Don't just take our word for it. Here's what travelers from across the UAE 
            have to say about their SKYMUNDO experience.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative">
          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-3 gap-6">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className={`bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 ${
                  headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Quote Icon */}
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Quote className="w-5 h-5" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Slider */}
          <div className="lg:hidden">
            <div className="bg-white rounded-2xl p-6 shadow-card">
              {/* Quote Icon */}
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Quote className="w-4 h-4" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonials[currentIndex].rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-gray-900 text-sm">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-gray-500 text-xs">{testimonials[currentIndex].location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-6 bg-primary' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
