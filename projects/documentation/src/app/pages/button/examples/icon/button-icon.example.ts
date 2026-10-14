import { Component } from '@angular/core';
import { DasarButtonComponent, DasarIconComponent } from 'dasar-ui';

@Component({
  templateUrl: './button-icon.example.html',
  selector: 'app-button-icon-example',
  imports: [DasarButtonComponent, DasarIconComponent],
  standalone: true,
})
export class ButtonIconExample {}
