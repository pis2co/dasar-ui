import { Component, signal } from '@angular/core';
import { DasarSwitchComponent } from 'dasar-ui';

@Component({
  templateUrl: './switch-icons.example.html',
  selector: 'app-switch-icons-example',
  imports: [DasarSwitchComponent],
  standalone: true,
})
export class SwitchIconsExample {
  protected checked = signal(false);
}
