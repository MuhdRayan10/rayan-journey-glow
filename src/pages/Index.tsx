import { useState, useEffect, useRef } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { JourneySection } from '@/components/JourneySection';
import { ContactPage } from '@/components/ContactPage';
import { CustomCursor } from '@/components/CustomCursor';

const Index = () => {
  const [currentSection, setCurrentSection] = useState<'landing' | 'journey' | 'contact'>('landing');
  const journeyRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const navigateToSection = (section: 'landing' | 'journey' | 'contact') => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(section);
    }
  };

  const startJourney = () => {
    navigateToSection('journey');
  };

  const backToLanding = () => {
    navigateToSection('landing');
  };

  // Handle scroll to update current section and animate sections
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-10% 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target.id as 'landing' | 'journey' | 'contact';
          setCurrentSection(section);
          
          // Add visible class for animations
          entry.target.classList.add('section-visible');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="bg-background cursor-none">
      <CustomCursor />
      
      {/* Landing Section */}
      <section id="landing" className="min-h-screen section-animate">
        <LandingPage 
          onStartJourney={startJourney} 
          onNavigate={navigateToSection} 
          currentSection={currentSection}
        />
      </section>
      
      {/* Journey Section */}
      <section id="journey" className="min-h-screen section-animate" ref={journeyRef}>
        <JourneySection onBackToLanding={backToLanding} />
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="min-h-screen section-animate" ref={contactRef}>
        <ContactPage onNavigate={navigateToSection} />
      </section>
    </div>
  );
};

export default Index;
