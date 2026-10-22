import { Component, signal } from '@angular/core';
import { DasarSplitComponent, DasarButtonComponent } from 'dasar-ui';

@Component({
  templateUrl: './split-controlled.example.html',
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
  selector: 'app-split-controlled-example',
  imports: [...DasarSplitComponent, ...DasarButtonComponent],
  standalone: true,
})
export class SplitControlledExample {
  protected size = signal<number | string>(260);
}
