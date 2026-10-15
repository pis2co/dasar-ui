import { Component, signal } from '@angular/core';
import { DasarPaginationComponent } from 'dasar-ui';

@Component({
  templateUrl: './pagination-spacing-fluid.example.html',
  selector: 'app-pagination-spacing-fluid-example',
  imports: [DasarPaginationComponent],
  standalone: true,
})
export class PaginationSpacingFluidExample {
  protected page = signal(2);
}
