import { Component, inject } from '@angular/core';
import { DasarButtonComponent, DasarThemeService } from 'dasar-ui';

@Component({
  templateUrl: './theming-global-theme.example.html',
  selector: 'app-theming-global-theme-example',
  imports: [DasarButtonComponent],
  standalone: true,
})
export class ThemingGlobalThemeExample {
  private themes = inject(DasarThemeService);

  protected applyTheme() {
    this.themes.setGlobalTheme({
      mode: 'light',
      components: { button: { appearance: 'solid', size: 'md' } },
      tokens: { light: { common: { primaryColor: '#2563eb' } } },
    });
  }
}
