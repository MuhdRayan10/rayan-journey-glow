import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StackedImageViewerProps {
  images: string[];
  alt: string;
  className?: string;
}

export const StackedImageViewer = ({ images, alt, className = '' }: StackedImageViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const getStackStyle = (index: number) => {
    const offset = index * 8;
    const zIndex = images.length - index;
    const opacity = index === 0 ? 1 : 0.7 - index * 0.15;
    
    return {
      transform: `translateX(${offset}px) translateY(${offset}px)`,
      zIndex,
      opacity: Math.max(opacity, 0.3),
    };
  };

  // Create display array starting from current index
  const displayImages = images.map((_, index) => {
    const adjustedIndex = (currentIndex + index) % images.length;
    return {
      src: images[adjustedIndex],
      originalIndex: adjustedIndex,
      stackIndex: index,
    };
  });

  return (
    <div className={`relative ${className}`}>
      <div className="relative h-64 lg:h-80 cursor-pointer group" onClick={nextImage}>
        {/* Stack of images */}
        {displayImages.map((item, stackIndex) => (
          <motion.div
            key={`${item.originalIndex}-${currentIndex}`}
            className="absolute inset-0 rounded-lg overflow-hidden border border-white/10"
            style={getStackStyle(stackIndex)}
            initial={stackIndex === 0 ? { 
              scale: 1.1, 
              opacity: 0,
              rotateY: 15 
            } : undefined}
            animate={stackIndex === 0 ? { 
              scale: 1, 
              opacity: 1,
              rotateY: 0 
            } : undefined}
            transition={{ 
              duration: 0.6, 
              ease: "easeOut",
              opacity: { duration: 0.3 }
            }}
          >
            <img
              src={item.src}
              alt={`${alt} ${item.originalIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              style={{
                filter: stackIndex > 0 ? 'brightness(0.8)' : 'brightness(1)',
              }}
            />
            
            {/* Gradient overlay for stacked images */}
            {stackIndex > 0 && (
              <div className="absolute inset-0 bg-black/20" />
            )}
          </motion.div>
        ))}

        {/* Interaction hint */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Click indicator */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="glass rounded-full p-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full"
            />
          </div>
        </div>

        {/* Image counter */}
        <div className="absolute top-4 left-4 glass rounded-pill px-3 py-1">
          <span className="text-xs font-mono text-white">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 rounded-lg border border-white/0 group-hover:border-white/20 group-hover:shadow-lg group-hover:shadow-white/10 transition-all duration-300" />
      </div>
    </div>
  );
};