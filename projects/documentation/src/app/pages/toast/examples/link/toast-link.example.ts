import { Component, inject } from '@angular/core';
import { DasarButtonComponent, DasarToastService } from 'dasar-ui';

@Component({
  templateUrl: './toast-link.example.html',
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
  selector: 'app-toast-link-example',
  imports: [DasarButtonComponent],
  standalone: true,
})
export class ToastLinkExample {
  private toast = inject(DasarToastService);

  protected show() {
    this.toast.create({
      label: 'New release',
      caption: 'Open the button docs',
      to: '/components/button',
      icon: 'bell',
      variant: 'primary',
      closeable: true,
    });
  }
}
