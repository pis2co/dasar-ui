import { getDocsContent } from '../../docs-content.generated';
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
import { SelectPlacementExample } from './examples/placement/select-placement.example';

const basicHtml = getDocsContent('projects/documentation/src/app/pages/select/examples/basic/select-basic.example.html');
const basicTs = getDocsContent('projects/documentation/src/app/pages/select/examples/basic/select-basic.example.ts');

const appearanceHtml = getDocsContent('projects/documentation/src/app/pages/select/examples/appearance/select-appearance.example.html');
const appearanceTs = getDocsContent('projects/documentation/src/app/pages/select/examples/appearance/select-appearance.example.ts');

const searchHtml = getDocsContent('projects/documentation/src/app/pages/select/examples/search/select-search.example.html');
const searchTs = getDocsContent('projects/documentation/src/app/pages/select/examples/search/select-search.example.ts');

const multipleHtml = getDocsContent('projects/documentation/src/app/pages/select/examples/multiple/select-multiple.example.html');
const multipleTs = getDocsContent('projects/documentation/src/app/pages/select/examples/multiple/select-multiple.example.ts');

const statesHtml = getDocsContent('projects/documentation/src/app/pages/select/examples/states/select-states.example.html');
const statesTs = getDocsContent('projects/documentation/src/app/pages/select/examples/states/select-states.example.ts');

const slotsHtml = getDocsContent('projects/documentation/src/app/pages/select/examples/slots/select-slots.example.html');
const slotsTs = getDocsContent('projects/documentation/src/app/pages/select/examples/slots/select-slots.example.ts');
const placementHtml = getDocsContent('projects/documentation/src/app/pages/select/examples/placement/select-placement.example.html');
const placementTs = getDocsContent('projects/documentation/src/app/pages/select/examples/placement/select-placement.example.ts');

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
    SelectPlacementExample,
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
  protected placementHtml = placementHtml;
  protected placementTs = placementTs;

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
      type: "'outline' | 'filled' | 'elevated'",
      defaultValue: "'outline'",
      description: 'Visual style of the main trigger container.',
    },
    {
      name: 'placement',
      type: "'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'",
      defaultValue: "'bottom-start'",
      description:
        'Preferred side of the trigger for the dropdown. The panel flips to the other side automatically when the viewport has no room.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Sizing scale for the trigger, the panel and the options inside it.',
    },
    {
      name: 'radius',
      type: 'ScaleAttributeType',
      defaultValue: "'md'",
      description: 'Border radius of the trigger and of the dropdown panel.',
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
