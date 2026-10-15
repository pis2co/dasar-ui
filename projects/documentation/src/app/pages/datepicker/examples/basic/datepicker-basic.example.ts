import { DasarDatepickerComponent } from 'dasar-ui';
import { Component, signal } from '@angular/core';

@Component({
  templateUrl: './datepicker-basic.example.html',
  selector: 'app-datepicker-basic-example',
  imports: [DasarDatepickerComponent],
  standalone: true,
})
export class DatepickerBasicExample {
  protected selectedDate = signal<string | null>(null);
}
