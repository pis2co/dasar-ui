import { Component, inject } from '@angular/core';
import { DasarButtonComponent, DasarToastService } from 'dasar-ui';

@Component({
  templateUrl: './toast-duration.example.html',
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
  selector: 'app-toast-duration-example',
  imports: [DasarButtonComponent],
  standalone: true,
})
export class ToastDurationExample {
  private toast = inject(DasarToastService);

  protected short() {
    this.toast.create({ label: 'Gone in 1 second', duration: 1000 });
  }

  protected persistent() {
    this.toast.create({
      label: 'Stays open',
      caption: 'Close it yourself.',
      duration: 0,
      closeable: true,
    });
  }

  protected noPause() {
    this.toast.create({ label: 'Hover does not pause', duration: 3000, aliveOnHover: false });
  }
}
