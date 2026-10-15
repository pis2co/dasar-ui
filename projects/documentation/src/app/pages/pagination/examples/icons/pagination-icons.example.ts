import { Component, signal } from '@angular/core';
import { DasarPaginationComponent } from 'dasar-ui';

@Component({
  templateUrl: './pagination-icons.example.html',
  selector: 'app-pagination-icons-example',
  imports: [DasarPaginationComponent],
  standalone: true,
})
export class PaginationIconsExample {
  protected page = signal(2);
}
