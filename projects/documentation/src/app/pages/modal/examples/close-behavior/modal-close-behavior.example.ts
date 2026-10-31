import { Component } from '@angular/core';
import { DasarModalComponent, DasarButtonComponent } from 'dasar-ui';

@Component({
  templateUrl: './modal-close-behavior.example.html',
  selector: 'app-modal-close-behavior-example',
  imports: [DasarModalComponent, DasarButtonComponent],
  standalone: true,
})
export class ModalCloseBehaviorExample {}
