import { Component, signal } from '@angular/core';
import { DasarBreakpointComponent, DasarBreakpointState } from 'dasar-ui';

@Component({
  templateUrl: './breakpoint-events.example.html',
  selector: 'app-breakpoint-events-example',
  imports: [DasarBreakpointComponent],
  standalone: true,
})
export class BreakpointEventsExample {
  protected log = signal<string[]>([]);

  protected handleMedia(state: DasarBreakpointState) {
    this.log.update((entries) => [...entries, `media: ${state.name} (${state.width}px)`]);
  }

  protected handleShow(state: DasarBreakpointState) {
    this.log.update((entries) => [...entries, `shown at ${state.name}`]);
  }

  protected handleHidden(state: DasarBreakpointState) {
    this.log.update((entries) => [...entries, `hidden at ${state.name}`]);
  }
}
