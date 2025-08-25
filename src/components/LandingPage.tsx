import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Github, Linkedin, Twitter, X } from 'lucide-react';
import { GlitchText } from './GlitchText';

interface LandingPageProps {
  onStartJourney: () => void;
  onNavigate: (section: 'landing' | 'journey' | 'contact') => void;
  currentSection?: string;
}

export const LandingPage = ({ onStartJourney, onNavigate, currentSection = 'landing' }: LandingPageProps) => {
  const [text, setText] = useState('');
  const [stage, setStage] = useState<'empty' | 'typing1' | 'pause' | 'typing2' | 'complete'>('empty');

  const text1 = "Hi, my name is Rayan.";
  const text2 = "Welcome to my world!";

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('typing1'), 500);
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
          setTimeout(() => setStage('pause'), 300);
        }
      }, 80);
      return () => clearInterval(typing);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 'pause') {
      setTimeout(() => setStage('typing2'), 600);
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
        }
      }, 100);
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

  const currentVariant =
    stage === 'empty'
      ? 'empty'
      : stage === 'typing1'
        ? 'typing1'
        : stage === 'typing2' || stage === 'complete'
          ? 'typing2'
          : 'empty';

  const blobYOffset = stage === 'typing2' || stage === 'complete' || stage === 'pause' ? 60 : 0;

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
        <div className="absolute top-1/2 left-1/6 w-32 h-32 bg-white/4 rounded-full blur-2xl opacity-25 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/6 left-1/2 w-48 h-48 bg-white/2 rounded-full blur-3xl opacity-35 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-6 right-6 z-50">
        <div className="glass rounded-pill px-6 py-3">
          <div className="flex gap-6 text-sm font-medium">
            <button 
              onClick={() => {
                const element = document.getElementById('landing');
                element?.scrollIntoView({ behavior: 'smooth' });
              }} 
              className={`transition-colors ${
                currentSection === 'landing' 
                  ? 'text-white' 
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('journey');
                element?.scrollIntoView({ behavior: 'smooth' });
              }} 
              className={`transition-colors ${
                currentSection === 'journey' 
                  ? 'text-white' 
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              Journey
            </button>
            <button className="text-muted-foreground hover:text-white transition-colors">Projects</button>
            <button 
              onClick={() => {
                const element = document.getElementById('contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }} 
              className={`transition-colors ${
                currentSection === 'contact' 
                  ? 'text-white' 
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              Contact
            </button>
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
        <motion.div animate={{ y: blobYOffset }} className="flex flex-col items-center">
          {/* Name Heading */}
          {(stage === 'pause' || stage === 'typing2' || stage === 'complete') && (
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: -45 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-display-lg font-bold text-center mb-4 sweep"
            >
              Muhammed Rayan Savad
            </motion.h1>
          )}

          {/* Glitch Subtitle - positioned between name and blob */}
          {(stage === 'pause' || stage === 'typing2' || stage === 'complete') && (
            <motion.div
              initial={{ opacity: 0}}
              animate={{ opacity: 1, y: -40}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center mb-6"
            >
              <GlitchText text="TECH ENTHUSIAST" />
            </motion.div>
          )}

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
        </motion.div>

        {/* Removed CTA Button - users can now simply scroll down */}
      </div>

      {/* Enhanced Scroll Indicator */}
      {stage === 'complete' && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.p 
            className="text-xs text-muted-foreground font-medium tracking-wider uppercase"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll Down
          </motion.p>
          <div className="glass rounded-full p-4 cursor-pointer hover:glow-white-subtle transition-all duration-300 chalk-texture"
               onClick={onStartJourney}>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="chalk-arrow">
                <div className="chalk-arrow-tip"></div>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="flex gap-1 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.2, duration: 0.4 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-white/60 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  delay: i * 0.2 
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};