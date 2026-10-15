import { Component, signal } from '@angular/core';
import { DasarTabsComponent, DasarIconComponent, DasarButtonComponent } from 'dasar-ui';

@Component({
  templateUrl: './tabs-advanced-dynamic.example.html',
  selector: 'app-tabs-advanced-dynamic-example',
  imports: [DasarTabsComponent, DasarIconComponent, DasarButtonComponent],
  standalone: true,
})
export class TabsAdvancedDynamicExample {
  protected tabs = signal(['General', 'Profile', 'Billing', 'Team']);
  protected active = signal(0);

  protected addTab() {
    this.tabs.update((list) => [...list, `Tab ${list.length + 1}`]);
    this.active.set(this.tabs().length - 1);
  }

  protected closeTab(name: string, event: Event) {
    event.stopPropagation();
    const removedIndex = this.tabs().indexOf(name);
    this.tabs.update((list) => list.filter((tab) => tab !== name));
    if (removedIndex <= this.active()) {
      this.active.set(Math.max(0, this.active() - 1));
    }
  }
}
