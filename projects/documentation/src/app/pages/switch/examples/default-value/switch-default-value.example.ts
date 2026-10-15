import { Component, signal } from '@angular/core';
import { DasarSwitchComponent } from 'dasar-ui';

@Component({
  templateUrl: './switch-default-value.example.html',
  selector: 'app-switch-default-value-example',
  imports: [DasarSwitchComponent],
  standalone: true,
})
export class SwitchDefaultValueExample {
  protected last = signal<unknown>('none yet');
}
