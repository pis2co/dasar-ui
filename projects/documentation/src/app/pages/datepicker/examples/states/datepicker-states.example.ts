import { DasarDatepickerComponent } from 'dasar-ui';
import { Component, signal } from '@angular/core';

@Component({
  templateUrl: './datepicker-states.example.html',
  selector: 'app-datepicker-states-example',
  imports: [DasarDatepickerComponent],
  standalone: true,
})
export class DatepickerStatesExample {
  protected dateValue = signal<string | null>(new Date().toISOString());
}
