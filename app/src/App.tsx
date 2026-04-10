import { useEffect, useState, useRef } from 'react';
import './App.css';
import Header from './sections/Header';
import Hero from './sections/Hero';
import Stats from './sections/Stats';
import Services from './sections/Services';
import PopularTours from './sections/PopularTours';
import Destinations from './sections/Destinations';
import VisaAssistance from './sections/VisaAssistance';
import UmrahPackages from './sections/UmrahPackages';
import WhyChooseUs from './sections/WhyChooseUs';
import Testimonials from './sections/Testimonials';
import Gallery from './sections/Gallery';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import FloatingButtons from './sections/FloatingButtons';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger initial load animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isLoaded]);

  return (
    <div 
      ref={mainRef}
      className={`min-h-screen bg-white transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <PopularTours />
        <Destinations />
        <VisaAssistance />
        <UmrahPackages />
        <WhyChooseUs />
        <Testimonials />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default App;
