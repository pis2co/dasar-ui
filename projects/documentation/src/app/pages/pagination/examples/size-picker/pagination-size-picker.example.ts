import { Component, computed, signal } from '@angular/core';
import { DasarPaginationComponent } from 'dasar-ui';

@Component({
  templateUrl: './pagination-size-picker.example.html',
  selector: 'app-pagination-size-picker-example',
  imports: [DasarPaginationComponent],
  standalone: true,
})
export class PaginationSizePickerExample {
  protected total = 237;
  protected page = signal(1);
  protected size = signal(20);
  protected count = computed(() => Math.max(1, Math.ceil(this.total / this.size())));
}
