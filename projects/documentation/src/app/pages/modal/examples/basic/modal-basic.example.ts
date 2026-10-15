import { Component, signal } from '@angular/core';
import { DasarModalComponent, DasarButtonComponent } from 'dasar-ui';

@Component({
  templateUrl: './modal-basic.example.html',
  selector: 'app-modal-basic-example',
  imports: [DasarModalComponent, DasarButtonComponent],
  standalone: true,
})
export class ModalBasicExample {
  protected open = signal(false);
}
