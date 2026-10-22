import { Component, inject, signal } from '@angular/core';
import { DasarButtonComponent, DasarToastService } from 'dasar-ui';

@Component({
  templateUrl: './toast-events.example.html',
  styles: [
    `
      .toast-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .toast-log {
        font-size: 12px;
        margin: 8px 0 0;
      }
    `,
  ],
  selector: 'app-toast-events-example',
  imports: [DasarButtonComponent],
  standalone: true,
})
export class ToastEventsExample {
  private toast = inject(DasarToastService);
  protected lines = signal<string[]>([]);

  protected show() {
    this.toast.create({
      label: 'Watch the log',
      closeable: true,
      onEnter: () => this.log('enter'),
      onClose: (_ref, reason) => this.log(`close (${reason})`),
      onLeave: () => this.log('leave'),
    });
  }

  private log(line: string) {
    this.lines.update((items) => [...items.slice(-5), line]);
  }
}
