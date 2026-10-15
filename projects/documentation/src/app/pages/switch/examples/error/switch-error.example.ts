import { Component, signal } from '@angular/core';
import { DasarSwitchComponent } from 'dasar-ui';

@Component({
  templateUrl: './switch-error.example.html',
  selector: 'app-switch-error-example',
  imports: [DasarSwitchComponent],
  standalone: true,
})
export class SwitchErrorExample {
  protected checked = signal(false);
}
