import { Component, signal } from '@angular/core';
import { DasarPaginationComponent } from 'dasar-ui';

@Component({
  templateUrl: './pagination-basic.example.html',
  selector: 'app-pagination-basic-example',
  imports: [DasarPaginationComponent],
  standalone: true,
})
export class PaginationBasicExample {
  protected page = signal(1);
}
