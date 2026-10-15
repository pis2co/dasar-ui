import { Component } from '@angular/core';
import {
  DasarComponentConfig,
  DasarListComponent,
  DasarThemeConfig,
  DasarThemeProviderComponent,
} from 'dasar-ui';

@Component({
  templateUrl: './list-radius-theme.example.html',
  selector: 'app-list-radius-theme-example',
  imports: [DasarThemeProviderComponent, DasarListComponent],
  standalone: true,
})
export class ListRadiusThemeExample {
  protected items = ['Design', 'Engineering'];

  protected componentConfig: DasarComponentConfig = {
    list: { radius: 'xl', bordered: true },
  };

  protected tokenConfig: DasarThemeConfig['tokens'] = {
    light: {
      list: {
        radiusXl: '28px',
      },
    },
  };
}
