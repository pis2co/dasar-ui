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

// @ts-ignore
import basicHtml from './examples/basic/list-basic.example.html' with { loader: 'text' };
// @ts-ignore
import basicTs from './examples/basic/list-basic.example.ts' with { loader: 'text' };

// @ts-ignore
import sizeHtml from './examples/size/list-size.example.html' with { loader: 'text' };
// @ts-ignore
import sizeTs from './examples/size/list-size.example.ts' with { loader: 'text' };

// @ts-ignore
import borderedDividerHtml from './examples/bordered-divider/list-bordered-divider.example.html' with {
  loader: 'text',
};
// @ts-ignore
import borderedDividerTs from './examples/bordered-divider/list-bordered-divider.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import interactiveHtml from './examples/interactive/list-interactive.example.html' with {
  loader: 'text',
};
// @ts-ignore
import interactiveTs from './examples/interactive/list-interactive.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import headerFooterHtml from './examples/header-footer/list-header-footer.example.html' with {
  loader: 'text',
};
// @ts-ignore
import headerFooterTs from './examples/header-footer/list-header-footer.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import prefixSuffixHtml from './examples/prefix-suffix/list-prefix-suffix.example.html' with {
  loader: 'text',
};
// @ts-ignore
import prefixSuffixTs from './examples/prefix-suffix/list-prefix-suffix.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import customStyleHtml from './examples/custom-style/list-custom-style.example.html' with {
  loader: 'text',
};
// @ts-ignore
import customStyleTs from './examples/custom-style/list-custom-style.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import advancedDynamicHtml from './examples/advanced-dynamic/list-advanced-dynamic.example.html' with {
  loader: 'text',
};
// @ts-ignore
import advancedDynamicTs from './examples/advanced-dynamic/list-advanced-dynamic.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import advancedThemeHtml from './examples/advanced-theme/list-advanced-theme.example.html' with {
  loader: 'text',
};
// @ts-ignore
import advancedThemeTs from './examples/advanced-theme/list-advanced-theme.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import radiusHtml from './examples/radius/list-radius.example.html' with { loader: 'text' };
// @ts-ignore
import radiusTs from './examples/radius/list-radius.example.ts' with { loader: 'text' };

// @ts-ignore
import radiusThemeHtml from './examples/radius-theme/list-radius-theme.example.html' with {
  loader: 'text',
};
// @ts-ignore
import radiusThemeTs from './examples/radius-theme/list-radius-theme.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import selectableHtml from './examples/selectable/list-selectable.example.html' with {
  loader: 'text',
};
// @ts-ignore
import selectableTs from './examples/selectable/list-selectable.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import scrollHtml from './examples/scroll/list-scroll.example.html' with { loader: 'text' };
// @ts-ignore
import scrollTs from './examples/scroll/list-scroll.example.ts' with { loader: 'text' };

// @ts-ignore
import scrollToValueHtml from './examples/scroll-to-value/list-scroll-to-value.example.html' with {
  loader: 'text',
};
// @ts-ignore
import scrollToValueTs from './examples/scroll-to-value/list-scroll-to-value.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import valueFieldHtml from './examples/value-field/list-value-field.example.html' with {
  loader: 'text',
};
// @ts-ignore
import valueFieldTs from './examples/value-field/list-value-field.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import reactiveHtml from './examples/reactive/list-reactive.example.html' with {
  loader: 'text',
};
// @ts-ignore
import reactiveTs from './examples/reactive/list-reactive.example.ts' with { loader: 'text' };

// @ts-ignore
import keyboardHtml from './examples/keyboard/list-keyboard.example.html' with {
  loader: 'text',
};
// @ts-ignore
import keyboardTs from './examples/keyboard/list-keyboard.example.ts' with { loader: 'text' };

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
        'Sets the font size and the item padding. Uses --list-font-size-sm/md/lg and --list-item-padding.',
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
      description: 'Adds a 1px border around the container using --list-border.',
    },
    {
      name: 'show-divider',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Separates items with a 1px line using --list-divider.',
    },
    {
      name: 'hoverable',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Highlights an item on hover using --list-hover-background.',
    },
    {
      name: 'clickable',
      type: 'boolean',
      defaultValue: 'false',
      description:
        'Shows a pointer cursor and an active background using --list-active-background. The click event stays on the item, the component does not emit anything.',
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
        'Clicking an item selects it and highlights it using --list-active-item-background. Default via components.list.selectable.',
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
        'Max height of the content area, for example "200px". Only the content scrolls, the header and footer stay fixed. Also settable with the --list-max-height token.',
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
        'Shows the focus outline (--list-focus-item-outline) on the keyboard-focused item. Navigation works either way.',
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
        'Set through tokens.light.list (or tokens.dark.list) in DasarThemeService.setGlobalTheme, or [tokenConfig] on dasar-theme-provider. Example: hoverBackground -> --list-hover-background.',
    },
    {
      name: 'component config',
      type: 'DasarListConfig / DasarListItemConfig',
      defaultValue: '-',
      description: 'Defaults via components.list and components.listItem in DasarComponentConfig.',
    },
  ];
}
