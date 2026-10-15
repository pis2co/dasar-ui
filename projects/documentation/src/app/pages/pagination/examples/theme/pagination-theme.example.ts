import { Component, signal } from '@angular/core';
import {
  DasarComponentConfig,
  DasarPaginationComponent,
  DasarThemeConfig,
  DasarThemeProviderComponent,
} from 'dasar-ui';

@Component({
  templateUrl: './pagination-theme.example.html',
  selector: 'app-pagination-theme-example',
  imports: [DasarPaginationComponent, DasarThemeProviderComponent],
  standalone: true,
})
export class PaginationThemeExample {
  protected page = signal(3);

  protected componentConfig: DasarComponentConfig = {
    pagination: { size: 'lg', spacing: 'md', label: 'Page {page} / {count}' },
  };

  protected tokenConfig: DasarThemeConfig['tokens'] = {
    light: {
      pagination: {
        gap: '12px',
        itemMinWidth: '40px',
      },
    },
  };
}
