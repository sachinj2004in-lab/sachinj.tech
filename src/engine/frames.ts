export interface ShotBoundary {
  name: string;
  startFrame: number;
  endFrame: number;
  charX: number;
  scale: number;
}

export interface FrameManifest {
  fps: number;
  totalFrames: number;
  width: number;
  height: number;
  shots: ShotBoundary[];
}

class FrameLoader {
  private isLoaded = false;
  private loadProgress = 0;
  private listeners: Set<(progress: number) => void> = new Set();
  private frames: (HTMLImageElement | null)[] = [];
  private posterImage: HTMLImageElement | null = null;
  private isMobile = false;

  public manifest: FrameManifest = {
    fps: 12,
    totalFrames: 120,
    width: 640,
    height: 360,
    shots: [
      { name: 'hero', startFrame: 0, endFrame: 22, charX: 72, scale: 0.95 },
      { name: 'about', startFrame: 23, endFrame: 55, charX: 28, scale: 0.92 },
      { name: 'projects', startFrame: 56, endFrame: 90, charX: 74, scale: 0.90 },
      { name: 'journey', startFrame: 91, endFrame: 102, charX: 26, scale: 0.92 },
      { name: 'resume', startFrame: 103, endFrame: 114, charX: 72, scale: 0.90 },
      { name: 'contact', startFrame: 115, endFrame: 119, charX: 50, scale: 1.00 },
    ],
  };

  public init(): Promise<void> {
    this.isLoaded = true;
    this.loadProgress = 100;
    this.listeners.forEach((cb) => cb(100));
    return Promise.resolve();
  }

  public onProgress(cb: (progress: number) => void): () => void {
    this.listeners.add(cb);
    cb(this.loadProgress);
    return () => this.listeners.delete(cb);
  }

  public getFrame(index: number): HTMLImageElement | null {
    const clampedIndex = Math.max(0, Math.min(this.manifest.totalFrames - 1, Math.round(index)));
    
    // Return exact frame if loaded
    if (this.frames[clampedIndex]) {
      return this.frames[clampedIndex];
    }

    // Find nearest loaded frame within the same shot
    const currentShot = this.manifest.shots.find(
      (s) => clampedIndex >= s.startFrame && clampedIndex <= s.endFrame
    );

    if (currentShot) {
      for (let offset = 1; offset <= 20; offset++) {
        const prev = clampedIndex - offset;
        if (prev >= currentShot.startFrame && this.frames[prev]) {
          return this.frames[prev];
        }
        const next = clampedIndex + offset;
        if (next <= currentShot.endFrame && this.frames[next]) {
          return this.frames[next];
        }
      }
    }

    // Fallback to frame 0 or poster
    return this.frames[0] || this.posterImage;
  }

  public getPoster(): HTMLImageElement | null {
    return this.posterImage;
  }
}

export const frameLoader = new FrameLoader();
