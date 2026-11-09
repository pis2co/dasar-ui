import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { TextareaBasicExample } from './examples/basic/textarea-basic.example';
import { TextareaSizesExample } from './examples/sizes/textarea-sizes.example';
import { TextareaAppearanceExample } from './examples/appearance/textarea-appearance.example';
import { TextareaLabelHintExample } from './examples/label-hint/textarea-label-hint.example';
import { TextareaErrorExample } from './examples/error/textarea-error.example';
import { TextareaDisabledExample } from './examples/disabled/textarea-disabled.example';

// @ts-ignore
import basicHtml from './examples/basic/textarea-basic.example.html' with { loader: 'text' };
// @ts-ignore
import basicTs from './examples/basic/textarea-basic.example.ts' with { loader: 'text' };
// @ts-ignore
import sizesHtml from './examples/sizes/textarea-sizes.example.html' with { loader: 'text' };
// @ts-ignore
import sizesTs from './examples/sizes/textarea-sizes.example.ts' with { loader: 'text' };
// @ts-ignore
import appearanceHtml from './examples/appearance/textarea-appearance.example.html' with {
  loader: 'text',
};
// @ts-ignore
import appearanceTs from './examples/appearance/textarea-appearance.example.ts' with {
  loader: 'text',
};
// @ts-ignore
import labelHintHtml from './examples/label-hint/textarea-label-hint.example.html' with {
  loader: 'text',
};
// @ts-ignore
import labelHintTs from './examples/label-hint/textarea-label-hint.example.ts' with {
  loader: 'text',
};
// @ts-ignore
import errorHtml from './examples/error/textarea-error.example.html' with { loader: 'text' };
// @ts-ignore
import errorTs from './examples/error/textarea-error.example.ts' with { loader: 'text' };
// @ts-ignore
import disabledHtml from './examples/disabled/textarea-disabled.example.html' with {
  loader: 'text',
};
// @ts-ignore
import disabledTs from './examples/disabled/textarea-disabled.example.ts' with { loader: 'text' };

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    TextareaBasicExample,
    TextareaSizesExample,
    TextareaAppearanceExample,
    TextareaLabelHintExample,
    TextareaErrorExample,
    TextareaDisabledExample,
  ],
  templateUrl: './textarea.page.html',
  selector: 'app-textarea-page',
  standalone: true,
})
export class TextareaDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;
  protected sizesHtml = sizesHtml;
  protected sizesTs = sizesTs;
  protected appearanceHtml = appearanceHtml;
  protected appearanceTs = appearanceTs;
  protected labelHintHtml = labelHintHtml;
  protected labelHintTs = labelHintTs;
  protected errorHtml = errorHtml;
  protected errorTs = errorTs;
  protected disabledHtml = disabledHtml;
  protected disabledTs = disabledTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'value',
      type: 'any',
      defaultValue: "''",
      description: 'The textarea content. Supports two-way binding [(value)] and Reactive Forms.',
    },
    {
      name: 'appearance',
      type: "'outline' | 'filled' | 'elevated'",
      defaultValue: "'outline'",
      description: 'Visual style of the textarea container.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Controls padding and font size.',
    },
    {
      name: 'radius',
      type: 'ScaleAttributeType',
      defaultValue: "'md'",
      description: 'Border radius.',
    },
    {
      name: 'rows',
      type: 'number',
      defaultValue: '4',
      description: 'Number of visible text lines.',
    },
    {
      name: 'cols',
      type: 'number',
      defaultValue: '20',
      description: 'Visible character width.',
    },
    {
      name: 'label / label-right',
      type: 'string | TemplateRef<any>',
      defaultValue: 'undefined',
      description: 'Labels rendered above the textarea container.',
    },
    {
      name: 'hint',
      type: 'string',
      defaultValue: "''",
      description: 'Helper text rendered below the textarea. Turns red when error is set.',
    },
    {
      name: 'placeholder',
      type: 'string',
      defaultValue: "''",
      description: 'Native placeholder string.',
    },
    {
      name: 'full-width',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Expands the component to 100% width.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Disables the textarea input.',
    },
    {
      name: 'readonly',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Sets the textarea as read-only.',
    },
    {
      name: 'error',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Applies red validation styling.',
    },
    {
      name: '(valueChange)',
      type: 'EventEmitter<any>',
      defaultValue: '-',
      description: 'Emitted when the textarea content changes.',
    },
    {
      name: '[label-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Custom template projected in place of the standard label.',
    },
    {
      name: '[extra-label-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Custom template projected on the top-right of the label row.',
    },
    {
      name: 'container-class / container-style',
      type: 'any / Record<string, any>',
      defaultValue: '-',
      description: 'Class and inline style bindings for the container element.',
    },
    {
      name: 'textarea-class / textarea-style',
      type: 'any / Record<string, any>',
      defaultValue: '-',
      description: 'Class and inline style bindings for the native textarea element.',
    },
    {
      name: 'host-class / host-style',
      type: 'any / Record<string, any>',
      defaultValue: '-',
      description: 'Class and inline style bindings for the host element wrapper.',
    },
  ];
}
