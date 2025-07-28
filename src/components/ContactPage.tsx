import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, User } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.png';

export const ContactPage = () => {
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

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-auto px-6"
      >
        {/* Glassmorphic panel */}
        <div className="glass-card p-8 text-center">
          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <div className="w-48 h-48 mx-auto rounded-3xl overflow-hidden glass border border-white/10">
              <img
                src={profilePhoto}
                alt="Muhammed Rayan Savad"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            {contactInfo.map((item, index) => {
              const IconComponent = item.icon;
              
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-lg glass border border-white/5 hover:border-white/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <IconComponent size={18} className="text-muted-foreground" />
                    <span className="font-semibold text-foreground">
                      {item.label}
                    </span>
                  </div>
                  
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-white transition-all duration-300 hover:glow-white-subtle text-sm sm:text-base text-center sm:text-right"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-muted-foreground text-sm sm:text-base text-center sm:text-right">
                      {item.value}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};