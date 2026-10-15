import { Component, signal } from '@angular/core';
import { DasarModalComponent, DasarButtonComponent, DasarIconComponent } from 'dasar-ui';

@Component({
  templateUrl: './modal-slots.example.html',
  selector: 'app-modal-slots-example',
  imports: [DasarModalComponent, DasarButtonComponent, DasarIconComponent],
  standalone: true,
})
export class ModalSlotsExample {
  protected open = signal(false);
}
