import { Component, signal } from '@angular/core';
import { DasarTabsComponent } from 'dasar-ui';

@Component({
  templateUrl: './tabs-basic.example.html',
  selector: 'app-tabs-basic-example',
  imports: [DasarTabsComponent],
  standalone: true,
})
export class TabsBasicExample {
  protected items = ['Overview', 'Details', 'Reviews'];
  protected active = signal(0);
}
