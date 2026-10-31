import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  templateUrl: './pin-basic.example.html',
  selector: 'app-pin-basic-example',
  imports: [FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
})
export class PinBasicExample {
  protected pinValue = '';
  protected completedValue = '';

  protected onComplete(value: any) {
    this.completedValue = String(value ?? '');
  }
}
