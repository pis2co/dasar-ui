import { Component, signal } from '@angular/core';
import { DasarRadioComponent, DasarRadioGroupComponent } from 'dasar-ui';

@Component({
  templateUrl: './radio-group-layout.example.html',
  selector: 'app-radio-group-layout-example',
  imports: [DasarRadioComponent, DasarRadioGroupComponent],
  standalone: true,
})
export class RadioGroupLayoutExample {
  protected horizontal = signal('a');
}
