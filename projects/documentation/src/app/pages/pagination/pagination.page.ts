import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { PaginationBasicExample } from './examples/basic/pagination-basic.example';
import { PaginationPageSlotExample } from './examples/page-slot/pagination-page-slot.example';
import { PaginationSizePickerExample } from './examples/size-picker/pagination-size-picker.example';
import { PaginationEllipsisDropdownExample } from './examples/ellipsis-dropdown/pagination-ellipsis-dropdown.example';
import { PaginationDisplayOrderExample } from './examples/display-order/pagination-display-order.example';
import { PaginationSizesExample } from './examples/sizes/pagination-sizes.example';
import { PaginationAppearanceExample } from './examples/appearance/pagination-appearance.example';
import { PaginationRadiusExample } from './examples/radius/pagination-radius.example';
import { PaginationSpacingFluidExample } from './examples/spacing-fluid/pagination-spacing-fluid.example';
import { PaginationIconsExample } from './examples/icons/pagination-icons.example';
import { PaginationSlotsExample } from './examples/slots/pagination-slots.example';
import { PaginationSummaryExample } from './examples/summary/pagination-summary.example';
import { PaginationDisabledExample } from './examples/disabled/pagination-disabled.example';
import { PaginationThemeExample } from './examples/theme/pagination-theme.example';

// @ts-ignore
import basicHtml from './examples/basic/pagination-basic.example.html' with { loader: 'text' };
// @ts-ignore
import basicTs from './examples/basic/pagination-basic.example.ts' with { loader: 'text' };

// @ts-ignore
import pageSlotHtml from './examples/page-slot/pagination-page-slot.example.html' with {
  loader: 'text',
};
// @ts-ignore
import pageSlotTs from './examples/page-slot/pagination-page-slot.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import sizePickerHtml from './examples/size-picker/pagination-size-picker.example.html' with {
  loader: 'text',
};
// @ts-ignore
import sizePickerTs from './examples/size-picker/pagination-size-picker.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import ellipsisDropdownHtml from './examples/ellipsis-dropdown/pagination-ellipsis-dropdown.example.html' with {
  loader: 'text',
};
// @ts-ignore
import ellipsisDropdownTs from './examples/ellipsis-dropdown/pagination-ellipsis-dropdown.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import displayOrderHtml from './examples/display-order/pagination-display-order.example.html' with {
  loader: 'text',
};
// @ts-ignore
import displayOrderTs from './examples/display-order/pagination-display-order.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import sizesHtml from './examples/sizes/pagination-sizes.example.html' with { loader: 'text' };
// @ts-ignore
import sizesTs from './examples/sizes/pagination-sizes.example.ts' with { loader: 'text' };

// @ts-ignore
import appearanceHtml from './examples/appearance/pagination-appearance.example.html' with {
  loader: 'text',
};
// @ts-ignore
import appearanceTs from './examples/appearance/pagination-appearance.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import radiusHtml from './examples/radius/pagination-radius.example.html' with { loader: 'text' };
// @ts-ignore
import radiusTs from './examples/radius/pagination-radius.example.ts' with { loader: 'text' };

// @ts-ignore
import spacingFluidHtml from './examples/spacing-fluid/pagination-spacing-fluid.example.html' with {
  loader: 'text',
};
// @ts-ignore
import spacingFluidTs from './examples/spacing-fluid/pagination-spacing-fluid.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import iconsHtml from './examples/icons/pagination-icons.example.html' with { loader: 'text' };
// @ts-ignore
import iconsTs from './examples/icons/pagination-icons.example.ts' with { loader: 'text' };

// @ts-ignore
import slotsHtml from './examples/slots/pagination-slots.example.html' with { loader: 'text' };
// @ts-ignore
import slotsTs from './examples/slots/pagination-slots.example.ts' with { loader: 'text' };

// @ts-ignore
import summaryHtml from './examples/summary/pagination-summary.example.html' with {
  loader: 'text',
};
// @ts-ignore
import summaryTs from './examples/summary/pagination-summary.example.ts' with { loader: 'text' };

// @ts-ignore
import disabledHtml from './examples/disabled/pagination-disabled.example.html' with {
  loader: 'text',
};
// @ts-ignore
import disabledTs from './examples/disabled/pagination-disabled.example.ts' with { loader: 'text' };

