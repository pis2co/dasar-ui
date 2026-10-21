import { Component } from '@angular/core';
import {
  DasarComponentConfig,
  DasarSkeletonComponent,
  DasarThemeConfig,
  DasarThemeProviderComponent,
} from 'dasar-ui';

@Component({
  templateUrl: './skeleton-theme.example.html',
  selector: 'app-skeleton-theme-example',
  imports: [DasarSkeletonComponent, DasarThemeProviderComponent],
  standalone: true,
})
export class SkeletonThemeExample {
  protected componentConfig: DasarComponentConfig = {
    skeleton: { type: 'box', size: 'lg' },
  };

  protected tokenConfig: DasarThemeConfig['tokens'] = {
    light: {
      skeleton: {
        baseColor: 'var(--dasar-theme-primary-surface-color)',
        animationDuration: '2.5s',
      },
    },
  };
}
