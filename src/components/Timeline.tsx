import React from 'react';
import { CharacterVideo } from './CharacterVideo';
import { Calendar, GraduationCap, Cpu, Bot } from 'lucide-react';

export const Timeline: React.FC = () => {
  return (
    <section id="journey" className="relative py-28 overflow-hidden bg-white dark:bg-[#09090B] border-t border-neutral-100 dark:border-neutral-900">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tag matching reference */}
        <div className="font-mono text-xs text-neutral-500 tracking-wider mb-8">
          <span>[ 04 — JOURNEY ]</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Sachin standing + Giant Background Year 2026 */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[460px]">
            {/* Giant Faint Red Year matching reference: 2026 */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 font-display text-[26vw] lg:text-[18vw] font-black text-[#FF1F1F]/15 dark:text-[#FF1F1F]/20 select-none pointer-events-none tracking-tighter leading-none z-0">
              2026
            </div>

            {/* Seamless Character Video */}
            <div className="relative z-10 w-full max-w-sm aspect-[4/5] flex items-center justify-center">
              <CharacterVideo
                segment="journey"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Right Column: LEARNING OUT LOUD. + Stacked Timeline Cards */}
          <div className="lg:col-span-7 space-y-8 z-10">
            <div>
              <h2 className="text-5xl sm:text-7xl font-display font-extrabold uppercase tracking-tight text-neutral-950 dark:text-white leading-[0.9]">
                LEARNING <br />
                <span className="text-[#FF1F1F]">OUT LOUD.</span>
              </h2>
            </div>

            {/* Stacked Timeline Cards matching reference */}
            <div className="space-y-4">
              
              {/* Card 1: KCT Degree */}
              <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 space-y-2 transition-all hover:border-[#FF1F1F]/50">
                <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#FF1F1F]" />
                    <span className="font-bold text-neutral-900 dark:text-white">UNDERGRADUATE STUDIES</span>
                  </div>
                  <span className="text-[#FF1F1F] font-bold">2022 — 2026</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-neutral-950 dark:text-white">
                  Kumaraguru College of Technology
                </h3>
                <div className="text-sm font-sans font-medium text-neutral-700 dark:text-neutral-300">
                  Bachelor of Engineering (B.E.) in Electronics and Communication Engineering
                </div>
                <div className="text-xs font-mono text-neutral-500">
                  Coimbatore, Tamil Nadu, India
                </div>
              </div>

              {/* Card 2: Microcontroller & Hardware Focus */}
              <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 space-y-2 transition-all hover:border-[#FF1F1F]/50">
                <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#FF1F1F]" />
                    <span className="font-bold text-neutral-900 dark:text-white">FIRMWARE & HARDWARE INTERFACING</span>
                  </div>
                  <span>ACTIVE DOMAIN</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-neutral-950 dark:text-white">
                  ESP32 & Embedded C Systems
                </h3>
                <p className="text-xs sm:text-sm font-sans text-neutral-600 dark:text-neutral-400">
                  Architecting real-time interrupt routines, ADC sensor acquisition curves, PWM motor controllers, and wireless IoT cloud streams.
                </p>
              </div>

              {/* Card 3: Autonomous Robotics */}
              <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 space-y-2 transition-all hover:border-[#FF1F1F]/50">
                <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-[#FF1F1F]" />
                    <span className="font-bold text-neutral-900 dark:text-white">PROTOTYPES IN DEVELOPMENT</span>
                  </div>
                  <span>4 ONGOING</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-neutral-950 dark:text-white">
                  Robotics & Intelligent Automation
                </h3>
                <p className="text-xs sm:text-sm font-sans text-neutral-600 dark:text-neutral-400">
                  Engineering the Autonomous Road-Cleaning Robot, J.A.R.V.I.S Assistant, Drone Telemetry System, and IoT Air Monitor.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
