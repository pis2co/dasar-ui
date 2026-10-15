import { Component } from '@angular/core';
import { DasarButtonComponent, DasarButtonGroupComponent } from 'dasar-ui';

@Component({
  templateUrl: './button-group-size.example.html',
  selector: 'app-button-group-size-example',
  imports: [DasarButtonGroupComponent, DasarButtonComponent],
  standalone: true,
})
export class ButtonGroupSizeExample {
  protected sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
}
