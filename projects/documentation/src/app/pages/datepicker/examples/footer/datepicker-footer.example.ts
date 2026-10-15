import { Component, signal } from '@angular/core';
import { DasarDatepickerComponent, DasarButtonComponent } from 'dasar-ui';

@Component({
  imports: [DasarDatepickerComponent, DasarButtonComponent],
  templateUrl: './datepicker-footer.example.html',
  selector: 'app-datepicker-footer-example',
  standalone: true,
})
export class DatepickerFooterExample {
  protected activeDate = signal<string | null>(null);

  setToday(dpInstance: any) {
    this.activeDate.set(new Date().toISOString());
    dpInstance.isOpen = false;
  }
}
