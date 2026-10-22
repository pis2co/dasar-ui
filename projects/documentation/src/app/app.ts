import {
  DasarThemeProviderComponent,
  DasarBreakpointService,
  DasarButtonComponent,
  DasarCardComponent,
  DasarChipComponent,
  DasarDrawerComponent,
  DasarIconComponent,
  DasarToastComponent,
  DASAR_TOAST_NAVIGATOR,
} from 'dasar-ui';
import { Component, computed, effect, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DocCustomizeService } from './services/doc-customize.service';
import { DocCustomizeModalComponent } from './components/doc-customize-modal.component';
import { DasarUiLogoComponent } from './components/dasar-ui-logo.component';

interface HeaderAction {
  key: 'changelog' | 'github' | 'npm' | 'customize' | 'theme';
  label: string;
  icon: string;
  variant: 'primary' | 'secondary' | 'danger';
  appearance: 'solid' | 'outline';
  textOnDesktop?: boolean;
}

// @ts-ignore
import packageJson from '../../../../projects/dasar-ui/package.json' with { loader: 'text' };

@Component({
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    DasarThemeProviderComponent,
    DasarButtonComponent,
    DasarCardComponent,
    DasarChipComponent,
    DasarDrawerComponent,
    DasarIconComponent,
    DasarToastComponent,
    DocCustomizeModalComponent,
    DasarUiLogoComponent,
  ],
  providers: [
    {
      provide: DASAR_TOAST_NAVIGATOR,
      useFactory: () => {
        const router = inject(Router);
        return (to: string) => void router.navigateByUrl(to);
      },
    },
  ],
  templateUrl: './app.html',
  selector: 'app-root',
})
export class App {
  protected readonly customize = inject(DocCustomizeService);
  private readonly breakpoint = inject(DasarBreakpointService);
  protected readonly customizeOpen = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly logoVariant = computed(() =>
    this.customize.mode() === 'dark' ? 'horizontal-dark' : 'horizontal-light',
  );
  protected readonly actions = computed<HeaderAction[]>(() => [
    {
      key: 'changelog',
      label: 'Changelog',
      icon: 'history',
      variant: 'secondary',
      appearance: 'outline',
      textOnDesktop: true,
    },
    {
      key: 'github',
      label: 'GitHub',
      icon: 'brand-github',
      variant: 'secondary',
      appearance: 'outline',
    },
    { key: 'npm', label: 'npm', icon: 'brand-npm', variant: 'danger', appearance: 'outline' },
    {
      key: 'customize',
      label: 'Customize',
      icon: 'pencil',
      variant: 'secondary',
      appearance: 'outline',
    },
    {
      key: 'theme',
      label: this.customize.mode() === 'light' ? 'Dark mode' : 'Light mode',
      icon: this.customize.mode() === 'light' ? 'moon' : 'sun',
      variant: 'primary',
      appearance: 'solid',
    },
  ]);
  protected readonly version: string = (typeof packageJson === 'string'
    ? (JSON.parse(packageJson) as { version: string })
    : (packageJson as unknown as { version: string })
  ).version;
  protected readonly latestVersion = signal<string | null>(null);

  constructor() {
    // The menu only exists on small screens, so close it when the window grows.
    effect(() => {
      if (!this.breakpoint.smAndDown()) this.menuOpen.set(false);
    });

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

  protected runAction(action: HeaderAction, fromMenu = false) {
    if (action.key === 'theme') {
      this.customize.toggleMode();
      return;
    }
    if (fromMenu) this.menuOpen.set(false);
    if (action.key === 'customize') this.customizeOpen.set(true);
    else if (action.key === 'github') this.openExternal('https://github.com/pis2co/dasar-ui');
    else if (action.key === 'npm') this.openExternal('https://www.npmjs.com/package/dasar-ui');
    else this.openExternal('https://github.com/pis2co/dasar-ui/blob/main/CHANGELOG.md');
  }
}
