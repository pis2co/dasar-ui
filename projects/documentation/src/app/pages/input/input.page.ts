import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { InputBasicExample } from './examples/basic/input-basic.example';
import { InputAppearanceExample } from './examples/appearance/input-appearance.example';
import { InputMaskExample } from './examples/mask/input-mask.example';
import { InputStatesExample } from './examples/states/input-states.example';
import { InputSlotsExample } from './examples/slots/input-slots.example';
import { InputMoreExample } from './examples/more/input-more.example';

// @ts-ignore
import basicHtml from './examples/basic/input-basic.example.html' with { loader: 'text' };
// @ts-ignore
import basicTs from './examples/basic/input-basic.example.ts' with { loader: 'text' };
// @ts-ignore
import appearanceHtml from './examples/appearance/input-appearance.example.html' with {
  loader: 'text',
};
// @ts-ignore
import appearanceTs from './examples/appearance/input-appearance.example.ts' with {
  loader: 'text',
};
// @ts-ignore
import maskHtml from './examples/mask/input-mask.example.html' with { loader: 'text' };
// @ts-ignore
import maskTs from './examples/mask/input-mask.example.ts' with { loader: 'text' };
// @ts-ignore
import statesHtml from './examples/states/input-states.example.html' with { loader: 'text' };
// @ts-ignore
import statesTs from './examples/states/input-states.example.ts' with { loader: 'text' };
// @ts-ignore
import slotsHtml from './examples/slots/input-slots.example.html' with { loader: 'text' };
// @ts-ignore
import slotsTs from './examples/slots/input-slots.example.ts' with { loader: 'text' };
// @ts-ignore
import searchHtml from './examples/more/input-more.example.html' with { loader: 'text' };
// @ts-ignore
import searchTs from './examples/more/input-more.example.ts' with { loader: 'text' };

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    InputBasicExample,
    InputAppearanceExample,
    InputMaskExample,
    InputStatesExample,
    InputSlotsExample,
    InputMoreExample,
  ],
  templateUrl: './input.page.html',
  selector: 'app-input-page',
  standalone: true,
})
export class InputDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;
  protected appearanceHtml = appearanceHtml;
  protected appearanceTs = appearanceTs;
  protected maskHtml = maskHtml;
  protected maskTs = maskTs;
  protected statesHtml = statesHtml;
  protected statesTs = statesTs;
  protected slotsHtml = slotsHtml;
  protected slotsTs = slotsTs;
  protected searchHtml = searchHtml;
  protected searchTs = searchTs;
  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'value',
      type: 'any',
      defaultValue: "''",
      description: 'The input value. Supports two-way binding [(ngModel)] and Reactive Forms.',
    },
    {
      name: 'type',
      type: 'DasarInputType',
      defaultValue: "'text'",
      description: 'Native HTML input type (text, password, email, number, search, url, tel).',
    },
    {
      name: 'mask',
      type: 'DasarInputMaskType',
      defaultValue: 'undefined',
      description:
        'Built-in masks ("thousand", "decimal", "date") or a custom formatting function.',
    },
    {
      name: 'appearance',
      type: "'outline' | 'filled'",
      defaultValue: "'outline'",
      description: 'Visual style of the input container.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Controls height, padding, and font size.',
    },
    {
      name: 'radius',
      type: 'ScaleAttributeType',
      defaultValue: "'md'",
      description: 'Border radius.',
    },
    {
      name: 'label / label-right',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Text labels rendered above the input.',
    },
    {
      name: 'hint',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Helper text rendered below the input. Turns red when error is set.',
    },
    {
      name: 'placeholder',
      type: 'string',
      defaultValue: "''",
      description: 'Native placeholder attribute.',
    },
    {
      name: 'full-width',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Expands the component to 100% width.',
    },
    {
      name: 'disabled / readonly',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Standard HTML disabled and readonly states.',
    },
    {
      name: 'error',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Applies red validation styling.',
    },
    {
      name: 'fluid',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Removes all padding from the input container.',
    },
    {
      name: '(valueChange)',
      type: 'EventEmitter<any>',
      defaultValue: '-',
      description: 'Emits whenever the input value changes.',
    },
    {
      name: '[prefix] / [suffix]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Directives to project content inside the left or right of the input container.',
    },
    {
      name: '[extra-label-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Replaces the label-right text with custom HTML content.',
    },
  ];
}
