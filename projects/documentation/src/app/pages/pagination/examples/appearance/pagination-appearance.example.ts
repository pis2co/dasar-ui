import { Component, signal } from '@angular/core';
import { DasarPaginationComponent } from 'dasar-ui';

@Component({
  templateUrl: './pagination-appearance.example.html',
  selector: 'app-pagination-appearance-example',
  imports: [DasarPaginationComponent],
  standalone: true,
})
export class PaginationAppearanceExample {
  protected page = signal(2);
  protected appearances = ['ghost', 'solid', 'subtle', 'outline'] as const;
}
