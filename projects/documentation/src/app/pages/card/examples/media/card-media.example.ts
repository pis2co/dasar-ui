import { DasarCardComponent, DasarButtonComponent } from 'dasar-ui';
import { Component } from '@angular/core';

@Component({
  imports: [DasarCardComponent, DasarButtonComponent],
  templateUrl: './card-media.example.html',
  selector: 'app-card-media-example',
  standalone: true,
})
export class CardMediaExample {}
