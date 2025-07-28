import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, BookOpen } from 'lucide-react';

interface NavigationProps {
  currentSection: 'landing' | 'journey' | 'contact';
  onNavigate: (section: 'landing' | 'journey' | 'contact') => void;
}

export const Navigation = ({ currentSection, onNavigate }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'journey', label: 'Journey', icon: BookOpen },
    { id: 'contact', label: 'Contact', icon: User },
  ] as const;

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleNavigate = (section: 'landing' | 'journey' | 'contact') => {
    onNavigate(section);
    closeMenu();
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="glass rounded-pill px-6 py-3">
          <div className="flex items-center space-x-6">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = currentSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/20 text-white glow-white-subtle' 
                      : 'text-muted-foreground hover:text-white hover:bg-white/10'
                  }`}
                >
                  <IconComponent size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-6 right-6 z-50">
        <button
          onClick={toggleMenu}
          className="glass rounded-full p-3 hover:glow-white-subtle transition-all duration-300"
        >
          {isOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <Menu size={24} className="text-muted-foreground" />
          )}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 right-0 glass rounded-lg overflow-hidden border border-white/10"
            >
              <div className="p-2">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = currentSection === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : 'text-muted-foreground hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <IconComponent size={20} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            className="md:hidden fixed inset-0 bg-black/20 z-40"
          />
        )}
      </AnimatePresence>
    </>
  );
};