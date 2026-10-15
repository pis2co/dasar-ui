import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DasarButtonComponent, DasarSwitchComponent } from 'dasar-ui';

@Component({
  templateUrl: './switch-reactive.example.html',
  selector: 'app-switch-reactive-example',
  imports: [ReactiveFormsModule, DasarSwitchComponent, DasarButtonComponent],
  standalone: true,
})
export class SwitchReactiveExample {
  protected control = new FormControl(false);

  protected toggleDisabled(): void {
    if (this.control.disabled) this.control.enable();
    else this.control.disable();
  }
}
