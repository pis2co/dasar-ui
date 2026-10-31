import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { PinBasicExample } from './examples/basic/pin-basic.example';
import { PinAppearanceWithElevatedExample } from './examples/appearance-with-elevated/pin-appearance-with-elevated.example';
import { PinSizesExample } from './examples/sizes/pin-sizes.example';
import { PinDisabledExample } from './examples/disabled/pin-disabled.example';
import { PinErrorExample } from './examples/error/pin-error.example';

// @ts-ignore
import basicHtml from './examples/basic/pin-basic.example.html' with { loader: 'text' };
// @ts-ignore
import basicTs from './examples/basic/pin-basic.example.ts' with { loader: 'text' };
// @ts-ignore
import appearanceHtml from './examples/appearance-with-elevated/pin-appearance-with-elevated.example.html' with {
  loader: 'text',
};
// @ts-ignore
import appearanceTs from './examples/appearance-with-elevated/pin-appearance-with-elevated.example.ts' with {
  loader: 'text',
};
// @ts-ignore
import sizesHtml from './examples/sizes/pin-sizes.example.html' with { loader: 'text' };
// @ts-ignore
import sizesTs from './examples/sizes/pin-sizes.example.ts' with { loader: 'text' };
// @ts-ignore
import disabledHtml from './examples/disabled/pin-disabled.example.html' with { loader: 'text' };
// @ts-ignore
import disabledTs from './examples/disabled/pin-disabled.example.ts' with { loader: 'text' };
// @ts-ignore
import errorHtml from './examples/error/pin-error.example.html' with { loader: 'text' };
// @ts-ignore
import errorTs from './examples/error/pin-error.example.ts' with { loader: 'text' };

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    PinBasicExample,
    PinAppearanceWithElevatedExample,
    PinSizesExample,
    PinDisabledExample,
    PinErrorExample,
  ],
  templateUrl: './pin.page.html',
  selector: 'app-pin-page',
  standalone: true,
})
export class PinDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;
  protected appearanceHtml = appearanceHtml;
  protected appearanceTs = appearanceTs;
  protected sizesHtml = sizesHtml;
  protected sizesTs = sizesTs;
  protected disabledHtml = disabledHtml;
  protected disabledTs = disabledTs;
  protected errorHtml = errorHtml;
  protected errorTs = errorTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'length',
      type: 'number',
      defaultValue: '6',
      description: 'The number of PIN slot inputs to render.',
    },
    {
      name: 'appearance',
      type: "'outline' | 'filled' | 'elevated'",
      defaultValue: "'outline'",
      description: 'Visual appearance style of each input slot.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Sizing scale controlling dimensions and typography.',
    },
    {
      name: 'radius',
      type: 'ScaleAttributeType',
      defaultValue: "'md'",
      description: 'Border radius scale token (xs, sm, md, lg, xl, full).',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Disables all input slots and prevents user interaction.',
    },
    {
      name: 'error',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Applies red error validation styling across all slot inputs.',
    },
    {
      name: 'pattern',
      type: 'string',
      defaultValue: "'[0-9]'",
      description: 'Regular expression pattern restricting valid character input per slot.',
    },
    {
      name: 'placeholder',
      type: 'string',
      defaultValue: "''",
      description: 'Placeholder character displayed in empty slots.',
    },
    {
      name: 'inputMode',
      type: "'numeric' | 'text' | 'decimal' | 'tel' | 'search' | 'email' | 'url'",
      defaultValue: "'numeric'",
      description:
        'Native inputmode attribute for virtual keyboard optimization on mobile devices.',
    },
    {
      name: '(valueChange)',
      type: 'EventEmitter<string>',
      defaultValue: '-',
      description: 'Emitted whenever any slot value changes.',
    },
    {
      name: '(complete)',
      type: 'EventEmitter<string>',
      defaultValue: '-',
      description: 'Emitted when all PIN slots have been filled.',
    },
    {
      name: 'container-class / container-style',
      type: 'any / Record<string, any>',
      defaultValue: '-',
      description: 'Class and inline style bindings for the inner slot container.',
    },
    {
      name: 'host-class / host-style',
      type: 'any / Record<string, any>',
      defaultValue: '-',
      description: 'Class and inline style bindings for the host element wrapper.',
    },
  ];
}
