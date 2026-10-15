import { Component } from '@angular/core';
import { DasarTabsComponent, DasarTabsRadiusType } from 'dasar-ui';

@Component({
  templateUrl: './tabs-radius.example.html',
  selector: 'app-tabs-radius-example',
  imports: [DasarTabsComponent],
  standalone: true,
})
export class TabsRadiusExample {
  protected radii: DasarTabsRadiusType[] = ['none', 'sm', 'md', 'lg', 'full'];
  protected items = ['Day', 'Week', 'Quarter'];
}
