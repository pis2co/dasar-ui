import { Component } from '@angular/core';
import { DasarButtonComponent, DasarButtonGroupComponent, DasarIconComponent } from 'dasar-ui';

@Component({
  templateUrl: './button-group-icons.example.html',
  selector: 'app-button-group-icons-example',
  imports: [DasarButtonGroupComponent, DasarButtonComponent, DasarIconComponent],
  standalone: true,
})
export class ButtonGroupIconsExample {}
