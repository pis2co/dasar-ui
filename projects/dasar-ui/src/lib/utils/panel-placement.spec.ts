import { computeSmartPlacement, DasarPanelPlacement } from './panel-placement';

interface FakeRect {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
}

function rect(partial: Partial<FakeRect>): { getBoundingClientRect: () => FakeRect } {
  const value: FakeRect = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    ...partial,
  };
  return { getBoundingClientRect: () => value };
}

describe('computeSmartPlacement', () => {
  const originalInnerHeight = window.innerHeight;
  const originalInnerWidth = window.innerWidth;

  afterAll(() => {
    Object.defineProperty(window, 'innerHeight', {
      value: originalInnerHeight,
      configurable: true,
    });
    Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth, configurable: true });
  });

  function setViewport(width: number, height: number) {
    Object.defineProperty(window, 'innerHeight', { value: height, configurable: true });
    Object.defineProperty(window, 'innerWidth', { value: width, configurable: true });
  }

  it('keeps the preferred placement when there is room below', () => {
    setViewport(1024, 800);
    const trigger = rect({ top: 100, bottom: 132, left: 100, right: 300 });
    const panel = rect({ width: 200, height: 240 });

    expect(computeSmartPlacement(trigger, panel, 'bottom-start')).toBe('bottom-start');
  });

  it('flips to top when there is not enough room below', () => {
    setViewport(1024, 300);
    const trigger = rect({ top: 240, bottom: 272, left: 100, right: 300 });
    const panel = rect({ width: 200, height: 240 });

    expect(computeSmartPlacement(trigger, panel, 'bottom-start')).toBe('top-start');
  });

  it('flips to bottom when there is not enough room above', () => {
    setViewport(1024, 800);
    const trigger = rect({ top: 4, bottom: 36, left: 100, right: 300 });
    const panel = rect({ width: 200, height: 240 });

    expect(computeSmartPlacement(trigger, panel, 'top-start')).toBe('bottom-start');
  });

  it('flips horizontally when the preferred side is too narrow', () => {
    setViewport(1024, 800);
    const trigger = rect({ top: 100, bottom: 132, left: 900, right: 1000 });
    const panel = rect({ width: 300, height: 200 });

    expect(computeSmartPlacement(trigger, panel, 'bottom-start')).toBe('bottom-end');
  });

  it('flips vertically and horizontally at the same time', () => {
    setViewport(800, 300);
    const trigger = rect({ top: 250, bottom: 282, left: 700, right: 790 });
    const panel = rect({ width: 300, height: 240 });

    expect(computeSmartPlacement(trigger, panel, 'bottom-start')).toBe('top-end');
  });

  it('keeps the preferred placement when neither side has room', () => {
    setViewport(1024, 400);
    // Equal room above and below (184px each) but the panel needs 308px:
    // neither side is strictly better, so nothing flips.
    const trigger = rect({ top: 184, bottom: 216, left: 400, right: 600 });
    const panel = rect({ width: 200, height: 300 });

    const result: DasarPanelPlacement = computeSmartPlacement(trigger, panel, 'bottom-start');
    expect(result).toBe('bottom-start');
  });
});
