import React, { useRef, useEffect } from 'react';
import { useScrollState, useMouseParallax } from '../engine/hooks';
import { frameLoader } from '../engine/frames';

export const Stage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollState = useScrollState();
  const mouseParallax = useMouseParallax(14);

  // Canvas drawing loop synchronized to currentFrame
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

      // Get exact transparent frame for current scroll position
      const frameImg = frameLoader.getFrame(scrollState.currentFrame);

      const isMobile = width < 820;
      const charXPercent = isMobile ? 50 : scrollState.charX;
      const charScale = isMobile ? 0.78 : scrollState.charScale;

      if (frameImg && frameImg.complete && frameImg.naturalWidth > 0) {
        // Source image is 640x360 landscape with character in center
        const aspect = frameImg.naturalWidth / frameImg.naturalHeight; // 16:9
        const targetH = height * (isMobile ? 0.80 : 0.92) * charScale;
        const targetW = targetH * aspect;

        // Position character horizontally based on scene director & mouse parallax
        const posX = (width * (charXPercent / 100)) - (targetW / 2) + mouseParallax.x;
        const posY = (height * (isMobile ? 0.54 : 0.52)) - (targetH / 2) + mouseParallax.y;

        ctx.save();
        ctx.drawImage(frameImg, posX, posY, targetW, targetH);
        ctx.restore();
      }

      // Signature Blade Transition Effect
      if (scrollState.bladeActive) {
        const bladeProg = scrollState.bladeProgress;
        const isContact = scrollState.incomingScene?.id === 'contact';
        const bladeColor = isContact ? '#ffffff' : '#ff1f1f';

        ctx.save();
        // Diagonal line coordinates across viewport (135deg)
        const startX = width * (1.1 - bladeProg * 1.5);
        const startY = 0;
        const endX = width * (1.5 - bladeProg * 1.5);
        const endY = height;

        // Draw blade glow line
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = bladeColor;
        ctx.lineWidth = 3;
        ctx.shadowColor = bladeColor;
        ctx.shadowBlur = 20;
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
