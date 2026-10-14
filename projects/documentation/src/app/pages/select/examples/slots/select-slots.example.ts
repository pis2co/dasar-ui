import { DasarSelectComponent, DasarSelectOption, DasarIconComponent, DasarChip } from 'dasar-ui';
import { Component } from '@angular/core';

@Component({
  imports: [DasarSelectComponent, DasarIconComponent, DasarChip],
  templateUrl: './select-slots.example.html',
  selector: 'app-select-slots-example',
  standalone: true,
})
export class SelectSlotsExample {
  protected users: DasarSelectOption[] = [
    { label: 'Alice Williams', value: '1', email: 'alice@example.com' },
    { label: 'Bob Martin', value: '2', email: 'bob@example.com' },
  ];
}
