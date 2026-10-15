import { Component } from '@angular/core';
import { DasarTabsComponent } from 'dasar-ui';

@Component({
  templateUrl: './tabs-custom-style.example.html',
  selector: 'app-tabs-custom-style-example',
  imports: [DasarTabsComponent],
  standalone: true,
})
export class TabsCustomStyleExample {
  protected items = ['General', 'Advanced', 'Danger Zone'];
}
