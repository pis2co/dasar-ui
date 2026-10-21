# Dasar UI

Angular UI component library based on danarakca design system. Standalone components, SSR-safe, themeable with light and dark mode.

[![npm version](https://img.shields.io/npm/v/dasar-ui.svg)](https://www.npmjs.com/package/dasar-ui)
[![license](https://img.shields.io/npm/l/dasar-ui.svg)](https://github.com/pis2co/dasar-ui/blob/main/package.json)

## Features

- Standalone Angular components, no NgModule setup
- Theming in three layers: CSS variables, theme tokens, component config
- Light and dark mode with `data-theme="dark"`
- SSR-safe components and documentation app
- Design tokens for colors, typography, spacing, radius and per-component styles

## Components

Button, Icon, Chip, Input, Number Input, Select, Calendar, Datepicker, Card, Modal, Drawer, Tree, Overlay, Menu, Table, Tabs, List.

## Quick start

```bash
npm i dasar-ui
```

```ts
import { DasarButtonComponent } from 'dasar-ui';

@Component({
  imports: [DasarButtonComponent],
  template: `<dasar-button variant="primary">Save</dasar-button>`,
})
export class App {}
```

Read the full guides:

- [Installation](./docs/installation.md)
- [Getting started](./docs/getting-started.md)
- [Theming overview](https://github.com/pis2co/dasar-ui) (in the docs app: `/theming`)

## Links

- [Documentation app](https://github.com/pis2co/dasar-ui)
- [npm package](https://www.npmjs.com/package/dasar-ui)
- [Changelog](https://github.com/pis2co/dasar-ui/blob/main/CHANGELOG.md)
- [GitHub repository](https://github.com/pis2co/dasar-ui)

## Contributors

- <a href="https://github.com/pis2co"><div style="display: flex; align-items: center;"><img src="https://github.com/pis2co.png?size=40" width="32" height="32" alt="pis2co" style="display: inline-block; border-radius: 50%; vertical-align: middle; margin: 0 8px 0 0;" /><span>**[pis2co](https://github.com/pis2co)**, Organization and maintainer</span></div></a>
- <a href="https://github.com/dxxta"><div style="display: flex; align-items: center;"><img src="https://github.com/dxxta.png?size=40" width="32" height="32" alt="dxxta" style="display: inline-block; border-radius: 50%; vertical-align: middle; margin: 0 8px 0 0;" /><span>**[dxxta](https://github.com/dxxta)**, Author and maintainer</span></div></a>

Contributions are welcome for apbn core team. Open an issue or a pull request on [GitHub](https://github.com/pis2co/dasar-ui).

## Development

This repository is an Angular 22 monorepo with the `dasar-ui` library and an SSR documentation app.

```bash
npm install
npx ng build dasar-ui
npx ng build documentation
npx ng test dasar-ui --watch=false
```
