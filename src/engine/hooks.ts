import { useState, useEffect } from 'react';
import { director, ScrollState } from './director';

export const useScrollState = (): ScrollState => {
  const [state, setState] = useState<ScrollState>(director.state);

  useEffect(() => {
    const unsubscribe = director.subscribe((newState) => {
      setState({ ...newState });
    });
    return unsubscribe;
  }, []);

  return state;
};

export const useMouseParallax = (strength = 14) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Desktop only
    if (window.innerWidth < 820) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetX = ((e.clientX - centerX) / centerX) * strength;
      targetY = ((e.clientY - centerY) / centerY) * strength;
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setOffset({ x: currentX, y: currentY });
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [strength]);

  return offset;
};
