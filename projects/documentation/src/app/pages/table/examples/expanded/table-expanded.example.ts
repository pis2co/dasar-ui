import { Component } from '@angular/core';
import { DasarTableComponent, DasarTableColumn } from 'dasar-ui';

@Component({
  selector: 'app-table-expanded',
  standalone: true,
  imports: [DasarTableComponent],
  templateUrl: './table-expanded.example.html',
})
export class TableExpandedExample {
  protected columns: DasarTableColumn[] = [
    { key: 'id', label: 'Order ID' },
    { key: 'date', label: 'Date' },
    { key: 'amount', label: 'Amount' },
  ];
  protected orders = [
    {
      id: 'ORD-001',
      date: '2026-10-01',
      amount: '$120.50',
      address: '123 Main St, NY',
      tracking: 'TRK987654321',
      carrier: 'FedEx',
    },
    {
      id: 'ORD-002',
      date: '2026-10-02',
      amount: '$45.00',
      address: '456 Elm St, CA',
      tracking: 'TRK123456789',
      carrier: 'UPS',
    },
  ];
}
