import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DasarCheckboxComponent, DasarCheckboxGroupComponent } from 'dasar-ui';

@Component({
  templateUrl: './checkbox-group.example.html',
  selector: 'app-checkbox-group-example',
  imports: [DasarCheckboxComponent, DasarCheckboxGroupComponent, FormsModule],
  standalone: true,
})
export class CheckboxGroupExample {
  protected fruits = signal(['apple']);
}
