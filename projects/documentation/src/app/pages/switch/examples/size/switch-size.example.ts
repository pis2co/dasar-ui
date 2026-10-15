import { Component, signal } from '@angular/core';
import { DasarSwitchComponent } from 'dasar-ui';

@Component({
  templateUrl: './switch-size.example.html',
  selector: 'app-switch-size-example',
  imports: [DasarSwitchComponent],
  standalone: true,
})
export class SwitchSizeExample {
  protected on = signal(true);
  protected sizes = ['sm', 'md', 'lg'] as const;
}
