import { useState } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { JourneySection } from '@/components/JourneySection';
import { ContactPage } from '@/components/ContactPage';

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
      {currentSection === 'landing' && (
        <LandingPage onStartJourney={startJourney} onNavigate={navigateToSection} />
      )}
      
      {currentSection === 'journey' && (
        <JourneySection onBackToLanding={backToLanding} onNavigate={navigateToSection} />
      )}
      
      {currentSection === 'contact' && (
        <ContactPage onNavigate={navigateToSection} />
      )}
    </div>
  );
};

export default Index;
