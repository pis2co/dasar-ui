# dasar-ui Design System

Source of truth generated from the `dasar-ui` Angular component library (`projects/dasar-ui/src/lib`). Reflects what is actually built, not an aspirational spec.

## Foundations

### Typography

| Token       | Value                                                               |
| ----------- | ------------------------------------------------------------------- |
| `font-sans` | `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` |
| `font-hero` | `'Space Grotesk', sans-serif`                                       |

| Weight   | Value |
| -------- | ----- |
| thin     | 300   |
| regular  | 400   |
| medium   | 500   |
| semibold | 600   |
| bold     | 700   |

| Size | rem   |
| ---- | ----- |
| xss  | 0.5   |
| xs   | 0.625 |
| sm   | 0.75  |
| base | 0.875 |
| lg   | 1     |
| xl   | 1.125 |

Line height: `tight` 1.25, `normal` 1.5.

### Color

Scales (900 → 50, plus a `base` step used as the "default" shade):

- **primary**: 900 `#071727` → 50 `#eff6ff`, base `#1b4d8e`
- **neutral**: 900 `#111827` → 50 `#ffffff`, base `#4b5563`
- **success**: base `#059669`, 50 `#ecfdf5` (+200/500/800)
- **danger**: base `#dc2626`, 50 `#fef2f2` (+200/500/800)
- **warning**: base `#d97706`, 50 `#fffbeb` (+200/500/800)

Semantic theme tokens (light/dark pair, switched via `[data-theme='dark']`):

- `theme-bg-window/default/surface/hover-color`
- `theme-text-color` / `-primary` / `-secondary` / `-disabled` / `-inverse`
- `theme-border-subtle-color` / `-strong`
- `theme-primary-color` / `-hover` / `-active` / `-surface`
- `theme-success/danger/warning-color` / `-surface`

All tokens are emitted both as SCSS variables (`theme.scss`) and a parallel JS object (`theme.ts`, `dasarVariables`) for programmatic use (e.g. theming APIs, chart libraries).

### Spacing

`em`-based scale: `0, 0.5, 1, base(=4), 3, 4, 5, 6, 8, 10, 12, 16, 18, 24, 32, 40, 48, 56, 64, 80, 96, 120` → `0em` to `30em`.

### Radius

`none, xxs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, full` → `0` to `1.5em`, `full` = `9999px`.

### Breakpoints

`sm 40em`, `md 48em`, `lg 64em`, `xl 75em`.

## Architecture conventions

- **Standalone Angular components** (no NgModules), one component per folder: `<name>.ts`, `.html`, `.scss`, `.spec.ts`.
- **`ViewEncapsulation.None`** throughout — styling relies on global CSS custom properties, not Shadow-DOM-style encapsulation.
- **Theming via `resolveThemeDefault`**: every `@Input` default is resolved through `DASAR_THEME_PROVIDER` (DI token) and `DasarThemeService`, so a global/theme-provided default can override the component's own default without touching call sites.
- **Attribute naming**: kebab-case `@Input` aliases (`full-width`, `icon-only`, `container-class`) mapped to camelCase properties — consistent with native HTML attribute conventions.
- **Style/class override pattern repeated everywhere**: most components expose `<slot>-class` and `<slot>-style` inputs per internal part (container, header, body, label, hint, icon, etc.), merged with `parseClassesToArray`.
- **Shared scale types**: `ScaleAttributeType` (generic xs–xl scale) is reused/narrowed per component (e.g. `Extract<ScaleAttributeType, 'sm'|'md'|'lg'>`).
- **Shared variant vocabulary**: `appearance` (`solid`/`subtle`/`outline`, or `outline`/`filled` for form fields) and `variant` (`primary`/`success`/`warning`/`danger`/`secondary`/`ghost`) are reused across components rather than redefined ad hoc.
- No `@angular/cdk` or other headless-primitives dependency — all interaction behavior (focus trap, overlay positioning, keyboard nav) is hand-rolled per component today.

## Component inventory

