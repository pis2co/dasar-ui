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
