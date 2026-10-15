import { DocsLayoutComponent, DocNavGroup, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ChipVariantExample } from './examples/variant/chip-variant.example';
import { ChipAppearanceExample } from './examples/appearance/chip-appearance.example';
import { ChipRadiusExample } from './examples/radius/chip-radius.example';
import { ChipSizesExample } from './examples/sizes/chip-sizes.example';
import { ChipMoreExample } from './examples/more/chip-more.example';

// @ts-ignore - raw example
import variantHtml from './examples/variant/chip-variant.example.html' with { loader: 'text' };
// @ts-ignore - raw example
import variantTs from './examples/variant/chip-variant.example.ts' with { loader: 'text' };

// @ts-ignore - raw example
import appearanceHtml from './examples/appearance/chip-appearance.example.html' with {
  loader: 'text',
};
// @ts-ignore - raw example
import appearanceTs from './examples/appearance/chip-appearance.example.ts' with { loader: 'text' };

// @ts-ignore - raw example
import radiusHtml from './examples/radius/chip-radius.example.html' with { loader: 'text' };
// @ts-ignore - raw example
import radiusTs from './examples/radius/chip-radius.example.ts' with { loader: 'text' };

// @ts-ignore - raw example
import sizesHtml from './examples/sizes/chip-sizes.example.html' with { loader: 'text' };
// @ts-ignore - raw example
import sizesTs from './examples/sizes/chip-sizes.example.ts' with { loader: 'text' };

// @ts-ignore - raw example
import moreHtml from './examples/more/chip-more.example.html' with { loader: 'text' };
// @ts-ignore - raw example
import moreTs from './examples/more/chip-more.example.ts' with { loader: 'text' };

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    ChipVariantExample,
    ChipAppearanceExample,
    ChipRadiusExample,
    ChipSizesExample,
    ChipMoreExample,
  ],
  templateUrl: './chip.page.html',
  selector: 'app-chip-page',
  standalone: true,
})
export class ChipDocPage {
  protected variantHtml = variantHtml;
  protected variantTs = variantTs;

  protected appearanceHtml = appearanceHtml;
  protected appearanceTs = appearanceTs;

  protected radiusHtml = radiusHtml;
  protected radiusTs = radiusTs;

  protected sizesHtml = sizesHtml;
  protected sizesTs = sizesTs;

  protected moreHtml = moreHtml;
  protected moreTs = moreTs;
  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'label',
      type: 'string',
      defaultValue: '-',
      description:
        'The text content to display inside the chip. Can also be provided via the [chip-label] slot.',
    },
    {
      name: 'variant',
      type: "'primary' | 'success' | 'warning' | 'danger' | 'secondary' | 'ghost'",
      defaultValue: "'primary'",
      description: 'Defines the semantic color intent of the chip.',
    },
    {
      name: 'appearance',
      type: "'solid' | 'subtle' | 'outline'",
      defaultValue: "'solid'",
      description: 'Defines the fill and border style of the chip.',
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg'",
      defaultValue: "'xs'",
      description: 'Controls the overall size, padding, and typography of the chip.',
    },
    {
      name: 'radius',
      type: 'ScaleAttributeType',
      defaultValue: "'md'",
      description: 'Sets the border radius curve. Defaults to a pill shape (full).',
    },
    {
      name: 'icon-name',
      type: 'string',
      defaultValue: '-',
      description: 'The registry key of an icon to render at the start of the chip.',
    },
    {
      name: 'removable',
      type: 'boolean',
      defaultValue: 'false',
      description: 'If true, displays a trailing close icon and enables the onRemoved event.',
    },
    {
      name: 'close-icon-name',
      type: 'string',
      defaultValue: "'x'",
      description: 'The registry key for the close icon. Only visible when removable is true.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Mutes the visual state and prevents click and remove events.',
    },
    {
      name: 'fluid',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Forces the chip to fill 100% of its parent container width.',
    },
    {
      name: 'container-class / content-class / label-class',
      type: 'ClassType',
      defaultValue: 'null',
      description: 'Accepts custom CSS classes to inject into specific DOM layers of the chip.',
    },
    {
      name: 'container-style / content-style / label-style',
      type: 'StyleType',
      defaultValue: 'null',
      description: 'Accepts custom inline styles to inject into specific DOM layers of the chip.',
    },
    {
      name: '(onClick)',
      type: 'EventEmitter<Event>',
      defaultValue: '-',
      description:
        'Emitted when the main chip body is clicked. Automatically ignores disabled states.',
    },
    {
      name: '(onRemove)',
      type: 'EventEmitter<Event>',
      defaultValue: '-',
      description:
        'Emitted when the trailing close icon is clicked. Automatically prevents event bubbling.',
    },
  ];
}
