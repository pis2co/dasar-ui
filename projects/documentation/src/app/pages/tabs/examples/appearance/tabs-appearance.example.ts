import { Component } from '@angular/core';
import { DasarTabsComponent, DasarTabsAppearanceType } from 'dasar-ui';

@Component({
  templateUrl: './tabs-appearance.example.html',
  selector: 'app-tabs-appearance-example',
  imports: [DasarTabsComponent],
  standalone: true,
})
export class TabsAppearanceExample {
  protected appearances: DasarTabsAppearanceType[] = ['solid', 'subtle', 'outline'];
  protected items = ['Home', 'Search', 'Profile'];
}
