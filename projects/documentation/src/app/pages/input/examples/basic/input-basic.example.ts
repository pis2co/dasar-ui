import { DasarInputComponent } from 'dasar-ui';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  imports: [FormsModule, DasarInputComponent],
  templateUrl: './input-basic.example.html',
  selector: 'app-input-basic-example',
  standalone: true,
})
export class InputBasicExample {
  protected emailValue: string = '';
}
