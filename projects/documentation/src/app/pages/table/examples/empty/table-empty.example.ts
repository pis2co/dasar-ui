import {
  DasarTableComponent,
  DasarTableColumn,
  DasarButtonComponent,
  DasarIconComponent,
} from 'dasar-ui';
import { Component } from '@angular/core';

@Component({
  imports: [DasarTableComponent, DasarButtonComponent, DasarIconComponent],
  templateUrl: './table-empty.example.html',
  selector: 'app-table-empty',
  standalone: true,
})
export class TableEmptyExample {
  protected columns: DasarTableColumn[] = [
    { key: 'name', label: 'Document Name' },
    { key: 'size', label: 'Size' },
    { key: 'modified', label: 'Last Modified' },
  ];
}
