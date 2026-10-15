import { Component } from '@angular/core';
import { DasarButtonComponent, DasarButtonGroupComponent } from 'dasar-ui';

@Component({
  templateUrl: './button-group-orientation.example.html',
  selector: 'app-button-group-orientation-example',
  imports: [DasarButtonGroupComponent, DasarButtonComponent],
  standalone: true,
})
export class ButtonGroupOrientationExample {}
