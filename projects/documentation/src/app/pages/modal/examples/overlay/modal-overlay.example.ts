import { Component, signal } from '@angular/core';
import { DasarModalComponent, DasarButtonComponent } from 'dasar-ui';

@Component({
  templateUrl: './modal-overlay.example.html',
  selector: 'app-modal-overlay-example',
  imports: [DasarModalComponent, DasarButtonComponent],
  standalone: true,
})
export class ModalOverlayExample {
  protected open = signal(false);
  protected blur = signal('4px');
  protected background = signal('rgba(0, 0, 0, 0.45)');
}
