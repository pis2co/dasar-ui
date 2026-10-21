import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { DatepickerAppearanceExample } from './examples/appearance/datepicker-appearance.example';
import { DatepickerPlacementExample } from './examples/placement/datepicker-placement.example';
import { DatepickerFormatExample } from './examples/format/datepicker-format.example';
import { DatepickerStatesExample } from './examples/states/datepicker-states.example';
import { DatepickerFooterExample } from './examples/footer/datepicker-footer.example';
import { DatepickerBasicExample } from './examples/basic/datepicker-basic.example';
import { DatepickerRangeExample } from './examples/range/datepicker-range.example';
import { DatepickerSlotsExample } from './examples/slots/datepicker-slots.example';

// @ts-ignore
import basicHtml from './examples/basic/datepicker-basic.example.html' with { loader: 'text' };
// @ts-ignore
import basicTs from './examples/basic/datepicker-basic.example.ts' with { loader: 'text' };
// @ts-ignore
import rangeHtml from './examples/range/datepicker-range.example.html' with { loader: 'text' };
// @ts-ignore
import rangeTs from './examples/range/datepicker-range.example.ts' with { loader: 'text' };
// @ts-ignore
import appearanceHtml from './examples/appearance/datepicker-appearance.example.html' with {
  loader: 'text',
};
// @ts-ignore
import appearanceTs from './examples/appearance/datepicker-appearance.example.ts' with {
  loader: 'text',
};
// @ts-ignore
import formatHtml from './examples/format/datepicker-format.example.html' with {
  loader: 'text',
};
// @ts-ignore
import formatTs from './examples/format/datepicker-format.example.ts' with {
  loader: 'text',
};
// @ts-ignore
import statesHtml from './examples/states/datepicker-states.example.html' with { loader: 'text' };
// @ts-ignore
import statesTs from './examples/states/datepicker-states.example.ts' with { loader: 'text' };
// @ts-ignore
import placementHtml from './examples/placement/datepicker-placement.example.html' with {
  loader: 'text',
};
// @ts-ignore
import placementTs from './examples/placement/datepicker-placement.example.ts' with {
  loader: 'text',
};
// @ts-ignore
import slotsHtml from './examples/slots/datepicker-slots.example.html' with { loader: 'text' };
// @ts-ignore
import slotsTs from './examples/slots/datepicker-slots.example.ts' with { loader: 'text' };
// @ts-ignore
import footerHtml from './examples/footer/datepicker-footer.example.html' with {
  loader: 'text',
};
// @ts-ignore
import footerTs from './examples/footer/datepicker-footer.example.ts' with {
  loader: 'text',
};

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    DatepickerBasicExample,
    DatepickerRangeExample,
    DatepickerAppearanceExample,
    DatepickerFormatExample,
    DatepickerStatesExample,
    DatepickerPlacementExample,
    DatepickerSlotsExample,
    DatepickerFooterExample,
  ],
  templateUrl: './datepicker.page.html',
  selector: 'app-datepicker-page',
  standalone: true,
})
export class DatepickerDocPage {
  public basicHtml = basicHtml;
  public basicTs = basicTs;
  public rangeHtml = rangeHtml;
  public rangeTs = rangeTs;
  public appearanceHtml = appearanceHtml;
  public appearanceTs = appearanceTs;
  public formatHtml = formatHtml;
  public formatTs = formatTs;
  public statesHtml = statesHtml;
  public statesTs = statesTs;
  public placementHtml = placementHtml;
  public placementTs = placementTs;
  public slotsHtml = slotsHtml;
  public slotsTs = slotsTs;
  public footerHtml = footerHtml;
  public footerTs = footerTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'value',
      type: 'any',
      defaultValue: 'null',
      description:
        'The currently selected date. Supports Angular two-way binding [(value)] and Reactive Forms.',
    },
    {
      name: 'range',
      type: 'boolean',
      defaultValue: 'false',
      description:
        'Enables range selection. The value becomes an array of two items [start, end], each formatted with value-format. It is emitted only after both dates are picked, and cleared with null.',
    },
    {
      name: 'display-format',
      type: 'string',
      defaultValue: "'DD-MM-YYYY'",
      description: 'The date format shown in the input trigger (e.g., dd MMMM yyyy).',
    },
    {
      name: 'value-format',
      type: 'string',
      defaultValue: "'yyyy-MM-dd'",
      description:
        'The format of the returned value. Accepts date-fns strings, "iso", or "timestamp".',
    },
    {
      name: 'locale',
      type: 'string',
      defaultValue: "'en-US'",
      description: 'Locale used for formatting month names, weekdays, etc. (e.g., id-ID).',
    },
    {
      name: 'appearance',
      type: "'outline' | 'filled' | 'subtle'",
      defaultValue: "'outline'",
      description: 'The visual style of the trigger input.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Controls the height, typographic scale and icon size of the input.',
    },
    {
      name: 'placement',
      type: 'DasarDatepickerPlacement',
      defaultValue: "'bottom-start'",
      description: 'Preferred dropdown position. Auto-flips if there is no space.',
    },
    {
      name: 'clearable',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Displays an "x" icon to clear the selected date when hovered.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Disables user interaction.',
    },
    {
      name: 'error',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Applies an error validation style to the input and hint text.',
    },
    {
      name: 'full-width',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Forces the host element to 100% width.',
    },
    {
      name: 'label / extra-label / hint',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Helper text rendered around the component.',
    },
    {
      name: '(valueChange) / (onDateSelected)',
      type: 'EventEmitter<any>',
      defaultValue: '-',
      description: 'Emitted when a date is selected.',
    },
    {
      name: '[...-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description:
        'Directives like [prefix-slot], [label-slot], [extra-footer-slot] to project custom HTML.',
    },
  ];
}
