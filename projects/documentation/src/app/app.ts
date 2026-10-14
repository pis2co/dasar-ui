import { DasarThemeProviderComponent, DasarButtonComponent, DasarCardComponent } from 'dasar-ui';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DocCustomizeService } from './services/doc-customize.service';
import { DocCustomizeModalComponent } from './components/doc-customize-modal.component';

@Component({
  imports: [
    CommonModule,
    RouterOutlet,
    DasarThemeProviderComponent,
    DasarButtonComponent,
    DasarCardComponent,
    DocCustomizeModalComponent,
  ],
  templateUrl: './app.html',
  selector: 'app-root',
})
export class App {
  protected readonly customize = inject(DocCustomizeService);
  protected readonly customizeOpen = signal(false);
}
