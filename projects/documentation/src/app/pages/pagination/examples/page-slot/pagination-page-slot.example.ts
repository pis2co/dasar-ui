import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DasarPaginationComponent, DasarRadioComponent, DasarRadioGroupComponent } from 'dasar-ui';

@Component({
  templateUrl: './pagination-page-slot.example.html',
  selector: 'app-pagination-page-slot-example',
  imports: [FormsModule, DasarPaginationComponent, DasarRadioComponent, DasarRadioGroupComponent],
  standalone: true,
})
export class PaginationPageSlotExample {
  protected page = signal(25);
  protected slot = signal(9);
}
