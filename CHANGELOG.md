# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## Unreleased

### Features

* theme tokens for `dasar-tabs`, `dasar-overlay` and `dasar-modal` (`tabsMap`, `overlayMap`, `modalMap`, `DasarThemeTabs`, `DasarThemeOverlay`, `DasarThemeModal`). Each key writes one CSS variable, through `tokens.light.tabs|overlay|modal` in `DasarThemeService.setGlobalTheme` or through `[tokenConfig]` on `dasar-theme-provider`.

### Breaking

* `dasar-overlay` `blur` / `background` and `dasar-modal` `overlay-blur` / `overlay-background` now default to `null` instead of `4px` and `rgba(0, 0, 0, 0.45)`. The rendered result is unchanged because those values moved to the CSS fallbacks, but the inputs can now be overridden by the `--overlay-blur` and `--overlay-background` theme tokens, and reading the input value returns `null` unless a consumer sets it.

## [1.5.0](https://github.com/pis2co/dasar-ui/compare/v1.4.0...v1.5.0) (2026-10-15)


### Features

* adjust dasar-tabs functionality and more ([998739a](https://github.com/pis2co/dasar-ui/commit/998739afce63b1ce1beec5b65126c1ee2aa7e7e5))
* adjust tabs component and more ([208f9aa](https://github.com/pis2co/dasar-ui/commit/208f9aa6706aacb766f592ddebcdd8480d06f945))
* create dasar-list component ([94efa8c](https://github.com/pis2co/dasar-ui/commit/94efa8c92a03b9e92609b187c16f691e68d2cef6))

## [1.4.0](https://github.com/pis2co/dasar-ui/compare/v1.3.0...v1.4.0) (2026-10-15)


### Features

* config, custom modal and more ([0972e21](https://github.com/pis2co/dasar-ui/commit/0972e21ae8070c63ff11705d8ba107a1a7cf948b))


### Bug Fixes

* placement and more ([b2174e8](https://github.com/pis2co/dasar-ui/commit/b2174e8130e63214890ee1a80d3dc2e912d315ef))

## [1.3.0](https://github.com/pis2co/dasar-ui/compare/v1.2.0...v1.3.0) (2026-10-09)

## [1.2.0](https://github.com/pis2co/dasar-ui/compare/v1.1.0...v1.2.0) (2026-10-09)


### Features

* add library package json as bump files ([7d5b56b](https://github.com/pis2co/dasar-ui/commit/7d5b56b04423eb05bcb262100703e91c444d56fb))

## [1.1.0](https://github.com/pis2co/dasar-ui/compare/v1.0.0...v1.1.0) (2026-10-09)


### Bug Fixes

* set repo to public ([a47b464](https://github.com/pis2co/dasar-ui/commit/a47b4642184ebb7fd85728947c4e8222963cb185))

## 1.0.0 (2026-10-09)


### Features

* initial commit for dasar-ui library ([972f154](https://github.com/pis2co/dasar-ui/commit/972f154d0b0b763485806eded49088d551d80288))
* resolve npm script and code cleanup ([798e4b8](https://github.com/pis2co/dasar-ui/commit/798e4b83a621409ae363ba5be714d6f077a694ce))
