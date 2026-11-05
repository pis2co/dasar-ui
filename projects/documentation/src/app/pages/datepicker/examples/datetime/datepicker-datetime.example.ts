import { Component, signal } from '@angular/core';
import { DasarDatepickerComponent } from 'dasar-ui';

@Component({
  templateUrl: './datepicker-datetime.example.html',
  selector: 'app-datepicker-datetime-example',
  imports: [DasarDatepickerComponent],
  standalone: true,
})
export class DatepickerDatetimeExample {
  protected selectedDateTime = signal<string | null>(null);
}
