import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Work' },
    { id: 'journey', label: 'Journey' },
    { id: 'skills', label: 'Skills' },
    { id: 'tracks', label: 'Tracks' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-white/90 dark:bg-[#09090B]/90 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.08] shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo matching reference: SACHIN* */}
        <button
          onClick={() => scrollTo('hero')}
          className="group flex items-center gap-2 focus:outline-none text-left"
          aria-label="Sachin J - Home"
        >
          <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white uppercase transition-colors group-hover:text-[#FF1F1F]">
            SACHIN<span className="text-[#FF1F1F] font-sans font-black ml-0.5">*</span>
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest pl-1 border-l border-neutral-300 dark:border-neutral-700">
            EMBEDDED DEV
          </span>
        </button>

        {/* Desktop Nav Links matching reference */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-3 bg-neutral-100/80 dark:bg-neutral-900/80 px-4 py-1.5 rounded-full border border-black/[0.05] dark:border-white/[0.08] backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-3 py-1 rounded-full text-xs font-sans transition-all duration-200 ${
                  isActive
                    ? 'bg-[#FF1F1F] text-white font-semibold shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-white/60 dark:hover:bg-neutral-800/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle & Red CTA Pill */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:text-[#FF1F1F] transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold bg-[#FF1F1F] text-white hover:bg-[#E01616] transition-all shadow-md shadow-red-500/10 active:scale-95"
          >
            <span>Contact Me</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Buttons */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-4 p-5 rounded-2xl bg-white/95 dark:bg-[#09090B]/95 border border-neutral-200 dark:border-neutral-800 shadow-2xl backdrop-blur-xl space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`py-2 px-3 rounded-lg text-left text-sm font-sans flex items-center justify-between ${
                  activeSection === link.id
                    ? 'bg-[#FF1F1F] text-white font-bold'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-xs opacity-60">→</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <button
              onClick={() => scrollTo('contact')}
              className="w-full py-2.5 rounded-full text-xs font-bold bg-[#FF1F1F] text-white flex items-center justify-center gap-1.5"
            >
              <span>Contact Sachin J</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
