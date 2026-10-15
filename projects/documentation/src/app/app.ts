import {
  DasarThemeProviderComponent,
  DasarButtonComponent,
  DasarCardComponent,
  DasarChipComponent,
  DasarIconComponent,
} from 'dasar-ui';
import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DocCustomizeService } from './services/doc-customize.service';
import { DocCustomizeModalComponent } from './components/doc-customize-modal.component';

// @ts-ignore
import packageJson from '../../../../projects/dasar-ui/package.json' with { loader: 'text' };

@Component({
  imports: [
    CommonModule,
    RouterOutlet,
    DasarThemeProviderComponent,
    DasarButtonComponent,
    DasarCardComponent,
    DasarChipComponent,
    DasarIconComponent,
    DocCustomizeModalComponent,
  ],
  templateUrl: './app.html',
  selector: 'app-root',
})
export class App {
  protected readonly customize = inject(DocCustomizeService);
  protected readonly customizeOpen = signal(false);
  protected readonly version: string = (typeof packageJson === 'string'
    ? (JSON.parse(packageJson) as { version: string })
    : (packageJson as unknown as { version: string })
  ).version;
  protected readonly latestVersion = signal<string | null>(null);

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      fetch('https://registry.npmjs.org/dasar-ui/latest')
        .then((res) => (res.ok ? res.json() : null))
        .then((data: { version?: string } | null) => {
          if (data?.version && data.version !== this.version) {
            this.latestVersion.set(data.version);
          }
        })
        .catch(() => undefined);
    }
  }

  protected openExternal(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
