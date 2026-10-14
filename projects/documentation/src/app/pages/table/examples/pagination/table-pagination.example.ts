import { DasarTableComponent, DasarTableColumn, DasarButtonComponent } from 'dasar-ui';
import { Component } from '@angular/core';

@Component({
  imports: [DasarTableComponent, DasarButtonComponent],
  templateUrl: './table-pagination.example.html',
  selector: 'app-table-pagination',
  standalone: true,
})
export class TablePaginationExample {
  protected columns: DasarTableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'event', label: 'Event Name' },
  ];

  protected data = [
    { id: '1', event: 'System Boot' },
    { id: '2', event: 'User Login' },
    { id: '3', event: 'Data Sync' },
  ];
}
