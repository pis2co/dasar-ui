import { Component } from '@angular/core';
import { DasarTableComponent, DasarTableColumn } from 'dasar-ui';

@Component({
  selector: 'app-table-dynamic-style',
  standalone: true,
  imports: [DasarTableComponent],
  templateUrl: './table-dynamic-style.example.html',
})
export class TableDynamicStyleExample {
  protected columns: DasarTableColumn[] = [
    { key: 'ticker', label: 'Symbol', cellStyle: { fontWeight: 'bold' } },
    { key: 'price', label: 'Price', align: 'right' },
    {
      key: 'change',
      label: '24h Change',
      align: 'right',
      cellStyle: (row: any) => ({
        color:
          row.change >= 0 ? 'var(--dasar-theme-success-color)' : 'var(--dasar-theme-danger-color)',
        fontWeight: '600',
      }),
    },
    {
      key: 'status',
      label: 'Market Status',
      align: 'center',
      cellStyle: (row: any) => ({
        backgroundColor: row.isOpen ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        color: row.isOpen ? 'var(--dasar-theme-success-color)' : 'var(--dasar-theme-danger-color)',
        borderRadius: '4px',
        padding: '4px 8px',
        fontSize: '12px',
      }),
    },
  ];
  protected stocks = [
    { ticker: 'AAPL', price: '$150.25', change: 1.25, isOpen: true, status: 'Trading' },
    { ticker: 'TSLA', price: '$245.10', change: -5.4, isOpen: true, status: 'Trading' },
    { ticker: 'GOOGL', price: '$2750.00', change: 12.5, isOpen: false, status: 'Closed' },
  ];
}
