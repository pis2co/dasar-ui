import { DasarCalendarComponent, DasarButtonComponent } from 'dasar-ui';
import { Component } from '@angular/core';

@Component({
  imports: [DasarCalendarComponent, DasarButtonComponent],
  templateUrl: './calendar-actions.example.html',
  selector: 'app-calendar-actions-example',
  standalone: true,
})
export class CalendarActionsExample {}
