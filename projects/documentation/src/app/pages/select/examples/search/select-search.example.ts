import { DasarSelectComponent, DasarSelectOption } from 'dasar-ui';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule, DasarSelectComponent],
  templateUrl: './select-search.example.html',
  selector: 'app-select-search-example',
  standalone: true,
})
export class SelectSearchExample {
  protected selectedFramework = signal<string | null>(null);

  protected frameworks: DasarSelectOption[] = [
    { label: 'Angular', value: 'angular' },
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Solid', value: 'solid' },
    { label: 'Qwik', value: 'qwik' },
  ];
}
