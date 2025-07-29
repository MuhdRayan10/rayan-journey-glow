import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, User } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.png';

interface ContactPageProps {
  onNavigate: (section: 'landing' | 'journey' | 'contact') => void;
}

export const ContactPage = ({ onNavigate }: ContactPageProps) => {
  const contactInfo = [
    {
      label: 'Name',
      value: 'Muhammed Rayan Savad',
      icon: User,
    },
    {
      label: 'Phone',
      value: '+974 70030840',
      icon: Phone,
    },
    {
      label: 'Email',
      value: 'muhammedrayansavad1',
      icon: Mail,
      link: 'mailto:muhammedrayansavad1@gmail.com',
    },
    {
      label: 'GitHub',
      value: 'MuhdRayan10',
      icon: Github,
      link: 'https://github.com/MuhdRayan10',
    },
    {
      label: 'LinkedIn',
      value: 'muhammed-rayan-savad',
      icon: Linkedin,
      link: 'https://www.linkedin.com/in/muhammed-rayan-savad-004310127/',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-6 right-6 z-50">
        <div className="glass rounded-pill px-6 py-3">
          <div className="flex gap-6 text-sm font-medium">
            <button onClick={() => onNavigate('landing')} className="text-muted-foreground hover:text-white transition-colors">Home</button>
            <button onClick={() => onNavigate('journey')} className="text-muted-foreground hover:text-white transition-colors">Journey</button>
            <button className="text-muted-foreground hover:text-white transition-colors">Projects</button>
            <button onClick={() => onNavigate('contact')} className="text-foreground hover:text-white transition-colors">Contact</button>
          </div>
        </div>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl mx-auto px-6"
      >
        {/* Redesigned Contact Card */}
        <div className="glass-card p-8">
          {/* Top Row - Profile Image + Name & Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-center gap-8 mb-8"
          >
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 mx-auto md:mx-0 rounded-2xl overflow-hidden glass border border-white/10">
                <img
                  src={profilePhoto}
                  alt="Muhammed Rayan Savad"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Name & Title */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Muhammed Rayan Savad
              </h1>
              <p className="text-xl text-muted-foreground font-medium">
                Tech Enthusiast & Software Developer
              </p>
            </div>
          </motion.div>

          {/* Contact Info Blocks */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Phone & Email Block */}
            <div className="glass border border-white/5 rounded-lg p-6 hover:border-white/10 transition-all duration-300">
              <h3 className="text-lg font-semibold text-foreground mb-4">Contact Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-muted-foreground" />
                  <span className="text-muted-foreground">{contactInfo.find(item => item.label === 'Phone')?.value}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-muted-foreground" />
                  <a
                    href={contactInfo.find(item => item.label === 'Email')?.link}
                    className="text-muted-foreground hover:text-white transition-colors"
                  >
                    {contactInfo.find(item => item.label === 'Email')?.value}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links Block */}
            <div className="glass border border-white/5 rounded-lg p-6 hover:border-white/10 transition-all duration-300">
              <h3 className="text-lg font-semibold text-foreground mb-4">Social Profiles</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Github size={18} className="text-muted-foreground" />
                  <a
                    href={contactInfo.find(item => item.label === 'GitHub')?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-white transition-colors"
                  >
                    {contactInfo.find(item => item.label === 'GitHub')?.value}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin size={18} className="text-muted-foreground" />
                  <a
                    href={contactInfo.find(item => item.label === 'LinkedIn')?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-white transition-colors"
                  >
                    muhammed-rayan-savad
                  </a>
                </div>
              </div>
            </div>

            {/* Additional Info Block */}
            <div className="glass border border-white/5 rounded-lg p-6 hover:border-white/10 transition-all duration-300 md:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-semibold text-foreground mb-4">Let's Connect</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Feel free to reach out for collaboration opportunities, tech discussions, or just to say hello!
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};