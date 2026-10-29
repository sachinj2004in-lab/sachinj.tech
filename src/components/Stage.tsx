import React, { useRef, useEffect } from 'react';
import { useScrollState, useMouseParallax } from '../engine/hooks';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: 'red' | 'gray';
  baseAlpha: number;
  pulsePhase: number;
}

interface WaveRibbon {
  yFraction: number;
  amplitude: number;
  wavelength: number;
  speed: number;
  color: string;
  width: number;
}

export const Stage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollState = useScrollState();
  const mouseParallax = useMouseParallax(10);
  const scrollStateRef = useRef(scrollState);
  scrollStateRef.current = scrollState;
  const mouseParallaxRef = useRef(mouseParallax);
  mouseParallaxRef.current = mouseParallax;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Small red and gray floating particles matching reference style
    const particleCount = width < 820 ? 16 : 28;
    const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
      color: i % 2 === 0 ? 'red' : 'gray',
      baseAlpha: Math.random() * 0.12 + 0.05,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    // Fine circuit grid nodes
    const cols = Math.floor(width / 200) + 2;
    const rows = Math.floor(height / 200) + 2;
    const circuitPoints: { x: number; y: number }[] = [];
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (Math.random() > 0.55) {
          circuitPoints.push({
            x: i * 200 + (Math.random() - 0.5) * 50,
            y: j * 200 + (Math.random() - 0.5) * 50,
          });
        }
      }
    }

    let time = 0;

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      time += 0.012;

      const isDark = document.documentElement.classList.contains('dark');

      // 1. Subtle Flowing Smoke-like Waves / Light Ribbons (matching reference visual)
      const ribbons: WaveRibbon[] = [
        {
          yFraction: 0.45,
          amplitude: 28,
          wavelength: 0.003,
          speed: 0.8,
          color: isDark ? 'rgba(255, 31, 31, 0.06)' : 'rgba(255, 31, 31, 0.04)',
          width: 1.5,
        },
        {
          yFraction: 0.55,
          amplitude: 36,
          wavelength: 0.0022,
          speed: -0.6,
          color: isDark ? 'rgba(212, 175, 55, 0.05)' : 'rgba(160, 174, 192, 0.05)',
          width: 1.2,
        },
        {
          yFraction: 0.65,
          amplitude: 22,
          wavelength: 0.004,
          speed: 1.1,
          color: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 31, 31, 0.03)',
          width: 1.0,
        },
      ];

      ribbons.forEach((ribbon) => {
        ctx.beginPath();
        ctx.lineWidth = ribbon.width;
        ctx.strokeStyle = ribbon.color;

        const baseEndY = height * ribbon.yFraction + mouseParallax.y * 0.3;
        for (let x = 0; x <= width; x += 18) {
          const wave1 = Math.sin(x * ribbon.wavelength + time * ribbon.speed) * ribbon.amplitude;
          const wave2 = Math.cos(x * ribbon.wavelength * 0.5 + time * 0.5) * (ribbon.amplitude * 0.4);
          const y = baseEndY + wave1 + wave2;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      // 2. Fine Circuit Patterns & Connection Tracks
      ctx.lineWidth = 0.75;
      for (let i = 0; i < circuitPoints.length; i++) {
        const p1 = circuitPoints[i];
        for (let j = i + 1; j < circuitPoints.length; j++) {
          const p2 = circuitPoints[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 190) {
            const alpha = (1 - dist / 190) * (isDark ? 0.07 : 0.035);
            ctx.strokeStyle = isDark ? `rgba(255, 255, 255, ${alpha})` : `rgba(0, 0, 0, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x + mouseParallax.x * 0.15, p1.y + mouseParallax.y * 0.15);
            ctx.lineTo(p2.x + mouseParallax.x * 0.15, p2.y + mouseParallax.y * 0.15);
            ctx.stroke();
          }
        }
      }

      // 3. Small Red and Gray Particles with subtle floating motion
      if (!prefersReducedMotion) {
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          const pulse = Math.sin(time + p.pulsePhase) * 0.03;
          const alpha = Math.max(0.01, p.baseAlpha + pulse);

          const fill =
            p.color === 'red'
              ? `rgba(255, 31, 31, ${alpha})`
              : isDark
              ? `rgba(212, 175, 55, ${alpha * 0.8})`
              : `rgba(148, 163, 184, ${alpha})`;

          ctx.fillStyle = fill;
          ctx.beginPath();
          ctx.arc(
            p.x + mouseParallax.x * 0.2,
            p.y + mouseParallax.y * 0.2,
            p.size,
            0,
            Math.PI * 2
          );
          ctx.fill();
        });
      }

      // 4. Signature Red Blade Transition Effect across viewport
      const currentScrollState = scrollStateRef.current;
      if (currentScrollState.bladeActive) {
        const bladeProg = currentScrollState.bladeProgress;
        const isContact = currentScrollState.incomingScene?.id === 'contact';
        const bladeColor = isContact ? '#ffffff' : '#ff1f1f';

        ctx.save();
        const startX = width * (1.1 - bladeProg * 1.5);
        const startY = 0;
        const endX = width * (1.5 - bladeProg * 1.5);
        const endY = height;

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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full bg-transparent"
      aria-hidden="true"
    />
  );
};
