import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Github, Linkedin, Twitter } from 'lucide-react';
import { RgbButton } from './RgbButton';

interface LandingPageProps {
  onStartJourney: () => void;
}

export const LandingPage = ({ onStartJourney }: LandingPageProps) => {
  const [text, setText] = useState('');
  const [stage, setStage] = useState<'empty' | 'typing1' | 'pause' | 'typing2' | 'complete'>('empty');
  const [showButton, setShowButton] = useState(false);

  const text1 = "Hi, my name is Rayan.";
  const text2 = "Welcome to my world";

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('typing1'), 1000);
    return () => clearTimeout(timer1);
  }, []);

  useEffect(() => {
    if (stage === 'typing1') {
      let i = 0;
      const typing = setInterval(() => {
        setText(text1.slice(0, i));
        i++;
        if (i > text1.length) {
          clearInterval(typing);
          setTimeout(() => setStage('pause'), 500);
        }
      }, 100);
      return () => clearInterval(typing);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 'pause') {
      setTimeout(() => setStage('typing2'), 1000);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 'typing2') {
      let i = 0;
      setText('');
      const typing = setInterval(() => {
        setText(text2.slice(0, i));
        i++;
        if (i > text2.length) {
          clearInterval(typing);
          setStage('complete');
          setTimeout(() => setShowButton(true), 800);
        }
      }, 120);
      return () => clearInterval(typing);
    }
  }, [stage]);

  const blobVariants = {
    empty: {
      width: '200px',
      height: '60px',
      scale: 1,
    },
    typing1: {
      width: '380px',
      height: '70px',
      scale: 1.02,
    },
    typing2: {
      width: '450px',
      height: '80px',
      scale: 1.05,
    },
    complete: {
      width: '450px',
      height: '80px',
      scale: 1,
    }
  };

  const currentVariant = stage === 'empty' ? 'empty' : 
                        stage === 'typing1' ? 'typing1' :
                        stage === 'typing2' || stage === 'complete' ? 'typing2' : 'empty';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Noise Texture Overlay */}
      <div className="noise-overlay" />

      {/* Star Overlay */}
      <div className="stars-overlay" />
      
      {/* Radial Glow Behind Blob */}
      <div className="radial-glow" />
      
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-6 right-6 z-50">
        <div className="glass rounded-pill px-6 py-3">
          <div className="flex gap-6 text-sm font-medium">
            <a href="#" className="text-foreground hover:text-white transition-colors">Home</a>
            <a href="#journey" className="text-muted-foreground hover:text-white transition-colors">Journey</a>
            <a href="#projects" className="text-muted-foreground hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="text-muted-foreground hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Social Links */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
        <a href="https://github.com/MuhdRayan10" target="_blank" rel="noopener noreferrer" className="glass rounded-full p-3 hover:glow-white-subtle transition-all duration-300 group">
          <Github size={20} className="text-muted-foreground group-hover:text-white transition-colors" />
        </a>
        <a href="https://www.linkedin.com/in/muhammed-rayan-savad-004310127/" target="_blank" rel="noopener noreferrer" className="glass rounded-full p-3 hover:glow-white-subtle transition-all duration-300 group">
          <Linkedin size={20} className="text-muted-foreground group-hover:text-white transition-colors" />
        </a>
        <a href="#" className="glass rounded-full p-3 hover:glow-white-subtle transition-all duration-300 group">
          <Twitter size={20} className="text-muted-foreground group-hover:text-white transition-colors" />
        </a>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center space-y-12">
        {/* Dynamic Blob Terminal */}
        <motion.div
          className="blob flex items-center justify-center relative"
          variants={blobVariants}
          animate={currentVariant}
          style={{ borderRadius: '40px' }}
        >
          {/* Terminal Icon */}
          <div className="absolute left-4 flex items-center">
            <Terminal size={24} className="text-white font-bold" strokeWidth={2.5} />
          </div>
          
          {/* Text Content */}
          <div className="ml-12 mr-6 font-mono text-lg text-foreground font-bold">
            {text && (
              <span className={stage !== 'complete' ? 'typing-cursor' : ''}>
                {text}
              </span>
            )}
          </div>

          {/* Inner glow effect */}
          {(stage === 'typing1' || stage === 'typing2') && (
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
          )}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: showButton ? 1 : 0, 
            y: showButton ? 0 : 20 
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <RgbButton onClick={onStartJourney}>
            Start your journey
          </RgbButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {showButton && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="glass rounded-full p-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-6 bg-white rounded-full opacity-60"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};