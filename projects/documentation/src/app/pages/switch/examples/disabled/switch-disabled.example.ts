import { Component, signal } from '@angular/core';
import { DasarSwitchComponent } from 'dasar-ui';

@Component({
  templateUrl: './switch-disabled.example.html',
  selector: 'app-switch-disabled-example',
  imports: [DasarSwitchComponent],
  standalone: true,
})
export class SwitchDisabledExample {
  protected on = signal(true);
  protected off = signal(false);
}
