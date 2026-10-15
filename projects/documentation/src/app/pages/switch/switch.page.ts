import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { SwitchBasicExample } from './examples/basic/switch-basic.example';
import { SwitchSizeExample } from './examples/size/switch-size.example';
import { SwitchDisabledExample } from './examples/disabled/switch-disabled.example';
import { SwitchCustomValuesExample } from './examples/custom-values/switch-custom-values.example';
import { SwitchDefaultValueExample } from './examples/default-value/switch-default-value.example';
import { SwitchNgModelExample } from './examples/ng-model/switch-ng-model.example';
import { SwitchReactiveExample } from './examples/reactive/switch-reactive.example';
import { SwitchIconsExample } from './examples/icons/switch-icons.example';
import { SwitchContentSlotsExample } from './examples/content-slots/switch-content-slots.example';
import { SwitchIconSlotsExample } from './examples/icon-slots/switch-icon-slots.example';
import { SwitchThemeExample } from './examples/theme/switch-theme.example';

// @ts-ignore
import basicHtml from './examples/basic/switch-basic.example.html' with { loader: 'text' };
// @ts-ignore
import basicTs from './examples/basic/switch-basic.example.ts' with { loader: 'text' };

// @ts-ignore
import sizeHtml from './examples/size/switch-size.example.html' with { loader: 'text' };
// @ts-ignore
import sizeTs from './examples/size/switch-size.example.ts' with { loader: 'text' };

// @ts-ignore
import disabledHtml from './examples/disabled/switch-disabled.example.html' with {
  loader: 'text',
};
// @ts-ignore
import disabledTs from './examples/disabled/switch-disabled.example.ts' with { loader: 'text' };

// @ts-ignore
import customValuesHtml from './examples/custom-values/switch-custom-values.example.html' with {
  loader: 'text',
};
// @ts-ignore
import customValuesTs from './examples/custom-values/switch-custom-values.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import defaultValueHtml from './examples/default-value/switch-default-value.example.html' with {
  loader: 'text',
};
// @ts-ignore
import defaultValueTs from './examples/default-value/switch-default-value.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import ngModelHtml from './examples/ng-model/switch-ng-model.example.html' with {
  loader: 'text',
};
// @ts-ignore
import ngModelTs from './examples/ng-model/switch-ng-model.example.ts' with { loader: 'text' };

// @ts-ignore
import reactiveHtml from './examples/reactive/switch-reactive.example.html' with {
  loader: 'text',
};
// @ts-ignore
import reactiveTs from './examples/reactive/switch-reactive.example.ts' with { loader: 'text' };

// @ts-ignore
import iconsHtml from './examples/icons/switch-icons.example.html' with { loader: 'text' };
// @ts-ignore
import iconsTs from './examples/icons/switch-icons.example.ts' with { loader: 'text' };

// @ts-ignore
import contentSlotsHtml from './examples/content-slots/switch-content-slots.example.html' with {
  loader: 'text',
};
// @ts-ignore
import contentSlotsTs from './examples/content-slots/switch-content-slots.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import iconSlotsHtml from './examples/icon-slots/switch-icon-slots.example.html' with {
  loader: 'text',
};
// @ts-ignore
import iconSlotsTs from './examples/icon-slots/switch-icon-slots.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import themeHtml from './examples/theme/switch-theme.example.html' with { loader: 'text' };
// @ts-ignore
import themeTs from './examples/theme/switch-theme.example.ts' with { loader: 'text' };

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    SwitchBasicExample,
    SwitchSizeExample,
    SwitchDisabledExample,
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

  protected sizeHtml = sizeHtml;
  protected sizeTs = sizeTs;

  protected disabledHtml = disabledHtml;
  protected disabledTs = disabledTs;

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
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Track and thumb size.',
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
