import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  DASAR_DEFAULT_BREAKPOINTS,
  DasarBreakpointService,
  computeBreakpointState,
  isBreakpointMatch,
} from './breakpoint.service';

describe('computeBreakpointState', () => {
  const cases: Array<{
    width: number;
    name: string;
    smAndDown: boolean;
    mdAndDown: boolean;
    lgAndDown: boolean;
    xlAndDown: boolean;
    smAndUp: boolean;
    mdAndUp: boolean;
    lgAndUp: boolean;
    xlAndUp: boolean;
  }> = [
    {
      width: 0,
      name: 'xs',
      smAndDown: true,
      mdAndDown: true,
      lgAndDown: true,
      xlAndDown: true,
      smAndUp: false,
      mdAndUp: false,
      lgAndUp: false,
      xlAndUp: false,
    },
    {
      width: 639,
      name: 'xs',
      smAndDown: true,
      mdAndDown: true,
      lgAndDown: true,
      xlAndDown: true,
      smAndUp: false,
      mdAndUp: false,
      lgAndUp: false,
      xlAndUp: false,
    },
    {
      width: 640,
      name: 'sm',
      smAndDown: true,
      mdAndDown: true,
      lgAndDown: true,
      xlAndDown: true,
      smAndUp: true,
      mdAndUp: false,
      lgAndUp: false,
      xlAndUp: false,
    },
    {
      width: 767,
      name: 'sm',
      smAndDown: true,
      mdAndDown: true,
      lgAndDown: true,
      xlAndDown: true,
      smAndUp: true,
      mdAndUp: false,
      lgAndUp: false,
      xlAndUp: false,
    },
    {
      width: 768,
      name: 'md',
      smAndDown: false,
      mdAndDown: true,
      lgAndDown: true,
      xlAndDown: true,
      smAndUp: true,
      mdAndUp: true,
      lgAndUp: false,
      xlAndUp: false,
    },
    {
      width: 1023,
      name: 'md',
      smAndDown: false,
      mdAndDown: true,
      lgAndDown: true,
      xlAndDown: true,
      smAndUp: true,
      mdAndUp: true,
      lgAndUp: false,
      xlAndUp: false,
    },
    {
      width: 1024,
      name: 'lg',
      smAndDown: false,
      mdAndDown: false,
      lgAndDown: true,
      xlAndDown: true,
      smAndUp: true,
      mdAndUp: true,
      lgAndUp: true,
      xlAndUp: false,
    },
    {
      width: 1199,
      name: 'lg',
      smAndDown: false,
      mdAndDown: false,
      lgAndDown: true,
      xlAndDown: true,
      smAndUp: true,
      mdAndUp: true,
      lgAndUp: true,
      xlAndUp: false,
    },
    {
      width: 1200,
      name: 'xl',
      smAndDown: false,
      mdAndDown: false,
      lgAndDown: false,
      xlAndDown: true,
      smAndUp: true,
      mdAndUp: true,
      lgAndUp: true,
      xlAndUp: true,
    },
    {
      width: 1920,
      name: 'xl',
      smAndDown: false,
      mdAndDown: false,
      lgAndDown: false,
      xlAndDown: true,
      smAndUp: true,
      mdAndUp: true,
      lgAndUp: true,
      xlAndUp: true,
    },
  ];

  for (const row of cases) {
    it(`resolves width ${row.width} to ${row.name}`, () => {
      const state = computeBreakpointState(row.width, 800, DASAR_DEFAULT_BREAKPOINTS);
      expect(state.name).toBe(row.name);
      expect(state.width).toBe(row.width);
      expect(state.height).toBe(800);
      expect(state.smAndDown).toBe(row.smAndDown);
      expect(state.mdAndDown).toBe(row.mdAndDown);
      expect(state.lgAndDown).toBe(row.lgAndDown);
      expect(state.xlAndDown).toBe(row.xlAndDown);
      expect(state.smAndUp).toBe(row.smAndUp);
      expect(state.mdAndUp).toBe(row.mdAndUp);
      expect(state.lgAndUp).toBe(row.lgAndUp);
      expect(state.xlAndUp).toBe(row.xlAndUp);
    });
  }

  it('uses custom thresholds', () => {
    const state = computeBreakpointState(800, 600, { ...DASAR_DEFAULT_BREAKPOINTS, md: 900 });
    expect(state.name).toBe('sm');
    expect(state.smAndDown).toBe(true);
  });

  it('matches names with isBreakpointMatch', () => {
    expect(isBreakpointMatch('sm', ['sm', 'md'])).toBe(true);
    expect(isBreakpointMatch('lg', ['sm', 'md'])).toBe(false);
  });
});

describe('DasarBreakpointService browser', () => {
  const setWidth = (value: number) => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value });
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 800 });
  };

  it('reads the window width and follows resize events', async () => {
    setWidth(700);
    TestBed.configureTestingModule({});
    const service = TestBed.inject(DasarBreakpointService);
    expect(service.width()).toBe(700);
    expect(service.name()).toBe('sm');
    expect(service.smAndDown()).toBe(true);

    setWidth(1100);
    window.dispatchEvent(new Event('resize'));
    await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
    expect(service.name()).toBe('lg');
    expect(service.lgAndUp()).toBe(true);
    expect(service.mdAndDown()).toBe(false);
  });

  it('applies setBreakpoints overrides', async () => {
    setWidth(1250);
    TestBed.configureTestingModule({});
    const service = TestBed.inject(DasarBreakpointService);
    await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
    expect(service.name()).toBe('xl');
    service.setBreakpoints({ xl: 1300 });
    expect(service.name()).toBe('lg');
  });

  it('syncs thresholds from the theme config', async () => {
    setWidth(950);
    TestBed.configureTestingModule({});
    const service = TestBed.inject(DasarBreakpointService);
    const { DasarThemeService } = await import('./theme.service');
    const theme = TestBed.inject(DasarThemeService);
    theme.setGlobalTheme({ mode: 'light', breakpoints: { md: 1000 } });
    expect(service.name()).toBe('sm');
  });
});

describe('DasarBreakpointService server', () => {
  it('defaults to xs with zero size', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    });
    const service = TestBed.inject(DasarBreakpointService);
    expect(service.width()).toBe(0);
    expect(service.height()).toBe(0);
    expect(service.name()).toBe('xs');
    expect(service.smAndDown()).toBe(true);
  });
});
