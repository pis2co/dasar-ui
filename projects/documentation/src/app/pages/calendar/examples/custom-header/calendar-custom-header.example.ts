import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DasarCalendarComponent, DasarButtonComponent } from 'dasar-ui';

@Component({
  imports: [CommonModule, DasarCalendarComponent, DasarButtonComponent],
  templateUrl: './calendar-custom-header.example.html',
  selector: 'app-calendar-custom-header-example',
  standalone: true,
})
export class CalendarCustomHeaderExample {}
