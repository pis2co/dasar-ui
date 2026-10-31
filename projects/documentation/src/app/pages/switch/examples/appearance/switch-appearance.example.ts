import { Component, signal } from '@angular/core';
import { DasarSwitchComponent } from 'dasar-ui';

@Component({
  templateUrl: './switch-appearance.example.html',
  selector: 'app-switch-appearance-example',
  imports: [DasarSwitchComponent],
  standalone: true,
})
export class SwitchAppearanceExample {
  protected outline = signal(true);
  protected filled = signal(true);
  protected elevated = signal(true);
}
