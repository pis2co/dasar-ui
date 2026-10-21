import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarThemeProviderComponent } from './dasar-theme-provider';
import { DasarThemeConfig, DasarThemeMode } from '@models/theme.model';

@Component({
  selector: 'app-theme-provider-host',
  standalone: true,
  imports: [DasarThemeProviderComponent],
  template: `<dasar-theme-provider
    [mode]="mode()"
    [tokenConfig]="tokens()"
  ></dasar-theme-provider>`,
})
class ThemeProviderHost {
  mode = signal<DasarThemeMode>('light');
  tokens = signal<DasarThemeConfig['tokens']>({});
}

describe('DasarThemeProviderComponent component tokens', () => {
  let fixture: ComponentFixture<ThemeProviderHost>;
  const host = () => fixture.nativeElement.querySelector('dasar-theme-provider') as HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeProviderHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeProviderHost);
    await fixture.whenStable();
  });

  it('injects tabs, overlay and modal tokens on its host element', async () => {
    fixture.componentInstance.tokens.set({
      light: {
        tabs: { listPaddingNormal: '11px', scrollFade: '20px' },
        overlay: { background: 'rgba(9, 9, 9, 0.2)' },
        modal: { titleColor: '#123456', elevatedShadow: 'none' },
      },
    });
    await fixture.whenStable();

    expect(host().style.getPropertyValue('--dasar-tabs-list-padding-normal')).toBe('11px');
    expect(host().style.getPropertyValue('--dasar-tabs-scroll-fade')).toBe('20px');
    expect(host().style.getPropertyValue('--dasar-overlay-background')).toBe('rgba(9, 9, 9, 0.2)');
    expect(host().style.getPropertyValue('--dasar-modal-title-color')).toBe('#123456');
    expect(host().style.getPropertyValue('--dasar-modal-elevated-shadow')).toBe('none');
  });

  it('falls back to the light tokens when the mode has none', async () => {
    fixture.componentInstance.tokens.set({
      light: { overlay: { blur: '3px' }, modal: { widthSm: '240px' } },
    });
    await fixture.whenStable();

    fixture.componentInstance.mode.set('dark');
    await fixture.whenStable();

    expect(host().style.getPropertyValue('--dasar-overlay-blur')).toBe('3px');
    expect(host().style.getPropertyValue('--dasar-modal-width-sm')).toBe('240px');
  });

  it('prefers the dark tokens for the dark mode', async () => {
    fixture.componentInstance.tokens.set({
      light: { modal: { widthSm: '240px' } },
      dark: { modal: { widthSm: '320px' } },
    });
    await fixture.whenStable();

    fixture.componentInstance.mode.set('dark');
    await fixture.whenStable();

    expect(host().style.getPropertyValue('--dasar-modal-width-sm')).toBe('320px');
  });

  it('removes tokens that are no longer part of the config', async () => {
    fixture.componentInstance.tokens.set({ light: { overlay: { blur: '3px' } } });
    await fixture.whenStable();
    expect(host().style.getPropertyValue('--dasar-overlay-blur')).toBe('3px');

    fixture.componentInstance.tokens.set({ light: { overlay: { blur: '9px' } } });
    await fixture.whenStable();
    expect(host().style.getPropertyValue('--dasar-overlay-blur')).toBe('9px');

    fixture.componentInstance.tokens.set({});
    await fixture.whenStable();
    expect(host().style.getPropertyValue('--dasar-overlay-blur')).toBe('');
  });
});

@Component({
  selector: 'app-nested-theme-provider-host',
  standalone: true,
  imports: [DasarThemeProviderComponent],
  template: `
    <dasar-theme-provider id="outer" [mode]="outer()" [tokenConfig]="tokens">
      <dasar-theme-provider id="own" [mode]="inner()"></dasar-theme-provider>
      <dasar-theme-provider id="inherit"></dasar-theme-provider>
    </dasar-theme-provider>
  `,
})
class NestedProviderHost {
  outer = signal<DasarThemeMode | undefined>('light');
  inner = signal<DasarThemeMode | undefined>(undefined);
  tokens: DasarThemeConfig['tokens'] = {
    light: { common: { primaryColor: '#111111' } },
    dark: { common: { primaryColor: '#eeeeee' } },
  };
}

describe('DasarThemeProviderComponent nested modes', () => {
  let fixture: ComponentFixture<NestedProviderHost>;
  const provider = (id: string) => fixture.nativeElement.querySelector(`#${id}`) as HTMLElement;
  const theme = (id: string) => provider(id).getAttribute('data-theme');
  const settle = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [NestedProviderHost] }).compileComponents();
    fixture = TestBed.createComponent(NestedProviderHost);
    await settle();
  });

  it('defaults a top-level provider to light', async () => {
    fixture.componentInstance.outer.set(undefined);
    await settle();

    expect(theme('outer')).toBe('light');
  });

  it('follows the parent when it has no mode of its own', async () => {
    expect(theme('inherit')).toBe('light');

    fixture.componentInstance.outer.set('dark');
    await settle();

    expect(theme('outer')).toBe('dark');
    expect(theme('inherit')).toBe('dark');
    expect(theme('own')).toBe('dark');
  });

  it('uses its own mode inside a parent with another mode', async () => {
    fixture.componentInstance.inner.set('dark');
    await settle();

    expect(theme('outer')).toBe('light');
    expect(theme('own')).toBe('dark');
    expect(theme('inherit')).toBe('light');
  });

  it('keeps its own mode when the parent changes', async () => {
    fixture.componentInstance.inner.set('light');
    fixture.componentInstance.outer.set('dark');
    await settle();

    expect(theme('own')).toBe('light');
    expect(theme('inherit')).toBe('dark');
  });

  it('switches back to the parent mode when its own mode is removed', async () => {
    fixture.componentInstance.inner.set('dark');
    await settle();
    expect(theme('own')).toBe('dark');

    fixture.componentInstance.inner.set(undefined);
    await settle();

    expect(theme('own')).toBe('light');
  });

  it('uses the parent tokens of its own mode', async () => {
    expect(provider('own').style.getPropertyValue('--dasar-theme-primary-color')).toBe('#111111');

    fixture.componentInstance.inner.set('dark');
    await settle();

    expect(provider('own').style.getPropertyValue('--dasar-theme-primary-color')).toBe('#eeeeee');
    expect(provider('outer').style.getPropertyValue('--dasar-theme-primary-color')).toBe('#111111');
  });
});
