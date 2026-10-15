import { Component } from '@angular/core';
import { DasarDividerComponent } from 'dasar-ui';

@Component({
  templateUrl: './divider-spacing.example.html',
  selector: 'app-divider-spacing-example',
  imports: [DasarDividerComponent],
  standalone: true,
})
export class DividerSpacingExample {
  protected spacings = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const;
}
