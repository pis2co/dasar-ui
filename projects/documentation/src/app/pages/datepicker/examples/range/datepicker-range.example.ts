import { DasarDatepickerComponent } from 'dasar-ui';
import { Component, signal } from '@angular/core';

@Component({
  templateUrl: './datepicker-range.example.html',
  selector: 'app-datepicker-range-example',
  imports: [DasarDatepickerComponent],
  standalone: true,
})
export class DatepickerRangeExample {
  protected selectedRange = signal<string[] | null>(null);
}
