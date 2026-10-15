import { Component, signal } from '@angular/core';
import { DasarPaginationComponent } from 'dasar-ui';

@Component({
  templateUrl: './pagination-summary.example.html',
  selector: 'app-pagination-summary-example',
  imports: [DasarPaginationComponent],
  standalone: true,
})
export class PaginationSummaryExample {
  protected page = signal(3);
}
