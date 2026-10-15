## 1. Render a component

Render your first component, wrap the app in the theme provider, and switch between light and dark mode.

```ts
import { DasarButtonComponent, DasarCardComponent } from 'dasar-ui';

@Component({
  imports: [DasarButtonComponent, DasarCardComponent],
  template: `
    <dasar-card label="Hello">
      <dasar-button variant="primary">Save</dasar-button>
    </dasar-card>
  `,
})
export class App {}
```

## 2. Add the theme provider

Wrap your app in `dasar-theme-provider` to set component defaults, theme tokens and the color mode in one place:

```html
<dasar-theme-provider [componentConfig]="componentConfig" [tokenConfig]="tokenConfig" mode="light">
  <router-outlet></router-outlet>
</dasar-theme-provider>
```

```ts
import { DasarComponentConfig, DasarThemeConfig } from 'dasar-ui';

protected componentConfig: DasarComponentConfig = {
  button: { appearance: 'solid', size: 'md' },
};

protected tokenConfig: DasarThemeConfig['tokens'] = {
  light: {
    button: { radius: '8px' },
  },
};
```

## 3. Set a global theme from code

To theme the whole page from a service instead of a provider, inject `DasarThemeService` and call `setGlobalTheme`:

```ts
import { inject } from '@angular/core';
import { DasarThemeService } from 'dasar-ui';

const themes = inject(DasarThemeService);
themes.setGlobalTheme({
  mode: 'light',
  components: { button: { appearance: 'solid' } },
  tokens: { light: { common: { primaryColor: '#2563eb' } } },
});
```

`setGlobalTheme` writes the mapped CSS variables onto `document.documentElement` (or a target element you pass) and toggles `data-theme="dark"` when `mode` is `'dark'`.

## 4. Toggle light and dark mode

The mode is a single value, `'light' | 'dark'`:

```html
<dasar-theme-provider [mode]="mode()">
  <dasar-button (click)="toggle()">Theme: {{ mode() }}</dasar-button>
</dasar-theme-provider>
```

```ts
import { signal } from '@angular/core';
import { DasarThemeMode } from 'dasar-ui';

protected mode = signal<DasarThemeMode>('light');

toggle() {
  this.mode.update((m) => (m === 'light' ? 'dark' : 'light'));
}
```

Dark mode works through the `[data-theme='dark']` CSS variable overrides plus the `tokens.dark` values you provide.

## Next steps

- [Installation](./installation.md)
- Theming overview in the docs app (`/theming`), with the full token, CSS variable and component config references
