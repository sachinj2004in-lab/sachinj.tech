import React from 'react';
import { PORTFOLIO_DATA } from '../data';
import { TiltCard } from '../components/TiltCard';

export const About: React.FC = () => {
  const { about } = PORTFOLIO_DATA;

  return (
    <section id="about" className="relative w-full h-[280vh]">
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center">
        
        {/* Soft-Red Radial Wash in Background (z0) */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,31,31,0.06),transparent_60%)] z-0" />

        {/* Foreground Content on Right (z3) */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Spacer for Character Placement in Stage */}
            <div className="hidden lg:block lg:col-span-5" />

            {/* Right Column: Editorial Manifesto & Info Cards */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Section Label */}
              <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                {about.label}
              </div>

              {/* Headline / Manifesto */}
              <div className="space-y-1">
                <h2 className="text-4xl sm:text-6xl font-display font-black uppercase text-ink leading-[0.95] tracking-tight">
                  CURIOUS BY NATURE.
                </h2>
                <h2 className="text-4xl sm:text-6xl font-display font-black uppercase text-[#ff1f1f] leading-[0.95] tracking-tight">
                  BUILDING THROUGH EXPERIMENTATION.
                </h2>
              </div>

              {/* Supporting Paragraph with Red Keyword Accents */}
              <p className="text-base sm:text-xl font-sans font-light text-neutral-800 leading-relaxed">
                I'm an <strong className="font-bold text-[#ff1f1f]">Electronics and Communication Engineering</strong> student focused on learning how{' '}
                <strong className="font-bold text-ink">hardware and software work together</strong>. I explore{' '}
                <strong className="font-bold text-[#ff1f1f]">microcontrollers</strong>,{' '}
                <strong className="font-bold text-ink">sensors</strong>,{' '}
                <strong className="font-bold text-[#ff1f1f]">motor control</strong> and{' '}
                <strong className="font-bold text-ink">intelligent systems</strong> through projects that turn ideas into practical prototypes.
              </p>

              {/* 3 Compact Information Cards with TiltCard & Radial Glare */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-hairline">
                {about.cards.map((card) => (
                  <TiltCard
                    key={card.title}
                    className="p-5 rounded-2xl border border-hairline bg-white/80 backdrop-blur-sm shadow-sm space-y-2 hover:border-[#ff1f1f]/40 transition-colors"
                  >
                    <div className="font-mono text-[10px] text-[#ff1f1f] font-bold tracking-wider uppercase">
                      {card.tag}
                    </div>
                    <div className="text-2xl sm:text-3xl font-display font-black text-ink">
                      {card.title}
                    </div>
                    <p className="text-xs font-sans text-neutral-500">
                      {card.subtitle}
                    </p>
                  </TiltCard>
                ))}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
