import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DasarButtonComponent, DasarCheckboxComponent } from 'dasar-ui';

@Component({
  templateUrl: './checkbox-reactive.example.html',
  selector: 'app-checkbox-reactive-example',
  imports: [DasarCheckboxComponent, DasarButtonComponent, ReactiveFormsModule],
  standalone: true,
})
export class CheckboxReactiveExample {
  protected control = new FormControl(true);
}
