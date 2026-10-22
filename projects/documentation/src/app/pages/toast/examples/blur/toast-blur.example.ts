import { Component, inject } from '@angular/core';
import { DasarButtonComponent, DasarToastComponent, DasarToastService } from 'dasar-ui';

@Component({
  selector: 'app-toast-blur-fire',
  imports: [DasarButtonComponent],
  template: `<dasar-button size="sm" (click)="show()">Show blurred toast</dasar-button>`,
  standalone: true,
})
export class ToastBlurFire {
  private toast = inject(DasarToastService);

  protected show() {
    this.toast.create({
      label: 'Blurred surface',
      caption: 'The page behind is blurred.',
      icon: 'info-circle',
    });
  }
}

@Component({
  templateUrl: './toast-blur.example.html',
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
  selector: 'app-toast-blur-example',
  imports: [DasarButtonComponent, DasarToastComponent, ToastBlurFire],
  standalone: true,
})
export class ToastBlurExample {}
