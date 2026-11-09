import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DasarCalendarComponent } from 'dasar-ui';

@Component({
  imports: [CommonModule, DasarCalendarComponent],
  templateUrl: './calendar-disabled-dates.example.html',
  selector: 'app-calendar-disabled-dates-example',
  standalone: true,
})
export class CalendarDisabledDatesExample {
  protected selectedDate = signal<Date | null>(new Date());

  // Disable weekends (Saturday = 6, Sunday = 0)
  protected isWeekendDisabled = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };
}
