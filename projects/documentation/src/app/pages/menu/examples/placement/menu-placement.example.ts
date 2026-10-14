import { DasarMenuComponent, DasarMenuItem } from 'dasar-ui';
import { Component } from '@angular/core';

@Component({
  templateUrl: './menu-placement.example.html',
  selector: 'app-menu-placement-example',
  imports: [DasarMenuComponent],
  standalone: true,
})
export class MenuPlacementExample {
  protected menuItems: DasarMenuItem[] = [
    { label: 'Edit', value: 'edit' },
    { label: 'Duplicate', value: 'duplicate' },
    { label: 'Delete', value: 'delete', disabled: true },
  ];
}
