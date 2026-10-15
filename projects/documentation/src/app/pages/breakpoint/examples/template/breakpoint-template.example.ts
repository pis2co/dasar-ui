import { Component, inject } from '@angular/core';
import { DasarBreakpointService } from 'dasar-ui';

@Component({
  templateUrl: './breakpoint-template.example.html',
  selector: 'app-breakpoint-template-example',
  standalone: true,
})
export class BreakpointTemplateExample {
  protected bp = inject(DasarBreakpointService);
}
