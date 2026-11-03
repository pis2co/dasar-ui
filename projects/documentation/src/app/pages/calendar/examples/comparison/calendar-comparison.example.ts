import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DasarCalendarComponent } from 'dasar-ui';

@Component({
  imports: [CommonModule, DasarCalendarComponent],
  templateUrl: './calendar-comparison.example.html',
  selector: 'app-calendar-comparison-example',
  standalone: true,
})
export class CalendarComparisonExample {
  protected dashboardDate = signal<Date | null>(new Date());
  protected dropdownDate = signal<Date | null>(new Date());
}
