import { DasarTableComponent, DasarTableColumn, DasarChipComponent } from 'dasar-ui';
import { Component } from '@angular/core';

@Component({
  imports: [DasarTableComponent, DasarChipComponent],
  templateUrl: './table-cell-badge.example.html',
  selector: 'app-table-cell-badge',
  standalone: true,
})
export class TableCellBadgeExample {
  protected columns: DasarTableColumn[] = [
    { key: 'id', label: 'ID', width: '80px' },
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Account Status' },
  ];
  protected users = [
    { id: '101', name: 'John Doe', status: 'Active' },
    { id: '102', name: 'Jane Smith', status: 'Pending' },
    { id: '103', name: 'Bob Johnson', status: 'Inactive' },
  ];
}
