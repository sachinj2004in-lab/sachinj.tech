import React, { useState, useEffect } from 'react';
import { ArrowUp, Clock, Globe, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const [istTime, setIstTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to IST (UTC+5:30)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      setIstTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white dark:bg-[#07080B] text-neutral-600 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800/80 font-mono text-xs py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-neutral-100 dark:border-neutral-900">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-neutral-900 dark:text-white font-bold text-sm tracking-wider">
                SACHIN J
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F1F]" />
              <span className="text-neutral-400 text-[11px]">PORTFOLIO_RELEASE // 2026</span>
            </div>
            <p className="text-xs text-neutral-500 font-sans">
              Aspiring Embedded Software Engineer · Coimbatore, Tamil Nadu, India
            </p>
          </div>

          {/* Telemetry Clock & Coordinates */}
          <div className="flex flex-wrap items-center gap-6 text-[11px]">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <Clock className="w-3.5 h-3.5 text-[#FF1F1F]" />
              <span>IST: {istTime || '15:30:00'} (UTC+5:30)</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <Globe className="w-3.5 h-3.5 text-neutral-400" />
              <span>11.0168° N, 76.9558° E</span>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-neutral-100 dark:bg-neutral-900 hover:bg-[#FF1F1F] hover:text-white text-neutral-700 dark:text-neutral-300 transition-colors border border-neutral-200 dark:border-neutral-800"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>AUTHENTIC DATA · PRODUCTION READY ARCHITECTURE</span>
          </div>

          <div>
            <span>STACK: VITE + REACT + TYPESCRIPT + GSAP + LENIS + TAILWIND CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
