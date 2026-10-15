import { Component, signal } from '@angular/core';
import { DasarCheckboxComponent } from 'dasar-ui';

@Component({
  templateUrl: './checkbox-custom-values.example.html',
  selector: 'app-checkbox-custom-values-example',
  imports: [DasarCheckboxComponent],
  standalone: true,
})
export class CheckboxCustomValuesExample {
  protected answer = signal('N');
  protected log = signal<any[]>([]);

  protected handleUpdate(value: any) {
    this.answer.set(value);
    this.log.update((entries) => [...entries, value]);
  }
}
