import { Component, signal } from '@angular/core';
import { DasarButtonComponent, DasarDrawerComponent } from 'dasar-ui';

@Component({
  templateUrl: './drawer-callbacks.example.html',
  selector: 'app-drawer-callbacks-example',
  imports: [DasarDrawerComponent, DasarButtonComponent],
  standalone: true,
})
export class DrawerCallbacksExample {
  protected show = signal(false);
  protected logs = signal<string[]>([]);

  protected log(entry: string) {
    this.logs.update((items) => [...items, entry]);
  }
}
