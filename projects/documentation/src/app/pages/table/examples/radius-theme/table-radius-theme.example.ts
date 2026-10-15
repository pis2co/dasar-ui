import { Component } from '@angular/core';
import {
  DasarComponentConfig,
  DasarTableColumn,
  DasarTableComponent,
  DasarThemeConfig,
  DasarThemeProviderComponent,
} from 'dasar-ui';

@Component({
  templateUrl: './table-radius-theme.example.html',
  selector: 'app-table-radius-theme-example',
  imports: [DasarThemeProviderComponent, DasarTableComponent],
  standalone: true,
})
export class TableRadiusThemeExample {
  protected columns: DasarTableColumn[] = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
  ];
  protected data = [
    { firstName: 'Alice', lastName: 'Wonder' },
    { firstName: 'Bob', lastName: 'Builder' },
    { firstName: 'Carol', lastName: 'Danvers' },
  ];

  protected componentConfig: DasarComponentConfig = {
    table: { radius: 'xl' },
  };

  protected tokenConfig: DasarThemeConfig['tokens'] = {
    light: {
      table: {
        containerRadiusXl: '28px',
      },
    },
  };
}
