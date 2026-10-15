import React, { useRef, useEffect } from 'react';

interface CharacterVideoProps {
  segment: 'hero' | 'about' | 'projects' | 'journey' | 'skills' | 'contact';
  className?: string;
  autoPlay?: boolean;
}

// Exact timestamps identified from character.mp4
const SEGMENT_TIMES = {
  hero: { start: 0.0, end: 1.8, default: 0.6 },
  about: { start: 2.8, end: 4.6, default: 3.8 }, // Seated on chair
  projects: { start: 5.0, end: 7.2, default: 6.0 }, // Seated at desk typing on laptop
  journey: { start: 7.8, end: 8.8, default: 8.2 }, // Standing
  skills: { start: 8.0, end: 9.0, default: 8.5 }, // Standing center
  contact: { start: 8.8, end: 9.9, default: 9.2 }, // Standing smiling forward
};

export const CharacterVideo: React.FC<CharacterVideoProps> = ({
  segment,
  className = '',
  autoPlay = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const { start, end, default: defTime } = SEGMENT_TIMES[segment];

    const handleLoaded = () => {
      video.currentTime = defTime;
      if (autoPlay) {
        video.play().catch(() => {});
      }
    };

    if (video.readyState >= 2) {
      video.currentTime = defTime;
      if (autoPlay) {
        video.play().catch(() => {});
      }
    } else {
      video.addEventListener('loadeddata', handleLoaded);
    }

    // Keep video looping within this section's segment
    const handleTimeUpdate = () => {
      if (video.currentTime >= end) {
        video.currentTime = start;
      } else if (video.currentTime < start) {
        video.currentTime = start;
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadeddata', handleLoaded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [segment, autoPlay]);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden pointer-events-none select-none ${className}`}>
      <video
        ref={videoRef}
        src="/assets/character.mp4"
        poster="/assets/sachin.jpg"
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-screen scale-105"
      />
    </div>
  );
};
