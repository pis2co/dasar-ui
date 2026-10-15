import { Component } from '@angular/core';
import {
  DasarRadioComponent,
  DasarRadioGroupComponent,
  DasarComponentConfig,
  DasarThemeConfig,
  DasarThemeProviderComponent,
} from 'dasar-ui';

@Component({
  templateUrl: './radio-advanced-theme.example.html',
  selector: 'app-radio-advanced-theme-example',
  imports: [DasarThemeProviderComponent, DasarRadioComponent, DasarRadioGroupComponent],
  standalone: true,
})
export class RadioAdvancedThemeExample {
  protected componentConfig: DasarComponentConfig = {
    radio: { size: 'lg' },
  };

  protected tokenConfig: DasarThemeConfig['tokens'] = {
    light: {
      radio: {
        checkedColor: 'var(--dasar-success-base)',
        focusColor: 'var(--dasar-success-200)',
        dotSize: '40%',
      },
    },
  };
}
