import { DasarNumberInputComponent } from 'dasar-ui';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  imports: [FormsModule, DasarNumberInputComponent],
  templateUrl: './number-input-decimal.example.html',
  selector: 'app-number-input-decimal-example',
  standalone: true,
})
export class NumberInputDecimalExample {
  public price: number = 1234.56;
  public temperature: number = 36.5;
  public rate: number = 0.125;
}
