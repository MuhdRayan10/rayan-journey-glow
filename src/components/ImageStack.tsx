import { useState } from 'react';
import { motion } from 'framer-motion';

interface ImageStackProps {
  images: string[];
  alt: string;
  className?: string;
}

export const ImageStack = ({ images, alt, className = '' }: ImageStackProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleStackClick = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleStackClick();
    }
  };

  return (
    <div 
      className={`relative cursor-pointer select-none group ${className}`}
      onClick={handleStackClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Image stack: ${alt}. Click to cycle through ${images.length} images`}
    >
      {/* Container with padding to show offset images */}
      <div className="relative aspect-[4/3] w-full max-h-48 lg:max-h-64 p-6">
        {/* Render only visible images for performance */}
        {images.map((image, index) => {
          const isActive = index === currentIndex;
          const offsetIndex = (index - currentIndex + images.length) % images.length;
          
          // Only render first 3 images for performance
          if (offsetIndex >= 3) return null;
          
          return (
            <motion.div
              key={index}
              className="absolute"
              initial={false}
              animate={{
                zIndex: isActive ? 20 : Math.max(0, 15 - offsetIndex * 3),
                scale: isActive ? 1 : Math.max(0.8, 1 - offsetIndex * 0.1),
                x: offsetIndex * 20,
                y: offsetIndex * 24,
                opacity: isActive ? 1 : Math.max(0.5, 1 - offsetIndex * 0.3),
              }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                inset: '0',
                margin: '0 24px 24px 0', // Create space for offsets
              }}
            >
              <div 
                className={`w-full h-full rounded-lg overflow-hidden glass-card ${
                  isActive 
                    ? 'shadow-2xl shadow-white/30 ring-1 ring-white/20' 
                    : 'shadow-lg shadow-black/30'
                }`}
              >
                <img
                  src={image}
                  alt={`${alt} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading={index <= 1 ? "eager" : "lazy"}
                />
                
                {/* Subtle overlay for background images */}
                {!isActive && (
                  <div className="absolute inset-0 bg-black/20" />
                )}
              </div>
            </motion.div>
          );
        })}
        
        {/* Click indicator - simplified */}
        <div className="absolute bottom-1 right-1 z-30 pointer-events-none">
          <div className="glass rounded-full px-2 py-1 text-xs font-mono text-white/70">
            {currentIndex + 1}/{images.length}
          </div>
        </div>
        
        {/* Hint text - only show on hover */}
        <div className="absolute top-1 left-1 z-30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="text-xs text-white/50 font-medium">
            Click to cycle
          </div>
        </div>
      </div>
    </div>
  );
};