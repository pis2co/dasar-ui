import { Component, signal } from '@angular/core';
import { DasarSwitchComponent } from 'dasar-ui';

@Component({
  templateUrl: './switch-content-slots.example.html',
  selector: 'app-switch-content-slots-example',
  imports: [DasarSwitchComponent],
  standalone: true,
})
export class SwitchContentSlotsExample {
  protected checked = signal(false);
}
