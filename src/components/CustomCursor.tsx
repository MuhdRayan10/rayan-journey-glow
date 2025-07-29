import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const animationRef = useRef<number>();

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHoveringButton(true);
        setIsHoveringImage(false);
      } else if (target.tagName === 'IMG' || target.closest('img')) {
        setIsHoveringImage(true);
        setIsHoveringButton(false);
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHoveringButton(false);
      } else if (target.tagName === 'IMG' || target.closest('img')) {
        setIsHoveringImage(false);
      }
    };

    // Add event listeners to all interactive elements
    const addListeners = () => {
      const buttons = document.querySelectorAll('button, a');
      const images = document.querySelectorAll('img');
      
      buttons.forEach(btn => {
        btn.addEventListener('mouseenter', handleMouseEnter);
        btn.addEventListener('mouseleave', handleMouseLeave);
      });
      
      images.forEach(img => {
        img.addEventListener('mouseenter', handleMouseEnter);
        img.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    const removeListeners = () => {
      const buttons = document.querySelectorAll('button, a');
      const images = document.querySelectorAll('img');
      
      buttons.forEach(btn => {
        btn.removeEventListener('mouseenter', handleMouseEnter);
        btn.removeEventListener('mouseleave', handleMouseLeave);
      });
      
      images.forEach(img => {
        img.removeEventListener('mouseenter', handleMouseEnter);
        img.removeEventListener('mouseleave', handleMouseLeave);
      });
    };

    // Animation loop for smooth cursor following
    const animateCursor = () => {
      setCursorPosition(prev => {
        const dx = mousePosition.x - prev.x;
        const dy = mousePosition.y - prev.y;
        
        return {
          x: prev.x + dx * 0.15, // Smooth interpolation
          y: prev.y + dy * 0.15
        };
      });
      
      animationRef.current = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', updateMousePosition);
    addListeners();
    animationRef.current = requestAnimationFrame(animateCursor);

    // Re-add listeners when DOM changes (for dynamic content)
    const observer = new MutationObserver(() => {
      removeListeners();
      addListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      removeListeners();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      observer.disconnect();
    };
  }, [mousePosition.x, mousePosition.y]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorPosition.x - 16,
        y: cursorPosition.y - 16,
      }}
      animate={{
        scale: isHoveringImage ? 0.5 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.5
      }}
    >
      {/* Outer ring with glow */}
      <motion.div
        className="relative w-8 h-8"
        animate={{
          scale: isHoveringButton ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25
        }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, transparent 70%)',
            filter: 'blur(8px)',
          }}
          animate={{
            scale: isHoveringButton ? 1.2 : 1,
            opacity: isHoveringButton ? 0.8 : 0.4,
          }}
        />
        
        {/* Main ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white"
          style={{
            background: 'transparent',
          }}
          animate={{
            backgroundColor: isHoveringButton ? 'rgba(255,255,255,0.2)' : 'transparent',
            borderWidth: isHoveringButton ? '3px' : '2px',
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut"
          }}
        />
        
        {/* Pulse effect for buttons */}
        {isHoveringButton && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ 
              scale: [1, 1.8, 1], 
              opacity: [0.6, 0, 0.6] 
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};