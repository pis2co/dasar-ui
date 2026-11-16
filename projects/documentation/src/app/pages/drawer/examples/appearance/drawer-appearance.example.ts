import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { DasarButtonComponent, DasarDrawerComponent } from 'dasar-ui';

@Component({
  templateUrl: './drawer-appearance.example.html',
  selector: 'app-drawer-appearance-example',
  imports: [DasarButtonComponent, DasarDrawerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
})
export class DrawerAppearanceExample {
  protected openOutline = signal(false);
  protected openElevated = signal(false);
}
