import React from 'react';
import { PORTFOLIO_DATA } from '../data';
import { useMouseParallax } from '../engine/hooks';

export const Skills: React.FC = () => {
  const { skills } = PORTFOLIO_DATA;
  const parallax = useMouseParallax(16);

  // 8 skill chips configured in 3D orbit around the character
  const orbitCoordinates = [
    { x: -280, y: -160, z: 40 },  // ESP32 (top left)
    { x: 280, y: -150, z: 30 },   // Arduino (top right)
    { x: -340, y: 0, z: -20 },    // Microcontrollers (mid left, behind)
    { x: 340, y: 10, z: -10 },    // Sensor Interfacing (mid right, behind)
    { x: -260, y: 160, z: 60 },   // Motor Control (lower left, in front)
    { x: 260, y: 170, z: 50 },    // C (lower right, in front)
    { x: 0, y: -240, z: -40 },    // Python (top center, behind)
    { x: 0, y: 240, z: 80 },      // Embedded C — Learning (lower center, front)
  ];

  return (
    <section id="skills" className="relative w-full h-[280vh]">
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between py-12">
        
        {/* Header */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center space-y-2">
          <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
            {skills.label}
          </div>

          <h2 className="text-5xl sm:text-7xl font-display font-black uppercase text-ink leading-none tracking-tight">
            {skills.headlineLine1}{' '}
            <span className="text-[#ff1f1f]">{skills.headlineLine2}</span>
          </h2>
        </div>

        {/* 3D Orbit Stage around Center Character */}
        <div className="relative w-full max-w-5xl mx-auto my-auto h-[480px] perspective-1000 flex items-center justify-center">
          
          {/* Subtle Concentric Orbital Guide Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[420px] sm:w-[620px] h-[420px] sm:h-[620px] rounded-full border border-neutral-200 border-dashed animate-[spin_80s_linear_infinite]" />
            <div className="absolute w-[280px] sm:w-[420px] h-[280px] sm:h-[420px] rounded-full border border-red-500/15" />
          </div>

          {/* 3D Orbiting Chips */}
          {skills.items.map((item, idx) => {
            const coord = orbitCoordinates[idx] || { x: 0, y: 0, z: 0 };
            const isForeground = coord.z >= 0;
            const dynamicX = coord.x + parallax.x * 0.8;
            const dynamicY = coord.y + parallax.y * 0.8;

            return (
              <div
                key={item.id}
                style={{
                  transform: `translate3d(${dynamicX}px, ${dynamicY}px, ${coord.z}px)`,
                  zIndex: isForeground ? 25 : 5, // z2 foreground, z0 background
                  transition: 'transform 0.2s ease-out',
                }}
                className="absolute flex items-center gap-2 px-4 py-2 rounded-full shadow-lg backdrop-blur-md border border-hairline transition-all hover:scale-110"
              >
                <div
                  className={`flex items-center gap-2 ${
                    item.isLearning
                      ? 'bg-[#ff1f1f] text-white px-3 py-1.5 rounded-full shadow-lg shadow-red-500/30'
                      : 'bg-white/95 text-ink'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.isLearning ? 'bg-white animate-ping' : 'bg-[#ff1f1f]'
                    }`}
                  />
                  <span className="font-display text-base font-black uppercase tracking-tight">
                    {item.name}
                  </span>
                  {item.badge && !item.isLearning && (
                    <span className="hidden sm:inline font-mono text-[10px] text-neutral-400">
                      // {item.badge}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

        </div>

        {/* Continuous Animated Red Marquee Strip near bottom */}
        <div className="relative z-30 w-full overflow-hidden border-y border-[#ff1f1f]/20 bg-[#ff1f1f] text-white py-2.5">
          <div className="animate-marquee-infinite whitespace-nowrap flex items-center gap-8 font-display text-xl sm:text-2xl font-black uppercase tracking-wider">
            {[...skills.marquee, ...skills.marquee].map((item, i) => (
              <span key={i} className="flex items-center gap-8">
                <span>+</span>
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
