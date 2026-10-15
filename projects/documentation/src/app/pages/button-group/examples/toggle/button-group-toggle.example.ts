import { Component, signal } from '@angular/core';
import { DasarButtonComponent, DasarButtonGroupComponent } from 'dasar-ui';

@Component({
  templateUrl: './button-group-toggle.example.html',
  selector: 'app-button-group-toggle-example',
  imports: [DasarButtonGroupComponent, DasarButtonComponent],
  standalone: true,
})
export class ButtonGroupToggleExample {
  protected options = ['Day', 'Week', 'Month'];
  protected selected = signal('Week');

  protected select(option: string) {
    this.selected.set(option);
  }
}
