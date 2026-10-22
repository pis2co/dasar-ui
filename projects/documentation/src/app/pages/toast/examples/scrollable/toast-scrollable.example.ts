import { Component, inject } from '@angular/core';
import { DasarButtonComponent, DasarToastComponent, DasarToastService } from 'dasar-ui';

@Component({
  selector: 'app-toast-scrollable-fire',
  imports: [DasarButtonComponent],
  template: `<dasar-button size="sm" (click)="show()">Create 20 persistent toasts</dasar-button>
    <dasar-button size="sm" variant="secondary" (click)="toast.destroyEverything()"
      >Clear</dasar-button
    >`,
  standalone: true,
})
export class ToastScrollableFire {
  protected toast = inject(DasarToastService);

  protected show() {
    for (let n = 1; n <= 20; n++) {
      this.toast.create({
        label: `Toast ${n}`,
        caption: 'Scroll the list',
        duration: 0,
        closeable: true,
      });
    }
  }
}

@Component({
  templateUrl: './toast-scrollable.example.html',
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
  selector: 'app-toast-scrollable-example',
  imports: [DasarButtonComponent, DasarToastComponent, ToastScrollableFire],
  standalone: true,
})
export class ToastScrollableExample {}
