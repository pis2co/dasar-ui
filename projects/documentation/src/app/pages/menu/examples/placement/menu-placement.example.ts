import { Component } from '@angular/core';
import { DasarMenuComponent, DasarButtonComponent, DasarMenuItem } from 'dasar-ui';

@Component({
  templateUrl: './menu-placement.example.html',
  selector: 'app-menu-placement-example',
  imports: [DasarMenuComponent, DasarButtonComponent],
  standalone: true,
})
export class MenuPlacementExample {
  protected menuItems: DasarMenuItem[] = [
    { label: 'Edit', value: 'edit' },
    { label: 'Duplicate', value: 'duplicate' },
    { label: 'Delete', value: 'delete', disabled: true },
  ];
}
