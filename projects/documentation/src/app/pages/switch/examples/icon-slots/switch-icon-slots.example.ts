import { Component, signal } from '@angular/core';
import { DasarIconComponent, DasarSwitchComponent } from 'dasar-ui';

@Component({
  templateUrl: './switch-icon-slots.example.html',
  selector: 'app-switch-icon-slots-example',
  imports: [DasarSwitchComponent, DasarIconComponent],
  standalone: true,
})
export class SwitchIconSlotsExample {
  protected first = signal(false);
  protected second = signal(true);
}
