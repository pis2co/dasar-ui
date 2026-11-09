import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  templateUrl: './toggle-basic.example.html',
  selector: 'app-toggle-basic-example',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
})
export class ToggleBasicExample {
  protected isSelected = false;
}
