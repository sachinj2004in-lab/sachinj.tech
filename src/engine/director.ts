import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface SceneConfig {
  id: 'hero' | 'about' | 'projects' | 'journey' | 'resume' | 'contact';
  index: number;
  navLabel: string;
  heightVh: number;
  startFrame: number;
  endFrame: number;
  charX: number; // percentage in virtual space (0-100)
  charScale: number;
}

export const SCENES: SceneConfig[] = [
  { id: 'hero', index: 0, navLabel: 'Home', heightVh: 100, startFrame: 0, endFrame: 22, charX: 72, charScale: 0.95 },
  { id: 'about', index: 1, navLabel: 'About', heightVh: 200, startFrame: 23, endFrame: 55, charX: 28, charScale: 0.92 },
  { id: 'projects', index: 2, navLabel: 'Projects', heightVh: 220, startFrame: 56, endFrame: 90, charX: 74, charScale: 0.90 },
  { id: 'journey', index: 3, navLabel: 'Journey', heightVh: 180, startFrame: 91, endFrame: 102, charX: 26, charScale: 0.92 },
  { id: 'resume', index: 4, navLabel: 'Resume', heightVh: 180, startFrame: 103, endFrame: 114, charX: 72, charScale: 0.90 },
  { id: 'contact', index: 5, navLabel: 'Contact', heightVh: 150, startFrame: 115, endFrame: 119, charX: 50, charScale: 1.00 },
];

export interface ScrollState {
  scrollY: number;
  totalScrollHeight: number;
  overallProgress: number; // 0 to 1
  activeScene: SceneConfig;
  sceneProgress: number; // 0 to 1 within active scene
  bladeActive: boolean;
  bladeProgress: number; // 0 to 1 during transition
  incomingScene?: SceneConfig;
  currentFrame: number; // Exact frame index to render on canvas
  charX: number;
  charScale: number;
}

type ScrollSubscriber = (state: ScrollState) => void;

class ScrollDirector {
  private lenis: Lenis | null = null;
  private subscribers: Set<ScrollSubscriber> = new Set();
  private isReady = false;
  private tickerCallback: ((time: number) => void) | null = null;

  public state: ScrollState = {
    scrollY: 0,
    totalScrollHeight: 1,
    overallProgress: 0,
    activeScene: SCENES[0],
    sceneProgress: 0,
    bladeActive: false,
    bladeProgress: 0,
    currentFrame: 0,
    charX: SCENES[0].charX,
    charScale: SCENES[0].charScale,
  };

  public init() {
    if (typeof window === 'undefined') return;

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.lenis = new Lenis({
      lerp: prefersReducedMotion ? 1 : 0.1,
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false,
    });

    this.lenis.on('scroll', (e: { scroll: number }) => {
      this.handleScroll(e.scroll);
      ScrollTrigger.update();
    });

    // Native passive scroll listener ensures 120Hz responsiveness on mobile
    window.addEventListener(
      'scroll',
      () => {
        this.handleScroll(window.scrollY);
      },
      { passive: true }
    );

    this.tickerCallback = (time: number) => {
      this.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(this.tickerCallback);
    gsap.ticker.lagSmoothing(0);

    window.addEventListener('resize', this.onResize);
    this.updateDimensions();
    this.handleScroll(window.scrollY || 0);
  }

  public subscribe(callback: ScrollSubscriber): () => void {
    this.subscribers.add(callback);
    callback(this.state);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  public start() {
    this.isReady = true;
    this.lenis?.start();
  }

  public stop() {
    this.isReady = false;
    this.lenis?.stop();
  }

  public scrollToScene(id: string) {
    const el = document.getElementById(id);
    if (!el || !this.lenis) return;
    this.lenis.scrollTo(el, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
  }

  private lastWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  private lastHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

  private onResize = () => {
    if (typeof window !== 'undefined') {
      // Ignore mobile address bar height-only changes (< 140px) to prevent layout shifts & reload-like jumps
      const widthChanged = window.innerWidth !== this.lastWidth;
      const heightDelta = Math.abs(window.innerHeight - this.lastHeight);
      if (!widthChanged && heightDelta < 140) {
        return;
      }
      this.lastWidth = window.innerWidth;
      this.lastHeight = window.innerHeight;
    }
    this.updateDimensions();
    this.handleScroll(window.scrollY);
  };

  private updateDimensions() {
    this.state.totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  }

  private handleScroll(currentScrollY: number) {
    this.state.scrollY = currentScrollY;
    const maxScroll = Math.max(1, this.state.totalScrollHeight);
    this.state.overallProgress = Math.min(1, Math.max(0, currentScrollY / maxScroll));

    let currentActive = SCENES[0];
    let sceneProgress = 0;
    let nextScene: SceneConfig | undefined;
    let bladeActive = false;
    let bladeProgress = 0;

    for (let i = 0; i < SCENES.length; i++) {
      const scene = SCENES[i];
      const el = document.getElementById(scene.id);
      if (!el) continue;

      const top = el.offsetTop;
      const height = el.offsetHeight;

      if (currentScrollY >= top && currentScrollY < top + height) {
        currentActive = scene;
        sceneProgress = Math.min(1, Math.max(0, (currentScrollY - top) / Math.max(1, height)));
        nextScene = SCENES[i + 1];

        // Blade transition active in the final 15% of section
        if (sceneProgress > 0.85 && nextScene) {
          bladeActive = true;
          bladeProgress = (sceneProgress - 0.85) / 0.15;
        }
        break;
      }
    }

    // Calculate exact character frame index within the active scene
    let frame = currentActive.startFrame + (currentActive.endFrame - currentActive.startFrame) * sceneProgress;
    let charX = currentActive.charX;
    let charScale = currentActive.charScale;

    // Smoothly interpolate position and frame during blade transition
    if (bladeActive && nextScene) {
      charX = currentActive.charX + (nextScene.charX - currentActive.charX) * bladeProgress;
      charScale = currentActive.charScale + (nextScene.charScale - currentActive.charScale) * bladeProgress;
      frame = currentActive.endFrame + (nextScene.startFrame - currentActive.endFrame) * bladeProgress;
    }

    this.state.activeScene = currentActive;
    this.state.sceneProgress = sceneProgress;
    this.state.incomingScene = nextScene;
    this.state.bladeActive = bladeActive;
    this.state.bladeProgress = bladeProgress;
    this.state.currentFrame = Math.round(frame);
    this.state.charX = charX;
    this.state.charScale = charScale;

    this.subscribers.forEach((cb) => cb(this.state));
  }

  public destroy() {
    if (this.tickerCallback) {
      gsap.ticker.remove(this.tickerCallback);
    }
    this.lenis?.destroy();
    window.removeEventListener('resize', this.onResize);
    this.subscribers.clear();
  }
}

export const director = new ScrollDirector();