| Component                                 | Size scale      | Variant/Appearance                                                                                     | Notable inputs                                                            |
| ----------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| `dasar-alert`                             | —               | variant: primary/secondary/success/warning/danger                                                      | bordered, closeable, icon-name, title                                     |
| `dasar-breakpoint`                        | —               | —                                                                                                      | hidden-at, show-at (responsive visibility helper)                         |
| `dasar-button`                            | xs–xl           | appearance: solid/subtle/outline/**elevated**; variant: primary/success/warning/danger/secondary/ghost | fluid, full-width, icon-only, disabled                                    |
| `dasar-button-group`                      | xs–xl           | orientation: horizontal/vertical; propagates button's appearance (incl. **elevated**)                  | attached, propagates size/variant/appearance/radius to children           |
| `dasar-calendar`                          | sm/md/lg        | appearance: outline/borderless/**elevated**; variant                                                   | range, header/weekday format, locale                                      |
| `dasar-card`                              | sm/md/lg        | appearance: outline/borderless/**elevated** (origin of the elevated design); spacing                   | label, per-slot style/class overrides                                     |
| `dasar-checkbox` / `dasar-checkbox-group` | sm/md/lg        | —                                                                                                      | indeterminate, checked/unchecked value, direction                         |
| `dasar-chip`                              | xs–xl           | appearance/variant (shared with button, incl. **elevated**)                                            | removable, icon-name, fluid                                               |
| `dasar-datepicker`                        | sm/md/lg        | appearance: outline/filled/subtle/**elevated**                                                         | display/value format, locale                                              |
| `dasar-divider`                           | —               | —                                                                                                      | dashed, vertical, label + placement                                       |
| `dasar-drawer`                            | —               | placement                                                                                              | resizable, width/height, overlay blur/background, close-on-overlay/escape |
| `dasar-icon`                              | scale or number | —                                                                                                      | name, color, stroke                                                       |
| `dasar-input`                             | sm/md/lg        | appearance: outline/filled/**elevated**                                                                | mask (thousand/date/decimal/fn), type, error, full-width                  |
| `dasar-list`                              | sm/md/lg        | —                                                                                                      | selectable, hoverable, clickable, scroll-to behaviors                     |
| `dasar-menu`                              | sm/md/lg        | appearance: none/outline/filled/**elevated**                                                           | items, placement                                                          |
| `dasar-modal`                             | sm/md/lg        | appearance: outline/borderless/**elevated**; spacing                                                   | width, open, per-slot fluid flags                                         |
| `dasar-number-input`                      | xs–xl           | appearance: outline/filled/**elevated**                                                                | step/min/max, full-width                                                  |
| `dasar-overlay`                           | —               | —                                                                                                      | blur, background, close-on-click, z-index                                 |
| `dasar-pagination`                        | xs–xl           | appearance: ghost/solid/subtle/outline/**elevated** (delegates to button appearance)                   | page-count, page-sizes, display-order                                     |
| `dasar-pin`                               | —               | —                                                                                                      | —                                                                         |
| `dasar-radio` / `dasar-radio-group`       | sm/md/lg        | —                                                                                                      | checked-value, direction                                                  |
| `dasar-select`                            | sm/md/lg        | appearance: outline/filled/**elevated**                                                                | multiple-type (text/chip), chip-size, placement, debounce-time            |
| `dasar-skeleton`                          | xs–xl           | type: text/box                                                                                         | animated, circle, repeat                                                  |
| `dasar-slider`                            | —               | —                                                                                                      | —                                                                         |
| `dasar-split`                             | —               | direction                                                                                              | min/max, resizable panels                                                 |
| `dasar-switch`                            | sm/md/lg        | —                                                                                                      | checked/unchecked value+icon, default-value                               |
| `dasar-table`                             | sm/md/lg        | appearance: outline/filled/borderless/**elevated**; spacing                                            | striped, hoverable, loading, expandable, sort                             |
| `dasar-tabs`                              | scale           | appearance: solid/subtle/outline/**elevated**; spacing: compact/normal                                 | scroll buttons, active-index                                              |
| `dasar-textarea`                          | sm/md/lg        | appearance: outline/filled/**elevated**                                                                | rows/cols, error                                                          |
| `dasar-theme-provider`                    | —               | —                                                                                                      | componentConfig, tokenConfig, colorConfig (DI root for theme overrides)   |
| `dasar-toast`                             | —               | —                                                                                                      | item, label/caption/content/close slots (TemplateRef)                     |
| `dasar-toggle`                            | —               | —                                                                                                      | —                                                                         |
| `dasar-tooltip`                           | —               | —                                                                                                      | —                                                                         |
| `dasar-tree`                              | sm/md/lg        | type: file/selectable/multiple                                                                         | draggable, search, selectable, multiple, default-expand-all               |

### `elevated` appearance

Added across every component with an `appearance` input (button and its dependents — chip, button-group, pagination — plus calendar, datepicker, input, menu, number-input, select, tabs, textarea; already present on card/modal/table). Visual contract, matching `dasar-card`'s existing `appearance-elevated`:

- `border: 1px solid` the component's strong border token (falls back to `--dasar-theme-border-strong-color`)
- Background set to the surface token (`--dasar-theme-bg-surface-color`) rather than transparent/filled
- `box-shadow` raised-surface shadow: `0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -4px rgba(0,0,0,0.03)` (overridable per component via a `--dasar-<component>-elevated-shadow` token)
- Hover/focus states reuse the same interaction tokens as `outline` (border → primary color on hover, focus ring box-shadow)

Each component exposes its own override tokens following the existing naming convention, e.g. `--dasar-btn-elevated-shadow`, `--dasar-input-elevated-border`, `--dasar-select-elevated-focus-ring`.

## Shared vocabulary (for a design tool / token import)

- **Size scale**: `xs, sm, md, lg, xl` (not all components use the full range — see table).
- **Appearance**: `solid | subtle | outline | elevated` (buttons/tabs/pagination family) or `outline | filled | elevated` (form-field family: input, select, textarea, number-input, datepicker). `elevated` is also available on card, modal, table, calendar, and menu.
- **Variant** (semantic color): `primary | secondary | success | warning | danger | ghost`.
- **Radius scale**: `none, xxs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, full`.
- **Spacing scale**: `compact | normal` (component-level density) distinct from the base `em` spacing scale above.

## Gaps vs. a typical headless design-system baseline

Not present as dedicated components today: avatar, breadcrumbs, combobox, context-menu, popover (separate from tooltip/menu), progress, rating, toolbar, toggle-group, input-otp, meter, accordion/collapsible (tabs exists, accordion doesn't). Worth noting if cross-referencing against `ng-primitives` or another primitives set.
