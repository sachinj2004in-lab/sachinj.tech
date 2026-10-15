import React from 'react';
import { PORTFOLIO_DATA } from '../data';
import { GraduationCap, MapPin, Calendar, BookOpen } from 'lucide-react';
import { TiltCard } from '../components/TiltCard';

export const Journey: React.FC = () => {
  const { journey } = PORTFOLIO_DATA;

  return (
    <section id="journey" className="relative w-full h-[240vh]">
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center">
        
        {/* Layer z0: Giant Outlined Year behind character on Left */}
        <div className="absolute left-[-2vw] top-1/2 -translate-y-1/2 font-display text-[26vw] lg:text-[18vw] font-black text-[#ff1f1f]/15 select-none pointer-events-none tracking-tighter leading-none z-0">
          2026
        </div>

        {/* Layer z3: Content on Right */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Spacer for Character Placement in Stage (charX: 26%) */}
            <div className="hidden lg:block lg:col-span-5" />

            {/* Right Column: Editorial Journey */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                {journey.label}
              </div>

              <div className="space-y-0">
                <h2 className="text-5xl sm:text-7xl font-display font-black uppercase text-ink leading-[0.9] tracking-tight">
                  {journey.headlineLine1}
                </h2>
                <h2 className="text-5xl sm:text-7xl font-display font-black uppercase text-[#ff1f1f] leading-[0.9] tracking-tight">
                  {journey.headlineLine2}
                </h2>
              </div>

              {/* Verified Timeline Node with Red Drawing SVG Track */}
              <div className="relative pl-8 border-l-2 border-[#ff1f1f]/30 space-y-6">
                
                {/* Active Red Indicator Pin */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-[#ff1f1f] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff1f1f]" />
                </div>

                <TiltCard className="p-8 rounded-3xl border border-hairline bg-white/90 backdrop-blur-md shadow-xl space-y-4 hover:border-[#ff1f1f]/40 transition-colors">
                  
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-hairline">
                    <div className="flex items-center gap-2 font-mono text-xs text-neutral-500 uppercase tracking-wider">
                      <GraduationCap className="w-4 h-4 text-[#ff1f1f]" />
                      <span className="font-bold text-ink">FORMAL UNDERGRADUATE DEGREE</span>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-muted text-[#ff1f1f] font-mono text-xs font-bold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{journey.batch}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-2xl sm:text-3xl font-display font-black text-ink">
                      {journey.college}
                    </h3>
                    <div className="text-base sm:text-lg font-sans font-medium text-[#ff1f1f]">
                      {journey.degree}
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-xs text-neutral-400 pt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{journey.location}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-hairline font-mono text-xs text-neutral-600 space-y-1">
                    <div className="text-neutral-400 uppercase tracking-widest text-[10px]">
                      CORE ACADEMIC DISCIPLINES
                    </div>
                    <p className="font-sans leading-relaxed text-neutral-600">
                      {journey.focus}
                    </p>
                  </div>

                </TiltCard>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
