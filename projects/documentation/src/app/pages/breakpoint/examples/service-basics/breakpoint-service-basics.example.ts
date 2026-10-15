import { Component, inject } from '@angular/core';
import { DasarBreakpointService } from 'dasar-ui';

@Component({
  templateUrl: './breakpoint-service-basics.example.html',
  selector: 'app-breakpoint-service-basics-example',
  standalone: true,
})
export class BreakpointServiceBasicsExample {
  protected bp = inject(DasarBreakpointService);
}
