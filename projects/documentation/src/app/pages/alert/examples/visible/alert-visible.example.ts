import { Component, signal } from '@angular/core';
import { DasarAlertComponent, DasarButtonComponent } from 'dasar-ui';

@Component({
  templateUrl: './alert-visible.example.html',
  selector: 'app-alert-visible-example',
  imports: [DasarAlertComponent, DasarButtonComponent],
  standalone: true,
})
export class AlertVisibleExample {
  protected visible = signal(true);
}
