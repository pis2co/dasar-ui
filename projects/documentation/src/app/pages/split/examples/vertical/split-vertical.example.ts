import { Component } from '@angular/core';
import { DasarSplitComponent } from 'dasar-ui';

@Component({
  templateUrl: './split-vertical.example.html',
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
  selector: 'app-split-vertical-example',
  imports: [...DasarSplitComponent],
  standalone: true,
})
export class SplitVerticalExample {}
