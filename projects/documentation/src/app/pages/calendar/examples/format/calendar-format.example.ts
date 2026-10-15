import { Component, signal } from '@angular/core';
import { DasarCalendarComponent } from 'dasar-ui';

@Component({
  templateUrl: './calendar-format.example.html',
  selector: 'app-calendar-format-example',
  imports: [DasarCalendarComponent],
  standalone: true,
})
export class CalendarFormatExample {
  protected selectedDate = signal<Date | null>(new Date());
}
