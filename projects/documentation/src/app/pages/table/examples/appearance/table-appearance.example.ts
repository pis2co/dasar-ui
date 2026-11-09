import { Component } from '@angular/core';
import { DasarTableColumn, DasarTableComponent } from 'dasar-ui';

@Component({
  templateUrl: './table-appearance.example.html',
  selector: 'app-table-appearance-example',
  imports: [DasarTableComponent],
  standalone: true,
})
export class TableAppearanceExample {
  protected columns: DasarTableColumn[] = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
  ];
  protected data = [
    { firstName: 'Alice', lastName: 'Wonder' },
    { firstName: 'Bob', lastName: 'Builder' },
    { firstName: 'Carol', lastName: 'Danvers' },
  ];
}
