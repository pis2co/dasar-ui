import { Component, signal } from '@angular/core';
import { DasarDatepickerComponent } from 'dasar-ui';

@Component({
  templateUrl: './datepicker-timepicker.example.html',
  selector: 'app-datepicker-timepicker-example',
  imports: [DasarDatepickerComponent],
  standalone: true,
})
export class DatepickerTimepickerExample {
  protected selectedTime = signal<string | null>(null);
}
