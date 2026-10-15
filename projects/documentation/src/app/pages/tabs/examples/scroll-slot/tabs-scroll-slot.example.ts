import { Component, signal } from '@angular/core';
import { DasarTabsComponent } from 'dasar-ui';

@Component({
  templateUrl: './tabs-scroll-slot.example.html',
  selector: 'app-tabs-scroll-slot-example',
  imports: [DasarTabsComponent],
  standalone: true,
})
export class TabsScrollSlotExample {
  protected items = [
    'First',
    'Second',
    'Third',
    'Fourth',
    'Fifth',
    'Sixth',
    'Seventh',
    'Eighth',
    'Ninth',
    'Tenth',
    'Eleventh',
    'Twelfth',
  ];
  protected active = signal(0);
}
