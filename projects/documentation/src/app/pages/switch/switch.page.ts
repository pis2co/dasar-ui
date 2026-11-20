import { getDocsContent } from '../../docs-content.generated';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { SwitchBasicExample } from './examples/basic/switch-basic.example';
import { SwitchAppearanceExample } from './examples/appearance/switch-appearance.example';
import { SwitchSizeExample } from './examples/size/switch-size.example';
import { SwitchDisabledExample } from './examples/disabled/switch-disabled.example';
import { SwitchErrorExample } from './examples/error/switch-error.example';
import { SwitchCustomValuesExample } from './examples/custom-values/switch-custom-values.example';
import { SwitchDefaultValueExample } from './examples/default-value/switch-default-value.example';
import { SwitchNgModelExample } from './examples/ng-model/switch-ng-model.example';
import { SwitchReactiveExample } from './examples/reactive/switch-reactive.example';
import { SwitchIconsExample } from './examples/icons/switch-icons.example';
import { SwitchContentSlotsExample } from './examples/content-slots/switch-content-slots.example';
import { SwitchIconSlotsExample } from './examples/icon-slots/switch-icon-slots.example';
import { SwitchThemeExample } from './examples/theme/switch-theme.example';

const basicHtml = getDocsContent('projects/documentation/src/app/pages/switch/examples/basic/switch-basic.example.html');
const basicTs = getDocsContent('projects/documentation/src/app/pages/switch/examples/basic/switch-basic.example.ts');

const appearanceHtml = getDocsContent('projects/documentation/src/app/pages/switch/examples/appearance/switch-appearance.example.html');
const appearanceTs = getDocsContent('projects/documentation/src/app/pages/switch/examples/appearance/switch-appearance.example.ts');

const sizeHtml = getDocsContent('projects/documentation/src/app/pages/switch/examples/size/switch-size.example.html');
const sizeTs = getDocsContent('projects/documentation/src/app/pages/switch/examples/size/switch-size.example.ts');

const disabledHtml = getDocsContent('projects/documentation/src/app/pages/switch/examples/disabled/switch-disabled.example.html');
const disabledTs = getDocsContent('projects/documentation/src/app/pages/switch/examples/disabled/switch-disabled.example.ts');

const errorHtml = getDocsContent('projects/documentation/src/app/pages/switch/examples/error/switch-error.example.html');
const errorTs = getDocsContent('projects/documentation/src/app/pages/switch/examples/error/switch-error.example.ts');

const customValuesHtml = getDocsContent('projects/documentation/src/app/pages/switch/examples/custom-values/switch-custom-values.example.html');
const customValuesTs = getDocsContent('projects/documentation/src/app/pages/switch/examples/custom-values/switch-custom-values.example.ts');

const defaultValueHtml = getDocsContent('projects/documentation/src/app/pages/switch/examples/default-value/switch-default-value.example.html');
const defaultValueTs = getDocsContent('projects/documentation/src/app/pages/switch/examples/default-value/switch-default-value.example.ts');

const ngModelHtml = getDocsContent('projects/documentation/src/app/pages/switch/examples/ng-model/switch-ng-model.example.html');
const ngModelTs = getDocsContent('projects/documentation/src/app/pages/switch/examples/ng-model/switch-ng-model.example.ts');

const reactiveHtml = getDocsContent('projects/documentation/src/app/pages/switch/examples/reactive/switch-reactive.example.html');
const reactiveTs = getDocsContent('projects/documentation/src/app/pages/switch/examples/reactive/switch-reactive.example.ts');

const iconsHtml = getDocsContent('projects/documentation/src/app/pages/switch/examples/icons/switch-icons.example.html');
const iconsTs = getDocsContent('projects/documentation/src/app/pages/switch/examples/icons/switch-icons.example.ts');

const contentSlotsHtml = getDocsContent('projects/documentation/src/app/pages/switch/examples/content-slots/switch-content-slots.example.html');
const contentSlotsTs = getDocsContent('projects/documentation/src/app/pages/switch/examples/content-slots/switch-content-slots.example.ts');

const iconSlotsHtml = getDocsContent('projects/documentation/src/app/pages/switch/examples/icon-slots/switch-icon-slots.example.html');
const iconSlotsTs = getDocsContent('projects/documentation/src/app/pages/switch/examples/icon-slots/switch-icon-slots.example.ts');

