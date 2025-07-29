import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
      className={`relative cursor-pointer select-none ${className}`}
      onClick={handleStackClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Image stack: ${alt}. Click to cycle through ${images.length} images`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg glass-card">
        <AnimatePresence mode="wait">
          {images.map((image, index) => {
            const isActive = index === currentIndex;
            const offsetIndex = (index - currentIndex + images.length) % images.length;
            
            return (
              <motion.div
                key={`${image}-${index}`}
                className="absolute inset-0"
                initial={false}
                animate={{
                  zIndex: isActive ? 10 : Math.max(0, 5 - offsetIndex),
                  scale: isActive ? 1 : Math.max(0.85, 1 - offsetIndex * 0.05),
                  x: isActive ? 0 : offsetIndex * 8,
                  y: isActive ? 0 : offsetIndex * 12,
                  opacity: offsetIndex < 3 ? Math.max(0.3, 1 - offsetIndex * 0.2) : 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                }}
                style={{
                  transformOrigin: 'center center',
                }}
              >
                <div 
                  className={`w-full h-full rounded-lg overflow-hidden ${
                    isActive 
                      ? 'shadow-2xl shadow-white/20' 
                      : 'shadow-lg shadow-black/40'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${alt} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  
                  {/* Glassmorphic overlay for non-active images */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
                  )}
                  
                  {/* Active image glow effect */}
                  {isActive && (
                    <div className="absolute inset-0 ring-1 ring-white/30 rounded-lg pointer-events-none" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {/* Click indicator */}
        <div className="absolute bottom-4 right-4 z-20">
          <motion.div
            className="glass rounded-full px-3 py-1 text-xs font-mono text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {currentIndex + 1}/{images.length}
          </motion.div>
        </div>
        
        {/* Subtle hint text */}
        <div className="absolute top-4 left-4 z-20">
          <motion.div
            className="text-xs text-white/60 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Click to cycle
          </motion.div>
        </div>
      </div>
    </div>
  );
};