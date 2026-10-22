export class DasarToastTimer {
  private remaining: number;
  private startedAt = 0;
  private handle: ReturnType<typeof setTimeout> | null = null;

  constructor(
    duration: number,
    private readonly onElapsed: () => void,
  ) {
    this.remaining = duration;
  }

  get running(): boolean {
    return this.handle !== null;
  }

  get remainingMs(): number {
    return this.remaining;
  }

  start(): void {
    if (this.handle !== null || !(this.remaining > 0) || !Number.isFinite(this.remaining)) return;
    this.startedAt = Date.now();
    this.handle = setTimeout(() => {
      this.handle = null;
      this.remaining = 0;
      this.onElapsed();
    }, this.remaining);
  }

  pause(): void {
    if (this.handle === null) return;
    clearTimeout(this.handle);
    this.handle = null;
    this.remaining = Math.max(0, this.remaining - (Date.now() - this.startedAt));
  }

  clear(): void {
    if (this.handle !== null) clearTimeout(this.handle);
    this.handle = null;
  }
}

export const isInternalLink = (to: string): boolean =>
  !/^([a-z][a-z0-9+.-]*:|\/\/)/i.test(to.trim());
