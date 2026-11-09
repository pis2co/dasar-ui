import { Component } from '@angular/core';
import { DasarModalComponent, DasarButtonComponent } from 'dasar-ui';

@Component({
  templateUrl: './modal-width.example.html',
  selector: 'app-modal-width-example',
  imports: [DasarModalComponent, DasarButtonComponent],
  standalone: true,
})
export class ModalWidthExample {}
