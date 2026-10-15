import { Component } from '@angular/core';
import { DasarTabsComponent } from 'dasar-ui';

@Component({
  templateUrl: './tabs-fluid.example.html',
  selector: 'app-tabs-fluid-example',
  imports: [DasarTabsComponent],
  standalone: true,
})
export class TabsFluidExample {
  protected items = ['All', 'Active', 'Archived'];
}
