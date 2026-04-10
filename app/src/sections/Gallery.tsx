import { useEffect, useRef, useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  { src: '/hero-desert-safari.jpg', alt: 'Desert Safari', category: 'Dubai' },
  { src: '/hero-burj-khalifa.jpg', alt: 'Burj Khalifa', category: 'Dubai' },
  { src: '/hero-burj-alarab.jpg', alt: 'Burj Al Arab', category: 'Dubai' },
  { src: '/hero-marina.jpg', alt: 'Dubai Marina', category: 'Dubai' },
  { src: '/tour-grand-mosque.jpg', alt: 'Grand Mosque', category: 'Abu Dhabi' },
  { src: '/tour-ferrari-world.jpg', alt: 'Ferrari World', category: 'Abu Dhabi' },
  { src: '/gallery-beach.jpg', alt: 'Tropical Beach', category: 'International' },
  { src: '/gallery-mountain.jpg', alt: 'Mountain Resort', category: 'International' },
  { src: '/gallery-resort.jpg', alt: 'Luxury Resort', category: 'International' },
  { src: '/dest-maldives.jpg', alt: 'Maldives', category: 'International' },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [visibleImages, setVisibleImages] = useState<number[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    imageRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleImages((prev) => [...prev, index]);
              observer.disconnect();
            }
          },
          { threshold: 0.2 }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Close lightbox on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-14 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Gallery
          </span>
          <h2 className="section-title">Travel Moments</h2>
          <p className="section-subtitle">
            Glimpses of unforgettable journeys and breathtaking destinations 
            experienced by our travelers.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              ref={(el) => { imageRefs.current[index] = el; }}
              className={`group relative aspect-square overflow-hidden rounded-xl cursor-pointer ${
                visibleImages.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              } transition-all duration-700`}
              style={{ 
                transitionDelay: `${(index % 4) * 100}ms`,
                gridColumn: index === 0 || index === 5 ? 'span 1' : undefined,
                gridRow: index === 0 || index === 5 ? 'span 2' : undefined,
              }}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs text-white/70 uppercase tracking-wider">{image.category}</span>
                  <h3 className="text-white font-display font-semibold">{image.alt}</h3>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
              <span className="text-sm text-white/70 uppercase tracking-wider">{selectedImage.category}</span>
              <h3 className="text-2xl text-white font-display font-semibold">{selectedImage.alt}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
