import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface RgbButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const RgbButton = ({ children, className = '', onClick }: RgbButtonProps) => {
  return (
    <motion.button
      className={`relative px-8 py-4 text-lg font-bold text-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-background overflow-hidden group ${className}`}
      whileHover={{ 
        y: -6,
        scale: 1.08,
        rotateX: 5,
        rotateY: 5,
      }}
      whileTap={{ scale: 0.92 }}
      style={{ perspective: 1000 }}
      onClick={onClick}
    >
      {/* Base glass layer */}
      <div className="absolute inset-0 glass rounded-pill border border-white/30" />
      
      {/* Animated border gradient */}
      <motion.div 
        className="absolute inset-0 rounded-pill opacity-0 group-hover:opacity-100"
        style={{
          background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.4), transparent, rgba(255,255,255,0.6), transparent, rgba(255,255,255,0.4), transparent)',
          padding: '2px',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-[2px] glass rounded-pill" />
      </motion.div>
      
      {/* Secondary rotating border - opposite direction */}
      <motion.div 
        className="absolute inset-0 rounded-pill opacity-0 group-hover:opacity-60"
        style={{
          background: 'conic-gradient(from 180deg, transparent, rgba(255,255,255,0.2), transparent, rgba(255,255,255,0.3), transparent)',
          padding: '1px',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-[1px] transparent rounded-pill" />
      </motion.div>
      
      {/* Pulsing inner glow */}
      <motion.div
        className="absolute inset-2 rounded-pill bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100"
        animate={{ 
          boxShadow: [
            '0 0 20px rgba(255,255,255,0.1)',
            '0 0 40px rgba(255,255,255,0.2)',
            '0 0 20px rgba(255,255,255,0.1)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Lightning shimmer effect */}
      <div className="absolute inset-0 rounded-pill overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
          initial={{ x: '-100%' }}
          whileHover={{ x: '200%' }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>
      
      {/* Enhanced particle effect on hover */}
      <div className="absolute inset-0 rounded-pill overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${15 + Math.random() * 70}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
              y: [0, -20, -40],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeOut"
            }}
          />
        ))}
        {/* Larger sparkle particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-2 h-2 bg-white/60 rounded-full"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${15 + Math.random() * 70}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
      
      {/* Enhanced outer glow with energy rings */}
      <motion.div
        className="absolute inset-0 rounded-pill"
        initial={{ 
          boxShadow: '0 0 0 rgba(255, 255, 255, 0), 0 0 0 rgba(255, 255, 255, 0)' 
        }}
        whileHover={{ 
          boxShadow: [
            '0 0 30px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.1)',
            '0 0 50px rgba(255, 255, 255, 0.5), 0 0 100px rgba(255, 255, 255, 0.2)',
            '0 0 30px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.1)'
          ]
        }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      
      {/* Energy rings that expand outward */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute inset-0 rounded-pill border border-white/20"
            animate={{
              scale: [1, 2.5],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
      
      {/* Text with subtle glow */}
      <span className="relative z-10 text-white font-bold drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300">
        {children}
      </span>
      
      {/* Corner accent lights */}
      <div className="absolute top-1 left-1 w-2 h-2 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-1 right-1 w-2 h-2 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '0.1s' }} />
      <div className="absolute bottom-1 left-1 w-2 h-2 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '0.2s' }} />
      <div className="absolute bottom-1 right-1 w-2 h-2 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '0.3s' }} />
    </motion.button>
  );
};