import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DasarRadioComponent, DasarRadioGroupComponent } from 'dasar-ui';

@Component({
  templateUrl: './radio-group.example.html',
  selector: 'app-radio-group-example',
  imports: [DasarRadioComponent, DasarRadioGroupComponent, FormsModule],
  standalone: true,
})
export class RadioGroupExample {
  protected size = signal('m');
}
