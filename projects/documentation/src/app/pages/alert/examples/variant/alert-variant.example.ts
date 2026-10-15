import { Component } from '@angular/core';
import { DasarAlertComponent } from 'dasar-ui';

@Component({
  templateUrl: './alert-variant.example.html',
  selector: 'app-alert-variant-example',
  imports: [DasarAlertComponent],
  standalone: true,
})
export class AlertVariantExample {
  protected variants = ['primary', 'secondary', 'success', 'warning', 'danger'] as const;
}
