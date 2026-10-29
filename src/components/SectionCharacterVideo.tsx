import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useScrollState, useMouseParallax } from '../engine/hooks';

// Safe loop boundaries determined for each supplied MP4
// (stops 0.7s - 1.0s before the file end to prevent any trailing black frames or decoder blink)
const SECTION_TIMINGS: Record<
  string,
  { safeStart: number; loopStart: number; safeEnd: number; holdOnly?: boolean }
> = {
  hero: { safeStart: 0.0, loopStart: 3.2, safeEnd: 4.2 }, // Walk-in (0-3.2s) -> loops/holds standing pose (3.2-4.2s)
  about: { safeStart: 0.0, loopStart: 1.8, safeEnd: 3.2 }, // Crossing arms & smile (1.8-3.2s)
  projects: { safeStart: 0.0, loopStart: 0.5, safeEnd: 3.1 }, // Active typing on laptop (0.5-3.1s)
  journey: { safeStart: 0.0, loopStart: 1.8, safeEnd: 3.6 }, // Open-handed presentation gesture (1.8-3.6s)
  resume: { safeStart: 0.0, loopStart: 1.4, safeEnd: 3.1 }, // Pointing upward toward credentials (1.4-3.1s)
  contact: { safeStart: 0.0, loopStart: 1.6, safeEnd: 3.2 }, // Polite hand-on-heart welcoming gesture (1.6-3.2s)
};

interface SectionCharacterVideoProps {
  sectionId: 'hero' | 'about' | 'projects' | 'journey' | 'resume' | 'contact';
  videoSrc: string;
  posterSrc?: string;
  position?: 'left' | 'right' | 'center';
  objectFit?: 'contain' | 'cover';
  objectPosition?: string;
  className?: string;
  containerClassName?: string;
  parallaxStrength?: number;
  priority?: boolean;
}

export const SectionCharacterVideo: React.FC<SectionCharacterVideoProps> = ({
  sectionId,
  videoSrc,
  posterSrc = '/assets/sachin.jpg',
  position = 'right',
  objectFit = 'contain',
  objectPosition = 'center center',
  className = '',
  containerClassName = '',
  parallaxStrength = 8,
  priority = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollState = useScrollState();
  const mouseParallax = useMouseParallax(parallaxStrength);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);

  const timings = SECTION_TIMINGS[sectionId] || {
    safeStart: 0.0,
    loopStart: 1.0,
    safeEnd: 3.0,
  };

  // Determine whether this section is currently visible in viewport
  const isActive =
    scrollState.activeScene.id === sectionId ||
    (scrollState.bladeActive && scrollState.incomingScene?.id === sectionId);

  // High-frequency 60fps monitor loop using requestAnimationFrame:
  // Intercepts playback BEFORE reaching trailing black frames,
  // completely eliminating black flash or stutter.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animId: number;

    const checkTime = () => {
      if (video && !video.paused && video.readyState >= 2) {
        const curr = video.currentTime;

        // If we hit or pass the safe cutoff boundary:
        if (curr >= timings.safeEnd) {
          // Seamlessly reset back to loopStart
          video.currentTime = timings.loopStart;
          setHasPlayedIntro(true);
        }
      }
      animId = requestAnimationFrame(checkTime);
    };

    animId = requestAnimationFrame(checkTime);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [timings.safeEnd, timings.loopStart]);

  // Play / Pause management based on section visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      // For hero, reset to 0 when user scrolls back to the very top
      if (sectionId === 'hero' && scrollState.scrollY < 40 && hasPlayedIntro) {
        video.currentTime = timings.safeStart;
        setHasPlayedIntro(false);
      }

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy fallback: video remains ready
        });
      }
    } else {
      // Pause inactive video to conserve CPU and GPU resources
      video.pause();
    }
  }, [isActive, sectionId, scrollState.scrollY, hasPlayedIntro, timings.safeStart]);

  // Fallback safety if the browser somehow triggers native ended event
  const handleEnded = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = timings.loopStart;
    video.play().catch(() => {});
  }, [timings.loopStart]);

  // Initial loaded data event handler
  const handleLoadedData = () => {
    setIsLoaded(true);
    const video = videoRef.current;
    if (video && isActive) {
      video.play().catch(() => {});
    }
  };

  // Alignment classes based on position
  const positionClasses =
    position === 'left'
      ? 'justify-center lg:justify-start'
      : position === 'right'
      ? 'justify-center lg:justify-end'
      : 'justify-center';

  const isProjects = sectionId === 'projects';

  return (
    <div
      className={`relative w-full h-full flex items-center ${positionClasses} pointer-events-none select-none bg-transparent ${containerClassName}`}
      style={{
        transform: `translate3d(${mouseParallax.x}px, ${mouseParallax.y}px, 0)`,
        transition: 'transform 0.15s ease-out',
      }}
    >
      {/* Subtle Ambient Backlight Glow behind character */}
      <div
        className={`absolute inset-0 pointer-events-none rounded-full blur-3xl opacity-20 dark:opacity-25 transition-opacity duration-700 bg-transparent ${
          isActive ? 'scale-100' : 'scale-90 opacity-0'
        } ${
          isProjects
            ? 'bg-gradient-to-tr from-red-500/15 via-transparent to-transparent'
            : 'bg-gradient-to-tr from-[#ff1f1f]/15 via-transparent to-transparent'
        }`}
      />

      {/* Video Container with Feathered Edge Mask — Clean Transparent Background */}
      <div
        className={`relative w-full h-full flex items-center ${positionClasses} overflow-hidden bg-transparent transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          // Feathered radial mask to blend edges smoothly into page background
          WebkitMaskImage: isProjects
            ? 'radial-gradient(ellipse 95% 95% at 50% 50%, black 78%, transparent 100%)'
            : 'radial-gradient(ellipse 92% 92% at 50% 50%, black 72%, transparent 100%)',
          maskImage: isProjects
            ? 'radial-gradient(ellipse 95% 95% at 50% 50%, black 78%, transparent 100%)'
            : 'radial-gradient(ellipse 92% 92% at 50% 50%, black 72%, transparent 100%)',
        }}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          muted
          playsInline
          autoPlay={isActive}
          preload={priority ? 'auto' : 'metadata'}
          onLoadedData={handleLoadedData}
          onEnded={handleEnded}
          className={`w-full h-full bg-transparent transition-all duration-300 ${
            isProjects
              ? 'rounded-3xl shadow-2xl object-cover'
              : 'mix-blend-multiply dark:mix-blend-normal'
          } ${className}`}
          style={{
            objectFit,
            objectPosition,
            backgroundColor: 'transparent',
          }}
        />
      </div>

      {/* Fallback Poster before video metadata loads */}
      {!isLoaded && posterSrc && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none bg-transparent"
          style={{
            WebkitMaskImage:
              'radial-gradient(ellipse 90% 90% at 50% 50%, black 70%, transparent 100%)',
            maskImage:
              'radial-gradient(ellipse 90% 90% at 50% 50%, black 70%, transparent 100%)',
          }}
        >
          <img
            src={posterSrc}
            alt="Sachin J"
            className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal opacity-40 blur-[1px] bg-transparent"
          />
        </div>
      )}
    </div>
  );
};
