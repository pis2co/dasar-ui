import { Component, signal } from '@angular/core';
import { DasarButtonComponent, DasarDrawerComponent } from 'dasar-ui';

@Component({
  templateUrl: './drawer-resizable.example.html',
  selector: 'app-drawer-resizable-example',
  imports: [DasarDrawerComponent, DasarButtonComponent],
  standalone: true,
})
export class DrawerResizableExample {
  protected show = signal(false);
  protected width = signal<number | null>(null);
}
