import { Component, inject } from '@angular/core';
import { DasarButtonComponent, DasarToastService } from 'dasar-ui';

@Component({
  templateUrl: './toast-appearance.example.html',
  styles: [
    `
      .toast-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
    `,
  ],
  selector: 'app-toast-appearance-example',
  imports: [DasarButtonComponent],
  standalone: true,
})
export class ToastAppearanceExample {
  private toast = inject(DasarToastService);

  protected show(appearance: 'solid' | 'elevated') {
    this.toast.create({
      label: `${appearance === 'elevated' ? 'Elevated' : 'Solid'} Toast`,
      caption: `Rendered with ${appearance} appearance style.`,
      icon: appearance === 'elevated' ? 'sparkles' : 'info-circle',
      closeable: true,
      appearance,
    } as any);
  }
}
