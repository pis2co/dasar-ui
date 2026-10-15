import { Component } from '@angular/core';
import { DasarTabsComponent } from 'dasar-ui';

@Component({
  templateUrl: './tabs-no-body.example.html',
  selector: 'app-tabs-no-body-example',
  imports: [DasarTabsComponent],
  standalone: true,
})
export class TabsNoBodyExample {
  protected items = ['Monthly', 'Quarterly', 'Yearly'];
}
