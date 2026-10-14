import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DasarCalendarComponent } from 'dasar-ui';

@Component({
  imports: [CommonModule, DasarCalendarComponent],
  templateUrl: './calendar-basic.example.html',
  selector: 'app-calendar-basic-example',
  standalone: true,
})
export class CalendarBasicExample {
  protected selectedDate = signal<Date | null>(new Date());
}
