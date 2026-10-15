import { Component, signal } from '@angular/core';
import { DasarCalendarComponent } from 'dasar-ui';

@Component({
  templateUrl: './calendar-dropdown.example.html',
  selector: 'app-calendar-dropdown-example',
  imports: [DasarCalendarComponent],
  standalone: true,
})
export class CalendarDropdownExample {
  protected selectedDate = signal<Date | null>(new Date());
}
