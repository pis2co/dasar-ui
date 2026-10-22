import { Component, Input, inject, signal } from '@angular/core';
import {
  DasarButtonComponent,
  DasarToastComponent,
  DasarToastPlacement,
  DasarToastService,
} from 'dasar-ui';

@Component({
  selector: 'app-toast-placement-fire',
  imports: [DasarButtonComponent],
  template: `<dasar-button size="sm" (click)="show()">Show toast at {{ placement }}</dasar-button>`,
  standalone: true,
})
export class ToastPlacementFire {
  private toast = inject(DasarToastService);
  @Input() placement = '';

  protected show() {
    this.toast.create({ label: 'Placed toast', caption: this.placement, closeable: true });
  }
}

@Component({
  templateUrl: './toast-placement.example.html',
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
  selector: 'app-toast-placement-example',
  imports: [DasarButtonComponent, DasarToastComponent, ToastPlacementFire],
  standalone: true,
})
export class ToastPlacementExample {
  protected placement = signal<DasarToastPlacement>('bottom-right');
  protected placements: DasarToastPlacement[] = [
    'top-left',
    'top',
    'top-right',
    'bottom-left',
    'bottom',
    'bottom-right',
  ];
}
