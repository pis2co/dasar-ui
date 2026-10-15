import { Component, signal } from '@angular/core';
import { DasarCheckboxComponent, DasarCheckboxGroupComponent } from 'dasar-ui';

@Component({
  templateUrl: './checkbox-group-value-field.example.html',
  selector: 'app-checkbox-group-value-field-example',
  imports: [DasarCheckboxComponent, DasarCheckboxGroupComponent],
  standalone: true,
})
export class CheckboxGroupValueFieldExample {
  protected selected = signal<any[]>([{ id: 2 }]);

  protected cities = [
    { id: 1, name: 'Jakarta' },
    { id: 2, name: 'Bandung' },
    { id: 3, name: 'Surabaya' },
  ];
}
