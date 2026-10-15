import {
  DasarTableComponent,
  DasarTableColumn,
  DasarButtonComponent,
  DasarIconComponent,
} from 'dasar-ui';
import { Component } from '@angular/core';

@Component({
  imports: [DasarTableComponent, DasarButtonComponent, DasarIconComponent],
  templateUrl: './table-custom-body.example.html',
  selector: 'app-table-custom-body',
  standalone: true,
})
export class TableCustomBodyExample {
  protected columns: DasarTableColumn[] = [{ key: 'file', label: 'Files' }];
  protected data = [
    { id: 1, title: 'Annual_Report_2026.pdf', date: 'Oct 1, 2026' },
    { id: 2, title: 'Q3_Financials.xlsx', date: 'Sep 28, 2026' },
  ];
}
