import { Component, signal } from '@angular/core';
import { DasarPaginationComponent } from 'dasar-ui';

@Component({
  templateUrl: './pagination-ellipsis-dropdown.example.html',
  selector: 'app-pagination-ellipsis-dropdown-example',
  imports: [DasarPaginationComponent],
  standalone: true,
})
export class PaginationEllipsisDropdownExample {
  protected page = signal(50);
  protected plain = signal(50);
}
