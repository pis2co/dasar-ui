import { DasarSelectComponent, DasarSelectOption } from 'dasar-ui';
import { Component } from '@angular/core';

@Component({
  templateUrl: './select-states.example.html',
  selector: 'app-select-states-example',
  imports: [DasarSelectComponent],
  standalone: true,
})
export class SelectStatesExample {
  protected options: DasarSelectOption[] = [{ label: 'Valid Option', value: '1' }];
}
