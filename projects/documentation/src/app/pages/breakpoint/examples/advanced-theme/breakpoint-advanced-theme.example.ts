import { Component } from '@angular/core';
import {
  DasarBreakpointComponent,
  DasarComponentConfig,
  DasarThemeProviderComponent,
} from 'dasar-ui';

@Component({
  templateUrl: './breakpoint-advanced-theme.example.html',
  selector: 'app-breakpoint-advanced-theme-example',
  imports: [DasarThemeProviderComponent, DasarBreakpointComponent],
  standalone: true,
})
export class BreakpointAdvancedThemeExample {
  protected componentConfig: DasarComponentConfig = {
    breakpoint: { hiddenAt: ['xs'] },
  };
}
