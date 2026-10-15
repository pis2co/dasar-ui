import { Component, signal } from '@angular/core';
import { DasarDatepickerComponent } from 'dasar-ui';

@Component({
  templateUrl: './datepicker-format.example.html',
  selector: 'app-datepicker-format-example',
  imports: [DasarDatepickerComponent],
  standalone: true,
})
export class DatepickerFormatExample {
  protected idDate = signal<string | null>('2026-08-17');
  protected usDate = signal<number | null>(new Date().getTime());
}
