import React from 'react';
import { GraduationCap, MapPin, Calendar, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export const Timeline: React.FC = () => {
  return (
    <section id="journey" className="relative py-28 overflow-hidden">
      {/* Background Subtle Tech Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-15 tech-grid-light dark:tech-grid-dark" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#FF1F1F] mb-2 font-bold tracking-wider">
              <span>// 04. ACADEMIC TRAJECTORY</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-neutral-950 dark:text-white">
              JOURNEY & <span className="text-[#FF1F1F]">EDUCATION</span>
            </h2>
            <p className="text-sm font-sans text-neutral-600 dark:text-neutral-400 max-w-xl mt-3">
              Rigorous academic foundation in Electronics and Communication Engineering with practical embedded systems specialization.
            </p>
          </div>

          <div className="text-right">
            <span className="font-display font-black text-6xl sm:text-8xl text-neutral-200 dark:text-neutral-800/80 leading-none select-none">
              04
            </span>
          </div>
        </div>

        {/* Clean Typographic Timeline Container */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Main Education Node */}
          <div className="relative pl-8 sm:pl-12 border-l-2 border-[#FF1F1F]/40 dark:border-[#FF1F1F]/30 space-y-8">
            {/* Timeline Marker Pin */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-neutral-950 border-2 border-[#FF1F1F] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F1F]" />
            </div>

            {/* Institution Card */}
            <div className="p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0D0F14] shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-2.5 font-mono text-xs text-neutral-500">
                  <GraduationCap className="w-4 h-4 text-[#FF1F1F]" />
                  <span>FORMAL UNDERGRADUATE DEGREE</span>
                </div>

                <div className="flex items-center gap-2 px-3 py-1 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-xs text-neutral-800 dark:text-neutral-200">
                  <Calendar className="w-3.5 h-3.5 text-[#FF1F1F]" />
                  <span className="font-bold">2022 – 2026 BATCH</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-neutral-950 dark:text-white">
                  Kumaraguru College of Technology
                </h3>
                <div className="text-lg font-sans font-medium text-[#FF1F1F]">
                  Bachelor of Engineering (B.E.) in Electronics and Communication Engineering
                </div>
                <div className="flex items-center gap-1.5 font-mono text-xs text-neutral-500">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Coimbatore, Tamil Nadu, India</span>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="font-mono text-xs text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-[#FF1F1F]" />
                  <span>Core Academic Disciplines</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs text-neutral-700 dark:text-neutral-300">
                  <div className="flex items-start gap-2 p-2.5 rounded bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF1F1F] mt-0.5 shrink-0" />
                    <span>Microprocessors & Microcontroller Architectures</span>
                  </div>
                  <div className="flex items-start gap-2 p-2.5 rounded bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF1F1F] mt-0.5 shrink-0" />
                    <span>Digital Signal Processing & Linear ICs</span>
                  </div>
                  <div className="flex items-start gap-2 p-2.5 rounded bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF1F1F] mt-0.5 shrink-0" />
                    <span>Embedded Systems Design & Interfacing</span>
                  </div>
                  <div className="flex items-start gap-2 p-2.5 rounded bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF1F1F] mt-0.5 shrink-0" />
                    <span>Wireless & Sensor Communication Networks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Progression Milestones */}
            <div className="space-y-4">
              <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                PROGRESSION LOG // 2022 TO 2026
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 space-y-1.5">
                  <span className="text-[10px] text-[#FF1F1F] font-bold">STAGE 01 // 2022–2023</span>
                  <div className="font-semibold text-neutral-900 dark:text-white">Engineering Foundations</div>
                  <p className="text-[11px] text-neutral-500 leading-relaxed font-sans">
                    Mastered circuit analysis, digital logic design, mathematics, and structured C programming fundamentals.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 space-y-1.5">
                  <span className="text-[10px] text-[#FF1F1F] font-bold">STAGE 02 // 2023–2024</span>
                  <div className="font-semibold text-neutral-900 dark:text-white">Microcontrollers & Hardware Interfacing</div>
                  <p className="text-[11px] text-neutral-500 leading-relaxed font-sans">
                    Extensive laboratory and self-directed hands-on programming with Arduino, ESP32, sensors, and actuator circuitry.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 space-y-1.5">
                  <span className="text-[10px] text-[#FF1F1F] font-bold">STAGE 03 // 2024–2025</span>
                  <div className="font-semibold text-neutral-900 dark:text-white">Autonomous Robotics & Edge Systems</div>
                  <p className="text-[11px] text-neutral-500 leading-relaxed font-sans">
                    Developed prototypes including the Autonomous Road-Cleaning Robot, IoT Air Quality node, and Python-based assistant systems.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 space-y-1.5">
                  <span className="text-[10px] text-[#FF1F1F] font-bold">STAGE 04 // 2025–2026</span>
                  <div className="font-semibold text-neutral-900 dark:text-white">Embedded Specialization & Industry Readiness</div>
                  <p className="text-[11px] text-neutral-500 leading-relaxed font-sans">
                    Deepening Embedded C architecture, real-time deterministic firmware practices, and preparing for professional engineering roles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
