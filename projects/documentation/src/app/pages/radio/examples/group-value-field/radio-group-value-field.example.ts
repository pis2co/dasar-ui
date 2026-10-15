import { Component, signal } from '@angular/core';
import { DasarRadioComponent, DasarRadioGroupComponent } from 'dasar-ui';

@Component({
  templateUrl: './radio-group-value-field.example.html',
  selector: 'app-radio-group-value-field-example',
  imports: [DasarRadioComponent, DasarRadioGroupComponent],
  standalone: true,
})
export class RadioGroupValueFieldExample {
  protected selected = signal<any>({ id: 2 });

  protected cities = [
    { id: 1, name: 'Jakarta' },
    { id: 2, name: 'Bandung' },
    { id: 3, name: 'Surabaya' },
  ];
}
