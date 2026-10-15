import { DasarCardComponent, DasarButtonComponent, DasarIconComponent } from 'dasar-ui';
import { Component } from '@angular/core';

@Component({
  imports: [DasarCardComponent, DasarButtonComponent, DasarIconComponent],
  templateUrl: './card-custom-style.example.html',
  selector: 'app-card-custom-style-example',
  standalone: true,
})
export class CardCustomStyleExample {}
