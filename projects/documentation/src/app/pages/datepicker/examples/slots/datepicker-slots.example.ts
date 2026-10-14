import { DasarDatepickerComponent, DasarIconComponent } from 'dasar-ui';
import { Component } from '@angular/core';

@Component({
  imports: [DasarDatepickerComponent, DasarIconComponent],
  templateUrl: './datepicker-slots.example.html',
  selector: 'app-datepicker-slots-example',
  standalone: true,
})
export class DatepickerSlotsExample {}
