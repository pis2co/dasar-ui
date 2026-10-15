import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { DasarBreakpointComponent, DasarBreakpointService } from 'dasar-ui';

@Component({
  templateUrl: './breakpoint-custom.example.html',
  selector: 'app-breakpoint-custom-example',
  imports: [DasarBreakpointComponent],
  standalone: true,
})
export class BreakpointCustomExample implements OnInit, OnDestroy {
  private bp = inject(DasarBreakpointService);

  protected current = '';

  ngOnInit() {
    this.bp.setBreakpoints({ md: 900 });
    this.current = 'md moved to 900px. Only this example is affected while it is alive.';
  }

  ngOnDestroy() {
    this.bp.setBreakpoints({ md: 768 });
  }
}
