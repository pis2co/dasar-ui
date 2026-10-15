import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DasarSwitchComponent } from 'dasar-ui';

@Component({
  templateUrl: './switch-ng-model.example.html',
  selector: 'app-switch-ng-model-example',
  imports: [FormsModule, DasarSwitchComponent],
  standalone: true,
})
export class SwitchNgModelExample {
  protected enabled = false;
}
