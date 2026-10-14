import { DasarCardComponent, DasarButtonComponent, DasarIconComponent } from 'dasar-ui';
import { Component } from '@angular/core';

@Component({
  imports: [DasarCardComponent, DasarButtonComponent, DasarIconComponent],
  templateUrl: './card-slots.example.html',
  selector: 'app-card-slots-example',
  standalone: true,
})
export class CardSlotsExample {}
