import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, ArrowUpRight, Cpu } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: '01 // HOME' },
    { id: 'about', label: '02 // ABOUT' },
    { id: 'projects', label: '03 // PROJECTS' },
    { id: 'journey', label: '04 // JOURNEY' },
    { id: 'skills', label: '05 // SKILLS' },
    { id: 'contact', label: '06 // CONTACT' },
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
          ? 'py-3.5 bg-white/85 dark:bg-[#08090C]/85 backdrop-blur-md border-b border-black/[0.08] dark:border-white/[0.08] shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => scrollTo('hero')}
          className="group flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF1F1F]"
          aria-label="Sachin J - Home"
        >
          <div className="w-8 h-8 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center transition-transform group-hover:scale-105 group-hover:border-[#FF1F1F]">
            <Cpu className="w-4 h-4 text-[#FF1F1F]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs tracking-wider font-bold text-neutral-900 dark:text-neutral-100 uppercase">
                SACHIN J
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF1F1F] animate-pulse" />
            </div>
            <span className="block font-mono text-[10px] text-neutral-500 dark:text-neutral-400 tracking-wider">
              EMBEDDED // DEV
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-3 bg-neutral-100/70 dark:bg-neutral-900/70 p-1.5 rounded-full border border-black/[0.06] dark:border-white/[0.06] backdrop-blur-sm">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-1.5 rounded-full font-mono text-xs transition-all duration-200 ${
                  isActive
                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950 shadow-sm font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls: Status, Theme Toggle, Contact CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded border border-neutral-200 dark:border-neutral-800 text-[10px] font-mono text-neutral-600 dark:text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>OPEN FOR ROLES</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:text-[#FF1F1F] dark:hover:text-[#FF1F1F] hover:border-[#FF1F1F] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF1F1F]"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Direct CTA */}
          <button
            onClick={() => scrollTo('contact')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded font-mono text-xs font-semibold bg-[#FF1F1F] text-white hover:bg-[#E01616] transition-all shadow-sm"
          >
            <span>GET IN TOUCH</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu & Theme Buttons */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
            aria-label="Toggle Mobile Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-[#0B0D12]/95 backdrop-blur-xl px-5 py-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <span className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase">
              NAVIGATION
            </span>
            <span className="font-mono text-[10px] text-[#FF1F1F] font-bold">
              COIMBATORE // ECE
            </span>
          </div>

          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`py-2.5 px-3 rounded text-left font-mono text-sm transition-colors flex items-center justify-between ${
                  activeSection === item.id
                    ? 'bg-neutral-100 dark:bg-neutral-900 text-[#FF1F1F] font-bold'
                    : 'text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs text-neutral-400">→</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
            <button
              onClick={() => scrollTo('contact')}
              className="w-full py-2.5 rounded font-mono text-xs font-bold bg-[#FF1F1F] text-white flex items-center justify-center gap-2"
            >
              <span>CONTACT SACHIN J</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
