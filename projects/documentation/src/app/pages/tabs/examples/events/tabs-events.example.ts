import { Component, signal } from '@angular/core';
import { DasarTabsComponent } from 'dasar-ui';

@Component({
  templateUrl: './tabs-events.example.html',
  selector: 'app-tabs-events-example',
  imports: [DasarTabsComponent],
  standalone: true,
})
export class TabsEventsExample {
  protected items = ['First', 'Second', 'Third'];
  protected active = signal(0);
  protected events = signal<string[]>([]);

  protected onClick(index: number) {
    this.events.update((list) => [...list, `onTabsClick(${index})`]);
  }

  protected onChange(index: number) {
    this.active.set(index);
    this.events.update((list) => [...list, `onTabsChange(${index})`]);
  }
}
