import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DasarComponentConfig, DasarThemeConfig, DasarThemeMode } from 'dasar-ui';

export type DocSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type DocRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface DocCustomizeSettings {
  size: DocSize | null;
  radius: DocRadius | null;
  buttonAppearance: 'solid' | 'subtle' | 'outline' | null;
  inputAppearance: 'outline' | 'filled' | null;
  cardAppearance: 'outline' | 'borderless' | 'elevated' | null;
  tabsAppearance: 'solid' | 'subtle' | 'outline' | null;
  tabsSize: DocSize | null;
  tabsSpacing: 'normal' | 'compact' | null;
  listSize: 'sm' | 'md' | 'lg' | null;
  listBordered: boolean | null;
  listDivider: boolean | null;
  primaryColor: string | null;
  fontSizeBase: string | null;
  fontSans: string | null;
}

export const DOC_DEFAULT_SETTINGS: DocCustomizeSettings = {
  size: null,
  radius: null,
  buttonAppearance: null,
  inputAppearance: null,
  cardAppearance: null,
  tabsAppearance: null,
  tabsSize: null,
  tabsSpacing: null,
  listSize: null,
  listBordered: null,
  listDivider: null,
  primaryColor: null,
  fontSizeBase: null,
  fontSans: null,
};

const STORAGE_KEY = 'dasar-docs-customize';
const MODE_STORAGE_KEY = 'dasar-docs-mode';

@Injectable({ providedIn: 'root' })
export class DocCustomizeService {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly settings = signal<DocCustomizeSettings>(this.load());
  readonly mode = signal<DasarThemeMode>(this.loadMode());
  readonly renderKey = signal(0);

  readonly componentConfig = computed<DasarComponentConfig>(() => {
    const s = this.settings();
    const config: DasarComponentConfig = { common: {} };
    if (s.size) config.common!.size = s.size;
    if (s.radius) config.common!.radius = s.radius;
    if (s.buttonAppearance) config.button = { appearance: s.buttonAppearance };
    if (s.inputAppearance) config.input = { appearance: s.inputAppearance };
    if (s.cardAppearance) config.card = { appearance: s.cardAppearance };
    if (s.tabsAppearance || s.tabsSize || s.tabsSpacing) {
      config.tabs = {};
      if (s.tabsAppearance) config.tabs.appearance = s.tabsAppearance;
      if (s.tabsSize) config.tabs.size = s.tabsSize;
      if (s.tabsSpacing) config.tabs.spacing = s.tabsSpacing;
    }
    if (s.listSize || s.listBordered !== null || s.listDivider !== null) {
      config.list = {};
      if (s.listSize) config.list.size = s.listSize;
      if (s.listBordered !== null) config.list.bordered = s.listBordered;
      if (s.listDivider !== null) config.list.showDivider = s.listDivider;
    }
    return config;
  });

  readonly tokenConfig = computed<DasarThemeConfig['tokens']>(() => {
    const s = this.settings();
    const common: Record<string, string> = {};
    if (s.primaryColor) common['primaryColor'] = s.primaryColor;
    if (s.fontSizeBase) common['fontSizeBase'] = s.fontSizeBase;
    if (s.fontSans) common['fontSans'] = s.fontSans;
    return { light: { common }, dark: { common } };
  });

  apply(next: DocCustomizeSettings) {
    this.settings.set({ ...next });
    this.save(next);
    this.renderKey.update((v) => v + 1);
  }

  reset() {
    this.apply({ ...DOC_DEFAULT_SETTINGS });
  }

  toggleMode() {
    const next: DasarThemeMode = this.mode() === 'light' ? 'dark' : 'light';
    this.mode.set(next);
    if (this.isBrowser) localStorage.setItem(MODE_STORAGE_KEY, next);
  }

  private load(): DocCustomizeSettings {
    if (!this.isBrowser) return { ...DOC_DEFAULT_SETTINGS };
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...DOC_DEFAULT_SETTINGS, ...JSON.parse(raw) } : { ...DOC_DEFAULT_SETTINGS };
    } catch {
      return { ...DOC_DEFAULT_SETTINGS };
    }
  }

  private loadMode(): DasarThemeMode {
    if (!this.isBrowser) return 'light';
    return localStorage.getItem(MODE_STORAGE_KEY) === 'dark' ? 'dark' : 'light';
  }

  private save(s: DocCustomizeSettings) {
    if (this.isBrowser) localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  }
}
