import { Component, signal } from '@angular/core';
import { DasarIconComponent, DasarPaginationComponent } from 'dasar-ui';

@Component({
  templateUrl: './pagination-slots.example.html',
  selector: 'app-pagination-slots-example',
  imports: [DasarPaginationComponent, DasarIconComponent],
  standalone: true,
})
export class PaginationSlotsExample {
  protected total = 237;
  protected page = signal(3);
}
