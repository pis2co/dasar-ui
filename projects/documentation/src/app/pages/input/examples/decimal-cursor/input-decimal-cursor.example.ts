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

/**
 * Minimal reproduction: the cursor moves to the front when the decimal separator is typed,
 * so 5.03 cannot be typed left to right.
 */
@Component({
  imports: [FormsModule, DasarInputComponent],
  templateUrl: './input-decimal-cursor.example.html',
  selector: 'app-input-decimal-cursor-example',
  standalone: true,
})
export class InputDecimalCursorExample {
  protected numberValue: number | string | null = null;
  protected commaValue: string = '';
  protected dotValue: string = '';

  protected commaDecimalMask = decimalMaskFor(',', 3);
  protected dotDecimalMask = decimalMaskFor('.', 2);
}
