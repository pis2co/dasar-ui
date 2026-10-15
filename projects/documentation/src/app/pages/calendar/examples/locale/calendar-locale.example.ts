import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DasarCalendarComponent } from 'dasar-ui';

@Component({
  imports: [CommonModule, DasarCalendarComponent],
  templateUrl: './calendar-locale.example.html',
  selector: 'app-calendar-locale-example',
  standalone: true,
})
export class CalendarLocaleExample {
  protected idDate = signal<Date | null>(new Date());
  protected enDate = signal<Date | null>(new Date());
}