const themeHtml = getDocsContent('projects/documentation/src/app/pages/switch/examples/theme/switch-theme.example.html');
const themeTs = getDocsContent('projects/documentation/src/app/pages/switch/examples/theme/switch-theme.example.ts');

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    SwitchBasicExample,
    SwitchAppearanceExample,
    SwitchSizeExample,
    SwitchDisabledExample,
    SwitchErrorExample,
    SwitchCustomValuesExample,
    SwitchDefaultValueExample,
    SwitchNgModelExample,
    SwitchReactiveExample,
    SwitchIconsExample,
    SwitchContentSlotsExample,
    SwitchIconSlotsExample,
    SwitchThemeExample,
  ],
  templateUrl: './switch.page.html',
  selector: 'app-switch-page',
  standalone: true,
})
export class SwitchDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;

  protected appearanceHtml = appearanceHtml;
  protected appearanceTs = appearanceTs;

  protected sizeHtml = sizeHtml;
  protected sizeTs = sizeTs;

  protected disabledHtml = disabledHtml;
  protected disabledTs = disabledTs;

  protected errorHtml = errorHtml;
  protected errorTs = errorTs;

  protected customValuesHtml = customValuesHtml;
  protected customValuesTs = customValuesTs;

  protected defaultValueHtml = defaultValueHtml;
  protected defaultValueTs = defaultValueTs;

  protected ngModelHtml = ngModelHtml;
  protected ngModelTs = ngModelTs;

  protected reactiveHtml = reactiveHtml;
  protected reactiveTs = reactiveTs;

  protected iconsHtml = iconsHtml;
  protected iconsTs = iconsTs;

  protected contentSlotsHtml = contentSlotsHtml;
  protected contentSlotsTs = contentSlotsTs;

  protected iconSlotsHtml = iconSlotsHtml;
  protected iconSlotsTs = iconSlotsTs;

  protected themeHtml = themeHtml;
  protected themeTs = themeTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'value / ngModel',
      type: 'any',
      defaultValue: 'unchecked-value',
      description:
        'Controlled value. Supports valueChange for two-way binding with onUpdate, plus ngModel and reactive forms.',
    },
    {
      name: 'default-value',
      type: 'any',
      defaultValue: '-',
      description: 'Initial value when value is not bound. Falls back to unchecked-value.',
    },
    {
      name: 'checked-value',
      type: 'any',
      defaultValue: 'true',
      description: 'Value when the switch is on.',
    },
    {
      name: 'unchecked-value',
      type: 'any',
      defaultValue: 'false',
      description: 'Value when the switch is off.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Blocks toggling.',
    },
    {
      name: 'hint',
      type: 'string',
      defaultValue: "''",
      description: 'Helper text under the switch. Turns red when error is set.',
    },
    {
      name: 'hint-class / hint-style',
      type: 'ClassType / StyleType',
      defaultValue: '-',
      description: 'Class and inline style for the switch hint.',
    },
    {
      name: 'error',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Error styling for the track and hint.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Track and thumb size.',
    },
    {
      name: 'appearance',
      type: "'outline' | 'filled' | 'elevated'",
      defaultValue: "'outline'",
      description: 'Visual appearance variant.',
    },
    {
      name: 'checked-icon-name / unchecked-icon-name',
      type: 'string',
      defaultValue: "''",
      description: 'dasar-icon names rendered inside the thumb per state.',
    },
    {
      name: 'label',
      type: 'string',
      defaultValue: "''",
      description: 'Text next to the switch, also used as the aria-label.',
    },
    {
      name: '(onUpdate) / (valueChange)',
      type: 'any',
      defaultValue: '-',
      description: 'Emits the new value when the user toggles.',
    },
    {
      name: '[checked-slot] / [unchecked-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Content inside the track for each state, for example ON and OFF.',
    },
    {
      name: '[icon-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Shared thumb content for both states.',
    },
    {
      name: '[checked-icon-slot] / [unchecked-icon-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description:
        'Thumb content per state. Beats icon-slot, which beats checked-icon-name and unchecked-icon-name.',
    },
    {
      name: 'container-class / container-style',
      type: 'ClassType / StyleType',
      defaultValue: '-',
      description: 'Class and inline style for the switch container.',
    },
    {
      name: 'track-class / track-style',
      type: 'ClassType / StyleType',
      defaultValue: '-',
      description: 'Class and inline style for the switch track button.',
    },
  ];
}
