import { Component, signal } from '@angular/core';
import { DasarTabsComponent } from 'dasar-ui';

@Component({
  templateUrl: './tabs-scroll-icon.example.html',
  selector: 'app-tabs-scroll-icon-example',
  imports: [DasarTabsComponent],
  standalone: true,
})
export class TabsScrollIconExample {
  protected items = [
    'Inbox',
    'Sent',
    'Drafts',
    'Starred',
    'Snoozed',
    'Important',
    'Scheduled',
    'All mail',
    'Spam',
    'Trash',
    'Categories',
    'Labels',
  ];
  protected active = signal(0);
}
