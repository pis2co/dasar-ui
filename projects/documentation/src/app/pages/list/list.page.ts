import { getDocsContent } from '../../docs-content.generated';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { ListBasicExample } from './examples/basic/list-basic.example';
import { ListSizeExample } from './examples/size/list-size.example';
import { ListBorderedDividerExample } from './examples/bordered-divider/list-bordered-divider.example';
import { ListInteractiveExample } from './examples/interactive/list-interactive.example';
import { ListHeaderFooterExample } from './examples/header-footer/list-header-footer.example';
import { ListPrefixSuffixExample } from './examples/prefix-suffix/list-prefix-suffix.example';
import { ListCustomStyleExample } from './examples/custom-style/list-custom-style.example';
import { ListAdvancedDynamicExample } from './examples/advanced-dynamic/list-advanced-dynamic.example';
import { ListAdvancedThemeExample } from './examples/advanced-theme/list-advanced-theme.example';
import { ListRadiusExample } from './examples/radius/list-radius.example';
import { ListRadiusThemeExample } from './examples/radius-theme/list-radius-theme.example';
import { ListSelectableExample } from './examples/selectable/list-selectable.example';
import { ListScrollExample } from './examples/scroll/list-scroll.example';
import { ListScrollToValueExample } from './examples/scroll-to-value/list-scroll-to-value.example';
import { ListValueFieldExample } from './examples/value-field/list-value-field.example';
import { ListReactiveExample } from './examples/reactive/list-reactive.example';
import { ListKeyboardExample } from './examples/keyboard/list-keyboard.example';

const basicHtml = getDocsContent('projects/documentation/src/app/pages/list/examples/basic/list-basic.example.html');
const basicTs = getDocsContent('projects/documentation/src/app/pages/list/examples/basic/list-basic.example.ts');

const sizeHtml = getDocsContent('projects/documentation/src/app/pages/list/examples/size/list-size.example.html');
const sizeTs = getDocsContent('projects/documentation/src/app/pages/list/examples/size/list-size.example.ts');

const borderedDividerHtml = getDocsContent('projects/documentation/src/app/pages/list/examples/bordered-divider/list-bordered-divider.example.html');
const borderedDividerTs = getDocsContent('projects/documentation/src/app/pages/list/examples/bordered-divider/list-bordered-divider.example.ts');

const interactiveHtml = getDocsContent('projects/documentation/src/app/pages/list/examples/interactive/list-interactive.example.html');
const interactiveTs = getDocsContent('projects/documentation/src/app/pages/list/examples/interactive/list-interactive.example.ts');

const headerFooterHtml = getDocsContent('projects/documentation/src/app/pages/list/examples/header-footer/list-header-footer.example.html');
const headerFooterTs = getDocsContent('projects/documentation/src/app/pages/list/examples/header-footer/list-header-footer.example.ts');

const prefixSuffixHtml = getDocsContent('projects/documentation/src/app/pages/list/examples/prefix-suffix/list-prefix-suffix.example.html');
const prefixSuffixTs = getDocsContent('projects/documentation/src/app/pages/list/examples/prefix-suffix/list-prefix-suffix.example.ts');

const customStyleHtml = getDocsContent('projects/documentation/src/app/pages/list/examples/custom-style/list-custom-style.example.html');
const customStyleTs = getDocsContent('projects/documentation/src/app/pages/list/examples/custom-style/list-custom-style.example.ts');

const advancedDynamicHtml = getDocsContent('projects/documentation/src/app/pages/list/examples/advanced-dynamic/list-advanced-dynamic.example.html');
const advancedDynamicTs = getDocsContent('projects/documentation/src/app/pages/list/examples/advanced-dynamic/list-advanced-dynamic.example.ts');

const advancedThemeHtml = getDocsContent('projects/documentation/src/app/pages/list/examples/advanced-theme/list-advanced-theme.example.html');
const advancedThemeTs = getDocsContent('projects/documentation/src/app/pages/list/examples/advanced-theme/list-advanced-theme.example.ts');

const radiusHtml = getDocsContent('projects/documentation/src/app/pages/list/examples/radius/list-radius.example.html');
const radiusTs = getDocsContent('projects/documentation/src/app/pages/list/examples/radius/list-radius.example.ts');

const radiusThemeHtml = getDocsContent('projects/documentation/src/app/pages/list/examples/radius-theme/list-radius-theme.example.html');
const radiusThemeTs = getDocsContent('projects/documentation/src/app/pages/list/examples/radius-theme/list-radius-theme.example.ts');

const selectableHtml = getDocsContent('projects/documentation/src/app/pages/list/examples/selectable/list-selectable.example.html');
const selectableTs = getDocsContent('projects/documentation/src/app/pages/list/examples/selectable/list-selectable.example.ts');

