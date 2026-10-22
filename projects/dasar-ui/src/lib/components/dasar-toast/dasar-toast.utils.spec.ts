import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DasarToastTimer, isInternalLink, stackIndex } from './dasar-toast.utils';

describe('DasarToastTimer', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('calls back after the duration', () => {
    const spy = vi.fn();
    new DasarToastTimer(1000, spy).start();
    vi.advanceTimersByTime(999);
    expect(spy).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('keeps the remaining time when paused and resumed', () => {
    const spy = vi.fn();
    const timer = new DasarToastTimer(1000, spy);
    timer.start();
    vi.advanceTimersByTime(400);
    timer.pause();
    expect(timer.remainingMs).toBe(600);
    vi.advanceTimersByTime(5000);
    expect(spy).not.toHaveBeenCalled();
    timer.start();
    vi.advanceTimersByTime(600);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('never fires for zero or infinite durations', () => {
    const spy = vi.fn();
    new DasarToastTimer(0, spy).start();
    new DasarToastTimer(Infinity, spy).start();
    vi.advanceTimersByTime(100000);
    expect(spy).not.toHaveBeenCalled();
  });

  it('does not fire after clear', () => {
    const spy = vi.fn();
    const timer = new DasarToastTimer(500, spy);
    timer.start();
    timer.clear();
    vi.advanceTimersByTime(1000);
    expect(spy).not.toHaveBeenCalled();
  });
});

describe('stackIndex', () => {
  it('counts from the newest toast', () => {
    expect(stackIndex(2, 3)).toBe(0);
    expect(stackIndex(0, 3)).toBe(2);
  });
});

describe('isInternalLink', () => {
  it('treats paths as internal', () => {
    expect(isInternalLink('/settings')).toBe(true);
    expect(isInternalLink('settings/profile')).toBe(true);
  });

  it('treats schemes and protocol relative urls as external', () => {
    expect(isInternalLink('https://example.com')).toBe(false);
    expect(isInternalLink('mailto:a@b.co')).toBe(false);
    expect(isInternalLink('//example.com')).toBe(false);
  });
});
