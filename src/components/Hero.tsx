import React, { useRef, useEffect } from 'react';
import { ArrowDown, ArrowUpRight, Cpu, Terminal, Compass, Layers } from 'lucide-react';
import gsap from 'gsap';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle entrance animation
      gsap.from('.hero-stagger', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power2.out',
      });

      gsap.from(mediaRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 1.1,
        ease: 'power2.out',
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-12 overflow-hidden"
    >
      {/* Background Engineering Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="h-full w-full tech-grid-light dark:tech-grid-dark" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-neutral-300 dark:via-neutral-800 to-transparent" />
        <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8">
        {/* Top Micro-Metadata Bar */}
        <div className="hero-stagger flex flex-wrap items-center justify-between gap-3 text-neutral-500 dark:text-neutral-400 font-mono text-[11px] mb-8 pb-3 border-b border-neutral-200/80 dark:border-neutral-800/80">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-neutral-900 dark:text-white font-medium">
              <span className="w-2 h-2 rounded-sm bg-[#FF1F1F]" />
              SYS.ARCH // EMBEDDED SYSTEMS
            </span>
            <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">|</span>
            <span className="hidden sm:inline">COIMBATORE, TN (11.0168° N, 76.9558° E)</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-neutral-400" />
              BATCH: 2022–2026
            </span>
            <span className="text-[#FF1F1F] font-semibold">SEC: 01 // OVERVIEW</span>
          </div>
        </div>

        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Typography & Intent */}
          <div ref={headlineRef} className="lg:col-span-7 space-y-6">
            <div className="hero-stagger inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-neutral-300 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/60 font-mono text-xs text-neutral-700 dark:text-neutral-300">
              <Terminal className="w-3.5 h-3.5 text-[#FF1F1F]" />
              <span>FIRMWARE // SENSORS // HARDWARE-SOFTWARE INTEGRATION</span>
            </div>

            <div className="hero-stagger space-y-1">
              <span className="block font-mono text-sm tracking-widest text-[#FF1F1F] font-bold uppercase">
                PORTFOLIO — 2026
              </span>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[0.95]">
                SACHIN <span className="text-[#FF1F1F]">J</span>
              </h1>
            </div>

            <div className="hero-stagger">
              <p className="text-xl sm:text-2xl font-light text-neutral-800 dark:text-neutral-200 tracking-tight font-sans">
                Aspiring <span className="font-semibold text-neutral-950 dark:text-white underline decoration-[#FF1F1F] decoration-2 underline-offset-4">Embedded Software Engineer</span>
              </p>
            </div>

            <div className="hero-stagger max-w-xl">
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                Focused on microcontrollers, hardware-software integration, real-time sensor pipelines, and autonomous robotic systems. Building deterministic solutions from bare-metal C to cloud IoT endpoints.
              </p>
            </div>

            {/* CTAs */}
            <div className="hero-stagger flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollTo('projects')}
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded font-mono text-xs sm:text-sm font-bold bg-[#FF1F1F] text-white hover:bg-[#E01616] transition-all shadow-md shadow-red-500/10 hover:shadow-red-500/25 active:scale-95"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded font-mono text-xs sm:text-sm font-semibold border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white hover:border-[#FF1F1F] hover:text-[#FF1F1F] dark:hover:border-[#FF1F1F] dark:hover:text-[#FF1F1F] transition-all active:scale-95"
              >
                <span>CONTACT ME</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* Micro Specification Badges */}
            <div className="hero-stagger grid grid-cols-3 gap-3 pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60 max-w-lg">
              <div className="space-y-0.5">
                <span className="block font-mono text-[10px] text-neutral-400 uppercase tracking-wider">EDUCATION</span>
                <span className="block text-xs font-mono font-medium text-neutral-900 dark:text-neutral-200">KCT Coimbatore</span>
              </div>
              <div className="space-y-0.5">
                <span className="block font-mono text-[10px] text-neutral-400 uppercase tracking-wider">DEGREE</span>
                <span className="block text-xs font-mono font-medium text-neutral-900 dark:text-neutral-200">B.E. ECE ('22–'26)</span>
              </div>
              <div className="space-y-0.5">
                <span className="block font-mono text-[10px] text-neutral-400 uppercase tracking-wider">CORE FOCUS</span>
                <span className="block text-xs font-mono font-medium text-neutral-900 dark:text-neutral-200">ESP32 & C Systems</span>
              </div>
            </div>
          </div>

          {/* Right Column: Character Visual Composition with Cinematic Frame */}
          <div ref={mediaRef} className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              {/* Technical Decorative Corner Crosshairs */}
              <span className="absolute -top-3 -left-3 text-neutral-400 dark:text-neutral-600 font-mono text-sm select-none">+</span>
              <span className="absolute -top-3 -right-3 text-neutral-400 dark:text-neutral-600 font-mono text-sm select-none">+</span>
              <span className="absolute -bottom-3 -left-3 text-neutral-400 dark:text-neutral-600 font-mono text-sm select-none">+</span>
              <span className="absolute -bottom-3 -right-3 text-neutral-400 dark:text-neutral-600 font-mono text-sm select-none">+</span>

              {/* Character Visual Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-xl group">
                {/* Visual Header Tag */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-200/80 dark:bg-neutral-800/80 border-b border-neutral-300/50 dark:border-neutral-700/50 font-mono text-[11px] text-neutral-700 dark:text-neutral-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF1F1F]" />
                    <span>ID // SACHIN_J.RAW</span>
                  </div>
                  <span className="text-neutral-500 text-[10px]">VERIFIED ASSET</span>
                </div>

                {/* Main Portrait with subtle depth */}
                <div className="relative aspect-[4/5] bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-950 flex items-center justify-center overflow-hidden">
                  <img
                    src="/assets/sachin.jpg"
                    alt="Sachin J — Aspiring Embedded Software Engineer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    loading="eager"
                  />

                  {/* High-tech HUD Overlays */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-5">
                    <div className="font-mono text-[11px] text-white/90 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-bold tracking-wider">SACHIN J</span>
                        <span className="text-[#FF1F1F] font-bold">NODE_01</span>
                      </div>
                      <div className="text-[10px] text-white/70">
                        EMBEDDED SYSTEMS DEVELOPER // COIMBATORE
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-panel with Video Preview Badge */}
                <div className="p-3 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] font-mono">
                  <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                    <Layers className="w-3.5 h-3.5 text-[#FF1F1F]" />
                    <span>CINEMATIC SEQUENCE READY</span>
                  </div>
                  <a
                    href="#cinematic-reel"
                    className="text-[#FF1F1F] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>VIEW 3D MOTION</span>
                    <span>↓</span>
                  </a>
                </div>
              </div>

              {/* Floating Technical Badge */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 shadow-lg items-center gap-3 font-mono">
                <div className="w-9 h-9 rounded bg-[#FF1F1F]/10 flex items-center justify-center text-[#FF1F1F]">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-neutral-400">PRIMARY MCU</div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-white">ESP32 & AVR</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Cue Indicator */}
        <div className="mt-14 pt-6 border-t border-neutral-200/70 dark:border-neutral-800/70 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[2px] bg-[#FF1F1F]" />
            <span className="font-mono text-[11px] text-neutral-500 tracking-widest uppercase">
              SCROLL TO DECRYPT // SECTION 02
            </span>
          </div>

          <div className="flex items-center gap-6 text-[11px] font-mono text-neutral-400">
            <span>[01 / 07]</span>
            <span>HIGH PERFORMANCE ARCHITECTURE</span>
          </div>
        </div>
      </div>
    </section>
  );
};
