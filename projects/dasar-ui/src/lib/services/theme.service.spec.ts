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
