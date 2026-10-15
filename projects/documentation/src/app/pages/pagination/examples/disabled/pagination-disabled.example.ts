import { Component, signal } from '@angular/core';
import { DasarPaginationComponent } from 'dasar-ui';

@Component({
  templateUrl: './pagination-disabled.example.html',
  selector: 'app-pagination-disabled-example',
  imports: [DasarPaginationComponent],
  standalone: true,
})
export class PaginationDisabledExample {
  protected page = signal(2);
}
