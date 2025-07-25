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
      className={`rgb-border relative px-8 py-4 text-lg font-bold text-foreground hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-background ${className}`}
      whileHover={{ 
        boxShadow: '0 0 40px rgba(255, 255, 255, 0.4)',
        y: -4 
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <span className="relative z-10 text-white font-bold">
        {children}
      </span>
    </motion.button>
  );
};