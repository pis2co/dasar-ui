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

Button, Icon, Chip, Input, Number Input, Select, Calendar, Datepicker, Card, Modal, Drawer, Overlay, Menu, Table, Tabs, List.

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

## Development

This repository is an Angular 22 monorepo with the `dasar-ui` library and an SSR documentation app.

```bash
npm install
npx ng build dasar-ui
npx ng build documentation
npx ng test dasar-ui --watch=false
```
