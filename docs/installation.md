# Installation

How to add `dasar-ui` to an Angular project.

## Requirements

- Angular 22 (`@angular/core`, `@angular/common`, `@angular/forms`, `@angular/platform-browser` `^22.1.0`)
- `rxjs` `^7.8.0`
- Node.js 20 or newer (Angular 22 works on Node 20 and 22)

## Install the package

```bash
npm i dasar-ui
```

## Import a component

`dasar-ui` components are standalone. Import them where you use them:

```ts
import { DasarButtonComponent } from 'dasar-ui';

@Component({
  imports: [DasarButtonComponent],
  template: `<dasar-button variant="primary">Save</dasar-button>`,
})
export class App {}
```

## Styles

Theme CSS variables ship with the components, so no extra setup is required. Each component stylesheet includes the shared theme, which defines the `:root` variables (`--theme-*`, `--font-*`, `--space-*`, `--radius-*`) and the `[data-theme='dark']` overrides.

Optional: to use the SCSS variables directly in your own styles, import the theme file from the published package:

```scss
@use 'dasar-ui/styles/theme.scss' as *;
```

The published styles live in `dist/dasar-ui/styles/theme.scss` (source: `projects/dasar-ui/src/lib/styles/theme.scss`).

## Next steps

- [Getting started](./getting-started.md)
- Theming overview in the docs app (`/theming`)
