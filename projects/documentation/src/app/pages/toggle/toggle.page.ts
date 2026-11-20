import { getDocsContent } from '../../docs-content.generated';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { ToggleBasicExample } from './examples/basic/toggle-basic.example';
import { ToggleAppearanceExample } from './examples/appearance/toggle-appearance.example';
import { ToggleVariantsExample } from './examples/variants/toggle-variants.example';
import { ToggleSizesExample } from './examples/sizes/toggle-sizes.example';
import { ToggleDisabledExample } from './examples/disabled/toggle-disabled.example';

const basicHtml = getDocsContent('projects/documentation/src/app/pages/toggle/examples/basic/toggle-basic.example.html');
const basicTs = getDocsContent('projects/documentation/src/app/pages/toggle/examples/basic/toggle-basic.example.ts');
const appearanceHtml = getDocsContent('projects/documentation/src/app/pages/toggle/examples/appearance/toggle-appearance.example.html');
const appearanceTs = getDocsContent('projects/documentation/src/app/pages/toggle/examples/appearance/toggle-appearance.example.ts');
const variantsHtml = getDocsContent('projects/documentation/src/app/pages/toggle/examples/variants/toggle-variants.example.html');
const variantsTs = getDocsContent('projects/documentation/src/app/pages/toggle/examples/variants/toggle-variants.example.ts');
const sizesHtml = getDocsContent('projects/documentation/src/app/pages/toggle/examples/sizes/toggle-sizes.example.html');
const sizesTs = getDocsContent('projects/documentation/src/app/pages/toggle/examples/sizes/toggle-sizes.example.ts');
const disabledHtml = getDocsContent('projects/documentation/src/app/pages/toggle/examples/disabled/toggle-disabled.example.html');
const disabledTs = getDocsContent('projects/documentation/src/app/pages/toggle/examples/disabled/toggle-disabled.example.ts');

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    ToggleBasicExample,
    ToggleAppearanceExample,
    ToggleVariantsExample,
    ToggleSizesExample,
    ToggleDisabledExample,
  ],
  templateUrl: './toggle.page.html',
  selector: 'app-toggle-page',
  standalone: true,
})
export class ToggleDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;
  protected appearanceHtml = appearanceHtml;
  protected appearanceTs = appearanceTs;
  protected variantsHtml = variantsHtml;
  protected variantsTs = variantsTs;
  protected sizesHtml = sizesHtml;
  protected sizesTs = sizesTs;
  protected disabledHtml = disabledHtml;
  protected disabledTs = disabledTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'selected',
      type: 'boolean',
      defaultValue: 'false',
      description:
        'Whether the toggle button is in the selected/pressed state. Supports two-way binding [(selected)] and Reactive Forms (ControlValueAccessor).',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Disables user interaction with the toggle button.',
    },
    {
      name: 'type',
      type: "'button' | 'submit' | 'reset'",
      defaultValue: "'button'",
      description: 'The native HTML button type attribute.',
    },
    {
      name: 'appearance',
      type: "'solid' | 'subtle' | 'outline' | 'elevated'",
      defaultValue: "'solid'",
      description: 'Visual appearance style of the toggle button.',
    },
    {
      name: 'variant',
      type: "'primary' | 'success' | 'warning' | 'danger' | 'secondary' | 'ghost'",
      defaultValue: "'primary'",
      description: 'Color theme variant applied to the toggle button.',
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      defaultValue: "'md'",
      description: 'Controls the sizing scale of padding, typography, and dimensions.',
    },
    {
      name: 'radius',
      type: 'ScaleAttributeType',
      defaultValue: "'md'",
      description: 'Controls the border radius scale.',
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Expands the toggle button to 100% width of its container.',
    },
    {
      name: 'selectedChange',
      type: 'EventEmitter<boolean>',
      defaultValue: '-',
      description: 'Emitted when the selected state changes.',
    },
    {
      name: 'toggleClass / toggleStyle',
      type: 'any / Record<string, any>',
      defaultValue: '-',
      description: 'Class and inline style bindings for the inner toggle element.',
    },
  ];
}
