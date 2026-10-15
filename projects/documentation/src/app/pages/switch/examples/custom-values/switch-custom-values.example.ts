import { Component, signal } from '@angular/core';
import { DasarSwitchComponent } from 'dasar-ui';

@Component({
  templateUrl: './switch-custom-values.example.html',
  selector: 'app-switch-custom-values-example',
  imports: [DasarSwitchComponent],
  standalone: true,
})
export class SwitchCustomValuesExample {
  protected mode = signal('off');
}
