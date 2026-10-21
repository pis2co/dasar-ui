import { Component, signal } from '@angular/core';
import { DasarSplitComponent } from 'dasar-ui';

@Component({
  templateUrl: './split-events.example.html',
  styles: [
    `
      .split-demo {
        height: 160px;
        border: 1px solid var(--dasar-theme-border-strong-color);
        border-radius: var(--dasar-radius-md);
        overflow: hidden;
        margin-bottom: var(--dasar-space-3);
      }
      .split-demo-tall {
        height: 260px;
      }
      .split-pane {
        padding: var(--dasar-space-3);
        height: 100%;
        box-sizing: border-box;
      }
      .split-log {
        font-size: var(--dasar-font-size-sm);
        margin: 0;
      }
    `,
  ],
  selector: 'app-split-events-example',
  imports: [...DasarSplitComponent],
  standalone: true,
})
export class SplitEventsExample {
  protected last = signal(0);
  protected lines = signal<string[]>([]);

  protected log(line: string) {
    this.lines.update((items) => [...items.slice(-4), line]);
  }
}
