## Maintaining Angular version support

Notes for whoever bumps `dasar-ui`'s supported Angular range when a new major ships (e.g. Angular 23). Follow this every time, not just when something breaks.

## 1. Check `ng-primitives` first, not Angular's release notes

`dasar-ui`'s own peerDependencies should never promise more than its real dependency supports. Before touching `projects/dasar-ui/package.json`, check what `ng-primitives` actually allows:

```bash
node -p "require('ng-primitives/package.json').peerDependencies"
```

If `ng-primitives` hasn't added the new major yet, `dasar-ui` can't either, regardless of what Angular itself allows or what the Angular CLI reports as compatible.

## 2. Keep the peer range a range, not a moving pin

Widen, don't replace:

```diff
- "@angular/core": "^22.1.0",
+ "@angular/core": "^22.1.0 || ^23.0.0",
```

The goal is "support current and previous major," matching what `ng-primitives` itself does. Never drop support for the previous major just because a new one shipped, unless `ng-primitives` has also dropped it.

## 3. Smoke-test before widening, every time

This step is not optional, even if the diff looks trivial:

```bash
npm run build:library
# in a throwaway directory, outside this repo:
npx -y @angular/cli@latest new smoke-test --standalone --skip-git
cd smoke-test
npm i <path-to-this-repo>/dist/dasar-ui
# import a handful of components (Button, Modal, Datepicker at minimum)
# and the ones most likely to touch new Angular internals (anything
# using signals, host bindings, or portal/overlay primitives)
npm run build
npm test
```

A peer-range widening with no smoke test is how a real incompatibility slips in disguised as a trivial version bump.

## 4. Versioning: a wider peer range is not a breaking change

Widening support is a `fix:` or `chore:` commit, not `feat!`/`BREAKING CHANGE`. Reserve major version bumps for `dasar-ui`'s own breaking API changes (like the v3.0.0 ng-primitives migration). Don't conflate "we now also support Angular 23" with "we changed our own public API."

## 5. One CHANGELOG line, dedicated

Give Angular-version support its own changelog entry, separate from whatever feature work happens to land in the same release:

```
* support Angular 23 (ng-primitives now supports it as of 0.1xx.0)
```

Don't bury it inside an unrelated feature commit's message — someone scanning releases for "can I upgrade yet" should be able to find this in one line.

## 6. Update docs alongside the code

- `docs/installation.md`'s "Requirements" section states the exact supported range — update it in the same PR, not after.
- If Node's supported range changed too (new Angular majors often bump the Node floor), update that line as well.

## Checklist

- [ ] Checked `ng-primitives`'s peerDependencies for the new major
- [ ] Widened (not replaced) `projects/dasar-ui/package.json`'s peerDependencies
- [ ] Smoke-tested against a real scaffolded app on the new major
- [ ] Commit type is `fix`/`chore`, not `feat!`
- [ ] CHANGELOG has a dedicated line for the new Angular support
- [ ] `docs/installation.md` "Requirements" section updated
