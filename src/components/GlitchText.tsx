import { useState, useEffect, useCallback } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  onHover?: boolean;
}

const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
const LETTER_SUBSTITUTES: Record<string, string[]> = {
  'T': ['7', '†', '₮'],
  'E': ['3', '€', 'Ɛ'],
  'C': ['[', '(', 'ᶜ'],
  'H': ['#', 'Ħ', 'Ӈ'],
  'N': ['И', 'Ň', 'ᴎ'],
  'U': ['Ů', 'ų', 'μ'],
  'S': ['$', '§', 'Ș'],
  'I': ['!', '|', 'ɨ'],
  'A': ['@', 'Ā', 'Д']
};

export const GlitchText = ({ text, className = '', onHover = true }: GlitchTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  const glitchEffect = useCallback(() => {
    if (isGlitching) return;
    
    setIsGlitching(true);
    const duration = 150; // Total glitch duration
    const intervals = 8; // Number of character swaps
    const intervalDuration = duration / intervals;
    
    let currentInterval = 0;
    
    const glitchInterval = setInterval(() => {
      if (currentInterval >= intervals) {
        setDisplayText(text); // Reset to original
        setIsGlitching(false);
        clearInterval(glitchInterval);
        return;
      }
      
      // Create glitched version
      const glitched = text
        .split('')
        .map(char => {
          if (char === ' ') return char;
          
          // 40% chance to glitch each character
          if (Math.random() < 0.4) {
            // Try letter substitute first
            if (LETTER_SUBSTITUTES[char.toUpperCase()]) {
              const substitutes = LETTER_SUBSTITUTES[char.toUpperCase()];
              return substitutes[Math.floor(Math.random() * substitutes.length)];
            }
            // Fallback to random glitch chars
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          }
          
          return char;
        })
        .join('');
      
      setDisplayText(glitched);
      currentInterval++;
    }, intervalDuration);
  }, [text, isGlitching]);

  // Auto-trigger glitch effect periodically
  useEffect(() => {
    const autoGlitch = setInterval(() => {
      if (!isGlitching) {
        glitchEffect();
      }
    }, 3000); // Every 3 seconds

    return () => clearInterval(autoGlitch);
  }, [glitchEffect, isGlitching]);

  const handleHover = () => {
    if (onHover && !isGlitching) {
      glitchEffect();
    }
  };

  return (
    <span
      className={`font-mono text-base md:text-lg tracking-[0.2em] text-muted-foreground uppercase cursor-pointer transition-colors hover:text-foreground ${className}`}
      onMouseEnter={handleHover}
      style={{
        fontVariationSettings: '"wght" 500',
        textShadow: isGlitching ? '0 0 8px rgba(255,255,255,0.5)' : 'none',
      }}
    >
      {displayText}
    </span>
  );
};