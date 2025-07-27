import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

// Import generated images
import programmingWorkspace from '@/assets/programming-workspace.jpg';
import programmingCoding from '@/assets/programming-coding.jpg';
import debateStage from '@/assets/debate-stage.jpg';
import debateAchievement from '@/assets/debate-achievement.jpg';
import chessBoard from '@/assets/chess-board.jpg';
import chessTournament from '@/assets/chess-tournament.jpg';

interface JourneySlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image1: string;
  image2: string;
  tags: string[];
}

const journeySlides: JourneySlide[] = [
  {
    id: 'programming',
    title: 'Programming',
    subtitle: 'Building Digital Solutions',
    description: 'From web applications to complex algorithms, I leverage modern frameworks like React, TypeScript, and Node.js to create innovative solutions. My focus lies in clean, maintainable code and user-centered design.',
    image1: programmingWorkspace,
    image2: programmingCoding,
    tags: ['React', 'TypeScript', 'Node.js', 'Python', 'Full Stack']
  },
  {
    id: 'debating',
    title: 'Debating',
    subtitle: 'Mastering Persuasive Communication',
    description: 'Competitive debating has shaped my critical thinking and public speaking abilities. Through regional tournaments and leadership roles, I\'ve learned to construct compelling arguments and engage diverse audiences effectively.',
    image1: debateStage,
    image2: debateAchievement,
    tags: ['Public Speaking', 'Critical Thinking', 'Leadership', 'Tournaments', 'Analysis']
  },
  {
    id: 'chess',
    title: 'Chess',
    subtitle: 'Strategic Thinking & Pattern Recognition',
    description: 'Chess has been my companion in developing strategic thinking and pattern recognition skills. With a focus on endgame theory and tactical combinations, I enjoy the mental challenges and the endless depth of the game.',
    image1: chessBoard,
    image2: chessTournament,
    tags: ['Strategy', 'Pattern Recognition', 'Analysis', 'Endgames', 'Tournaments']
  }
];

interface JourneySectionProps {
  onBackToLanding: () => void;
}

export const JourneySection = ({ onBackToLanding }: JourneySectionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % journeySlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + journeySlides.length) % journeySlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' && currentSlide < journeySlides.length - 1) {
        nextSlide();
      } else if (event.key === 'ArrowLeft' && currentSlide > 0) {
        prevSlide();
      } else if (event.key === 'Escape') {
        onBackToLanding();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, nextSlide, prevSlide, onBackToLanding]);

  const currentData = journeySlides[currentSlide];

  // Helper functions for image descriptions
  const getImageADescription = (id: string) => {
    switch (id) {
      case 'programming':
        return 'My development workspace where ideas transform into reality. Clean code architecture and modern frameworks come together in this creative environment.';
      case 'debating':
        return 'The debate stage where arguments are crafted and delivered. This is where critical thinking meets public speaking in competitive tournaments.';
      case 'chess':
        return 'Strategic thinking in action. Every move calculated, every position analyzed. The chess board becomes a battlefield of minds.';
      default:
        return '';
    }
  };

  const getImageBDescription = (id: string) => {
    switch (id) {
      case 'programming':
        return 'Deep in the coding zone. Lines of TypeScript and React components taking shape, solving complex problems through elegant solutions.';
      case 'debating':
        return 'Recognition for dedication and skill. Tournament achievements that represent countless hours of practice and intellectual growth.';
      case 'chess':
        return 'Tournament competition at its finest. The intensity of competitive chess where strategy meets time pressure in pursuit of victory.';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/6 w-72 h-72 bg-white/5 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/3 right-1/6 w-96 h-96 bg-white/3 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-8 pb-6">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Left side - Title and Tags */}
            <div className="flex items-center gap-6 flex-wrap">
              {/* Dynamic Activity Title */}
              <h1 className="text-3xl md:text-5xl font-bold text-foreground">
                {currentData.title}
              </h1>
              
              {/* Tags - moved to header */}
              <div className="flex flex-wrap gap-2">
                {currentData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="glass rounded-pill px-3 py-1 text-xs font-medium text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Right side - Navigation */}
            <div className="flex items-center gap-4">
              {/* Progress Indicator */}
              <div className="glass rounded-pill px-4 py-2 flex items-center space-x-3">
                {journeySlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(index)}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-white/20 text-white' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span className="text-xs font-mono">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-medium hidden md:inline">
                      {slide.title}
                    </span>
                  </button>
                ))}
              </div>
              
              {/* Home Button */}
              <button
                onClick={onBackToLanding}
                className="glass rounded-full p-3 hover:glow-white-subtle transition-all duration-300 group"
              >
                <Home size={20} className="text-muted-foreground group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative z-10">
        <div className="container mx-auto px-6 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="h-full"
            >
              {/* New Layout - Side by side image and text pairs */}
              <div className="space-y-12 py-8">
                {/* First Row - Image A and Text A */}
                <motion.div 
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Image A */}
                  <motion.div
                    className="glass-card hover-tilt order-2 lg:order-1"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={currentData.image1}
                      alt={`${currentData.title} - Workspace`}
                      className="w-full h-64 lg:h-80 object-cover rounded-lg"
                    />
                  </motion.div>

                  {/* Text A */}
                  <div className="order-1 lg:order-2">
                    <div className="glass-card p-8">
                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        {currentData.subtitle}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {getImageADescription(currentData.id)}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Second Row - Text B and Image B */}
                <motion.div 
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {/* Text B */}
                  <div>
                    <div className="glass-card p-8">
                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        In Action
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {getImageBDescription(currentData.id)}
                      </p>
                    </div>
                  </div>

                  {/* Image B */}
                  <motion.div
                    className="glass-card hover-tilt"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={currentData.image2}
                      alt={`${currentData.title} - Action`}
                      className="w-full h-64 lg:h-80 object-cover rounded-lg"
                    />
                  </motion.div>
                </motion.div>

                {/* Center Description */}
                <motion.div 
                  className="text-center max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="glass-card p-8">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {currentData.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="relative z-10 pb-8">
        <div className="container mx-auto px-6">
          <div className="flex justify-center space-x-6">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="glass rounded-full p-4 hover:glow-white-subtle transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <ChevronLeft size={24} className="text-muted-foreground group-hover:text-white group-disabled:group-hover:text-muted-foreground transition-colors" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === journeySlides.length - 1}
              className="glass rounded-full p-4 hover:glow-white-subtle transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <ChevronRight size={24} className="text-muted-foreground group-hover:text-white group-disabled:group-hover:text-muted-foreground transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};