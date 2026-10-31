import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  templateUrl: './pin-error.example.html',
  selector: 'app-pin-error-example',
  imports: [FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
})
export class PinErrorExample {
  protected pinValue = '99';
  protected hasError = true;
}
