import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { CheckboxBasicExample } from './examples/basic/checkbox-basic.example';
import { CheckboxSizeExample } from './examples/size/checkbox-size.example';
import { CheckboxCustomValuesExample } from './examples/custom-values/checkbox-custom-values.example';
import { CheckboxLabelHintExample } from './examples/label-hint/checkbox-label-hint.example';
import { CheckboxErrorExample } from './examples/error/checkbox-error.example';
import { CheckboxDisabledExample } from './examples/disabled/checkbox-disabled.example';
import { CheckboxReactiveExample } from './examples/reactive/checkbox-reactive.example';
import { CheckboxGroupExample } from './examples/group/checkbox-group.example';
import { CheckboxGroupLayoutExample } from './examples/group-layout/checkbox-group-layout.example';
import { CheckboxGroupValueFieldExample } from './examples/group-value-field/checkbox-group-value-field.example';
import { CheckboxAdvancedThemeExample } from './examples/advanced-theme/checkbox-advanced-theme.example';

// @ts-ignore
import basicHtml from './examples/basic/checkbox-basic.example.html' with { loader: 'text' };
// @ts-ignore
import basicTs from './examples/basic/checkbox-basic.example.ts' with { loader: 'text' };

// @ts-ignore
import sizeHtml from './examples/size/checkbox-size.example.html' with { loader: 'text' };
// @ts-ignore
import sizeTs from './examples/size/checkbox-size.example.ts' with { loader: 'text' };

// @ts-ignore
import customValuesHtml from './examples/custom-values/checkbox-custom-values.example.html' with {
  loader: 'text',
};
// @ts-ignore
import customValuesTs from './examples/custom-values/checkbox-custom-values.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import labelHintHtml from './examples/label-hint/checkbox-label-hint.example.html' with {
  loader: 'text',
};
// @ts-ignore
import labelHintTs from './examples/label-hint/checkbox-label-hint.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import errorHtml from './examples/error/checkbox-error.example.html' with { loader: 'text' };
// @ts-ignore
import errorTs from './examples/error/checkbox-error.example.ts' with { loader: 'text' };

// @ts-ignore
import disabledHtml from './examples/disabled/checkbox-disabled.example.html' with {
  loader: 'text',
};
// @ts-ignore
import disabledTs from './examples/disabled/checkbox-disabled.example.ts' with { loader: 'text' };

// @ts-ignore
import reactiveHtml from './examples/reactive/checkbox-reactive.example.html' with {
  loader: 'text',
};
// @ts-ignore
import reactiveTs from './examples/reactive/checkbox-reactive.example.ts' with { loader: 'text' };

// @ts-ignore
import groupHtml from './examples/group/checkbox-group.example.html' with { loader: 'text' };
// @ts-ignore
import groupTs from './examples/group/checkbox-group.example.ts' with { loader: 'text' };

