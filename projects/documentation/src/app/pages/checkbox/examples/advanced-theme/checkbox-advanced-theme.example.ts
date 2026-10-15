import { Component } from '@angular/core';
import {
  DasarCheckboxComponent,
  DasarCheckboxGroupComponent,
  DasarComponentConfig,
  DasarThemeConfig,
  DasarThemeProviderComponent,
} from 'dasar-ui';

@Component({
  templateUrl: './checkbox-advanced-theme.example.html',
  selector: 'app-checkbox-advanced-theme-example',
  imports: [DasarThemeProviderComponent, DasarCheckboxComponent, DasarCheckboxGroupComponent],
  standalone: true,
})
export class CheckboxAdvancedThemeExample {
  protected componentConfig: DasarComponentConfig = {
    checkbox: { size: 'lg' },
  };

  protected tokenConfig: DasarThemeConfig['tokens'] = {
    light: {
      checkbox: {
        radius: '999px',
        checkedBg: 'var(--dasar-success-base)',
        focusColor: 'var(--dasar-success-200)',
      },
    },
  };
}
