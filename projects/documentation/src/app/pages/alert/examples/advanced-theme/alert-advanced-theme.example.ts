import { Component } from '@angular/core';
import {
  DasarAlertComponent,
  DasarComponentConfig,
  DasarThemeConfig,
  DasarThemeProviderComponent,
} from 'dasar-ui';

@Component({
  templateUrl: './alert-advanced-theme.example.html',
  selector: 'app-alert-advanced-theme-example',
  imports: [DasarThemeProviderComponent, DasarAlertComponent],
  standalone: true,
})
export class AlertAdvancedThemeExample {
  protected componentConfig: DasarComponentConfig = {
    alert: { closeable: true, iconName: 'info-circle' },
  };

  protected tokenConfig: DasarThemeConfig['tokens'] = {
    light: {
      alert: {
        radius: '12px',
        padding: '16px',
        primaryBg: 'var(--dasar-primary-100)',
        primaryBorder: 'var(--dasar-primary-300)',
      },
    },
  };
}
