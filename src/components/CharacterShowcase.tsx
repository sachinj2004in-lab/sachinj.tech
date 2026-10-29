import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Pause, RotateCcw, Sliders, Film, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CharacterShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isScrubbingMode, setIsScrubbingMode] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    // Handle video ready state
    const handleLoaded = () => {
      setVideoLoaded(true);
    };
    video.addEventListener('loadeddata', handleLoaded);
    if (video.readyState >= 2) setVideoLoaded(true);

    let scrollTriggerInstance: ScrollTrigger | null = null;

    if (isScrubbingMode) {
      // Pinned ScrollTrigger scrubbing mode
      video.pause();
      setIsPlaying(false);

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          if (video.duration && !isNaN(video.duration)) {
            const targetTime = self.progress * video.duration;
            video.currentTime = targetTime;
            setProgress(self.progress * 100);
          }
        },
      });
    } else {
      // Ambient auto-play when visible
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          video.play().catch(() => {});
          setIsPlaying(true);
        },
        onLeave: () => {
          video.pause();
          setIsPlaying(false);
        },
        onEnterBack: () => {
          video.play().catch(() => {});
          setIsPlaying(true);
        },
        onLeaveBack: () => {
          video.pause();
          setIsPlaying(false);
        },
      });
    }

    const handleTimeUpdate = () => {
      if (!isScrubbingMode && video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadeddata', handleLoaded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, [isScrubbingMode]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      setIsScrubbingMode(false);
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleManualSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const value = parseFloat(e.target.value);
    video.currentTime = (value / 100) * video.duration;
    setProgress(value);
  };

  const resetVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setProgress(0);
    if (!isPlaying) {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <section
      id="cinematic-reel"
      ref={sectionRef}
      className="relative py-20 bg-neutral-950 text-white overflow-hidden border-y border-neutral-800"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/40 via-neutral-950 to-neutral-950 pointer-events-none" />
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#FF1F1F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-neutral-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF1F1F]">
              <Film className="w-4 h-4" />
              <span>3D MOTION ASSET // CINEMATIC SEQUENCE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-white">
              CHARACTER MOTION <span className="text-[#FF1F1F]">REEL</span>
            </h2>
            <p className="text-sm font-sans text-neutral-400 max-w-lg">
              Cinematic character render sequence. Synchronized with playback telemetry, engineered with responsive viewport scaling and high frame stability.
            </p>
          </div>

          {/* Interactive Mode Switches */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsScrubbingMode(!isScrubbingMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded font-mono text-xs border transition-all ${
                isScrubbingMode
                  ? 'border-[#FF1F1F] bg-[#FF1F1F]/20 text-white font-bold'
                  : 'border-neutral-700 bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-[#FF1F1F]" />
              <span>{isScrubbingMode ? 'MODE: SCROLL-SCRUB' : 'MODE: CINEMATIC LOOP'}</span>
            </button>
          </div>
        </div>

        {/* Video Stage Frame */}
        <div
          ref={containerRef}
          className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl"
        >
          {/* Top Bar with Telemetry */}
          <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/90 border-b border-neutral-800 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className="text-white font-semibold">1000110976.MP4</span>
              <span className="text-neutral-600">//</span>
              <span className="text-[#FF1F1F] font-mono text-xs">PORTRAIT [9:16]</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span>PROGRESS: {Math.round(progress)}%</span>
              <span className="text-neutral-600">|</span>
              <span className="text-emerald-400">60 FPS</span>
            </div>
          </div>

          {/* Video Container */}
          <div className="relative aspect-[9/16] sm:aspect-[4/5] md:aspect-[16/10] bg-black flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src="/assets/character.mp4"
              poster="/assets/character.gif"
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-contain mx-auto"
            />

            {/* Subtle Crosshairs Overlay */}
            <div className="absolute inset-0 pointer-events-none border border-white/5 m-3 rounded-lg flex flex-col justify-between p-3 text-xs font-mono text-white/30">
              <div className="flex justify-between">
                <span>+ [TL:0.0]</span>
                <span>[TR:1.0] +</span>
              </div>
              <div className="flex justify-between">
                <span>+ [BL:0.0]</span>
                <span>[BR:1.0] +</span>
              </div>
            </div>
          </div>

          {/* Playback Controls & Timeline Bar */}
          <div className="p-4 bg-neutral-900 border-t border-neutral-800 space-y-3">
            {/* Scrubber Range */}
            <div className="relative flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progress}
                onChange={handleManualSeek}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#FF1F1F]"
                aria-label="Video scrubber timeline"
              />
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-[#FF1F1F]" />}
                </button>

                <button
                  onClick={resetVideo}
                  className="p-2 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                  aria-label="Restart video"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <span className="text-neutral-400">
                  {isPlaying ? 'PLAYING AMBIENT' : 'PAUSED // SCRUB READY'}
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-neutral-500 text-xs">
                <Eye className="w-3.5 h-3.5" />
                <span>HARDWARE-ACCELERATED H.264</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
