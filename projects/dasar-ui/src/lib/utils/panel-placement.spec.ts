import { vi } from 'vitest';
import {
  applyFixedPanelPosition,
  computeSmartPlacement,
  DasarPanelPlacement,
  watchPanel,
} from './panel-placement';

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
    const trigger = rect({ top: 184, bottom: 216, left: 400, right: 600 });
    const panel = rect({ width: 200, height: 300 });

    const result: DasarPanelPlacement = computeSmartPlacement(trigger, panel, 'bottom-start');
    expect(result).toBe('bottom-start');
  });
});

const domRect = (left: number, top: number, width: number, height: number) =>
  ({ left, top, width, height, right: left + width, bottom: top + height }) as DOMRect;

/** A fixed panel is as wide as the viewport until its width is set, like the select panel. */
const fakePanel = (height: number, viewportWidth = 1024) => {
  const panel = document.createElement('div');
  panel.getBoundingClientRect = () =>
    domRect(0, 0, parseFloat(panel.style.width) || viewportWidth, height);
  return panel;
};

const fakeTrigger = (left: number, top: number, width: number, height: number) => {
  const trigger = document.createElement('div');
  trigger.getBoundingClientRect = () => domRect(left, top, width, height);
  return trigger;
};

describe('applyFixedPanelPosition', () => {
  it('sets the width before measuring, so end placements line up with the trigger', () => {
    const trigger = fakeTrigger(600, 400, 389, 35);
    const panel = fakePanel(86);

    applyFixedPanelPosition(trigger, panel, 'bottom-end', { offset: 4, matchWidth: true });

    expect(panel.style.width).toBe('389px');
    expect(panel.style.left).toBe('600px');
    expect(panel.style.top).toBe('439px');
  });

  it('keeps start placements on the trigger edge', () => {
    const trigger = fakeTrigger(187, 261, 320, 35);
    const panel = fakePanel(170);

    applyFixedPanelPosition(trigger, panel, 'bottom-start', { offset: 4, matchWidth: true });

    expect(panel.style.left).toBe('187px');
    expect(panel.style.top).toBe('300px');
  });

  it('places top placements right above the trigger', () => {
    const trigger = fakeTrigger(600, 400, 389, 35);
    const panel = fakePanel(100);

    applyFixedPanelPosition(trigger, panel, 'top-end', { offset: 4, matchWidth: true });

    expect(panel.style.left).toBe('600px');
    expect(panel.style.top).toBe('296px');
  });

  it('uses the natural panel width when matchWidth is off', () => {
    const trigger = fakeTrigger(600, 400, 100, 30);
    const panel = document.createElement('div');
    panel.getBoundingClientRect = () => domRect(0, 0, 180, 60);

    applyFixedPanelPosition(trigger, panel, 'bottom-end');

    expect(panel.style.left).toBe('520px');
  });

  it('makes the panel visible when the trigger is not clipped', () => {
    const trigger = fakeTrigger(10, 10, 100, 30);
    const panel = fakePanel(50);

    applyFixedPanelPosition(trigger, panel, 'bottom-start');

    expect(panel.style.visibility).toBe('visible');
  });
});

describe('watchPanel', () => {
  it('runs the update right after the current task, without a timer', async () => {
    const update = vi.fn();
    const stop = watchPanel(document.createElement('div'), update);

    expect(update).not.toHaveBeenCalled();
    await Promise.resolve();
    expect(update).toHaveBeenCalledTimes(1);
    stop();
  });

  it('does not update after it has been stopped', async () => {
    const update = vi.fn();
    const stop = watchPanel(document.createElement('div'), update);
    stop();
    await Promise.resolve();

    expect(update).not.toHaveBeenCalled();
  });
});
