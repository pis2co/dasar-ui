import { getDocsContent } from '../../docs-content.generated';
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
import { DatepickerTimepickerExample } from './examples/timepicker/datepicker-timepicker.example';
import { DatepickerDatetimeExample } from './examples/datetime/datepicker-datetime.example';

const basicHtml = getDocsContent('projects/documentation/src/app/pages/datepicker/examples/basic/datepicker-basic.example.html');
const basicTs = getDocsContent('projects/documentation/src/app/pages/datepicker/examples/basic/datepicker-basic.example.ts');
const rangeHtml = getDocsContent('projects/documentation/src/app/pages/datepicker/examples/range/datepicker-range.example.html');
const rangeTs = getDocsContent('projects/documentation/src/app/pages/datepicker/examples/range/datepicker-range.example.ts');
const appearanceHtml = getDocsContent('projects/documentation/src/app/pages/datepicker/examples/appearance/datepicker-appearance.example.html');
const appearanceTs = getDocsContent('projects/documentation/src/app/pages/datepicker/examples/appearance/datepicker-appearance.example.ts');
const formatHtml = getDocsContent('projects/documentation/src/app/pages/datepicker/examples/format/datepicker-format.example.html');
const formatTs = getDocsContent('projects/documentation/src/app/pages/datepicker/examples/format/datepicker-format.example.ts');
const statesHtml = getDocsContent('projects/documentation/src/app/pages/datepicker/examples/states/datepicker-states.example.html');
const statesTs = getDocsContent('projects/documentation/src/app/pages/datepicker/examples/states/datepicker-states.example.ts');
const placementHtml = getDocsContent('projects/documentation/src/app/pages/datepicker/examples/placement/datepicker-placement.example.html');
const placementTs = getDocsContent('projects/documentation/src/app/pages/datepicker/examples/placement/datepicker-placement.example.ts');
const slotsHtml = getDocsContent('projects/documentation/src/app/pages/datepicker/examples/slots/datepicker-slots.example.html');
const slotsTs = getDocsContent('projects/documentation/src/app/pages/datepicker/examples/slots/datepicker-slots.example.ts');
const footerHtml = getDocsContent('projects/documentation/src/app/pages/datepicker/examples/footer/datepicker-footer.example.html');
const footerTs = getDocsContent('projects/documentation/src/app/pages/datepicker/examples/footer/datepicker-footer.example.ts');
const timepickerHtml = getDocsContent('projects/documentation/src/app/pages/datepicker/examples/timepicker/datepicker-timepicker.example.html');
const timepickerTs = getDocsContent('projects/documentation/src/app/pages/datepicker/examples/timepicker/datepicker-timepicker.example.ts');
const datetimeHtml = getDocsContent('projects/documentation/src/app/pages/datepicker/examples/datetime/datepicker-datetime.example.html');
const datetimeTs = getDocsContent('projects/documentation/src/app/pages/datepicker/examples/datetime/datepicker-datetime.example.ts');

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
    DatepickerTimepickerExample,
    DatepickerDatetimeExample,
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
  public timepickerHtml = timepickerHtml;
  public timepickerTs = timepickerTs;
  public datetimeHtml = datetimeHtml;
  public datetimeTs = datetimeTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'value',
      type: 'any',
      defaultValue: 'null',
      description:
        'The current selection. Date and datetime values use value-format; time-only mode returns a time string without a date. Supports [(value)] and Reactive Forms.',
    },
    {
      name: 'type',
      type: "'date' | 'datetime' | 'time'",
      defaultValue: "'date'",
      description:
        'Selects date, combined date and time, or time-only mode; time-only mode shows no calendar date picker.',
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
      description:
        'The date format shown in date and datetime modes (e.g., dd MMMM yyyy). Time-only mode uses time-format and show-seconds.',
    },
    {
      name: 'value-format',
      type: 'string',
      defaultValue: "'yyyy-MM-dd'",
      description:
        'The returned date/datetime format. Accepts date-fns strings, "iso", or "timestamp"; time-only mode instead emits a time string based on time-format and show-seconds.',
    },
    {
      name: 'time-format',
      type: "'12' | '24'",
      defaultValue: "'24'",
      description:
        'Controls the time display and emitted time string in datetime and time-only modes.',
    },
    {
      name: 'show-seconds',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Shows seconds in the time controls and emitted time string.',
    },
    {
      name: 'locale',
      type: 'string',
      defaultValue: "'en-US'",
      description: 'Locale used for formatting month names, weekdays, etc. (e.g., id-ID).',
    },
    {
      name: 'appearance',
      type: "'outline' | 'filled' | 'subtle' | 'elevated'",
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
