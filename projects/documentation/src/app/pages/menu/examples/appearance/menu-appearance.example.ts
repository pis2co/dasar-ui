import { Component } from '@angular/core';
import { DasarMenuComponent, DasarButtonComponent, DasarMenuItem } from 'dasar-ui';

@Component({
  templateUrl: './menu-appearance.example.html',
  selector: 'app-menu-appearance-example',
  imports: [DasarMenuComponent, DasarButtonComponent],
  standalone: true,
})
export class MenuAppearanceExample {
  protected menuItems: DasarMenuItem[] = [
    { label: 'Profile', value: 'profile', iconName: 'user' },
    { label: 'Settings', value: 'settings', iconName: 'settings' },
    { divider: true, label: '', value: 'divider' },
    { label: 'Logout', value: 'logout', iconName: 'log-out' },
  ];
}
