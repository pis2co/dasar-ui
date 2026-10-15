import { Component } from '@angular/core';
import {
  DasarButtonComponent,
  DasarCardComponent,
  DasarChipComponent,
  DasarComponentConfig,
  DasarThemeConfig,
  DasarThemeProviderComponent,
} from 'dasar-ui';

@Component({
  templateUrl: './theming-custom-tokens.example.html',
  selector: 'app-theming-custom-tokens-example',
  imports: [
    DasarThemeProviderComponent,
    DasarButtonComponent,
    DasarCardComponent,
    DasarChipComponent,
  ],
  standalone: true,
})
export class ThemingCustomTokensExample {
  protected componentConfig: DasarComponentConfig = {
    button: { appearance: 'solid', size: 'sm' },
  };

  protected tokenConfig: DasarThemeConfig['tokens'] = {
    light: {
      common: { primaryColor: '#7c3aed' },
      button: { radiusMd: '999px', fontWeight: '700' },
    },
  };
}