// @ts-ignore
import themeHtml from './examples/theme/pagination-theme.example.html' with { loader: 'text' };
// @ts-ignore
import themeTs from './examples/theme/pagination-theme.example.ts' with { loader: 'text' };

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    PaginationBasicExample,
    PaginationPageSlotExample,
    PaginationSizePickerExample,
    PaginationEllipsisDropdownExample,
    PaginationDisplayOrderExample,
    PaginationSizesExample,
    PaginationAppearanceExample,
    PaginationRadiusExample,
    PaginationSpacingFluidExample,
    PaginationIconsExample,
    PaginationSlotsExample,
    PaginationSummaryExample,
    PaginationDisabledExample,
    PaginationThemeExample,
  ],
  templateUrl: './pagination.page.html',
  selector: 'app-pagination-page',
  standalone: true,
})
export class PaginationDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;

  protected pageSlotHtml = pageSlotHtml;
  protected pageSlotTs = pageSlotTs;

  protected sizePickerHtml = sizePickerHtml;
  protected sizePickerTs = sizePickerTs;

  protected ellipsisDropdownHtml = ellipsisDropdownHtml;
  protected ellipsisDropdownTs = ellipsisDropdownTs;

  protected displayOrderHtml = displayOrderHtml;
  protected displayOrderTs = displayOrderTs;

  protected sizesHtml = sizesHtml;
  protected sizesTs = sizesTs;

  protected appearanceHtml = appearanceHtml;
  protected appearanceTs = appearanceTs;

  protected radiusHtml = radiusHtml;
  protected radiusTs = radiusTs;

  protected spacingFluidHtml = spacingFluidHtml;
  protected spacingFluidTs = spacingFluidTs;

  protected iconsHtml = iconsHtml;
  protected iconsTs = iconsTs;

  protected slotsHtml = slotsHtml;
  protected slotsTs = slotsTs;

  protected summaryHtml = summaryHtml;
  protected summaryTs = summaryTs;

  protected disabledHtml = disabledHtml;
  protected disabledTs = disabledTs;

  protected themeHtml = themeHtml;
  protected themeTs = themeTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'page',
      type: 'number',
      defaultValue: 'default-page',
      description:
        'Controlled current page. Supports pageChange for two-way binding with onUpdatePage.',
    },
    {
      name: 'default-page',
      type: 'number',
      defaultValue: '1',
      description:
        'Initial page when page is not bound. Default via components.pagination.defaultPage.',
    },
    {
      name: 'page-count',
      type: 'number',
      defaultValue: '1',
      description: 'Total number of pages. Clamped to at least 1.',
    },
    {
      name: 'page-sizes',
      type: 'number',
      defaultValue: '10',
      description:
        'Current items per page. Emits onUpdatePageSize and page-sizesChange, which supports two-way binding.',
    },
    {
      name: 'page-size-options',
      type: 'number[]',
      defaultValue: '[10, 20, 30, 40]',
      description:
        'Options of the size picker. The current page-sizes value is merged in when missing.',
    },
    {
      name: 'page-slot',
      type: 'number',
      defaultValue: '9',
      description: 'Maximum number of page items shown, counting ellipses. Clamped to at least 5.',
    },
    {
      name: 'display-order',
      type: "'pages' | 'size-picker' | 'quick-jumper-dropdown'[]",
      defaultValue: "['pages', 'size-picker', 'quick-jumper-dropdown']",
      description:
        'Render order of the parts. Leaving an item out hides it. quick-jumper-dropdown turns each ellipsis into a dropdown of the hidden pages.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Blocks every interaction.',
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      defaultValue: "'md'",
      description: 'Button size. Selects and menus inside map xs to sm and xl to lg.',
    },
    {
      name: 'radius',
      type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'",
      defaultValue: "'md'",
      description: 'Corner radius passed to the page buttons.',
    },
    {
      name: 'appearance',
      type: "'ghost' | 'solid' | 'subtle' | 'outline'",
      defaultValue: "'ghost'",
      description:
        'Look of the page buttons. Inactive buttons are ghost (bordered for outline); the active page uses primary.',
    },
    {
      name: 'label',
      type: 'string | null',
      defaultValue: 'null',
      description:
        'Summary text with {page} and {count} tokens, for example "Page {page} of {count}".',
    },
    {
      name: 'spacing',
      type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      defaultValue: "'xs'",
      description: 'Gap between items using the --space-* scale through --pagination-gap.',
    },
    {
      name: 'prev-icon / next-icon',
      type: 'string',
      defaultValue: "'chevron-left' / 'chevron-right'",
      description: 'dasar-icon names for the previous and next buttons.',
    },
    {
      name: 'fluid',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Stretches to full width with space between the parts.',
    },
    {
      name: '(onUpdatePage) / (pageChange)',
      type: 'number',
      defaultValue: '-',
      description: 'Emits the new page on user navigation, after clamping.',
    },
    {
      name: '(onUpdatePageSize) / (page-sizesChange)',
      type: 'number',
      defaultValue: '-',
      description: 'Emits the new page size when the user picks one.',
    },
    {
      name: '[label-slot]',
      type: 'ng-template',
      defaultValue: '-',
      description: 'Replaces the label summary. Context: page, count and $implicit (the page).',
    },
    {
      name: '[prev-slot] / [next-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Replace the previous and next button icons.',
    },
    {
      name: '[prefix-slot] / [suffix-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Render before everything and after everything, for example a total count.',
    },
    {
      name: 'container-class / container-style',
      type: 'ClassType / StyleType',
      defaultValue: '-',
      description: 'Class and inline style for the pagination container.',
    },
  ];
}
