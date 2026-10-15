import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DasarRadioComponent } from 'dasar-ui';

@Component({
  templateUrl: './radio-basic.example.html',
  selector: 'app-radio-basic-example',
  imports: [DasarRadioComponent, FormsModule],
  standalone: true,
})
export class RadioBasicExample {
  protected plan = signal('monthly');
}
