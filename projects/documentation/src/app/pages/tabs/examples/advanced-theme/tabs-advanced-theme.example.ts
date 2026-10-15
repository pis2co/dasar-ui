import { Component } from '@angular/core';
import { DasarThemeProviderComponent, DasarTabsComponent, DasarComponentConfig } from 'dasar-ui';

@Component({
  templateUrl: './tabs-advanced-theme.example.html',
  selector: 'app-tabs-advanced-theme-example',
  imports: [DasarThemeProviderComponent, DasarTabsComponent],
  standalone: true,
})
export class TabsAdvancedThemeExample {
  protected items = ['Design', 'Engineering', 'Product'];

  protected componentConfig: DasarComponentConfig = {
    tabs: {
      appearance: 'outline',
      size: 'sm',
      spacing: 'compact',
    },
  };
}
