import { DasarCalendarComponent } from 'dasar-ui';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [DasarCalendarComponent, CommonModule],
  templateUrl: './calendar.more.example.html',
  selector: 'app-calendar-more-example',
  standalone: true,
})
export class CalendarMoreExample {
  protected standaloneDate = signal<Date | null>(new Date());
  onMonthChange(value: any) {
    alert(`Month Changed | ${value}`);
  }
  onYearChange(value: any) {
    alert(`Year Changed | ${value}`);
  }
  onPrevMonthClick(value: any) {
    alert(`Prev Month Clicked | ${value}`);
  }
  onNextMonthClick(value: any) {
    alert(`Next Month Clicked | ${value}`);
  }
  onPrevYearClick(value: any) {
    alert(`Prev Year Clicked | ${value}`);
  }
  onNextYearClick(value: any) {
    alert(`Next Year Clicked | ${value}`);
  }
  onTodayClick(value: any) {
    alert(`Today Clicked | ${value}`);
  }
  onValueChanged(value: any) {
    alert(`Value Changed | ${value}`);
  }
}
