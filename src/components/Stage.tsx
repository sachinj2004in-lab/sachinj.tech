import React, { useRef, useEffect } from 'react';
import { useScrollState, useMouseParallax } from '../engine/hooks';
import { frameLoader } from '../engine/frames';

export const Stage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollState = useScrollState();
  const mouseParallax = useMouseParallax(14);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Obtain the preloaded video
    const video = document.createElement('video');
    video.src = './assets/character.mp4';
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    videoRef.current = video;

    video.play().catch(() => {});

    return () => {
      video.pause();
      video.src = '';
    };
  }, []);

  // Update video seek time based on scroll director
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const targetTime = scrollState.targetVideoTime;
    // Keep playback close to target time
    if (Math.abs(video.currentTime - targetTime) > 0.3) {
      video.currentTime = targetTime;
    }
  }, [scrollState.targetVideoTime]);

  // Canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const video = videoRef.current;
      const poster = frameLoader.getPosterImage();
      const source = (video && video.readyState >= 2) ? video : poster;

      const isMobile = width < 820;
      const activeScene = scrollState.activeScene;
      const charXPercent = isMobile ? 50 : activeScene.charX;
      const charScale = isMobile ? 0.75 : activeScene.charScale;

      if (source) {
        // Calculate dimensions within 1600x900 virtual aspect ratio
        const vW = width;
        const vH = height;
        const targetH = vH * (isMobile ? 0.75 : 0.88) * charScale;
        const targetW = targetH * (9 / 16); // 9:16 portrait video

        // Compute anchor coordinates with mouse parallax
        const posX = (vW * (charXPercent / 100)) - (targetW / 2) + mouseParallax.x;
        const posY = (vH * (isMobile ? 0.52 : 0.50)) - (targetH / 2) + mouseParallax.y;

        ctx.save();

        // Blend studio white backdrop into page
        ctx.globalCompositeOperation = 'multiply';
        ctx.drawImage(source, posX, posY, targetW, targetH);
        ctx.restore();
      }

      // Blade Transition signature effect
      if (scrollState.bladeActive) {
        const bladeProg = scrollState.bladeProgress;
        const isContact = scrollState.incomingScene?.id === 'contact';
        const bladeColor = isContact ? '#ffffff' : '#ff1f1f';

        ctx.save();
        // Diagonal line coordinates across viewport (135deg)
        const startX = width * (1 - bladeProg * 1.4);
        const startY = 0;
        const endX = width * (1.4 - bladeProg * 1.4);
        const endY = height;

        // Draw blade glow line
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = bladeColor;
        ctx.lineWidth = 3;
        ctx.shadowColor = bladeColor;
        ctx.shadowBlur = 18;
        ctx.stroke();

        ctx.restore();
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [scrollState, mouseParallax]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      aria-hidden="true"
    />
  );
};
