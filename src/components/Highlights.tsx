import React, { useState, useEffect } from 'react';
import { CharacterVideo } from './CharacterVideo';
import { Cpu, Zap, Radio, Bot, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

const tracks = [
  {
    title: 'Embedded C & Bare-Metal',
    desc: 'Register-level peripheral control, memory-mapped I/O, interrupt service routines, and hardware timer configurations.',
    tag: 'FIRMWARE CORE',
    accent: '#FF1F1F',
  },
  {
    title: 'Hardware-Software Interfacing',
    desc: 'Acquiring real-time signals via ADC, I2C, SPI, and UART buses with sensor calibration curves and noise filtering.',
    tag: 'SIGNAL & BUS',
    accent: '#0A0A0A',
  },
  {
    title: 'Autonomous Robotics',
    desc: 'Differential drive kinematics, H-bridge PWM motor regulation, and non-blocking state machine navigation systems.',
    tag: 'ROBOTICS & PWM',
    accent: '#FF1F1F',
  },
  {
    title: 'IoT & Telemetry Clouds',
    desc: 'Wi-Fi streaming from ESP32 to cloud dashboards (ThingSpeak) with live telemetry logging and threshold alerts.',
    tag: 'CLOUD & SENSING',
    accent: '#0A0A0A',
  },
];

export const Highlights: React.FC = () => {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % tracks.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="tracks" className="relative py-28 overflow-hidden bg-white dark:bg-[#09090B] border-t border-neutral-100 dark:border-neutral-900">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tag matching reference */}
        <div className="font-mono text-xs text-neutral-500 tracking-wider mb-8">
          <span>[ 06 — CORE TRACKS & CREDIBILITY ]</span>
        </div>

        {/* 4 Red Metric Cards matching 00:12 of reference video */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="p-5 rounded-2xl bg-[#FF1F1F] text-white shadow-lg shadow-red-500/10 space-y-1">
            <div className="text-3xl sm:text-5xl font-display font-black">
              4
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-white/80">
              PROTOTYPES IN PROGRESS
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900 text-white dark:bg-neutral-800 shadow-sm space-y-1">
            <div className="text-3xl sm:text-5xl font-display font-black text-[#FF1F1F]">
              8+
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
              HARDWARE & MCU SKILLS
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FF1F1F] text-white shadow-lg shadow-red-500/10 space-y-1">
            <div className="text-3xl sm:text-5xl font-display font-black">
              100%
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-white/80">
              VERIFIED ARCHITECTURE
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900 text-white dark:bg-neutral-800 shadow-sm space-y-1">
            <div className="text-3xl sm:text-5xl font-display font-black text-[#FF1F1F]">
              2026
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
              B.E. ECE GRADUATION
            </div>
          </div>
        </div>

        {/* 3D Curved / Perspective Track Cards & Character Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: 3D Carousel Cards matching reference */}
          <div className="lg:col-span-8 perspective-container relative min-h-[380px] flex items-center justify-center">
            <div className="w-full max-w-xl preserve-3d relative flex items-center justify-center">
              {tracks.map((track, i) => {
                const offset = (i - activeCard + tracks.length) % tracks.length;
                let transformClass = '';
                let opacityClass = 'opacity-0 pointer-events-none';
                let zIndex = 0;

                if (offset === 0) {
                  // Active Center Card
                  transformClass = 'translate-z-0 scale-100 rotate-0';
                  opacityClass = 'opacity-100 z-30';
                  zIndex = 30;
                } else if (offset === 1) {
                  // Right Card
                  transformClass = 'translate-x-32 sm:translate-x-44 scale-90 rotate-y-[-25deg]';
                  opacityClass = 'opacity-70 z-20';
                  zIndex = 20;
                } else if (offset === tracks.length - 1) {
                  // Left Card
                  transformClass = '-translate-x-32 sm:-translate-x-44 scale-90 rotate-y-[25deg]';
                  opacityClass = 'opacity-70 z-20';
                  zIndex = 20;
                } else {
                  transformClass = 'scale-75 opacity-0';
                  opacityClass = 'opacity-0 z-0';
                  zIndex = 0;
                }

                const isRed = i % 2 === 0;

                return (
                  <div
                    key={track.title}
                    onClick={() => setActiveCard(i)}
                    className={`absolute w-72 sm:w-84 rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-700 ease-out shadow-2xl ${
                      isRed
                        ? 'bg-[#FF1F1F] text-white shadow-red-500/20'
                        : 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700'
                    } ${transformClass} ${opacityClass}`}
                    style={{ zIndex }}
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-white/20 dark:border-neutral-700">
                      <span className={`font-mono text-xs uppercase tracking-widest ${isRed ? 'text-white/80' : 'text-[#FF1F1F]'}`}>
                        {track.tag}
                      </span>
                      <span className="font-display font-black text-xl">0{i + 1}</span>
                    </div>

                    <div className="my-6 space-y-2">
                      <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase leading-tight">
                        {track.title}
                      </h3>
                      <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isRed ? 'text-white/90' : 'text-neutral-600 dark:text-neutral-400'}`}>
                        {track.desc}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs font-mono">
                      <span className={isRed ? 'text-white/70' : 'text-neutral-400'}>
                        SACHIN J · ARCHITECTURE
                      </span>
                      <span className="font-bold">→</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Character Standing */}
          <div className="lg:col-span-4 relative flex items-center justify-center">
            <div className="w-full max-w-sm aspect-[4/5] flex items-center justify-center">
              <CharacterVideo
                segment="journey"
                className="w-full h-full"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
