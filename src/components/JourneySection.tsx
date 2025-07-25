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

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/6 w-72 h-72 bg-purple/5 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/3 right-1/6 w-96 h-96 bg-purple/3 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-8 pb-6">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-display-lg font-bold">Journey</h1>
            <button
              onClick={onBackToLanding}
              className="glass rounded-full p-3 hover:glow-purple-subtle transition-all duration-300 group"
            >
              <Home size={20} className="text-muted-foreground group-hover:text-purple transition-colors" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="relative z-10 pb-8">
        <div className="container mx-auto px-6">
          <div className="glass rounded-pill px-6 py-3 inline-flex items-center space-x-4">
            {journeySlides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-purple/20 text-purple' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="text-sm font-mono">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm font-medium hidden sm:inline">
                  {slide.title}
                </span>
              </button>
            ))}
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
              <div className="grid lg:grid-cols-2 gap-12 h-full items-center">
                {/* Images Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <motion.div
                    className="glass-card hover-tilt"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={currentData.image1}
                      alt={`${currentData.title} - Image 1`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </motion.div>
                  <motion.div
                    className="glass-card hover-tilt mt-8"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={currentData.image2}
                      alt={`${currentData.title} - Image 2`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-display-lg font-bold mb-2">
                      {currentData.title}
                    </h2>
                    <p className="text-xl text-purple font-medium mb-6">
                      {currentData.subtitle}
                    </p>
                    <p className="text-body-lg text-muted-foreground leading-relaxed">
                      {currentData.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-3">
                    {currentData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="glass rounded-pill px-4 py-2 text-sm font-medium text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
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
              className="glass rounded-full p-4 hover:glow-purple-subtle transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <ChevronLeft size={24} className="text-muted-foreground group-hover:text-purple group-disabled:group-hover:text-muted-foreground transition-colors" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === journeySlides.length - 1}
              className="glass rounded-full p-4 hover:glow-purple-subtle transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <ChevronRight size={24} className="text-muted-foreground group-hover:text-purple group-disabled:group-hover:text-muted-foreground transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};