import { Component, signal } from '@angular/core';
import { DasarAlertComponent, DasarButtonComponent } from 'dasar-ui';

@Component({
  templateUrl: './alert-closeable.example.html',
  selector: 'app-alert-closeable-example',
  imports: [DasarAlertComponent, DasarButtonComponent],
  standalone: true,
})
export class AlertCloseableExample {
  protected show = signal(true);
  protected log = signal<string[]>([]);

  protected handleClose() {
    this.log.update((entries) => [...entries, 'onClose']);
  }

  protected handleAfterLeave() {
    this.log.update((entries) => [...entries, 'onAfterLeave']);
    this.show.set(false);
  }

  protected reset() {
    this.show.set(true);
    this.log.set([]);
  }
}
