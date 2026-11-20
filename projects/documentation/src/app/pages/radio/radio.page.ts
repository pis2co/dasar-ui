import { getDocsContent } from '../../docs-content.generated';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { RadioBasicExample } from './examples/basic/radio-basic.example';
import { RadioAppearanceExample } from './examples/appearance/radio-appearance.example';
import { RadioSizeExample } from './examples/size/radio-size.example';
import { RadioUpdateExample } from './examples/update/radio-update.example';
import { RadioLabelHintExample } from './examples/label-hint/radio-label-hint.example';
import { RadioErrorExample } from './examples/error/radio-error.example';
import { RadioDisabledExample } from './examples/disabled/radio-disabled.example';
import { RadioReactiveExample } from './examples/reactive/radio-reactive.example';
import { RadioGroupExample } from './examples/group/radio-group.example';
import { RadioGroupAppearanceExample } from './examples/group-appearance/radio-group-appearance.example';
import { RadioGroupLayoutExample } from './examples/group-layout/radio-group-layout.example';
import { RadioGroupValueFieldExample } from './examples/group-value-field/radio-group-value-field.example';
import { RadioAdvancedThemeExample } from './examples/advanced-theme/radio-advanced-theme.example';

const basicHtml = getDocsContent('projects/documentation/src/app/pages/radio/examples/basic/radio-basic.example.html');
const basicTs = getDocsContent('projects/documentation/src/app/pages/radio/examples/basic/radio-basic.example.ts');

const appearanceHtml = getDocsContent('projects/documentation/src/app/pages/radio/examples/appearance/radio-appearance.example.html');
const appearanceTs = getDocsContent('projects/documentation/src/app/pages/radio/examples/appearance/radio-appearance.example.ts');

const sizeHtml = getDocsContent('projects/documentation/src/app/pages/radio/examples/size/radio-size.example.html');
const sizeTs = getDocsContent('projects/documentation/src/app/pages/radio/examples/size/radio-size.example.ts');

const updateHtml = getDocsContent('projects/documentation/src/app/pages/radio/examples/update/radio-update.example.html');
const updateTs = getDocsContent('projects/documentation/src/app/pages/radio/examples/update/radio-update.example.ts');

const labelHintHtml = getDocsContent('projects/documentation/src/app/pages/radio/examples/label-hint/radio-label-hint.example.html');
const labelHintTs = getDocsContent('projects/documentation/src/app/pages/radio/examples/label-hint/radio-label-hint.example.ts');

const errorHtml = getDocsContent('projects/documentation/src/app/pages/radio/examples/error/radio-error.example.html');
const errorTs = getDocsContent('projects/documentation/src/app/pages/radio/examples/error/radio-error.example.ts');

const disabledHtml = getDocsContent('projects/documentation/src/app/pages/radio/examples/disabled/radio-disabled.example.html');
const disabledTs = getDocsContent('projects/documentation/src/app/pages/radio/examples/disabled/radio-disabled.example.ts');

const reactiveHtml = getDocsContent('projects/documentation/src/app/pages/radio/examples/reactive/radio-reactive.example.html');
const reactiveTs = getDocsContent('projects/documentation/src/app/pages/radio/examples/reactive/radio-reactive.example.ts');

const groupHtml = getDocsContent('projects/documentation/src/app/pages/radio/examples/group/radio-group.example.html');
const groupTs = getDocsContent('projects/documentation/src/app/pages/radio/examples/group/radio-group.example.ts');

const groupAppearanceHtml = getDocsContent('projects/documentation/src/app/pages/radio/examples/group-appearance/radio-group-appearance.example.html');
const groupAppearanceTs = getDocsContent('projects/documentation/src/app/pages/radio/examples/group-appearance/radio-group-appearance.example.ts');

const groupLayoutHtml = getDocsContent('projects/documentation/src/app/pages/radio/examples/group-layout/radio-group-layout.example.html');
const groupLayoutTs = getDocsContent('projects/documentation/src/app/pages/radio/examples/group-layout/radio-group-layout.example.ts');

const groupValueFieldHtml = getDocsContent('projects/documentation/src/app/pages/radio/examples/group-value-field/radio-group-value-field.example.html');
const groupValueFieldTs = getDocsContent('projects/documentation/src/app/pages/radio/examples/group-value-field/radio-group-value-field.example.ts');

