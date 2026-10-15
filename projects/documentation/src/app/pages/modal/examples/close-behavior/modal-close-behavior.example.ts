import { Component, signal } from '@angular/core';
import { DasarModalComponent, DasarButtonComponent } from 'dasar-ui';

@Component({
  templateUrl: './modal-close-behavior.example.html',
  selector: 'app-modal-close-behavior-example',
  imports: [DasarModalComponent, DasarButtonComponent],
  standalone: true,
})
export class ModalCloseBehaviorExample {
  protected openNotClosable = signal(false);
  protected openNoOverlay = signal(false);
  protected openNoEscape = signal(false);
}
