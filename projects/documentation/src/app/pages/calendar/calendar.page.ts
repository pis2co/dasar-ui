import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { CalendarBasicExample } from './examples/basic/calendar-basic.example';
import { CalendarDropdownExample } from './examples/dropdown/calendar-dropdown.example';
import { CalendarLocaleExample } from './examples/locale/calendar-locale.example';
import { CalendarFormatExample } from './examples/format/calendar-format.example';
import { CalendarCustomHeaderExample } from './examples/custom-header/calendar-custom-header.example';
import { CalendarActionsExample } from './examples/actions/calendar-actions.example';
import { CalendarStylesExample } from './examples/styles/calendar-styles.example';

// @ts-ignore
import basicHtml from './examples/basic/calendar-basic.example.html' with { loader: 'text' };
// @ts-ignore
import basicTs from './examples/basic/calendar-basic.example.ts' with { loader: 'text' };

// @ts-ignore
import dropdownHtml from './examples/dropdown/calendar-dropdown.example.html' with {
  loader: 'text',
};
// @ts-ignore
import dropdownTs from './examples/dropdown/calendar-dropdown.example.ts' with { loader: 'text' };

// @ts-ignore
import localeHtml from './examples/locale/calendar-locale.example.html' with { loader: 'text' };
// @ts-ignore
import localeTs from './examples/locale/calendar-locale.example.ts' with { loader: 'text' };

// @ts-ignore
import formatHtml from './examples/format/calendar-format.example.html' with { loader: 'text' };
// @ts-ignore
import formatTs from './examples/format/calendar-format.example.ts' with { loader: 'text' };

// @ts-ignore
import headerHtml from './examples/custom-header/calendar-custom-header.example.html' with {
  loader: 'text',
};
// @ts-ignore
import headerTs from './examples/custom-header/calendar-custom-header.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import actionsHtml from './examples/actions/calendar-actions.example.html' with { loader: 'text' };
// @ts-ignore
import actionsTs from './examples/actions/calendar-actions.example.ts' with { loader: 'text' };

// @ts-ignore
import stylesHtml from './examples/styles/calendar-styles.example.html' with { loader: 'text' };
// @ts-ignore
import stylesTs from './examples/styles/calendar-styles.example.ts' with { loader: 'text' };

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    CalendarBasicExample,
    CalendarDropdownExample,
    CalendarLocaleExample,
    CalendarFormatExample,
    CalendarCustomHeaderExample,
    CalendarActionsExample,
    CalendarStylesExample,
  ],
  templateUrl: './calendar.page.html',
  selector: 'app-calendar-page',
  standalone: true,
})
export class CalendarDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;
  protected dropdownHtml = dropdownHtml;
  protected dropdownTs = dropdownTs;
  protected localeHtml = localeHtml;
  protected localeTs = localeTs;
  protected formatHtml = formatHtml;
  protected formatTs = formatTs;
  protected headerHtml = headerHtml;
  protected headerTs = headerTs;
  protected actionsHtml = actionsHtml;
  protected actionsTs = actionsTs;
  protected stylesHtml = stylesHtml;
  protected stylesTs = stylesTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'value',
      type: 'Date | string | number | null',
      defaultValue: 'null',
      description:
        'The currently selected date. Supports Angular binding via [value] and (valueChange).',
    },
    {
      name: 'variant',
      type: "'dashboard' | 'dropdown'",
      defaultValue: "'dashboard'",
      description: 'Adjusts layout. Dashboard is spacious, dropdown is compact for pickers.',
    },
    {
      name: 'appearance',
      type: "'outline' | 'borderless'",
      defaultValue: "'outline'",
      description: 'Defines the outer border visual style of the container.',
    },
    {
      name: 'radius',
      type: 'ScaleAttributeType',
      defaultValue: "'md'",
      description: 'Sets the border radius curve.',
    },
    {
      name: 'locale',
      type: 'string',
      defaultValue: "'en-US'",
      description:
        'Code used for localizing month names, weekdays, and formats (e.g., id-ID, en-US).',
    },
    {
      name: 'header-format / value-format / weekday-format',
      type: 'string',
      defaultValue: 'varies',
      description: 'Date format strings for navigation, full dates, and weekdays.',
    },
    {
      name: 'hide-header / hide-full-date',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Hides top navigation or full date display.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Disables all user interaction.',
    },
    {
      name: 'full-width',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Maximizes the width size of calendar.',
    },
    {
      name: '(valueChange) / (onMonthChange) / (onYearChange)',
      type: 'EventEmitter<Date>',
      defaultValue: '-',
      description: 'Emitted during date selection and view navigation.',
    },
    {
      name: '[calendar-...-template]',
      type: 'TemplateRef<any>',
      defaultValue: '-',
      description:
        'Slot directives to override UI: header, today, prev/next buttons. Yields component context.',
    },
    {
      name: '[calendar-footer-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Inject custom content (like action buttons) at the bottom.',
    },
  ];
}
