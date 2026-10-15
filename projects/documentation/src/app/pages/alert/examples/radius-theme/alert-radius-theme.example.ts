import { Component } from '@angular/core';
import {
  DasarAlertComponent,
  DasarComponentConfig,
  DasarThemeConfig,
  DasarThemeProviderComponent,
} from 'dasar-ui';

@Component({
  templateUrl: './alert-radius-theme.example.html',
  selector: 'app-alert-radius-theme-example',
  imports: [DasarThemeProviderComponent, DasarAlertComponent],
  standalone: true,
})
export class AlertRadiusThemeExample {
  protected componentConfig: DasarComponentConfig = {
    alert: { radius: 'xl' },
  };

  protected tokenConfig: DasarThemeConfig['tokens'] = {
    light: {
      alert: {
        radiusXl: '28px',
      },
    },
  };
}
