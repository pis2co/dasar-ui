import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  DasarButtonComponent,
  DasarListComponent,
  DasarRadioComponent,
  DasarRadioGroupComponent,
} from 'dasar-ui';

@Component({
  templateUrl: './list-scroll-to-value.example.html',
  selector: 'app-list-scroll-to-value-example',
  imports: [
    FormsModule,
    DasarButtonComponent,
    DasarListComponent,
    DasarRadioComponent,
    DasarRadioGroupComponent,
  ],
  standalone: true,
})
export class ListScrollToValueExample {
  protected members = Array.from({ length: 30 }, (_, i) => `Member ${i + 1}`);
  protected selected = signal('Member 18');
  protected offset = signal(16);
  protected log = signal<string[]>([]);

  protected jump() {
    this.selected.set('Member 25');
  }

  protected onScroll(event: { reason: string; scrollTop: number }) {
    this.log.set([`${event.reason}: ${Math.round(event.scrollTop)}px`, ...this.log()].slice(0, 5));
  }
}
