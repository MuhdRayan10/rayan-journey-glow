import { useState } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { JourneySection } from '@/components/JourneySection';

const Index = () => {
  const [currentSection, setCurrentSection] = useState<'landing' | 'journey'>('landing');

  const startJourney = () => {
    setCurrentSection('journey');
  };

  const backToLanding = () => {
    setCurrentSection('landing');
  };

  return (
    <div className="min-h-screen bg-background">
      {currentSection === 'landing' ? (
        <LandingPage onStartJourney={startJourney} />
      ) : (
        <JourneySection onBackToLanding={backToLanding} />
      )}
    </div>
  );
};

export default Index;
