import { Component, signal } from '@angular/core';
import {
  DasarButtonComponent,
  DasarCardComponent,
  DasarThemeConfig,
  DasarThemeMode,
  DasarThemeProviderComponent,
} from 'dasar-ui';

@Component({
  templateUrl: './theming-light-dark.example.html',
  selector: 'app-theming-light-dark-example',
  imports: [DasarThemeProviderComponent, DasarButtonComponent, DasarCardComponent],
  standalone: true,
})
export class ThemingLightDarkExample {
  protected mode = signal<DasarThemeMode>('light');

  protected tokenConfig: DasarThemeConfig['tokens'] = {
    light: {
      common: { primaryColor: '#2563eb' },
    },
    dark: {
      common: { primaryColor: '#60a5fa' },
    },
  };

  protected toggle() {
    this.mode.update((current) => (current === 'light' ? 'dark' : 'light'));
  }
}
