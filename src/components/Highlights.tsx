import React from 'react';
import { Shield, CheckCircle, Terminal, HardDrive, ArrowUpRight, Cpu } from 'lucide-react';

export const Highlights: React.FC = () => {
  return (
    <section id="highlights" className="relative py-24 overflow-hidden">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10 tech-grid-light dark:tech-grid-dark" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#FF1F1F] mb-2 font-bold tracking-wider">
              <span>// 06. VERIFIED COMMITMENTS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-neutral-950 dark:text-white">
              ENGINEERING <span className="text-[#FF1F1F]">STANDARDS</span>
            </h2>
          </div>

          <div className="text-right">
            <span className="font-display font-black text-5xl sm:text-7xl text-neutral-200 dark:text-neutral-800/80 leading-none select-none">
              06
            </span>
          </div>
        </div>

        {/* Minimalist Verified Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0D0F14] space-y-3">
            <div className="w-8 h-8 rounded bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[#FF1F1F]">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-lg text-neutral-950 dark:text-white">
              Hardware-Centric Thinking
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
              Every line of firmware is designed with awareness of memory constraints, register layouts, and real-time execution deadlines.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0D0F14] space-y-3">
            <div className="w-8 h-8 rounded bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[#FF1F1F]">
              <Terminal className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-lg text-neutral-950 dark:text-white">
              Continuous Skill Expansion
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
              Actively mastering low-level Embedded C, bare-metal peripheral drivers, and FreeRTOS concurrency for embedded environments.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0D0F14] space-y-3">
            <div className="w-8 h-8 rounded bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[#FF1F1F]">
              <Shield className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-lg text-neutral-950 dark:text-white">
              Authentic Prototyping
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
              All listed projects reflect genuine ongoing builds tested on physical breadboards, motor drivers, and microcontroller development kits.
            </p>
          </div>
        </div>

        {/* Verification Footer Link */}
        <div className="mt-8 pt-6 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>NO FABRICATED METRICS // ZERO PLACEHOLDER STATS</span>
          </div>

          <a
            href="https://github.com/sachin2004-roxx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-neutral-900 dark:text-white hover:text-[#FF1F1F] dark:hover:text-[#FF1F1F] font-bold"
          >
            <span>AUDIT PUBLIC REPOSITORIES</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
