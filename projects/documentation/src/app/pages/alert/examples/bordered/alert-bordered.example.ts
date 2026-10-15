import { Component } from '@angular/core';
import { DasarAlertComponent } from 'dasar-ui';

@Component({
  templateUrl: './alert-bordered.example.html',
  selector: 'app-alert-bordered-example',
  imports: [DasarAlertComponent],
  standalone: true,
})
export class AlertBorderedExample {
  protected variants = ['primary', 'secondary', 'success', 'warning', 'danger'] as const;
}
