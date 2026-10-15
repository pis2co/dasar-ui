import { DasarSelectComponent, DasarSelectOption } from 'dasar-ui';
import { Component } from '@angular/core';

@Component({
  templateUrl: './select-appearance.example.html',
  selector: 'app-select-appearance-example',
  imports: [DasarSelectComponent],
  standalone: true,
})
export class SelectAppearanceExample {
  protected options: DasarSelectOption[] = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ];
}
