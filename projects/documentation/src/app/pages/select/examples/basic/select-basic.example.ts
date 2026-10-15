import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DasarSelectComponent, DasarSelectOption } from 'dasar-ui';

@Component({
  imports: [FormsModule, DasarSelectComponent],
  templateUrl: './select-basic.example.html',
  selector: 'app-select-basic-example',
  standalone: true,
})
export class SelectBasicExample {
  protected selectedCountry = signal<string | null>(null);

  protected countries: DasarSelectOption[] = [
    { label: 'Indonesia', value: 'id' },
    { label: 'United States', value: 'us' },
    { label: 'Japan', value: 'jp' },
    { label: 'Germany', value: 'de' },
  ];
}
