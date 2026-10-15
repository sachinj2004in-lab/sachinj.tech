import React, { useState, useEffect, useRef } from 'react';
import { director, SCENES } from '../engine/director';
import { useScrollState } from '../engine/hooks';
import { frameLoader } from '../engine/frames';
import gsap from 'gsap';

export const Chrome: React.FC = () => {
  const scrollState = useScrollState();
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState('');

  // Initial Preloader sequence
  useEffect(() => {
    director.stop();

    const unsubscribe = frameLoader.onProgress((prog) => {
      setLoadingProgress(prog);
      if (prog >= 100) {
        // Animate preloader panels apart with Expo easing
        const tl = gsap.timeline({
          delay: 0.3,
          onComplete: () => {
            setPreloaderComplete(true);
            director.start();
          },
        });

        tl.to(counterRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.4,
          ease: 'power2.in',
        });

        tl.to(
          topPanelRef.current,
          {
            yPercent: -100,
            duration: 1.1,
            ease: 'expo.inOut',
          },
          '-=0.2'
        );

        tl.to(
          bottomPanelRef.current,
          {
            yPercent: 100,
            duration: 1.1,
            ease: 'expo.inOut',
          },
          '<'
        );
      }
    });

    frameLoader.init();

    return () => unsubscribe();
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

  return (
    <>
      {/* 1. Full-screen Preloader with Two Red Panels */}
      {!preloaderComplete && (
        <div className="fixed inset-0 z-[100] pointer-events-none select-none flex flex-col justify-between overflow-hidden">
          {/* Top Red Panel */}
          <div
            ref={topPanelRef}
            className="w-full h-1/2 bg-[#ff1f1f] flex items-end justify-center pb-8 shadow-2xl"
          >
            <div className="font-mono text-xs text-white/80 uppercase tracking-widest">
              SACHIN J // PORTFOLIO INITIALIZATION
            </div>
          </div>

          {/* Center Counter */}
          <div
            ref={counterRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-10"
          >
            <div className="font-display text-8xl sm:text-9xl font-black text-white leading-none">
              {String(loadingProgress).padStart(3, '0')}
            </div>
            <div className="font-mono text-xs text-white/90 tracking-widest uppercase mt-4">
              LOADING ARCHITECTURE & FRAMES
            </div>
          </div>

          {/* Bottom Red Panel */}
          <div
            ref={bottomPanelRef}
            className="w-full h-1/2 bg-[#ff1f1f] flex items-start justify-center pt-8 shadow-2xl"
          >
            <div className="font-mono text-xs text-white/80 uppercase tracking-widest">
              EMBEDDED SYSTEMS ARCHITECTURE · 2026
            </div>
          </div>
        </div>
      )}

      {/* 2. Navigation HUD (z-50) */}
      <header
        className={`fixed top-0 left-0 w-full z-50 py-5 transition-colors duration-300 ${
          isContact ? 'text-white' : 'text-ink'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand: Sachin's first name in Anton with red dot */}
          <button
            onClick={() => director.scrollToScene('hero')}
            className="flex items-center gap-1.5 focus:outline-none text-left"
            aria-label="Sachin J - Home"
          >
            <span className="font-display text-3xl font-black tracking-tight uppercase">
              SACHIN
            </span>
            <span className="w-2 h-2 rounded-full bg-[#ff1f1f] mt-1" />
          </button>

          {/* Pill Navigation Menu */}
          <nav
            className={`hidden md:flex items-center gap-1 p-1.5 rounded-full backdrop-blur-md border transition-colors ${
              isContact
                ? 'bg-black/30 border-white/20'
                : 'bg-white/85 border-black/[0.08] shadow-sm'
            }`}
          >
            {SCENES.map((scene) => {
              const isActive = scrollState.activeScene.id === scene.id;
              return (
                <button
                  key={scene.id}
                  onClick={() => director.scrollToScene(scene.id)}
                  className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-[#ff1f1f] text-white font-bold shadow-md shadow-red-500/20'
                      : isContact
                      ? 'text-white/70 hover:text-white'
                      : 'text-neutral-600 hover:text-black hover:bg-neutral-100/60'
                  }`}
                >
                  {scene.navLabel}
                </button>
              );
            })}
          </nav>
        </div>
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
