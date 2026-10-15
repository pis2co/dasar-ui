import { Component, signal } from '@angular/core';
import { DasarPaginationComponent } from 'dasar-ui';

@Component({
  templateUrl: './pagination-radius.example.html',
  selector: 'app-pagination-radius-example',
  imports: [DasarPaginationComponent],
  standalone: true,
})
export class PaginationRadiusExample {
  protected page = signal(2);
  protected radii = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const;
}
