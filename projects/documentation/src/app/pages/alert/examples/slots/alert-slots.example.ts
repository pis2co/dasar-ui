import { Component } from '@angular/core';
import { DasarAlertComponent, DasarIconComponent } from 'dasar-ui';

@Component({
  templateUrl: './alert-slots.example.html',
  selector: 'app-alert-slots-example',
  imports: [DasarAlertComponent, DasarIconComponent],
  standalone: true,
})
export class AlertSlotsExample {}
