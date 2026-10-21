import { Component, signal } from '@angular/core';
import {
  DasarComponentConfig,
  DasarSwitchComponent,
  DasarThemeConfig,
  DasarThemeProviderComponent,
} from 'dasar-ui';

@Component({
  templateUrl: './switch-theme.example.html',
  selector: 'app-switch-theme-example',
  imports: [DasarSwitchComponent, DasarThemeProviderComponent],
  standalone: true,
})
export class SwitchThemeExample {
  protected checked = signal(true);

  protected componentConfig: DasarComponentConfig = {
    switch: { size: 'lg' },
  };

  protected tokenConfig: DasarThemeConfig['tokens'] = {
    light: {
      switch: {
        trackCheckedBg: 'var(--dasar-theme-success-color)',
      },
    },
  };
}
