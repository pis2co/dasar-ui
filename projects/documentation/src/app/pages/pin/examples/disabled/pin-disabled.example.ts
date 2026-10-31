import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  templateUrl: './pin-disabled.example.html',
  selector: 'app-pin-disabled-example',
  imports: [FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
})
export class PinDisabledExample {
  protected pinValue = '1234';
}
