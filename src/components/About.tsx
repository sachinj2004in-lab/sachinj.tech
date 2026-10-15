import React from 'react';
import { CharacterVideo } from './CharacterVideo';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-28 overflow-hidden bg-white dark:bg-[#09090B] border-t border-neutral-100 dark:border-neutral-900">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section Tag matching reference */}
        <div className="font-mono text-xs text-neutral-500 tracking-wider mb-8">
          <span>[ 02 — ABOUT ME ]</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Character seated on chair */}
          <div className="lg:col-span-5 relative flex items-center justify-center order-2 lg:order-1">
            <div className="w-full max-w-sm sm:max-w-md aspect-[4/5] flex items-center justify-center">
              <CharacterVideo
                segment="about"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Right Column: Editorial Paragraph with red highlights + 3 Stats cards */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-sans font-light text-neutral-900 dark:text-neutral-100 leading-snug">
                <span className="font-bold text-[#FF1F1F]">Electronics & Communication undergrad</span> who loves{' '}
                <span className="font-bold text-neutral-950 dark:text-white">hardware-software integration</span>. I turn circuit schematics into{' '}
                <span className="font-bold text-[#FF1F1F]">real deterministic systems</span>. I enjoy programming{' '}
                <span className="font-bold text-neutral-950 dark:text-white">microcontrollers</span>, interfacing{' '}
                <span className="font-bold text-[#FF1F1F]">low-latency sensors</span>, and building{' '}
                <span className="font-bold text-neutral-950 dark:text-white">autonomous robotics</span> that operate reliably in the physical world.
              </p>

              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
                Currently pursuing B.E. in Electronics and Communication Engineering at Kumaraguru College of Technology, Coimbatore. Actively bridging low-level C programming, bare-metal registers, and Python automation to engineer tangible embedded prototypes.
              </p>
            </div>

            {/* 3 Metric Cards matching reference: 9.07 | 1230+ | #1 */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 space-y-1">
                <div className="text-2xl sm:text-4xl font-display font-extrabold text-neutral-950 dark:text-white">
                  2026
                </div>
                <div className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider">
                  B.E. ECE BATCH
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 space-y-1">
                <div className="text-2xl sm:text-4xl font-display font-extrabold text-[#FF1F1F]">
                  4
                </div>
                <div className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider">
                  ACTIVE BUILDS
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 space-y-1">
                <div className="text-2xl sm:text-4xl font-display font-extrabold text-neutral-950 dark:text-white">
                  #1
                </div>
                <div className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider">
                  EMBEDDED FOCUS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
