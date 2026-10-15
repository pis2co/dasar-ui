import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { RadioBasicExample } from './examples/basic/radio-basic.example';
import { RadioSizeExample } from './examples/size/radio-size.example';
import { RadioUpdateExample } from './examples/update/radio-update.example';
import { RadioLabelHintExample } from './examples/label-hint/radio-label-hint.example';
import { RadioErrorExample } from './examples/error/radio-error.example';
import { RadioDisabledExample } from './examples/disabled/radio-disabled.example';
import { RadioReactiveExample } from './examples/reactive/radio-reactive.example';
import { RadioGroupExample } from './examples/group/radio-group.example';
import { RadioGroupLayoutExample } from './examples/group-layout/radio-group-layout.example';
import { RadioGroupValueFieldExample } from './examples/group-value-field/radio-group-value-field.example';
import { RadioAdvancedThemeExample } from './examples/advanced-theme/radio-advanced-theme.example';

// @ts-ignore
import basicHtml from './examples/basic/radio-basic.example.html' with { loader: 'text' };
// @ts-ignore
import basicTs from './examples/basic/radio-basic.example.ts' with { loader: 'text' };

// @ts-ignore
import sizeHtml from './examples/size/radio-size.example.html' with { loader: 'text' };
// @ts-ignore
import sizeTs from './examples/size/radio-size.example.ts' with { loader: 'text' };

// @ts-ignore
import updateHtml from './examples/update/radio-update.example.html' with { loader: 'text' };
// @ts-ignore
import updateTs from './examples/update/radio-update.example.ts' with { loader: 'text' };

// @ts-ignore
import labelHintHtml from './examples/label-hint/radio-label-hint.example.html' with {
  loader: 'text',
};
// @ts-ignore
import labelHintTs from './examples/label-hint/radio-label-hint.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import errorHtml from './examples/error/radio-error.example.html' with { loader: 'text' };
// @ts-ignore
import errorTs from './examples/error/radio-error.example.ts' with { loader: 'text' };

// @ts-ignore
import disabledHtml from './examples/disabled/radio-disabled.example.html' with {
  loader: 'text',
};
// @ts-ignore
import disabledTs from './examples/disabled/radio-disabled.example.ts' with { loader: 'text' };

// @ts-ignore
import reactiveHtml from './examples/reactive/radio-reactive.example.html' with {
  loader: 'text',
};
// @ts-ignore
import reactiveTs from './examples/reactive/radio-reactive.example.ts' with { loader: 'text' };

// @ts-ignore
import groupHtml from './examples/group/radio-group.example.html' with { loader: 'text' };
// @ts-ignore
import groupTs from './examples/group/radio-group.example.ts' with { loader: 'text' };

// @ts-ignore
import groupLayoutHtml from './examples/group-layout/radio-group-layout.example.html' with {
  loader: 'text',
};
// @ts-ignore
import groupLayoutTs from './examples/group-layout/radio-group-layout.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import groupValueFieldHtml from './examples/group-value-field/radio-group-value-field.example.html' with {
  loader: 'text',
};
// @ts-ignore
import groupValueFieldTs from './examples/group-value-field/radio-group-value-field.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import advancedThemeHtml from './examples/advanced-theme/radio-advanced-theme.example.html' with {
  loader: 'text',
};
// @ts-ignore
import advancedThemeTs from './examples/advanced-theme/radio-advanced-theme.example.ts' with {
  loader: 'text',
};

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    RadioBasicExample,
    RadioSizeExample,
    RadioUpdateExample,
    RadioLabelHintExample,
    RadioErrorExample,
    RadioDisabledExample,
    RadioReactiveExample,
    RadioGroupExample,
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

  protected groupLayoutHtml = groupLayoutHtml;
  protected groupLayoutTs = groupLayoutTs;

  protected groupValueFieldHtml = groupValueFieldHtml;
  protected groupValueFieldTs = groupValueFieldTs;

  protected advancedThemeHtml = advancedThemeHtml;
  protected advancedThemeTs = advancedThemeTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'dasar-radio: size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Size of the radio.',
    },
    {
      name: 'dasar-radio: label',
      type: 'string',
      defaultValue: "''",
      description: 'Label text next to the circle.',
    },
    {
      name: 'dasar-radio: hint',
      type: 'string',
      defaultValue: "''",
      description: 'Helper text under the radio.',
    },
    {
      name: 'dasar-radio: error',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Error styling for the circle and hint.',
    },
    {
      name: 'dasar-radio: disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Disables the radio.',
    },
    {
      name: 'dasar-radio: checked-value',
      type: 'any',
      defaultValue: 'true',
      description: 'Value of this option. Selected when value matches it.',
    },
    {
      name: 'dasar-radio: name',
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
      name: 'dasar-radio: container-style / circle-style / label-style / hint-style',
      type: 'object',
      defaultValue: 'null',
      description: 'Inline styles for the radio parts.',
    },
    {
      name: 'dasar-radio: (onUpdate)',
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
      name: 'dasar-radio: default slot',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Extra content after the label.',
    },
    {
      name: 'dasar-radio-group: value / [(value)]',
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
        'Set through tokens.light.radio (or tokens.dark.radio) in DasarThemeService.setGlobalTheme, or [tokenConfig] on dasar-theme-provider. Example: checkedColor -> --radio-checked-color. Full list on the Theme Tokens page.',
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
