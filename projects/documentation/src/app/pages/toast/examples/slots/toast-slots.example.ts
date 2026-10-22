import { Component, inject } from '@angular/core';
import { DasarButtonComponent, DasarToastComponent, DasarToastService } from 'dasar-ui';

@Component({
  selector: 'app-toast-slots-fire',
  imports: [DasarButtonComponent],
  template: `<dasar-button size="sm" (click)="show()">Show toast</dasar-button>`,
  standalone: true,
})
export class ToastSlotsFire {
  private toast = inject(DasarToastService);

  protected show() {
    this.toast.create({ label: 'Slots', caption: 'Every part is replaced.', duration: 0 });
  }
}

@Component({
  templateUrl: './toast-slots.example.html',
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
  selector: 'app-toast-slots-example',
  imports: [DasarButtonComponent, DasarToastComponent, ToastSlotsFire],
  standalone: true,
})
export class ToastSlotsExample {}
