import { Component, signal } from '@angular/core';
import { DasarButtonComponent, DasarDrawerComponent } from 'dasar-ui';

@Component({
  templateUrl: './drawer-basic.example.html',
  selector: 'app-drawer-basic-example',
  imports: [DasarDrawerComponent, DasarButtonComponent],
  standalone: true,
})
export class DrawerBasicExample {
  protected show = signal(false);
}
