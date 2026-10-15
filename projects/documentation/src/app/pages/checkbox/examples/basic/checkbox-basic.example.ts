import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DasarCheckboxComponent } from 'dasar-ui';

@Component({
  templateUrl: './checkbox-basic.example.html',
  selector: 'app-checkbox-basic-example',
  imports: [DasarCheckboxComponent, FormsModule],
  standalone: true,
})
export class CheckboxBasicExample {
  protected accepted = signal(false);
}
