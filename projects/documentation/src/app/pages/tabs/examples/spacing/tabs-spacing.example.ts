import { Component } from '@angular/core';
import { DasarTabsComponent, DasarTabsSpacingType } from 'dasar-ui';

@Component({
  templateUrl: './tabs-spacing.example.html',
  selector: 'app-tabs-spacing-example',
  imports: [DasarTabsComponent],
  standalone: true,
})
export class TabsSpacingExample {
  protected spacings: DasarTabsSpacingType[] = ['normal', 'compact'];
  protected items = ['Daily', 'Weekly', 'Monthly'];
}
