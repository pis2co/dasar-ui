import { Component, signal } from '@angular/core';
import { DasarTabsComponent, DasarButtonComponent } from 'dasar-ui';

@Component({
  templateUrl: './tabs-scroll.example.html',
  selector: 'app-tabs-scroll-example',
  imports: [DasarTabsComponent, DasarButtonComponent],
  standalone: true,
})
export class TabsScrollExample {
  protected items = [
    'Overview',
    'Activity',
    'Members',
    'Billing',
    'Usage',
    'Integrations',
    'Security',
    'Audit logs',
    'Support',
    'Settings',
    'Profile',
    'Notifications',
    'Templates',
    'Exports',
    'Archive',
  ];
  protected active = signal(0);
  protected narrow = signal(true);
}
