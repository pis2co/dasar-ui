import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { DasarButtonComponent, DasarToastContext, DasarToastService } from 'dasar-ui';

@Component({
  templateUrl: './toast-action.example.html',
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
  selector: 'app-toast-action-example',
  imports: [DasarButtonComponent],
  standalone: true,
})
export class ToastActionExample {
  private toast = inject(DasarToastService);
  @ViewChild('undo', { static: true }) private undo!: TemplateRef<DasarToastContext>;

  protected show() {
    this.toast.create({
      label: 'Event created',
      caption: 'Sunday, December 3 at 9:00 AM',
      content: this.undo,
      closeable: true,
    });
  }
}
