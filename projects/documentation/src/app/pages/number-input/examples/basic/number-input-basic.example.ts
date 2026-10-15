import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DasarNumberInputComponent } from 'dasar-ui';

@Component({
  selector: 'app-number-input-basic-example',
  standalone: true,
  imports: [FormsModule, DasarNumberInputComponent],
  templateUrl: './number-input-basic.example.html',
})
export class NumberInputBasicExample {
  public qty: number = 1;
}
