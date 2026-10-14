import {
  DasarTableComponent,
  DasarTableColumn,
  DasarButtonComponent,
  DasarIconComponent,
} from 'dasar-ui';
import { Component } from '@angular/core';

@Component({
  imports: [DasarTableComponent, DasarButtonComponent, DasarIconComponent],
  templateUrl: './table-cell-actions.example.html',
  selector: 'app-table-cell-actions',
  standalone: true,
})
export class TableCellActionsExample {
  protected columns: DasarTableColumn[] = [
    { key: 'name', label: 'Product Name' },
    { key: 'price', label: 'Price' },
    { key: 'actions', label: '', align: 'right', width: '120px' },
  ];
  protected users = [
    { name: 'Mechanical Keyboard', price: '$99.00' },
    { name: 'Wireless Mouse', price: '$49.00' },
  ];
}
