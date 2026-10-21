import { Component, signal } from '@angular/core';
import { DasarButtonComponent, DasarDrawerComponent, DasarIconComponent } from 'dasar-ui';

@Component({
  templateUrl: './drawer-slots.example.html',
  selector: 'app-drawer-slots-example',
  imports: [DasarDrawerComponent, DasarButtonComponent, DasarIconComponent],
  standalone: true,
})
export class DrawerSlotsExample {
  protected show = signal(false);
}
