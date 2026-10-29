import React, { useState, useEffect, useRef } from 'react';
import { director, SCENES } from '../engine/director';
import { useScrollState } from '../engine/hooks';
import { frameLoader } from '../engine/frames';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

export const Chrome: React.FC = () => {
  const scrollState = useScrollState();
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const welcomeTextRef = useRef<HTMLDivElement>(null);
  const nameTextRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);

  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState('');

  // Initial Preloader sequence: WELCOME → SACHIN J
  useEffect(() => {
    director.stop();

    // Prepare masked starting positions
    gsap.set([welcomeTextRef.current, nameTextRef.current], {
      yPercent: 120,
      opacity: 0,
    });
    gsap.set(subTextRef.current, {
      y: 20,
      opacity: 0,
    });

    const tl = gsap.timeline({
      delay: 0.15,
      onComplete: () => {
        setPreloaderComplete(true);
        director.start();
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('heroStartPlay'));
        }
      },
    });

    // 1. Reveal WELCOME with smooth masked upward animation
    tl.to(welcomeTextRef.current, {
      yPercent: 0,
      opacity: 1,
      duration: 0.75,
      ease: 'power3.out',
    });

    // 2. Reveal SACHIN J immediately afterward using subtle stagger
    tl.to(
      nameTextRef.current,
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.75,
        ease: 'power3.out',
      },
      '-=0.45'
    );

    // 3. Reveal technical subtitle
    tl.to(
      subTextRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.45,
        ease: 'power2.out',
      },
      '-=0.3'
    );

    // 4. Subtle dwell to appreciate typography
    tl.to({}, { duration: 0.45 });

    // 5. Elevate text upward smoothly
    tl.to(
      [welcomeTextRef.current, nameTextRef.current, subTextRef.current],
      {
        yPercent: -40,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.in',
        stagger: 0.05,
      }
    );

    // 6. Split red panels apart with Expo easing
    tl.to(
      topPanelRef.current,
      {
        yPercent: -100,
        duration: 1.0,
        ease: 'expo.inOut',
      },
      '-=0.15'
    );

    tl.to(
      bottomPanelRef.current,
      {
        yPercent: 100,
        duration: 1.0,
        ease: 'expo.inOut',
      },
      '<'
    );

    // Start loading frames in background without blocking the intro
    frameLoader.init();

    return () => {
      tl.kill();
    };
  }, []);

  // Custom Cursor logic (desktop only)
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 820) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check for interactive targets
      const target = e.target as HTMLElement | null;
      if (target?.closest('button') || target?.closest('a') || target?.closest('.interactive-target')) {
        cursorRingRef.current?.classList.add('scale-150');
      } else {
        cursorRingRef.current?.classList.remove('scale-150');
      }
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const isContact = scrollState.activeScene.id === 'contact';
  const navScenes = SCENES;

  return (
    <>
      {/* 1. Full-screen Preloader with Animated WELCOME -> SACHIN J Sequence */}
      {!preloaderComplete && (
        <div className="fixed inset-0 z-[100] pointer-events-none select-none flex flex-col justify-between overflow-hidden">
          {/* Top Red Panel */}
          <div
            ref={topPanelRef}
            className="w-full h-1/2 bg-[#ff1f1f] flex items-end justify-center pb-8 shadow-2xl relative"
          >
            <div className="font-mono text-xs text-white/75 uppercase tracking-widest">
              SACHIN J // PORTFOLIO INITIALIZATION
            </div>
          </div>

          {/* Center Masked Text Reveal */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
            {/* WELCOME in Anton */}
            <div className="overflow-hidden py-1 sm:py-2">
              <div
                ref={welcomeTextRef}
                className="font-display text-7xl sm:text-9xl md:text-[11vw] font-black text-white leading-[0.88] tracking-tight uppercase will-change-transform"
              >
                WELCOME
              </div>
            </div>

            {/* SACHIN J in Anton */}
            <div className="overflow-hidden py-1 sm:py-2 mt-1 sm:mt-3">
              <div
                ref={nameTextRef}
                className="font-display text-5xl sm:text-7xl md:text-[8vw] font-black text-white leading-[0.88] tracking-tight uppercase will-change-transform"
              >
                SACHIN J
              </div>
            </div>

            {/* Subtitle */}
            <div className="overflow-hidden mt-4">
              <div
                ref={subTextRef}
                className="font-mono text-xs sm:text-sm text-white/85 tracking-widest uppercase will-change-transform"
              >
                EMBEDDED SYSTEMS ARCHITECTURE · 2026
              </div>
            </div>
          </div>

          {/* Bottom Red Panel */}
          <div
            ref={bottomPanelRef}
            className="w-full h-1/2 bg-[#ff1f1f] flex items-start justify-center pt-8 shadow-2xl relative"
          >
            <div className="font-mono text-xs text-white/75 uppercase tracking-widest">
              ENGINEERING PORTFOLIO · COIMBATORE, INDIA
            </div>
          </div>
        </div>
      )}

      {/* 2. Navigation HUD (z-50) */}
      <header
        className={`fixed top-0 left-0 w-full z-50 py-5 transition-colors duration-300 ${
          isContact ? 'text-white' : 'text-ink dark:text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand: Sachin's first name in Anton with red dot */}
          <button
            onClick={() => director.scrollToScene('hero')}
            className="flex items-center gap-1.5 focus:outline-none text-left"
            aria-label="Sachin J - Home"
          >
            <span className={`font-display text-3xl font-black tracking-tight uppercase transition-colors ${
              isContact ? 'text-white' : 'text-ink dark:text-white'
            }`}>
              SACHIN
            </span>
            <span className={`w-2 h-2 rounded-full mt-1 transition-colors ${
              isContact ? 'bg-white' : 'bg-[#ff1f1f]'
            }`} />
          </button>

          {/* Desktop Right Controls: Clean Nav Menu matching reference screenshot (1024px+) */}
          <div className="hidden lg:flex items-center gap-2.5">
            <nav
              className={`flex items-center gap-1 p-1.5 rounded-full backdrop-blur-md border transition-colors ${
                isContact
                  ? 'bg-black/30 border-white/20'
                  : 'bg-white/90 dark:bg-neutral-900/90 border-black/[0.08] dark:border-white/10 shadow-sm'
              }`}
            >
              {navScenes.map((scene) => {
                const isActive = scrollState.activeScene.id === scene.id;
                return (
                  <button
                    key={scene.id}
                    onClick={() => director.scrollToScene(scene.id)}
                    className={`px-3.5 py-1.5 text-xs rounded-full font-mono uppercase tracking-wider transition-all duration-200 ${
                      isActive
                        ? 'bg-[#ff1f1f] text-white font-bold shadow-md shadow-red-500/20'
                        : isContact
                        ? 'text-white/70 hover:text-white'
                        : 'text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-white/10'
                    }`}
                  >
                    {scene.navLabel}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Mobile & Tablet Right Controls: Menu Button (< 1024px) */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`min-h-[44px] min-w-[44px] p-2.5 rounded-full border flex items-center justify-center transition-all ${
                isContact
                  ? 'bg-black/40 border-white/20 text-white'
                  : 'bg-white/90 dark:bg-neutral-800 border-black/10 dark:border-white/10 text-ink dark:text-white shadow-sm'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Navigation Drawer & Backdrop */}
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden animate-fadeIn"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <div className="fixed inset-x-4 top-20 z-50 lg:hidden p-4 sm:p-6 rounded-3xl bg-neutral-900/95 backdrop-blur-2xl border border-white/20 shadow-2xl text-white space-y-3 max-w-lg mx-auto animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 font-mono text-[10px] text-white/60 uppercase tracking-widest">
              <span>PORTFOLIO SECTIONS</span>
              <span>SACHIN J · 2026</span>
            </div>
            <div className="flex flex-col gap-1.5 pt-1">
              {navScenes.map((scene, idx) => {
                const isActive = scrollState.activeScene.id === scene.id;
                return (
                  <button
                    key={scene.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      director.scrollToScene(scene.id);
                    }}
                    className={`w-full min-h-[44px] text-left px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-[#ff1f1f] text-white font-bold'
                        : 'hover:bg-white/10 text-white/80'
                    }`}
                  >
                    <span>{scene.navLabel}</span>
                    <span className="text-[10px] opacity-60">0{idx + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>
          </>
        )}
      </header>

      {/* 3. Bottom-Right Scroll Progress Rail (z-50) */}
      <div className="fixed bottom-6 right-6 z-50 hidden sm:flex items-center gap-3 font-mono text-[11px] text-neutral-400 select-none">
        <span className={isContact ? 'text-white' : 'text-neutral-600'}>
          {Math.round(scrollState.overallProgress * 100)}%
        </span>
        <div className="w-16 h-[2px] bg-neutral-200 overflow-hidden rounded-full">
          <div
            className="h-full bg-[#ff1f1f] transition-all duration-100 ease-out"
            style={{ width: `${scrollState.overallProgress * 100}%` }}
          />
        </div>
      </div>

      {/* 4. Desktop Custom Cursor (z-[99]) */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#ff1f1f] border border-white pointer-events-none z-[99] hidden lg:block"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 -ml-4 -mt-4 w-8 h-8 rounded-full border border-[#ff1f1f]/50 pointer-events-none z-[98] hidden lg:block transition-transform duration-150 ease-out flex items-center justify-center font-mono text-[8px] text-[#ff1f1f] font-bold"
        style={{ willChange: 'transform' }}
      >
        {cursorText}
      </div>
    </>
  );
};
