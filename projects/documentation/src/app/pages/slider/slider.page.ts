import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { SliderBasicExample } from './examples/basic/slider-basic.example';
import { SliderSizesExample } from './examples/sizes/slider-sizes.example';
import { SliderAppearanceExample } from './examples/appearance/slider-appearance.example';
import { SliderDisabledExample } from './examples/disabled/slider-disabled.example';
import { SliderErrorExample } from './examples/error/slider-error.example';

// @ts-ignore
import basicHtml from './examples/basic/slider-basic.example.html' with { loader: 'text' };
// @ts-ignore
import basicTs from './examples/basic/slider-basic.example.ts' with { loader: 'text' };
// @ts-ignore
import sizesHtml from './examples/sizes/slider-sizes.example.html' with { loader: 'text' };
// @ts-ignore
import sizesTs from './examples/sizes/slider-sizes.example.ts' with { loader: 'text' };
// @ts-ignore
import appearanceHtml from './examples/appearance/slider-appearance.example.html' with {
  loader: 'text',
};
// @ts-ignore
import appearanceTs from './examples/appearance/slider-appearance.example.ts' with {
  loader: 'text',
};
// @ts-ignore
import disabledHtml from './examples/disabled/slider-disabled.example.html' with {
  loader: 'text',
};
// @ts-ignore
import disabledTs from './examples/disabled/slider-disabled.example.ts' with { loader: 'text' };
// @ts-ignore
import errorHtml from './examples/error/slider-error.example.html' with { loader: 'text' };
// @ts-ignore
import errorTs from './examples/error/slider-error.example.ts' with { loader: 'text' };

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    SliderBasicExample,
    SliderSizesExample,
    SliderAppearanceExample,
    SliderDisabledExample,
    SliderErrorExample,
  ],
  templateUrl: './slider.page.html',
  selector: 'app-slider-page',
  standalone: true,
})
export class SliderDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;
  protected sizesHtml = sizesHtml;
  protected sizesTs = sizesTs;
  protected appearanceHtml = appearanceHtml;
  protected appearanceTs = appearanceTs;
  protected disabledHtml = disabledHtml;
  protected disabledTs = disabledTs;
  protected errorHtml = errorHtml;
  protected errorTs = errorTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'value',
      type: 'number',
      defaultValue: '0',
      description:
        'The current numeric value of the slider. Supports two-way binding [(value)] and Reactive Forms (ControlValueAccessor).',
    },
    {
      name: 'min',
      type: 'number',
      defaultValue: '0',
      description: 'The minimum allowable value.',
    },
    {
      name: 'max',
      type: 'number',
      defaultValue: '100',
      description: 'The maximum allowable value.',
    },
    {
      name: 'step',
      type: 'number',
      defaultValue: '1',
      description: 'The granularity that the value must adhere to.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Controls the sizing scale of the slider track and thumb.',
    },
    {
      name: 'appearance',
      type: "'outline' | 'filled' | 'elevated'",
      defaultValue: "'outline'",
      description: 'Visual style of the slider track and thumb.',
    },
    {
      name: 'label',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Label rendered above the slider track.',
    },
    {
      name: 'hint',
      type: 'string',
      defaultValue: "''",
      description: 'Helper text rendered below the slider. Turns red when error is set.',
    },
    {
      name: 'error',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Applies red error validation styling to the slider and hint text.',
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Expands the slider component to 100% width of its container.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Disables user interaction with the slider.',
    },
    {
      name: 'valueChange',
      type: 'EventEmitter<number>',
      defaultValue: '-',
      description: 'Emitted when the slider value changes.',
    },
    {
      name: 'containerClass / containerStyle',
      type: 'any / Record<string, any>',
      defaultValue: '-',
      description: 'Class and inline style bindings for the container element.',
    },
    {
      name: 'trackClass / trackStyle',
      type: 'any / Record<string, any>',
      defaultValue: '-',
      description: 'Class and inline style bindings for the slider track element.',
    },
    {
      name: 'thumbClass / thumbStyle',
      type: 'any / Record<string, any>',
      defaultValue: '-',
      description: 'Class and inline style bindings for the slider thumb element.',
    },
  ];
}
