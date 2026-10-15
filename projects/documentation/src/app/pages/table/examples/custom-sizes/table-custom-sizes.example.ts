import { DasarTableColumn, DasarTableComponent } from 'dasar-ui';
import { Component } from '@angular/core';

@Component({
  templateUrl: './table-custom-sizes.example.html',
  selector: 'app-table-custom-sizes',
  imports: [DasarTableComponent],
  standalone: true,
})
export class TableCustomSizesExample {
  protected columns: DasarTableColumn[] = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone Num' },
  ];
  protected data = [
    { firstName: 'Alice', lastName: 'Wonder', email: 'alice@test.com', phone: '555-0100' },
    { firstName: 'Bob', lastName: 'Builder', email: 'bob@test.com', phone: '555-0200' },
  ];
}
