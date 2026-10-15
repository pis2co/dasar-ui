import { DestroyRef, Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DasarBreakpointName, DasarThemeBreakpoints } from '../models/theme.model';
import { DasarThemeService } from './theme.service';

export interface DasarBreakpointThresholds {
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface DasarBreakpointState {
  width: number;
  height: number;
  name: DasarBreakpointName;
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  smAndDown: boolean;
  mdAndDown: boolean;
  lgAndDown: boolean;
  xlAndDown: boolean;
  smAndUp: boolean;
  mdAndUp: boolean;
  lgAndUp: boolean;
  xlAndUp: boolean;
}

export const DASAR_DEFAULT_BREAKPOINTS: DasarBreakpointThresholds = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1200,
};

export const computeBreakpointState = (
  width: number,
  height: number,
  thresholds: DasarBreakpointThresholds,
): DasarBreakpointState => {
  const name: DasarBreakpointName =
    width >= thresholds.xl
      ? 'xl'
      : width >= thresholds.lg
        ? 'lg'
        : width >= thresholds.md
          ? 'md'
          : width >= thresholds.sm
            ? 'sm'
            : 'xs';
  return {
    width,
    height,
    name,
    xs: name === 'xs',
    sm: name === 'sm',
    md: name === 'md',
    lg: name === 'lg',
    xl: name === 'xl',
    smAndDown: width < thresholds.md,
    mdAndDown: width < thresholds.lg,
    lgAndDown: width < thresholds.xl,
    xlAndDown: true,
    smAndUp: width >= thresholds.sm,
    mdAndUp: width >= thresholds.md,
    lgAndUp: width >= thresholds.lg,
    xlAndUp: width >= thresholds.xl,
  };
};

export const isBreakpointMatch = (
  name: DasarBreakpointName,
  list: DasarBreakpointName[],
): boolean => list.includes(name);

@Injectable({
  providedIn: 'root',
})
export class DasarBreakpointService {
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);
  private themeService = inject(DasarThemeService, { optional: true });
  private isBrowser = isPlatformBrowser(this.platformId);
  private thresholds = signal<DasarBreakpointThresholds>({
    ...DASAR_DEFAULT_BREAKPOINTS,
    ...(this.themeService?.rawThemeVariable()?.breakpoints ?? {}),
  });
  private rafId: number | null = null;
  private onResize = () => {
    if (this.rafId !== null) return;
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      this.readWindow();
    });
  };

  private innerWidth = signal(0);
  private innerHeight = signal(0);

  readonly width = this.innerWidth.asReadonly();
  readonly height = this.innerHeight.asReadonly();
  readonly state = computed(() =>
    computeBreakpointState(this.innerWidth(), this.innerHeight(), this.thresholds()),
  );
  readonly name = computed(() => this.state().name);
  readonly xs = computed(() => this.state().xs);
  readonly sm = computed(() => this.state().sm);
  readonly md = computed(() => this.state().md);
  readonly lg = computed(() => this.state().lg);
  readonly xl = computed(() => this.state().xl);
  readonly smAndDown = computed(() => this.state().smAndDown);
  readonly mdAndDown = computed(() => this.state().mdAndDown);
  readonly lgAndDown = computed(() => this.state().lgAndDown);
  readonly xlAndDown = computed(() => this.state().xlAndDown);
  readonly smAndUp = computed(() => this.state().smAndUp);
  readonly mdAndUp = computed(() => this.state().mdAndUp);
  readonly lgAndUp = computed(() => this.state().lgAndUp);
  readonly xlAndUp = computed(() => this.state().xlAndUp);

  constructor() {
    const sub = this.themeService?.theme$.subscribe((config) => {
      if (config?.breakpoints) this.setBreakpoints(config.breakpoints);
    });
    if (sub) this.destroyRef.onDestroy(() => sub.unsubscribe());
    if (!this.isBrowser) return;
    this.readWindow();
    window.addEventListener('resize', this.onResize);
    this.destroyRef.onDestroy(() => {
      window.removeEventListener('resize', this.onResize);
      if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    });
  }

  setBreakpoints(partial: DasarThemeBreakpoints): void {
    this.thresholds.update((current) => ({ ...current, ...partial }));
  }

  private readWindow(): void {
    this.innerWidth.set(window.innerWidth);
    this.innerHeight.set(window.innerHeight);
  }
}
