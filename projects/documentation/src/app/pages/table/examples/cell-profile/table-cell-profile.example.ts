import { DasarTableComponent, DasarTableColumn } from 'dasar-ui';
import { Component } from '@angular/core';

@Component({
  imports: [DasarTableComponent],
  templateUrl: './table-cell-profile.example.html',
  selector: 'app-table-cell-profile',
  standalone: true,
})
export class TableCellProfileExample {
  protected columns: DasarTableColumn[] = [
    { key: 'profile', label: 'User Profile' },
    { key: 'role', label: 'Role' },
  ];

  protected users = [
    { name: 'Alice Williams', email: 'alice@example.com', role: 'Admin' },
    { name: 'Charlie Brown', email: 'charlie@example.com', role: 'Editor' },
  ];
}
