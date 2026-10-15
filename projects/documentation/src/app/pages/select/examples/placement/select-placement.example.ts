import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DasarSelectComponent, DasarSelectOption } from 'dasar-ui';

@Component({
  templateUrl: './select-placement.example.html',
  selector: 'app-select-placement-example',
  imports: [CommonModule, FormsModule, DasarSelectComponent],
  standalone: true,
})
export class SelectPlacementExample {
  protected options: DasarSelectOption[] = [
    { label: 'Alpha', value: 'alpha' },
    { label: 'Beta', value: 'beta' },
    { label: 'Gamma', value: 'gamma' },
  ];

  protected value: string | null = null;
}
