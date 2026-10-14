import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { NumberInputBasicExample } from './examples/basic/number-input-basic.example';
import { NumberInputAppearanceExample } from './examples/appearance/number-input-appearance.example';
import { NumberInputLimitsExample } from './examples/limits/number-input-limits.example';
import { NumberInputStatesExample } from './examples/states/number-input-states.example';
import { NumberInputSlotsExample } from './examples/slots/number-input-slots.example';

// @ts-ignore
import basicHtml from './examples/basic/number-input-basic.example.html' with { loader: 'text' };
// @ts-ignore
import basicTs from './examples/basic/number-input-basic.example.ts' with { loader: 'text' };
// @ts-ignore
import appearanceHtml from './examples/appearance/number-input-appearance.example.html' with {
  loader: 'text',
};
// @ts-ignore
import appearanceTs from './examples/appearance/number-input-appearance.example.ts' with {
  loader: 'text',
};
// @ts-ignore
import limitsHtml from './examples/limits/number-input-limits.example.html' with { loader: 'text' };
// @ts-ignore
import limitsTs from './examples/limits/number-input-limits.example.ts' with { loader: 'text' };
// @ts-ignore
import statesHtml from './examples/states/number-input-states.example.html' with { loader: 'text' };
// @ts-ignore
import statesTs from './examples/states/number-input-states.example.ts' with { loader: 'text' };
// @ts-ignore
import slotsHtml from './examples/slots/number-input-slots.example.html' with { loader: 'text' };
// @ts-ignore
import slotsTs from './examples/slots/number-input-slots.example.ts' with { loader: 'text' };

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    NumberInputBasicExample,
    NumberInputAppearanceExample,
    NumberInputLimitsExample,
    NumberInputStatesExample,
    NumberInputSlotsExample,
  ],
  templateUrl: './number-input.page.html',
  selector: 'app-number-input-page',
  standalone: true,
})
export class NumberInputDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;
  protected appearanceHtml = appearanceHtml;
  protected appearanceTs = appearanceTs;
  protected limitsHtml = limitsHtml;
  protected limitsTs = limitsTs;
  protected statesHtml = statesHtml;
  protected statesTs = statesTs;
  protected slotsHtml = slotsHtml;
  protected slotsTs = slotsTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'value',
      type: 'number | null',
      defaultValue: 'null',
      description: 'The current numeric value.',
    },
    {
      name: 'appearance',
      type: "'outline' | 'filled'",
      defaultValue: "'outline'",
      description: 'Visual container style.',
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      defaultValue: "'md'",
      description: 'Sizing scale.',
    },
    {
      name: 'radius',
      type: 'ScaleAttributeType',
      defaultValue: "'md'",
      description: 'Border radius.',
    },
    {
      name: 'step',
      type: 'number',
      defaultValue: '1',
      description: 'Increment/decrement value step.',
    },
    {
      name: 'min / max',
      type: 'number',
      defaultValue: 'undefined',
      description: 'Constraint limits.',
    },
    { name: 'label', type: 'string', defaultValue: 'undefined', description: 'Text label.' },
    { name: 'hint', type: 'string', defaultValue: 'undefined', description: 'Helper text.' },
    { name: 'placeholder', type: 'string', defaultValue: "''", description: 'Placeholder string.' },
    {
      name: 'full-width',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Forces full width.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Disables input and actions.',
    },
    { name: 'error', type: 'boolean', defaultValue: 'false', description: 'Error styling.' },
    {
      name: '(valueChange)',
      type: 'EventEmitter<number | null>',
      defaultValue: '-',
      description: 'Emitted on change.',
    },
    {
      name: '(onIncrementClick) / (onDecrementClick)',
      type: 'EventEmitter<number>',
      defaultValue: '-',
      description: 'Action button events.',
    },
    {
      name: '[prefix]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Custom prefix content.',
    },
    {
      name: '[increment-slot] / [decrement-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Custom action button templates.',
    },
  ];
}
