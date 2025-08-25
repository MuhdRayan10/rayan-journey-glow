import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { ImageStack } from '@/components/ImageStack';
import journeyData from '@/data/journey-data.json';

// Import all images for stacks (webp format for performance)
import programmingWorkspace from '@/assets/programming-workspace.webp';
import programmingCoding from '@/assets/programming-coding.webp';
import programmingMonitor from '@/assets/programming-monitor.webp';
import programmingCode from '@/assets/programming-code.webp';
import programmingMacbook from '@/assets/programming-macbook.webp';

import debateStage from '@/assets/debate-stage.webp';
import debateAchievement from '@/assets/debate-achievement.webp';
import debateDisplay from '@/assets/debate-display.webp';
import debateMeeting from '@/assets/debate-meeting.webp';
import debateStylus from '@/assets/debate-stylus.webp';

import chessBoard from '@/assets/chess-board.webp';
import chessTournament from '@/assets/chess-tournament.webp';
import chessLaptop from '@/assets/chess-laptop.webp';
import chessGlassTable from '@/assets/chess-glass-table.webp';

// Image mapping
const imageMap: Record<string, string> = {
  'programming-workspace.webp': programmingWorkspace,
  'programming-coding.webp': programmingCoding,
  'programming-monitor.webp': programmingMonitor,
  'programming-code.webp': programmingCode,
  'programming-macbook.webp': programmingMacbook,
  'debate-stage.webp': debateStage,
  'debate-achievement.webp': debateAchievement,
  'debate-display.webp': debateDisplay,
  'debate-meeting.webp': debateMeeting,
  'debate-stylus.webp': debateStylus,
  'chess-board.webp': chessBoard,
  'chess-tournament.webp': chessTournament,
  'chess-laptop.webp': chessLaptop,
  'chess-glass-table.webp': chessGlassTable,
};

interface JourneyRow {
  title: string;
  description: string;
  photostack: string[];
}

interface JourneySection {
  section: string;
  tags: string[];
  rows: JourneyRow[];
}

interface JourneySlide {
  id: string;
  title: string;
  tags: string[];
  rows: JourneyRow[];
}

// Convert JSON data to the format expected by the component
const journeySlides: JourneySlide[] = journeyData.sections.map((section: JourneySection, index: number) => ({
  id: section.section.toLowerCase(),
  title: section.section,
  tags: section.tags,
  rows: section.rows
}));

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
        const element = document.getElementById('landing');
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const currentData = journeySlides[currentSlide];

  // Helper function to resolve image paths
  const resolveImagePaths = (photostack: string[]) => {
    return photostack.map(imageName => imageMap[imageName]).filter(Boolean);
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
                onClick={() => {
                  const element = document.getElementById('landing');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
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
              {/* Dynamic Rows */}
              <div className="space-y-12 py-8">
                {currentData.rows.map((row, index) => {
                  const isEven = index % 2 === 0;
                  const resolvedImages = resolveImagePaths(row.photostack);
                  
                  return (
                    <motion.div 
                      key={index}
                      className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (index * 0.2) }}
                    >
                      {/* Conditionally render image and text based on row index */}
                      {isEven ? (
                        <>
                          {/* Image on left for even rows */}
                          <div className="order-2 lg:order-1 transform-gpu">
                            <ImageStack
                              images={resolvedImages}
                              alt={`${currentData.title} - ${row.title}`}
                              className="w-full"
                            />
                          </div>

                          {/* Text on right for even rows */}
                          <div className="order-1 lg:order-2">
                            <div className="glass-card p-8">
                              <h3 className="text-2xl font-bold text-foreground mb-4">
                                {row.title}
                              </h3>
                              <p className="text-muted-foreground leading-relaxed text-lg">
                                {row.description}
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Text on left for odd rows */}
                          <div className="order-1 lg:order-1">
                            <div className="glass-card p-8">
                              <h3 className="text-2xl font-bold text-foreground mb-4">
                                {row.title}
                              </h3>
                              <p className="text-muted-foreground leading-relaxed text-lg">
                                {row.description}
                              </p>
                            </div>
                          </div>

                          {/* Image on right for odd rows */}
                          <div className="order-2 lg:order-2 transform-gpu">
                            <ImageStack
                              images={resolvedImages}
                              alt={`${currentData.title} - ${row.title}`}
                              className="w-full"
                            />
                          </div>
                        </>
                      )}
                    </motion.div>
                  );
                })}
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