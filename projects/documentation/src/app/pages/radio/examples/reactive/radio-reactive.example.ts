import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DasarButtonComponent, DasarRadioComponent } from 'dasar-ui';

@Component({
  templateUrl: './radio-reactive.example.html',
  selector: 'app-radio-reactive-example',
  imports: [DasarRadioComponent, DasarButtonComponent, ReactiveFormsModule],
  standalone: true,
})
export class RadioReactiveExample {
  protected control = new FormControl('b');
}