const advancedThemeHtml = getDocsContent('projects/documentation/src/app/pages/radio/examples/advanced-theme/radio-advanced-theme.example.html');
const advancedThemeTs = getDocsContent('projects/documentation/src/app/pages/radio/examples/advanced-theme/radio-advanced-theme.example.ts');

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    RadioBasicExample,
    RadioAppearanceExample,
    RadioSizeExample,
    RadioUpdateExample,
    RadioLabelHintExample,
    RadioErrorExample,
    RadioDisabledExample,
    RadioReactiveExample,
    RadioGroupExample,
    RadioGroupAppearanceExample,
    RadioGroupLayoutExample,
    RadioGroupValueFieldExample,
    RadioAdvancedThemeExample,
  ],
  templateUrl: './radio.page.html',
  selector: 'app-radio-page',
  standalone: true,
})
export class RadioDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;

  protected appearanceHtml = appearanceHtml;
  protected appearanceTs = appearanceTs;

  protected sizeHtml = sizeHtml;
  protected sizeTs = sizeTs;

  protected updateHtml = updateHtml;
  protected updateTs = updateTs;

  protected labelHintHtml = labelHintHtml;
  protected labelHintTs = labelHintTs;

  protected errorHtml = errorHtml;
  protected errorTs = errorTs;

  protected disabledHtml = disabledHtml;
  protected disabledTs = disabledTs;

  protected reactiveHtml = reactiveHtml;
  protected reactiveTs = reactiveTs;

  protected groupHtml = groupHtml;
  protected groupTs = groupTs;

  protected groupAppearanceHtml = groupAppearanceHtml;
  protected groupAppearanceTs = groupAppearanceTs;

  protected groupLayoutHtml = groupLayoutHtml;
  protected groupLayoutTs = groupLayoutTs;

  protected groupValueFieldHtml = groupValueFieldHtml;
  protected groupValueFieldTs = groupValueFieldTs;

  protected advancedThemeHtml = advancedThemeHtml;
  protected advancedThemeTs = advancedThemeTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Size of the radio.',
    },
    {
      name: 'appearance',
      type: "'outline' | 'filled' | 'elevated'",
      defaultValue: "'outline'",
      description: 'Visual appearance style of the radio.',
    },
    {
      name: 'label',
      type: 'string',
      defaultValue: "''",
      description: 'Label text next to the circle.',
    },
    {
      name: 'error',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Error styling for the circle and hint.',
    },
    {
      name: 'dasar-radio: hint',
      type: 'string',
      defaultValue: "''",
      description: 'Helper text under the radio.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Disables the radio.',
    },
    {
      name: 'checked-value',
      type: 'any',
      defaultValue: 'true',
      description: 'Value of this option. Selected when value matches it.',
    },
    {
      name: 'name',
      type: 'string | null',
      defaultValue: 'null',
      description:
        'Native radio group name. Standalone radios sharing a name behave as one group, including arrow-key navigation.',
    },
    {
      name: 'dasar-radio: value / [(value)]',
      type: 'any',
      defaultValue: 'null',
      description:
        'Selected value. The radio is checked when it matches checked-value. Overridden by the group.',
    },
    {
      name: 'dasar-radio: container-class / circle-class / label-class / hint-class',
      type: 'string | object',
      defaultValue: "''",
      description: 'Classes for the radio parts.',
    },
    {
      name: 'container-style / circle-style / label-style / hint-style',
      type: 'object',
      defaultValue: 'null',
      description: 'Inline styles for the radio parts.',
    },
    {
      name: '(onUpdate)',
      type: 'EventEmitter<any>',
      defaultValue: '-',
      description:
        'Fires with checked-value when selected. Never fires for re-clicking the selected radio or for children inside a group.',
    },
    {
      name: 'dasar-radio: (valueChange)',
      type: 'EventEmitter<any>',
      defaultValue: '-',
      description: 'Fires with checked-value. Used by [(value)] and forms.',
    },
    {
      name: 'default slot',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Extra content after the label.',
    },
    {
      name: 'roup: value / [(value)]',
      type: 'any',
      defaultValue: 'null',
      description: 'Selected value. Overrides every child state.',
    },
    {
      name: 'dasar-radio-group: value-field',
      type: 'string | null',
      defaultValue: 'null',
      description:
        'Object key used to compare the group value with child checked values. Example: value-field="id".',
    },
    {
      name: 'dasar-radio-group: name',
      type: 'string | null',
      defaultValue: 'null',
      description:
        'Shared native name for the children. Generated automatically when empty, so arrow keys work out of the box.',
    },
    {
      name: 'dasar-radio-group: size',
      type: "'sm' | 'md' | 'lg' | null",
      defaultValue: 'null',
      description: 'Overrides the size of every child. Null keeps each child size.',
    },
    {
      name: 'dasar-radio-group: appearance',
      type: "'outline' | 'filled' | 'elevated' | null",
      defaultValue: 'null',
      description:
        'Overrides the appearance of every child radio. Null keeps each child appearance.',
    },
    {
      name: 'dasar-radio-group: direction',
      type: "'horizontal' | 'vertical'",
      defaultValue: "'vertical'",
      description: 'Layout direction of the radios.',
    },
    {
      name: 'dasar-radio-group: disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Disables every child radio.',
    },
    {
      name: 'dasar-radio-group: error',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Error styling, passed down to every child.',
    },
    {
      name: 'dasar-radio-group: hint',
      type: 'string',
      defaultValue: "''",
      description: 'Helper text under the group.',
    },
    {
      name: 'dasar-radio-group: container-class / hint-class',
      type: 'string | object',
      defaultValue: "''",
      description: 'Classes for the group parts.',
    },
    {
      name: 'dasar-radio-group: container-style / hint-style',
      type: 'object',
      defaultValue: 'null',
      description: 'Inline styles for the group parts.',
    },
    {
      name: 'dasar-radio-group: (onUpdate)',
      type: 'EventEmitter<any>',
      defaultValue: '-',
      description: 'Fires with the new value whenever the selection changes.',
    },
    {
      name: 'dasar-radio-group: (valueChange)',
      type: 'EventEmitter<any>',
      defaultValue: '-',
      description: 'Fires with the new value. Used by [(value)] and forms.',
    },
    {
      name: 'theme tokens',
      type: 'DasarThemeRadio',
      defaultValue: '-',
      description:
        'Set through tokens.light.radio (or tokens.dark.radio) in DasarThemeService.setGlobalTheme, or [tokenConfig] on dasar-theme-provider. Example: checkedColor -> --dasar-radio-checked-color. Full list on the Theme Tokens page.',
    },
    {
      name: 'component config',
      type: 'DasarRadioConfig / DasarRadioGroupConfig',
      defaultValue: '-',
      description:
        'Defaults via components.radio and components.radioGroup in DasarComponentConfig. Full list on the Component Config page.',
    },
  ];
}
