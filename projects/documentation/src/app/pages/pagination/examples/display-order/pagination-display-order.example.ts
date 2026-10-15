import { Component, signal } from '@angular/core';
import { DasarPaginationComponent } from 'dasar-ui';

@Component({
  templateUrl: './pagination-display-order.example.html',
  selector: 'app-pagination-display-order-example',
  imports: [DasarPaginationComponent],
  standalone: true,
})
export class PaginationDisplayOrderExample {
  protected page = signal(3);
}
