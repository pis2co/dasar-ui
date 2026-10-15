import { Component, signal } from '@angular/core';
import { DasarModalComponent, DasarButtonComponent, DasarModalRadius } from 'dasar-ui';

@Component({
  templateUrl: './modal-radius-spacing.example.html',
  selector: 'app-modal-radius-spacing-example',
  imports: [DasarModalComponent, DasarButtonComponent],
  standalone: true,
})
export class ModalRadiusSpacingExample {
  protected open = signal(false);
  protected radius = signal<DasarModalRadius>('lg');
  protected spacing = signal<'normal' | 'compact'>('normal');

  protected radii: DasarModalRadius[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'];
  protected spacings: Array<'normal' | 'compact'> = ['normal', 'compact'];

  showRadius(radius: DasarModalRadius) {
    this.radius.set(radius);
    this.open.set(true);
  }

  showSpacing(spacing: 'normal' | 'compact') {
    this.spacing.set(spacing);
    this.open.set(true);
  }
}
