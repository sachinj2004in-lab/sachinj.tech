import React, { useRef, useEffect } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { CharacterVideo } from './CharacterVideo';
import gsap from 'gsap';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-anim-text', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
      });

      gsap.from('.hero-character', {
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.2,
      });

      gsap.from('.hero-ghost-text', {
        x: 60,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[92vh] flex items-center pt-24 pb-12 overflow-hidden bg-white dark:bg-[#09090B]"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Typography matching reference */}
          <div className="lg:col-span-7 space-y-6 z-10">
            {/* Top Micro-Tag */}
            <div className="hero-anim-text inline-flex items-center gap-2 font-mono text-xs text-neutral-500 tracking-wider">
              <span>[ 01 — EMBEDDED SOFTWARE DEVELOPER ]</span>
            </div>

            {/* Giant Condensed Headline */}
            <div className="hero-anim-text space-y-0">
              <h1 className="text-6xl sm:text-8xl lg:text-9xl font-display font-extrabold uppercase tracking-tight text-neutral-950 dark:text-white leading-[0.88]">
                EMBEDDED
              </h1>
              <h1 className="text-6xl sm:text-8xl lg:text-9xl font-display font-extrabold uppercase tracking-tight text-neutral-950 dark:text-white leading-[0.88] flex items-baseline">
                DEVELOPER<span className="text-[#FF1F1F]">.</span>
              </h1>
            </div>

            {/* Editorial Description Paragraph */}
            <p className="hero-anim-text text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans max-w-xl leading-relaxed">
              I build deterministic firmware and intelligent hardware systems with C, Python, and modern microcontrollers. From autonomous road-cleaning robots to real-time IoT air monitoring, I turn complex circuit schematics into reliable, scalable embedded solutions.
            </p>

            {/* Two Pill Action Buttons */}
            <div className="hero-anim-text flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollTo('projects')}
                className="group inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-semibold bg-[#FF1F1F] text-white hover:bg-[#E01616] transition-all shadow-lg shadow-red-500/20 active:scale-95"
              >
                <span>See my work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="group inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-semibold border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white hover:border-black dark:hover:border-white transition-all active:scale-95"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* Verified Meta Chips */}
            <div className="hero-anim-text pt-6 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-wrap gap-4 font-mono text-[11px] text-neutral-500">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F1F]" />
                KCT COIMBATORE
              </span>
              <span>·</span>
              <span>B.E. ECE (2022–2026)</span>
              <span>·</span>
              <span className="text-neutral-700 dark:text-neutral-300 font-medium">ESP32 & C SYSTEMS</span>
            </div>
          </div>

          {/* Right Column: Character seamlessly integrated with giant red SACHIN background */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[460px] sm:min-h-[580px]">
            {/* Giant Red Ghost Text matching reference: SACHIN */}
            <div className="hero-ghost-text absolute right-0 top-1/2 -translate-y-1/2 font-display text-[22vw] lg:text-[14vw] font-black text-[#FF1F1F]/20 dark:text-[#FF1F1F]/25 select-none pointer-events-none tracking-tighter leading-none z-0">
              SACHIN
            </div>

            {/* Seamless Character Video Component */}
            <div className="hero-character relative z-10 w-full max-w-sm sm:max-w-md aspect-[4/5] flex items-center justify-center">
              <CharacterVideo
                segment="hero"
                className="w-full h-full"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
