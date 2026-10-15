import { Component, signal } from '@angular/core';
import { DasarPaginationComponent } from 'dasar-ui';

@Component({
  templateUrl: './pagination-sizes.example.html',
  selector: 'app-pagination-sizes-example',
  imports: [DasarPaginationComponent],
  standalone: true,
})
export class PaginationSizesExample {
  protected page = signal(2);
  protected sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
}
