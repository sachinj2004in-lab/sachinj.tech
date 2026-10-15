export interface FrameManifest {
  fps: number;
  totalFrames: number;
  width: number;
  height: number;
  shots: {
    name: string;
    startFrame: number;
    endFrame: number;
    startTime: number;
    endTime: number;
  }[];
}

class FrameLoader {
  private isLoaded = false;
  private loadProgress = 0;
  private listeners: Set<(progress: number) => void> = new Set();
  private posterImage: HTMLImageElement | null = null;
  private characterVideo: HTMLVideoElement | null = null;

  public manifest: FrameManifest = {
    fps: 30,
    totalFrames: 300,
    width: 1600,
    height: 900,
    shots: [
      { name: 'hero', startFrame: 0, endFrame: 54, startTime: 0.0, endTime: 1.8 },
      { name: 'about', startFrame: 84, endFrame: 138, startTime: 2.8, endTime: 4.6 },
      { name: 'work', startFrame: 150, endFrame: 216, startTime: 5.0, endTime: 7.2 },
      { name: 'journey', startFrame: 234, endFrame: 264, startTime: 7.8, endTime: 8.8 },
      { name: 'skills', startFrame: 240, endFrame: 270, startTime: 8.0, endTime: 9.0 },
      { name: 'contact', startFrame: 264, endFrame: 299, startTime: 8.8, endTime: 9.9 },
    ],
  };

  public init(): Promise<void> {
    return new Promise((resolve) => {
      let loadedCount = 0;
      const totalToLoad = 2;

      const updateProgress = () => {
        loadedCount++;
        this.loadProgress = Math.min(100, Math.round((loadedCount / totalToLoad) * 100));
        this.listeners.forEach((cb) => cb(this.loadProgress));
        if (loadedCount >= totalToLoad) {
          this.isLoaded = true;
          resolve();
        }
      };

      // Preload portrait fallback
      this.posterImage = new Image();
      this.posterImage.src = './assets/sachin.jpg';
      this.posterImage.onload = updateProgress;
      this.posterImage.onerror = updateProgress;

      // Preload character video metadata
      this.characterVideo = document.createElement('video');
      this.characterVideo.src = './assets/character.mp4';
      this.characterVideo.preload = 'auto';
      this.characterVideo.muted = true;
      this.characterVideo.playsInline = true;

      const onCanPlay = () => {
        this.characterVideo?.removeEventListener('canplaythrough', onCanPlay);
        updateProgress();
      };

      this.characterVideo.addEventListener('canplaythrough', onCanPlay);
      this.characterVideo.load();

      // Safety timeout so preloader does not stall
      setTimeout(() => {
        if (!this.isLoaded) {
          this.isLoaded = true;
          this.loadProgress = 100;
          this.listeners.forEach((cb) => cb(100));
          resolve();
        }
      }, 2500);
    });
  }

  public onProgress(cb: (progress: number) => void): () => void {
    this.listeners.add(cb);
    cb(this.loadProgress);
    return () => this.listeners.delete(cb);
  }

  public getVideoElement(): HTMLVideoElement | null {
    return this.characterVideo;
  }

  public getPosterImage(): HTMLImageElement | null {
    return this.posterImage;
  }
}

export const frameLoader = new FrameLoader();
