import { Component } from '@angular/core';
import { DasarTextareaComponent } from 'dasar-ui';

@Component({
  templateUrl: './textarea-basic.example.html',
  selector: 'app-textarea-basic-example',
  imports: [DasarTextareaComponent],
  standalone: true,
})
export class TextareaBasicExample {
  protected text = '';
}