const scrollHtml = getDocsContent('projects/documentation/src/app/pages/list/examples/scroll/list-scroll.example.html');
const scrollTs = getDocsContent('projects/documentation/src/app/pages/list/examples/scroll/list-scroll.example.ts');

const scrollToValueHtml = getDocsContent('projects/documentation/src/app/pages/list/examples/scroll-to-value/list-scroll-to-value.example.html');
const scrollToValueTs = getDocsContent('projects/documentation/src/app/pages/list/examples/scroll-to-value/list-scroll-to-value.example.ts');

const valueFieldHtml = getDocsContent('projects/documentation/src/app/pages/list/examples/value-field/list-value-field.example.html');
const valueFieldTs = getDocsContent('projects/documentation/src/app/pages/list/examples/value-field/list-value-field.example.ts');

const reactiveHtml = getDocsContent('projects/documentation/src/app/pages/list/examples/reactive/list-reactive.example.html');
const reactiveTs = getDocsContent('projects/documentation/src/app/pages/list/examples/reactive/list-reactive.example.ts');

const keyboardHtml = getDocsContent('projects/documentation/src/app/pages/list/examples/keyboard/list-keyboard.example.html');
const keyboardTs = getDocsContent('projects/documentation/src/app/pages/list/examples/keyboard/list-keyboard.example.ts');

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    ListBasicExample,
    ListSizeExample,
    ListBorderedDividerExample,
    ListInteractiveExample,
    ListHeaderFooterExample,
    ListPrefixSuffixExample,
    ListCustomStyleExample,
    ListAdvancedDynamicExample,
    ListAdvancedThemeExample,
    ListRadiusExample,
    ListRadiusThemeExample,
    ListSelectableExample,
    ListScrollExample,
    ListScrollToValueExample,
    ListValueFieldExample,
    ListReactiveExample,
    ListKeyboardExample,
  ],
  templateUrl: './list.page.html',
  selector: 'app-list-page',
  standalone: true,
})
export class ListDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;

  protected sizeHtml = sizeHtml;
  protected sizeTs = sizeTs;

  protected borderedDividerHtml = borderedDividerHtml;
  protected borderedDividerTs = borderedDividerTs;

  protected interactiveHtml = interactiveHtml;
  protected interactiveTs = interactiveTs;

  protected headerFooterHtml = headerFooterHtml;
  protected headerFooterTs = headerFooterTs;

  protected prefixSuffixHtml = prefixSuffixHtml;
  protected prefixSuffixTs = prefixSuffixTs;

  protected customStyleHtml = customStyleHtml;
  protected customStyleTs = customStyleTs;

  protected advancedDynamicHtml = advancedDynamicHtml;
  protected advancedDynamicTs = advancedDynamicTs;

  protected advancedThemeHtml = advancedThemeHtml;
  protected advancedThemeTs = advancedThemeTs;

  protected radiusHtml = radiusHtml;
  protected radiusTs = radiusTs;

  protected radiusThemeHtml = radiusThemeHtml;
  protected radiusThemeTs = radiusThemeTs;

  protected selectableHtml = selectableHtml;
  protected selectableTs = selectableTs;

  protected scrollHtml = scrollHtml;
  protected scrollTs = scrollTs;

  protected scrollToValueHtml = scrollToValueHtml;
  protected scrollToValueTs = scrollToValueTs;

  protected valueFieldHtml = valueFieldHtml;
  protected valueFieldTs = valueFieldTs;

  protected reactiveHtml = reactiveHtml;
  protected reactiveTs = reactiveTs;

  protected keyboardHtml = keyboardHtml;
  protected keyboardTs = keyboardTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description:
        'Sets the font size and the item padding. Uses --dasar-list-font-size-sm/md/lg and --dasar-list-item-padding.',
    },
    {
      name: 'radius',
      type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'",
      defaultValue: "'md'",
      description: 'Corner radius of the container. Default via components.list.radius.',
    },
    {
      name: 'bordered',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Adds a 1px border around the container using --dasar-list-border.',
    },
    {
      name: 'show-divider',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Separates items with a 1px line using --dasar-list-divider.',
    },
    {
      name: 'hoverable',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Highlights an item on hover using --dasar-list-hover-background.',
    },
    {
      name: 'clickable',
      type: 'boolean',
      defaultValue: 'false',
      description:
        'Shows a pointer cursor and an active background using --dasar-list-active-background. The click event stays on the item, the component does not emit anything.',
    },
    {
      name: 'value / [(ngModel)]',
      type: 'any',
      defaultValue: 'null',
      description: 'Selected value. Works with valueChange, ngModel and reactive forms.',
    },
    {
      name: 'selectable',
      type: 'boolean',
      defaultValue: 'false',
      description:
        'Clicking an item selects it and highlights it using --dasar-list-active-item-background. Default via components.list.selectable.',
    },
    {
      name: 'value-field',
      type: 'string | null',
      defaultValue: 'null',
      description:
        'Matches object values by this key, so { id: 2, name: "x" } selects the item with id 2.',
    },
    {
      name: 'max-height',
      type: 'string | null',
      defaultValue: 'null',
      description:
        'Max height of the content area, for example "200px". Only the content scrolls, the header and footer stay fixed. Also settable with the --dasar-list-max-height token.',
    },
    {
      name: 'scroll-offset',
      type: 'number',
      defaultValue: '0',
      description:
        "Pixels between the active item's top and the scroll area top after auto-scroll.",
    },
    {
      name: 'scroll-behavior',
      type: "'auto' | 'smooth'",
      defaultValue: "'auto'",
      description: 'Scroll animation used by auto-scroll.',
    },
    {
      name: 'scroll-on-init',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Scrolls to the value on first render. Later value changes still scroll.',
    },
    {
      name: 'scroll-on-click',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Scrolls a clicked item to the offset.',
    },
    {
      name: 'keyboard',
      type: 'boolean',
      defaultValue: 'true',
      description:
        'Arrow keys, Home, End and Enter navigate and select when selectable. Only active then.',
    },
    {
      name: 'show-focus',
      type: 'boolean',
      defaultValue: 'false',
      description:
        'Shows the focus outline (--dasar-list-focus-item-outline) on the keyboard-focused item. Navigation works either way.',
    },
    {
      name: '(valueChange) / (onUpdate)',
      type: 'any',
      defaultValue: '-',
      description: 'Emit the new value when the user selects an item.',
    },
    {
      name: '(onItemClick)',
      type: 'DasarListItemClickEvent',
      defaultValue: '-',
      description:
        'Fires on every non-disabled item click with value, index and the event, even without selectable.',
    },
    {
      name: '(onScroll)',
      type: 'DasarListScrollEvent',
      defaultValue: '-',
      description:
        'Fires each time the list scrolls to an item on its own, with value, index, scrollTop and reason (init, value, click, keyboard or api).',
    },
    {
      name: '(onUserScroll)',
      type: 'Event',
      defaultValue: '-',
      description: 'Native scroll of the content area.',
    },
    {
      name: 'scrollToActive() / scrollToValue()',
      type: 'method',
      defaultValue: '-',
      description: 'Public methods reachable via ViewChild to scroll from code.',
    },
    {
      name: 'dasar-list-item: value',
      type: 'any',
      defaultValue: 'undefined',
      description: 'Value of the item. Items without a value cannot be selected.',
    },
    {
      name: 'dasar-list-item: disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Blocks clicks and keyboard on the item.',
    },
    {
      name: 'container-class',
      type: 'string | object',
      defaultValue: "''",
      description: 'Class applied to the list container.',
    },
    {
      name: 'container-style',
      type: 'object',
      defaultValue: 'null',
      description: 'Inline style for the list container.',
    },
    {
      name: 'item-class',
      type: 'string | object',
      defaultValue: "''",
      description: 'On dasar-list-item. Class applied to the item.',
    },
    {
      name: 'item-style',
      type: 'object',
      defaultValue: 'null',
      description: 'On dasar-list-item. Inline style for the item.',
    },
    {
      name: '[header-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description:
        'On dasar-list. Renders a sticky-style header above the content. The header and footer wrapper is only rendered when the slot is provided.',
    },
    {
      name: '[footer-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'On dasar-list. Renders a footer below the content.',
    },
    {
      name: '[prefix-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'On dasar-list-item. Renders before the item body, for example an icon.',
    },
    {
      name: '[suffix-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'On dasar-list-item. Renders after the item body, for example a chip.',
    },
    {
      name: 'default slot',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'The list content. dasar-list-item elements are the usual children.',
    },
    {
      name: 'theme tokens',
      type: 'DasarThemeList',
      defaultValue: '-',
      description:
        'Set through tokens.light.list (or tokens.dark.list) in DasarThemeService.setGlobalTheme, or [tokenConfig] on dasar-theme-provider. Example: hoverBackground -> --dasar-list-hover-background.',
    },
    {
      name: 'component config',
      type: 'DasarListConfig / DasarListItemConfig',
      defaultValue: '-',
      description: 'Defaults via components.list and components.listItem in DasarComponentConfig.',
    },
  ];
}
