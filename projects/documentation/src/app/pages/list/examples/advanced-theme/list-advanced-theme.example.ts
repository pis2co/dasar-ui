import { Component } from '@angular/core';
import {
  DasarComponentConfig,
  DasarThemeProviderComponent,
  DasarThemeConfig,
  DasarListComponent,
} from 'dasar-ui';

@Component({
  templateUrl: './list-advanced-theme.example.html',
  selector: 'app-list-advanced-theme-example',
  imports: [DasarThemeProviderComponent, DasarListComponent],
  standalone: true,
})
export class ListAdvancedThemeExample {
  protected items = ['Design', 'Engineering', 'Product'];

  protected componentConfig: DasarComponentConfig = {
    list: { size: 'sm', bordered: true, showDivider: true },
  };

  protected tokenConfig: DasarThemeConfig['tokens'] = {
    light: {
      list: {
        radius: '12px',
        headerBackground: 'var(--dasar-theme-primary-surface-color)',
      },
    },
  };
}
