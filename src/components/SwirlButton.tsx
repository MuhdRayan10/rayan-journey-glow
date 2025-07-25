import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SwirlButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const SwirlButton = ({ children, className = '', onClick }: SwirlButtonProps) => {
  return (
    <motion.button
      className={`swirl-border relative px-8 py-4 text-lg font-medium text-foreground hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2 focus:ring-offset-background ${className}`}
      whileHover={{ 
        boxShadow: '0 0 40px rgba(139, 92, 246, 0.6)',
        y: -4 
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <span className="relative z-10 bg-gradient-to-r from-foreground via-purple to-foreground bg-clip-text">
        {children}
      </span>
    </motion.button>
  );
};