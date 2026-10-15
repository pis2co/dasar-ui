import { DasarInputComponent } from 'dasar-ui';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  imports: [FormsModule, DasarInputComponent],
  templateUrl: './input-mask.example.html',
  selector: 'app-input-mask-example',
  standalone: true,
})
export class InputMaskExample {
  protected amount: string = '5000000';
  protected dateStr: string = '';
  protected promoCode: string = '';

  protected customUpperMask = (val: string): string => {
    return val ? val.toUpperCase() : '';
  };
}
