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

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description:
        'Sets the font size and the item padding. Uses --list-font-size-sm/md/lg and --list-item-padding.',
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
