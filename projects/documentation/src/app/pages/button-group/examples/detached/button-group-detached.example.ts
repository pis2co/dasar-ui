import { Component } from '@angular/core';
import { DasarButtonComponent, DasarButtonGroupComponent } from 'dasar-ui';

@Component({
  templateUrl: './button-group-detached.example.html',
  selector: 'app-button-group-detached-example',
  imports: [DasarButtonGroupComponent, DasarButtonComponent],
  standalone: true,
})
export class ButtonGroupDetachedExample {}
