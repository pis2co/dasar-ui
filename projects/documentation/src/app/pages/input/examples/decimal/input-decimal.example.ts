import { DasarInputComponent } from 'dasar-ui';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

/** Keeps digits and a single separator, and limits the number of decimals. */
function decimalMaskFor(separator: '.' | ',', maxDecimals: number): (val: string) => string {
  return (val: string): string => {
    if (!val) return '';
    const cleaned = val.replace(/[.,]/g, separator).replace(new RegExp(`[^0-9\\${separator}]`, 'g'), '');
    const [integer, ...rest] = cleaned.split(separator);
    if (rest.length === 0) return integer;
    return `${integer}${separator}${rest.join('').slice(0, maxDecimals)}`;
  };
}

@Component({
  imports: [FormsModule, DasarInputComponent],
  templateUrl: './input-decimal.example.html',
  selector: 'app-input-decimal-example',
  standalone: true,
})
export class InputDecimalExample {
  protected price: string = '1234.56';
  protected rate: string = '0,125';
  protected weight: string = '72.35';

  protected decimalMask = decimalMaskFor('.', 2);
  protected commaDecimalMask = decimalMaskFor(',', 3);
}
