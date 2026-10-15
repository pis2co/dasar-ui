import { Component } from '@angular/core';
import {
  DasarComponentConfig,
  DasarDividerComponent,
  DasarThemeConfig,
  DasarThemeProviderComponent,
} from 'dasar-ui';

@Component({
  templateUrl: './divider-advanced-theme.example.html',
  selector: 'app-divider-advanced-theme-example',
  imports: [DasarThemeProviderComponent, DasarDividerComponent],
  standalone: true,
})
export class DividerAdvancedThemeExample {
  protected componentConfig: DasarComponentConfig = {
    divider: { dashed: true, labelPlacement: 'left' },
  };

  protected tokenConfig: DasarThemeConfig['tokens'] = {
    light: {
      divider: {
        thickness: '2px',
        color: 'var(--theme-primary-color)',
        labelColor: 'var(--theme-primary-color)',
      },
    },
  };
}
