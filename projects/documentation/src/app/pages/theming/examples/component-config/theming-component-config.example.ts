import { Component } from '@angular/core';
import {
  DasarButtonComponent,
  DasarCardComponent,
  DasarComponentConfig,
  DasarThemeProviderComponent,
} from 'dasar-ui';

@Component({
  templateUrl: './theming-component-config.example.html',
  selector: 'app-theming-component-config-example',
  imports: [DasarThemeProviderComponent, DasarButtonComponent, DasarCardComponent],
  standalone: true,
})
export class ThemingComponentConfigExample {
  protected componentConfig: DasarComponentConfig = {
    button: { appearance: 'outline', size: 'sm' },
    card: { appearance: 'elevated', spacing: 'compact' },
  };
}