// @ts-ignore
import groupLayoutHtml from './examples/group-layout/checkbox-group-layout.example.html' with {
  loader: 'text',
};
// @ts-ignore
import groupLayoutTs from './examples/group-layout/checkbox-group-layout.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import groupValueFieldHtml from './examples/group-value-field/checkbox-group-value-field.example.html' with {
  loader: 'text',
};
// @ts-ignore
import groupValueFieldTs from './examples/group-value-field/checkbox-group-value-field.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import advancedThemeHtml from './examples/advanced-theme/checkbox-advanced-theme.example.html' with {
  loader: 'text',
};
// @ts-ignore
import advancedThemeTs from './examples/advanced-theme/checkbox-advanced-theme.example.ts' with {
  loader: 'text',
};

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    CheckboxBasicExample,
    CheckboxSizeExample,
    CheckboxCustomValuesExample,
    CheckboxLabelHintExample,
    CheckboxErrorExample,
    CheckboxDisabledExample,
    CheckboxReactiveExample,
    CheckboxGroupExample,
    CheckboxGroupLayoutExample,
    CheckboxGroupValueFieldExample,
    CheckboxAdvancedThemeExample,
  ],
  templateUrl: './checkbox.page.html',
  selector: 'app-checkbox-page',
  standalone: true,
})
export class CheckboxDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;

  protected sizeHtml = sizeHtml;
  protected sizeTs = sizeTs;

  protected customValuesHtml = customValuesHtml;
  protected customValuesTs = customValuesTs;

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
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Size of the checkbox.',
    },
    {
      name: 'label',
      type: 'string',
      defaultValue: "''",
      description: 'Label text next to the box.',
    },
    {
      name: 'error',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Error styling for the box and hint.',
    },
    {
      name: 'indeterminate',
      type: 'boolean',
      defaultValue: 'false',
      description:
        'Shows the mixed state (a dash) and sets aria-checked to mixed. Use it for a parent whose children are partly checked. Clicking still toggles the value from its current state.',
    },
    {
      name: 'dasar-checkbox: hint',
      type: 'string',
      defaultValue: "''",
      description: 'Helper text under the checkbox.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Disables the checkbox.',
    },
    {
      name: 'checked-value',
      type: 'any',
      defaultValue: 'true',
      description:
        'Value emitted when checked. Ignored inside a group for display, but sent in the group array.',
    },
    {
      name: 'unchecked-value',
      type: 'any',
      defaultValue: 'false',
      description: 'Value emitted when unchecked. Not used inside a group.',
    },
    {
      name: 'value / [(value)]',
      type: 'any',
      defaultValue: 'false',
      description: 'Checked state. Compared against checked-value. Overridden by the group.',
    },
    {
      name: 'container-class / box-class / label-class / hint-class',
      type: 'string | object',
      defaultValue: "''",
      description: 'Classes for the checkbox parts.',
    },
    {
      name: 'container-style / box-style / label-style / hint-style',
      type: 'object',
      defaultValue: 'null',
      description: 'Inline styles for the checkbox parts.',
    },
    {
      name: '(onUpdate)',
      type: 'EventEmitter<any>',
      defaultValue: '-',
      description:
        'Fires with the new value when toggled. Does not fire for children inside a group.',
    },
    {
      name: '(valueChange)',
      type: 'EventEmitter<any>',
      defaultValue: '-',
      description: 'Fires with the new value. Used by [(value)] and forms.',
    },
    {
      name: 'default slot',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Extra content after the label.',
    },
    {
      name: 'dasar-checkbox-group: value / [(value)]',
      type: 'any[]',
      defaultValue: '[]',
      description: 'Array of checked child checked-values. Overrides every child state.',
    },
    {
      name: 'dasar-checkbox-group: value-field',
      type: 'string | null',
      defaultValue: 'null',
      description:
        'Object key used to compare group values with child checked values. Example: value-field="id".',
    },
    {
      name: 'dasar-checkbox-group: size',
      type: "'sm' | 'md' | 'lg' | null",
      defaultValue: 'null',
      description: 'Overrides the size of every child. Null keeps each child size.',
    },
    {
      name: 'dasar-checkbox-group: direction',
      type: "'horizontal' | 'vertical'",
      defaultValue: "'vertical'",
      description: 'Layout direction of the checkboxes.',
    },
    {
      name: 'dasar-checkbox-group: disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Disables every child checkbox.',
    },
    {
      name: 'dasar-checkbox-group: error',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Error styling, passed down to every child.',
    },
    {
      name: 'dasar-checkbox-group: hint',
      type: 'string',
      defaultValue: "''",
      description: 'Helper text under the group.',
    },
    {
      name: 'dasar-checkbox-group: container-class / hint-class',
      type: 'string | object',
      defaultValue: "''",
      description: 'Classes for the group parts.',
    },
    {
      name: 'dasar-checkbox-group: container-style / hint-style',
      type: 'object',
      defaultValue: 'null',
      description: 'Inline styles for the group parts.',
    },
    {
      name: 'dasar-checkbox-group: (onUpdate)',
      type: 'EventEmitter<any[]>',
      defaultValue: '-',
      description: 'Fires with the new array whenever a child is toggled.',
    },
    {
      name: 'dasar-checkbox-group: (valueChange)',
      type: 'EventEmitter<any[]>',
      defaultValue: '-',
      description: 'Fires with the new array. Used by [(value)] and forms.',
    },
    {
      name: 'theme tokens',
      type: 'DasarThemeCheckbox',
      defaultValue: '-',
      description:
        'Set through tokens.light.checkbox (or tokens.dark.checkbox) in DasarThemeService.setGlobalTheme, or [tokenConfig] on dasar-theme-provider. Example: checkedBg -> --dasar-checkbox-checked-bg. Full list on the Theme Tokens page.',
    },
    {
      name: 'component config',
      type: 'DasarCheckboxConfig / DasarCheckboxGroupConfig',
      defaultValue: '-',
      description:
        'Defaults via components.checkbox and components.checkboxGroup in DasarComponentConfig. Full list on the Component Config page.',
    },
  ];
}
