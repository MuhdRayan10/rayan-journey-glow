import { useState } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { JourneySection } from '@/components/JourneySection';
import { ContactPage } from '@/components/ContactPage';
import { CustomCursor } from '@/components/CustomCursor';

const Index = () => {
  const [currentSection, setCurrentSection] = useState<'landing' | 'journey' | 'contact'>('landing');

  const navigateToSection = (section: 'landing' | 'journey' | 'contact') => {
    setCurrentSection(section);
  };

  const startJourney = () => {
    setCurrentSection('journey');
  };

  const backToLanding = () => {
    setCurrentSection('landing');
  };

  return (
    <div className="min-h-screen bg-background cursor-none">
      <CustomCursor />
      
      {currentSection === 'landing' && (
        <LandingPage onStartJourney={startJourney} onNavigate={navigateToSection} />
      )}
      
      {currentSection === 'journey' && (
        <JourneySection onBackToLanding={backToLanding} />
      )}
      
      {currentSection === 'contact' && (
        <ContactPage onNavigate={navigateToSection} />
      )}
    </div>
  );
};

export default Index;
