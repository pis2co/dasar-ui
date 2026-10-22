import { Component, signal } from '@angular/core';
import { DasarAlertComponent, DasarButtonComponent } from 'dasar-ui';

@Component({
  templateUrl: './alert-close-slot.example.html',
  selector: 'app-alert-close-slot-example',
  imports: [DasarAlertComponent, DasarButtonComponent],
  standalone: true,
})
export class AlertCloseSlotExample {
  protected visible = signal(true);
}
