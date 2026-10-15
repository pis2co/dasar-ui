import { Component } from '@angular/core';
import { DasarButtonComponent, DasarButtonGroupComponent } from 'dasar-ui';

@Component({
  templateUrl: './button-group-basic.example.html',
  selector: 'app-button-group-basic-example',
  imports: [DasarButtonGroupComponent, DasarButtonComponent],
  standalone: true,
})
export class ButtonGroupBasicExample {}
