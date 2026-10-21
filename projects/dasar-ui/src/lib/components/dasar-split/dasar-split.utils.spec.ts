import { describe, expect, it } from 'vitest';
import { clampSplitSize, resolveSplitLength } from './dasar-split.utils';

describe('resolveSplitLength', () => {
  it('returns numbers as pixels', () => {
    expect(resolveSplitLength(120, 1000)).toBe(120);
  });

  it('parses px strings and bare numeric strings', () => {
    expect(resolveSplitLength('240px', 1000)).toBe(240);
    expect(resolveSplitLength('80', 1000)).toBe(80);
  });

  it('converts percentages against the container', () => {
    expect(resolveSplitLength('25%', 800)).toBe(200);
  });

  it('returns null for empty or invalid values', () => {
    expect(resolveSplitLength(null, 100)).toBeNull();
    expect(resolveSplitLength('', 100)).toBeNull();
    expect(resolveSplitLength('abc', 100)).toBeNull();
  });
});

describe('clampSplitSize', () => {
  it('keeps a size inside the limits', () => {
    expect(clampSplitSize(300, 100, 500, 1000)).toBe(300);
    expect(clampSplitSize(50, 100, 500, 1000)).toBe(100);
    expect(clampSplitSize(900, 100, 500, 1000)).toBe(500);
  });

  it('never exceeds the container', () => {
    expect(clampSplitSize(2000, null, null, 1000)).toBe(1000);
    expect(clampSplitSize(2000, 0, 5000, 1000)).toBe(1000);
  });

  it('lets max win over min', () => {
    expect(clampSplitSize(300, 600, 400, 1000)).toBe(400);
  });

  it('handles an empty container', () => {
    expect(clampSplitSize(100, 10, 50, 0)).toBe(0);
  });
});
