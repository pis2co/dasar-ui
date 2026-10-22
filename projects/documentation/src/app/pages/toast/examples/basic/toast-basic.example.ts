import { Component, inject } from '@angular/core';
import { DasarButtonComponent, DasarToastService } from 'dasar-ui';

@Component({
  templateUrl: './toast-basic.example.html',
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
  selector: 'app-toast-basic-example',
  imports: [DasarButtonComponent],
  standalone: true,
})
export class ToastBasicExample {
  private toast = inject(DasarToastService);

  protected show() {
    this.toast.create({
      label: 'Event created',
      caption: 'Sunday, December 3 at 9:00 AM',
    });
  }
}
