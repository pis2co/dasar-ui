import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DasarCalendarComponent, DasarCalendarRange } from 'dasar-ui';

@Component({
  imports: [CommonModule, DasarCalendarComponent],
  templateUrl: './calendar-range.example.html',
  selector: 'app-calendar-range-example',
  standalone: true,
})
export class CalendarRangeExample {
  protected selectedRange = signal<DasarCalendarRange>([
    new Date(new Date().setDate(5)),
    new Date(new Date().setDate(12)),
  ]);
}
