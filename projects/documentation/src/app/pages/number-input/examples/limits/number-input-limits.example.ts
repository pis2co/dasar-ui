import { DasarNumberInputComponent } from 'dasar-ui';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  imports: [FormsModule, DasarNumberInputComponent],
  templateUrl: './number-input-limits.example.html',
  selector: 'app-number-input-limits-example',
  standalone: true,
})
export class NumberInputLimitsExample {
  public percentage: number = 50;
  public temperature: number = 36.5;
}
