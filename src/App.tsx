import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { useLenisSmoothScroll } from './hooks/useLenisSmoothScroll';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CharacterShowcase } from './components/CharacterShowcase';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Timeline } from './components/Timeline';
import { Skills } from './components/Skills';
import { Highlights } from './components/Highlights';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

const MainLayout: React.FC = () => {
  useLenisSmoothScroll();
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'journey', 'skills', 'highlights', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-[#08090C] dark:text-neutral-100 transition-colors duration-300">
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <CharacterShowcase />
        <About />
        <Projects />
        <Timeline />
        <Skills />
        <Highlights />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
};

export default App;
