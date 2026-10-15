import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data';
import { TiltCard } from '../components/TiltCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const Awards: React.FC = () => {
  const { highlights } = PORTFOLIO_DATA;
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % highlights.tracks.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + highlights.tracks.length) % highlights.tracks.length);
  };

  return (
    <section id="highlights" className="relative w-full h-[320vh]">
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center">
        
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-hairline">
            <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
              {highlights.label}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full border border-neutral-300 hover:border-black transition-colors"
                aria-label="Previous Track"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full border border-neutral-300 hover:border-black transition-colors"
                aria-label="Next Track"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Rotating Cylindrical Track Cards (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-1">
                <h2 className="text-5xl sm:text-7xl font-display font-black uppercase text-ink leading-none tracking-tight">
                  CORE EXPLORATION <span className="text-[#ff1f1f]">DOMAINS.</span>
                </h2>
                <p className="text-sm font-sans text-neutral-500 max-w-md pt-2">
                  Key technical disciplines verified through hands-on firmware development and physical circuit prototyping.
                </p>
              </div>

              {/* Stacked Interactive Cylindrical Perspective Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {highlights.tracks.map((track, i) => {
                  const isActive = i === activeIdx;
                  return (
                    <TiltCard
                      key={track.number}
                      className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-[#ff1f1f] text-white border-red-600 shadow-2xl shadow-red-500/30 scale-[1.02]'
                          : 'bg-white text-ink border-hairline hover:border-neutral-400 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 font-mono text-xs">
                        <span className={isActive ? 'text-white/80' : 'text-[#ff1f1f]'}>
                          {track.tag}
                        </span>
                        <span className="font-display font-black text-lg">
                          {track.number}
                        </span>
                      </div>

                      <div className="my-4 space-y-2">
                        <h3 className="font-display text-2xl font-black uppercase tracking-tight leading-tight">
                          {track.title}
                        </h3>
                        <p className={`text-xs font-sans leading-relaxed ${isActive ? 'text-white/90' : 'text-neutral-500'}`}>
                          {track.description}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center justify-between font-mono text-[10px]">
                        <span className={isActive ? 'text-white/70' : 'text-neutral-400'}>
                          VERIFIED TECHNICAL DOMAIN
                        </span>
                        <span>→</span>
                      </div>
                    </TiltCard>
                  );
                })}
              </div>

            </div>

            {/* Right Spacer for Character Placement in Stage (charX: 72%) */}
            <div className="hidden lg:block lg:col-span-5" />

          </div>

        </div>

      </div>
    </section>
  );
};
