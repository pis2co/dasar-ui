import {
  DasarMenuComponent,
  DasarMenuItem,
  DasarIconComponent,
  DasarCardComponent,
  DasarButtonComponent,
} from 'dasar-ui';
import { Component } from '@angular/core';

@Component({
  imports: [DasarMenuComponent, DasarIconComponent, DasarCardComponent, DasarButtonComponent],
  templateUrl: './menu-custom-template.example.html',
  selector: 'app-menu-custom-template-example',
  standalone: true,
})
export class MenuCustomTemplateExample {
  protected customItems: DasarMenuItem[] = [
    { label: 'Quick View', value: 'view' },
    { label: 'Share Link', value: 'share' },
    { divider: true, label: '', value: 'divider' },
    { label: 'Archive Project', value: 'archive' },
  ];

  protected actionItems: DasarMenuItem[] = [
    { label: 'Edit Project', value: 'edit', iconName: 'edit-2' },
    { label: 'Share', value: 'share', iconName: 'share-2' },
    { divider: true, label: '', value: 'divider' },
    { label: 'Delete', value: 'delete', iconName: 'trash', disabled: true },
  ];

  onMenuClick(item: DasarMenuItem) {
    alert(`You clicked on: ${item.label}`);
  }

  onActionClick(item: DasarMenuItem) {
    console.log('Action clicked:', item.value);
  }
}
