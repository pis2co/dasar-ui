import { Component, inject } from '@angular/core';
import { DasarButtonComponent, DasarToastComponent, DasarToastService } from 'dasar-ui';

@Component({
  selector: 'app-toast-max-fire',
  imports: [DasarButtonComponent],
  template: `<dasar-button size="sm" (click)="show()">Create 4 toasts (max 2)</dasar-button>`,
  standalone: true,
})
export class ToastMaxFire {
  private toast = inject(DasarToastService);

  protected show() {
    for (let n = 1; n <= 4; n++) {
      this.toast.create({
        label: `Toast ${n}`,
        caption: n > 2 ? 'Was queued' : 'Shown at once',
        duration: 3000,
      });
    }
  }
}

@Component({
  templateUrl: './toast-max.example.html',
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
  selector: 'app-toast-max-example',
  imports: [DasarButtonComponent, DasarToastComponent, ToastMaxFire],
  standalone: true,
})
export class ToastMaxExample {}
