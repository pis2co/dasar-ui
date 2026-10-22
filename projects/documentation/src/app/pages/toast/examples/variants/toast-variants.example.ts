import { Component, inject } from '@angular/core';
import { DasarButtonComponent, DasarToastService } from 'dasar-ui';

@Component({
  templateUrl: './toast-variants.example.html',
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
  selector: 'app-toast-variants-example',
  imports: [DasarButtonComponent],
  standalone: true,
})
export class ToastVariantsExample {
  private toast = inject(DasarToastService);

  protected items = [
    { variant: 'primary', icon: 'info-circle' },
    { variant: 'secondary', icon: 'bell' },
    { variant: 'success', icon: 'circle-check' },
    { variant: 'warning', icon: 'alert-triangle' },
    { variant: 'danger', icon: 'circle-x' },
  ] as const;

  protected show(item: (typeof this.items)[number]) {
    this.toast.create({
      label: `${item.variant} toast`,
      caption: 'The icon and the close button follow the variant.',
      icon: item.icon,
      variant: item.variant,
      closeable: true,
    });
  }
}
