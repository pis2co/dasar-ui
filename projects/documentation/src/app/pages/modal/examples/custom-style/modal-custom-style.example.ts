import { Component, signal } from '@angular/core';
import { DasarModalComponent, DasarButtonComponent } from 'dasar-ui';

@Component({
  templateUrl: './modal-custom-style.example.html',
  selector: 'app-modal-custom-style-example',
  imports: [DasarModalComponent, DasarButtonComponent],
  standalone: true,
})
export class ModalCustomStyleExample {
  protected open = signal(false);
}
