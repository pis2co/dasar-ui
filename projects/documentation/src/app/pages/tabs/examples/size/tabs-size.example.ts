import { Component } from '@angular/core';
import { DasarTabsComponent, DasarTabsSizeType } from 'dasar-ui';

@Component({
  templateUrl: './tabs-size.example.html',
  selector: 'app-tabs-size-example',
  imports: [DasarTabsComponent],
  standalone: true,
})
export class TabsSizeExample {
  protected sizes: DasarTabsSizeType[] = ['xs', 'sm', 'md', 'lg', 'xl'];
  protected items = ['Inbox', 'Sent', 'Drafts'];
}
