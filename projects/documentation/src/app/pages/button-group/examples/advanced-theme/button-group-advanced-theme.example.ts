import { Component } from '@angular/core';
import {
  DasarButtonComponent,
  DasarButtonGroupComponent,
  DasarComponentConfig,
  DasarThemeConfig,
  DasarThemeProviderComponent,
} from 'dasar-ui';

@Component({
  templateUrl: './button-group-advanced-theme.example.html',
  selector: 'app-button-group-advanced-theme-example',
  imports: [DasarThemeProviderComponent, DasarButtonGroupComponent, DasarButtonComponent],
  standalone: true,
})
export class ButtonGroupAdvancedThemeExample {
  protected componentConfig: DasarComponentConfig = {
    buttonGroup: { size: 'sm', appearance: 'outline' },
  };

  protected tokenConfig: DasarThemeConfig['tokens'] = {
    light: {
      buttonGroup: { radius: '999px', gap: '12px' },
    },
  };
}
