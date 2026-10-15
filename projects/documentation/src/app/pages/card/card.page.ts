import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { CardAppearanceExample } from './examples/appearance/card-appearance.example';
import { CardSpacingExample } from './examples/spacing/card-spacing.example';
import { CardSlotsExample } from './examples/slots/card-slots.example';
import { CardClosableExample } from './examples/closable/card-closable.example';
import { CardMediaExample } from './examples/media/card-media.example';
import { CardRadiusExample } from './examples/radius/card-radius.example';
import { CardCustomStyleExample } from './examples/custom-style/card-custom-style.example';

// @ts-ignore
import appearanceHtml from './examples/appearance/card-appearance.example.html' with {
  loader: 'text',
};
// @ts-ignore
import appearanceTs from './examples/appearance/card-appearance.example.ts' with { loader: 'text' };
// @ts-ignore
import spacingHtml from './examples/spacing/card-spacing.example.html' with { loader: 'text' };
// @ts-ignore
import spacingTs from './examples/spacing/card-spacing.example.ts' with { loader: 'text' };
// @ts-ignore
import slotsHtml from './examples/slots/card-slots.example.html' with { loader: 'text' };
// @ts-ignore
import slotsTs from './examples/slots/card-slots.example.ts' with { loader: 'text' };
// @ts-ignore
import closableHtml from './examples/closable/card-closable.example.html' with { loader: 'text' };
// @ts-ignore
import closableTs from './examples/closable/card-closable.example.ts' with { loader: 'text' };
// @ts-ignore
import mediaHtml from './examples/media/card-media.example.html' with { loader: 'text' };
// @ts-ignore
import mediaTs from './examples/media/card-media.example.ts' with { loader: 'text' };
// @ts-ignore
import radiusHtml from './examples/radius/card-radius.example.html' with { loader: 'text' };
// @ts-ignore
import radiusTs from './examples/radius/card-radius.example.ts' with { loader: 'text' };
// @ts-ignore
import customStyleHtml from './examples/custom-style/card-custom-style.example.html' with {
  loader: 'text',
};
// @ts-ignore
import customStyleTs from './examples/custom-style/card-custom-style.example.ts' with {
  loader: 'text',
};

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    CardAppearanceExample,
    CardSpacingExample,
    CardSlotsExample,
    CardClosableExample,
    CardMediaExample,
    CardRadiusExample,
    CardCustomStyleExample,
  ],
  templateUrl: './card.page.html',
  selector: 'app-card-page',
  standalone: true,
})
export class CardDocPage {
  protected appearanceHtml = appearanceHtml;
  protected appearanceTs = appearanceTs;

  protected spacingHtml = spacingHtml;
  protected spacingTs = spacingTs;

  protected slotsHtml = slotsHtml;
  protected slotsTs = slotsTs;

  protected closableHtml = closableHtml;
  protected closableTs = closableTs;

  protected mediaHtml = mediaHtml;
  protected mediaTs = mediaTs;

  protected radiusHtml = radiusHtml;
  protected radiusTs = radiusTs;

  protected customStyleHtml = customStyleHtml;
  protected customStyleTs = customStyleTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'appearance',
      type: "'outline' | 'borderless' | 'elevated'",
      defaultValue: "'elevated'",
      description: 'Defines the structural shadow and border style of the card.',
    },
    {
      name: 'spacing',
      type: "'normal' | 'compact'",
      defaultValue: "'normal'",
      description: 'Controls the inner padding scale of the card.',
    },
    {
      name: 'radius',
      type: 'ScaleAttributeType',
      defaultValue: "'lg'",
      description: 'Sets the border radius of the card.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Controls the typographic scale inside the card.',
    },
    {
      name: 'label',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Sets a simple string title for the header section.',
    },
    {
      name: 'closable',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Displays a dismiss icon in the header. Emits (onClose) when clicked.',
    },
    {
      name: 'hide-overflow',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Applies overflow hidden. Great for embedding edge-to-edge images.',
    },
    {
      name: 'full-width',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Forces the host element to width 100% using flex display.',
    },
    {
      name: 'fluid / ...-fluid',
      type: 'boolean',
      defaultValue: 'false',
      description:
        'Removes padding from the entire card (fluid) or specific sections (header-fluid, body-fluid, etc.).',
    },
    {
      name: '...-class / ...-style',
      type: 'string | object',
      defaultValue: 'null',
      description:
        'Custom class or style injection for sections like container, header, body, extra-header, action.',
    },
    {
      name: '(onClose)',
      type: 'EventEmitter<void>',
      defaultValue: '-',
      description: 'Emitted when the close icon is clicked (requires closable=true).',
    },
    {
      name: '[header-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Replaces the default label with custom HTML content.',
    },
    {
      name: '[caption-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Injects small descriptive text below the title.',
    },
    {
      name: '[extra-header-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Injects elements to the far right of the header (like badges or menus).',
    },
    {
      name: '[action-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Injects footer action elements (like buttons) into a flex container.',
    },
  ];
}
