import { useState } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { JourneySection } from '@/components/JourneySection';
import { ContactPage } from '@/components/ContactPage';
import { Navigation } from '@/components/Navigation';

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
    <div className="min-h-screen bg-background">
      <Navigation currentSection={currentSection} onNavigate={navigateToSection} />
      
      {currentSection === 'landing' && (
        <LandingPage onStartJourney={startJourney} />
      )}
      
      {currentSection === 'journey' && (
        <JourneySection onBackToLanding={backToLanding} />
      )}
      
      {currentSection === 'contact' && (
        <ContactPage />
      )}
    </div>
  );
};

export default Index;
