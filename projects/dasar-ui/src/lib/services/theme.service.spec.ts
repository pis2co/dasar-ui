import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { DasarThemeService } from './theme.service';
import {
  defaultDarkCommonTokens,
  defaultLightCommonTokens,
} from '../components/dasar-theme-provider/dasar-theme-provider';
import { dasarVariables } from '../styles/theme';
import { DasarThemeColors } from '@models/theme.model';

describe('DasarThemeService.themeVariable', () => {
  let service: DasarThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    });
    service = TestBed.inject(DasarThemeService);
  });

  it('returns full library defaults when consumer provided nothing', () => {
    const cfg = service.themeVariable();
    expect(cfg.mode).toBe('light');
    expect(cfg.colors?.primary.base).toBe(dasarVariables.colors.primary.base);
    expect(cfg.tokens?.light?.common?.primaryColor).toBe(defaultLightCommonTokens.primaryColor);
    expect(cfg.tokens?.dark?.common?.primaryColor).toBe(defaultDarkCommonTokens.primaryColor);
    expect(cfg.components).toEqual({});
  });

  it('consumer values override defaults, other defaults remain', () => {
    service.setGlobalTheme({
      mode: 'dark',
      colors: { primary: { base: '#7c3aed' } } as DasarThemeColors,
      tokens: { light: { common: { primaryColor: '#7c3aed' } } },
      components: { common: { size: 'sm' } },
    });
    const cfg = service.themeVariable();
    expect(cfg.mode).toBe('dark');
    expect(cfg.colors?.primary.base).toBe('#7c3aed');
    expect(cfg.colors?.primary[500]).toBe(dasarVariables.colors.primary[500]);
    expect(cfg.colors?.neutral.base).toBe(dasarVariables.colors.neutral.base);
    expect(cfg.tokens?.light?.common?.primaryColor).toBe('#7c3aed');
    expect(cfg.tokens?.light?.common?.fontSans).toBe(defaultLightCommonTokens.fontSans);
    expect(cfg.tokens?.dark?.common?.primaryColor).toBe(defaultDarkCommonTokens.primaryColor);
    expect(cfg.components?.common?.size).toBe('sm');
  });

  it('rawThemeVariable returns only the consumer config', () => {
    service.setGlobalTheme({ mode: 'light', components: { button: { size: 'lg' } } });
    expect(service.rawThemeVariable()).toEqual({
      mode: 'light',
      components: { button: { size: 'lg' } },
    });
  });

  it('does not mutate library defaults between calls', () => {
    const first = service.themeVariable();
    first.colors!.primary.base = '#000000';
    first.tokens!.light!.common!.primaryColor = '#000000';
    const second = service.themeVariable();
    expect(second.colors?.primary.base).toBe(dasarVariables.colors.primary.base);
    expect(second.tokens?.light?.common?.primaryColor).toBe(defaultLightCommonTokens.primaryColor);
    expect(dasarVariables.colors.primary.base).not.toBe('#000000');
  });
});

describe('DasarThemeService component tokens', () => {
  let service: DasarThemeService;
  const root = () => document.documentElement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DasarThemeService);
  });

  afterEach(() => {
    root().removeAttribute('data-theme');
    [
      '--tabs-gap-normal',
      '--tabs-scroll-gap',
      '--overlay-blur',
      '--overlay-background',
      '--modal-background',
      '--modal-width-md',
    ].forEach((cssVar) => root().style.removeProperty(cssVar));
  });

  it('injects tabs, overlay and modal tokens on the document root', () => {
    service.setGlobalTheme({
      mode: 'light',
      tokens: {
        light: {
          tabs: { gapNormal: '9px', scrollGap: '7px' },
          overlay: { blur: '7px', background: 'rgba(1, 2, 3, 0.5)' },
          modal: { background: 'red', widthMd: '480px' },
        },
      },
    });

    expect(root().style.getPropertyValue('--tabs-gap-normal')).toBe('9px');
    expect(root().style.getPropertyValue('--tabs-scroll-gap')).toBe('7px');
    expect(root().style.getPropertyValue('--overlay-blur')).toBe('7px');
    expect(root().style.getPropertyValue('--overlay-background')).toBe('rgba(1, 2, 3, 0.5)');
    expect(root().style.getPropertyValue('--modal-background')).toBe('red');
    expect(root().style.getPropertyValue('--modal-width-md')).toBe('480px');
    expect(root().getAttribute('data-theme')).toBeNull();
  });

  it('injects dark mode tokens under the dark mode', () => {
    service.setGlobalTheme({
      mode: 'dark',
      tokens: {
        dark: { modal: { background: 'navy' } },
        light: { modal: { background: 'red' } },
      },
    });

    expect(root().getAttribute('data-theme')).toBe('dark');
    expect(root().style.getPropertyValue('--modal-background')).toBe('navy');
  });

  it('ignores unknown token keys', () => {
    service.setGlobalTheme({
      mode: 'light',
      tokens: { light: { modal: { notARealToken: 'x' } as any } },
    });

    expect(root().style.getPropertyValue('--modal-not-a-real-token')).toBe('');
  });
});
