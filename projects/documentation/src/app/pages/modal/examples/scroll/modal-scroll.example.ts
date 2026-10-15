import { Component, signal } from '@angular/core';
import { DasarModalComponent, DasarButtonComponent } from 'dasar-ui';

@Component({
  templateUrl: './modal-scroll.example.html',
  selector: 'app-modal-scroll-example',
  imports: [DasarModalComponent, DasarButtonComponent],
  standalone: true,
})
export class ModalScrollExample {
  protected open = signal(false);
  protected paragraphs = Array.from({ length: 40 }, (_, i) => i + 1);
}
