import { Component, signal } from '@angular/core';
import { DasarSwitchComponent } from 'dasar-ui';

@Component({
  templateUrl: './switch-basic.example.html',
  selector: 'app-switch-basic-example',
  imports: [DasarSwitchComponent],
  standalone: true,
})
export class SwitchBasicExample {
  protected checked = signal(false);
}
