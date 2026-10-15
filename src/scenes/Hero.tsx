import React, { useRef, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data';
import { director } from '../engine/director';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { hero } = PORTFOLIO_DATA;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', {
        y: 60,
        opacity: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2,
      });

      gsap.from('.hero-ghost-name', {
        x: 80,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[230vh]"
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center">
        
        {/* Layer z0: Giant Red Anton First Name behind character */}
        <div className="hero-ghost-name absolute right-[-2vw] top-1/2 -translate-y-1/2 font-display text-[26vw] lg:text-[18vw] font-black text-[#ff1f1f]/20 select-none pointer-events-none tracking-tighter leading-none z-0">
          SACHIN
        </div>

        {/* Layer z3: Foreground Editorial Content on Left */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl space-y-6">
            
            {/* Small Introduction */}
            <div className="hero-line font-mono text-xs sm:text-sm text-neutral-500 uppercase tracking-widest">
              {hero.intro}
            </div>

            {/* Primary Headline in Bold Anton */}
            <div className="hero-line space-y-0">
              <h1 className="text-6xl sm:text-8xl lg:text-9xl font-display font-black uppercase tracking-tight text-ink leading-[0.88]">
                {hero.headlineLine1}
              </h1>
              <h1 className="text-6xl sm:text-8xl lg:text-9xl font-display font-black uppercase tracking-tight text-ink leading-[0.88]">
                ENGINEER<span className="text-[#ff1f1f]">.</span>
              </h1>
            </div>

            {/* Supporting Copy with Growing Red Underline */}
            <div className="hero-line relative pt-2">
              <p className="text-base sm:text-lg text-neutral-600 font-sans leading-relaxed max-w-xl">
                {hero.supporting}
              </p>
              <div className="w-24 h-[2px] bg-[#ff1f1f] mt-4" />
            </div>

            {/* Buttons */}
            <div className="hero-line flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => director.scrollToScene('work')}
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-[#ff1f1f] text-white hover:bg-[#e01616] transition-all shadow-xl shadow-red-500/20 active:scale-95"
              >
                <span>{hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => director.scrollToScene('contact')}
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold border border-neutral-300 bg-white/80 hover:border-black transition-all active:scale-95"
              >
                <span>{hero.secondaryCta}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
