import { Component, signal } from '@angular/core';
import { DasarCheckboxComponent, DasarCheckboxGroupComponent } from 'dasar-ui';

@Component({
  templateUrl: './checkbox-group-layout.example.html',
  selector: 'app-checkbox-group-layout-example',
  imports: [DasarCheckboxComponent, DasarCheckboxGroupComponent],
  standalone: true,
})
export class CheckboxGroupLayoutExample {
  protected horizontal = signal(['a']);
}
