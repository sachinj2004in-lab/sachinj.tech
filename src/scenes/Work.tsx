import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA, ProjectItem } from '../data';
import { useScrollState } from '../engine/hooks';
import { TiltCard } from '../components/TiltCard';
import { ArrowUpRight, Bot, Mic, Radio, Wind } from 'lucide-react';

export const Work: React.FC = () => {
  const { work, profile } = PORTFOLIO_DATA;
  const scrollState = useScrollState();

  // Compute active project index (0-3) based on section progress
  const activeIndex = Math.min(
    work.projects.length - 1,
    Math.floor(scrollState.sceneProgress * work.projects.length)
  );

  const currentProject: ProjectItem = work.projects[activeIndex] || work.projects[0];

  return (
    <section id="work" className="relative w-full h-[460vh]">
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center">
        
        {/* Subtle Red Perspective Grid Floor (z0) */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none opacity-20 z-0"
          style={{
            backgroundImage: `linear-gradient(to right, #ff1f1f 1px, transparent 1px), linear-gradient(to bottom, #ff1f1f 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'bottom center',
          }}
        />

        {/* Foreground Content on Left (z3) */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-hairline">
            <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
              {work.label}
            </div>

            <div className="font-display text-3xl font-black text-ink">
              {currentProject.number}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[480px]">
            
            {/* Left Column: Project Editorial & Tags (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-muted text-[#ff1f1f] font-mono text-[11px] font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff1f1f] animate-pulse" />
                <span>{currentProject.status}</span>
              </div>

              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-ink uppercase leading-[0.92] tracking-tight">
                {currentProject.title}
              </h3>

              <p className="text-sm sm:text-base text-neutral-600 font-sans leading-relaxed max-w-lg">
                {currentProject.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {currentProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1 rounded-full text-xs font-mono bg-neutral-100 text-neutral-700 border border-neutral-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-semibold bg-[#ff1f1f] text-white hover:bg-[#e01616] transition-all shadow-lg shadow-red-500/20 active:scale-95"
                >
                  <span>Explore on GitHub</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

            </div>

            {/* Center Column: Signature Red Technical Visualization Card (3 cols) */}
            <div className="lg:col-span-3 flex justify-center">
              <TiltCard className="w-full max-w-xs rounded-3xl bg-[#ff1f1f] text-white p-7 shadow-2xl shadow-red-500/30 flex flex-col justify-between aspect-[3/4]">
                
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-white/80">
                  <span>{currentProject.schematicType.toUpperCase()} // SYS</span>
                  <span className="w-2 h-2 rounded-full bg-white" />
                </div>

                <div className="my-auto text-center space-y-3">
                  {currentProject.schematicType === 'robot' && (
                    <div className="space-y-2">
                      <div className="w-20 h-20 mx-auto rounded-full border-4 border-white flex items-center justify-center font-display font-black text-3xl">
                        <Bot className="w-9 h-9" />
                      </div>
                      <div className="font-mono text-xs uppercase tracking-wider">
                        CHASSIS SWEEP LOGIC
                      </div>
                      <div className="text-[10px] font-mono text-white/70">
                        NON-BLOCKING STATE MACHINE
                      </div>
                    </div>
                  )}

                  {currentProject.schematicType === 'jarvis' && (
                    <div className="space-y-2">
                      <div className="flex justify-center items-center gap-1.5 h-16">
                        {[40, 75, 95, 65, 85, 50, 90, 35].map((h, i) => (
                          <div
                            key={i}
                            style={{ height: `${h}%` }}
                            className="w-2 bg-white rounded-full animate-pulse"
                          />
                        ))}
                      </div>
                      <div className="font-mono text-xs uppercase tracking-wider">
                        VOICE RECOGNITION
                      </div>
                      <div className="text-[10px] font-mono text-white/70">
                        PYTHON UART TELEMETRY
                      </div>
                    </div>
                  )}

                  {currentProject.schematicType === 'drone' && (
                    <div className="space-y-2">
                      <div className="w-20 h-20 mx-auto rounded-2xl border-2 border-dashed border-white/80 flex items-center justify-center font-display font-black text-2xl">
                        <Radio className="w-9 h-9" />
                      </div>
                      <div className="font-mono text-xs uppercase tracking-wider">
                        AERIAL TELEMETRY
                      </div>
                      <div className="text-[10px] font-mono text-white/70">
                        IMU 6-AXIS VECTOR PROCESSING
                      </div>
                    </div>
                  )}

                  {currentProject.schematicType === 'iot' && (
                    <div className="space-y-2">
                      <div className="w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center font-display font-black text-3xl">
                        <Wind className="w-9 h-9" />
                      </div>
                      <div className="font-mono text-xs uppercase tracking-wider">
                        ATMOSPHERIC MQ-135
                      </div>
                      <div className="text-[10px] font-mono text-white/70">
                        THINGSPEAK CLOUD FEED
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/20 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-white/80">IN PROGRESS</span>
                  <span className="font-bold">VERIFIED BUILDS</span>
                </div>

              </TiltCard>
            </div>

            {/* Right Spacer for Character Placement (charX: 74%) */}
            <div className="hidden lg:block lg:col-span-4" />

          </div>

          {/* Bottom Pagination Dots */}
          <div className="flex justify-center items-center gap-3 pt-8">
            {work.projects.map((p, idx) => (
              <div
                key={p.id}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? 'w-8 bg-[#ff1f1f]' : 'w-2 bg-neutral-300'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
