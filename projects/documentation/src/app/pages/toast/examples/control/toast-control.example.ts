import { Component, inject } from '@angular/core';
import { DasarButtonComponent, DasarToastRef, DasarToastService } from 'dasar-ui';

@Component({
  templateUrl: './toast-control.example.html',
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
  selector: 'app-toast-control-example',
  imports: [DasarButtonComponent],
  standalone: true,
})
export class ToastControlExample {
  protected toast = inject(DasarToastService);
  private last: DasarToastRef | null = null;
  private count = 0;

  protected create() {
    this.last = this.toast.create({ label: `Toast ${++this.count}`, duration: 0, closeable: true });
  }

  protected update() {
    this.last?.update({ label: 'Updated', caption: 'The options were merged.' });
  }

  protected destroyLast() {
    if (this.last) this.toast.destroy(this.last);
  }
}
