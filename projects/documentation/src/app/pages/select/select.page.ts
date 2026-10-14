// select.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { SelectBasicExample } from './examples/basic/select-basic.example';
import { SelectAppearanceExample } from './examples/appearance/select-appearance.example';
import { SelectSearchExample } from './examples/search/select-search.example';
import { SelectMultipleExample } from './examples/multiple/select-multiple.example';
import { SelectStatesExample } from './examples/states/select-states.example';
import { SelectSlotsExample } from './examples/slots/select-slots.example';

// @ts-ignore
import basicHtml from './examples/basic/select-basic.example.html' with { loader: 'text' };
// @ts-ignore
import basicTs from './examples/basic/select-basic.example.ts' with { loader: 'text' };

// @ts-ignore
import appearanceHtml from './examples/appearance/select-appearance.example.html' with {
  loader: 'text',
};
// @ts-ignore
import appearanceTs from './examples/appearance/select-appearance.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import searchHtml from './examples/search/select-search.example.html' with { loader: 'text' };
// @ts-ignore
import searchTs from './examples/search/select-search.example.ts' with { loader: 'text' };

// @ts-ignore
import multipleHtml from './examples/multiple/select-multiple.example.html' with { loader: 'text' };
// @ts-ignore
import multipleTs from './examples/multiple/select-multiple.example.ts' with { loader: 'text' };

// @ts-ignore
import statesHtml from './examples/states/select-states.example.html' with { loader: 'text' };
// @ts-ignore
import statesTs from './examples/states/select-states.example.ts' with { loader: 'text' };

// @ts-ignore
import slotsHtml from './examples/slots/select-slots.example.html' with { loader: 'text' };
// @ts-ignore
import slotsTs from './examples/slots/select-slots.example.ts' with { loader: 'text' };

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    SelectBasicExample,
    SelectAppearanceExample,
    SelectSearchExample,
    SelectMultipleExample,
    SelectStatesExample,
    SelectSlotsExample,
  ],
  templateUrl: './select.page.html',
  selector: 'app-select-page',
  standalone: true,
})
export class SelectDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;
  protected appearanceHtml = appearanceHtml;
  protected appearanceTs = appearanceTs;
  protected searchHtml = searchHtml;
  protected searchTs = searchTs;
  protected multipleHtml = multipleHtml;
  protected multipleTs = multipleTs;
  protected statesHtml = statesHtml;
  protected statesTs = statesTs;
  protected slotsHtml = slotsHtml;
  protected slotsTs = slotsTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'value',
      type: 'any | any[]',
      defaultValue: "'' | []",
      description: 'The selected value(s). Supports [(ngModel)] and Reactive Forms.',
    },
    {
      name: 'options',
      type: 'DasarSelectOption[]',
      defaultValue: '[]',
      description: 'Array of objects: { label, value, disabled?, iconName?, chipVariant? }.',
    },
    {
      name: 'multiple-type',
      type: "'text' | 'chip' | null",
      defaultValue: 'null',
      description:
        'Enables multi-select. Displays chosen items as comma-separated text or interactive chips.',
    },
    {
      name: 'searchable',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Shows an inline text input to filter the options array.',
    },
    {
      name: 'clearable',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Shows an "x" icon to clear the selection.',
    },
    {
      name: 'appearance',
      type: "'outline' | 'filled'",
      defaultValue: "'outline'",
      description: 'Visual style of the main trigger container.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Sizing scale for the trigger and options.',
    },
    {
      name: 'radius',
      type: 'ScaleAttributeType',
      defaultValue: "'md'",
      description: 'Border radius.',
    },
    {
      name: 'label / placeholder / hint',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Text elements for context.',
    },
    {
      name: 'loading',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Shows a spinner inside the trigger and dropdown.',
    },
    {
      name: 'error',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Applies red validation styling.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Prevents interaction.',
    },
    {
      name: 'full-width',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Expands component to 100% width.',
    },
    {
      name: '(valueChange) / (onSearchChange)',
      type: 'EventEmitter',
      defaultValue: '-',
      description: 'Emitted when selection or search query updates.',
    },
    {
      name: '[...-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Directives like [prefix-slot], [option-empty-slot], [option-loading-slot].',
    },
    {
      name: '*option-template / *chip-template',
      type: 'TemplateRef<any>',
      defaultValue: '-',
      description: 'Structural directives to override rendering of options and chips.',
    },
  ];
}
