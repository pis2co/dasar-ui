import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { BreakpointServiceBasicsExample } from './examples/service-basics/breakpoint-service-basics.example';
import { BreakpointHiddenAtExample } from './examples/hidden-at/breakpoint-hidden-at.example';
import { BreakpointShowAtExample } from './examples/show-at/breakpoint-show-at.example';
import { BreakpointPairExample } from './examples/pair/breakpoint-pair.example';
import { BreakpointEventsExample } from './examples/events/breakpoint-events.example';
import { BreakpointTemplateExample } from './examples/template/breakpoint-template.example';
import { BreakpointCustomExample } from './examples/custom/breakpoint-custom.example';
import { BreakpointAdvancedThemeExample } from './examples/advanced-theme/breakpoint-advanced-theme.example';

// @ts-ignore
import serviceBasicsHtml from './examples/service-basics/breakpoint-service-basics.example.html' with {
  loader: 'text',
};
// @ts-ignore
import serviceBasicsTs from './examples/service-basics/breakpoint-service-basics.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import hiddenAtHtml from './examples/hidden-at/breakpoint-hidden-at.example.html' with {
  loader: 'text',
};
// @ts-ignore
import hiddenAtTs from './examples/hidden-at/breakpoint-hidden-at.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import showAtHtml from './examples/show-at/breakpoint-show-at.example.html' with {
  loader: 'text',
};
// @ts-ignore
import showAtTs from './examples/show-at/breakpoint-show-at.example.ts' with { loader: 'text' };

// @ts-ignore
import pairHtml from './examples/pair/breakpoint-pair.example.html' with { loader: 'text' };
// @ts-ignore
import pairTs from './examples/pair/breakpoint-pair.example.ts' with { loader: 'text' };

// @ts-ignore
import eventsHtml from './examples/events/breakpoint-events.example.html' with { loader: 'text' };
// @ts-ignore
import eventsTs from './examples/events/breakpoint-events.example.ts' with { loader: 'text' };

// @ts-ignore
import templateHtml from './examples/template/breakpoint-template.example.html' with {
  loader: 'text',
};
// @ts-ignore
import templateTs from './examples/template/breakpoint-template.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import customHtml from './examples/custom/breakpoint-custom.example.html' with { loader: 'text' };
// @ts-ignore
import customTs from './examples/custom/breakpoint-custom.example.ts' with { loader: 'text' };

// @ts-ignore
import advancedThemeHtml from './examples/advanced-theme/breakpoint-advanced-theme.example.html' with {
  loader: 'text',
};
// @ts-ignore
import advancedThemeTs from './examples/advanced-theme/breakpoint-advanced-theme.example.ts' with {
  loader: 'text',
};

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    BreakpointServiceBasicsExample,
    BreakpointHiddenAtExample,
    BreakpointShowAtExample,
    BreakpointPairExample,
    BreakpointEventsExample,
    BreakpointTemplateExample,
    BreakpointCustomExample,
    BreakpointAdvancedThemeExample,
  ],
  templateUrl: './breakpoint.page.html',
  selector: 'app-breakpoint-page',
  standalone: true,
})
export class BreakpointDocPage {
  protected serviceBasicsHtml = serviceBasicsHtml;
  protected serviceBasicsTs = serviceBasicsTs;

  protected hiddenAtHtml = hiddenAtHtml;
  protected hiddenAtTs = hiddenAtTs;

  protected showAtHtml = showAtHtml;
  protected showAtTs = showAtTs;

  protected pairHtml = pairHtml;
  protected pairTs = pairTs;

  protected eventsHtml = eventsHtml;
  protected eventsTs = eventsTs;

  protected templateHtml = templateHtml;
  protected templateTs = templateTs;

  protected customHtml = customHtml;
  protected customTs = customTs;

  protected advancedThemeHtml = advancedThemeHtml;
  protected advancedThemeTs = advancedThemeTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'breakpoints',
      type: 'xs < 640 / sm 640 / md 768 / lg 1024 / xl 1200',
      defaultValue: '-',
      description: 'Mobile-first ranges in px. They match $breakpoint-* in theme.scss.',
    },
    {
      name: 'DasarBreakpointService: width / height',
      type: 'Signal<number>',
      defaultValue: '0',
      description: 'Current viewport size in px. Zero on the server.',
    },
    {
      name: 'DasarBreakpointService: name',
      type: "Signal<'xs' | 'sm' | 'md' | 'lg' | 'xl'>",
      defaultValue: "'xs'",
      description: 'Current breakpoint name.',
    },
    {
      name: 'DasarBreakpointService: smAndDown / mdAndDown / lgAndDown / xlAndDown',
      type: 'Signal<boolean>',
      defaultValue: '-',
      description: 'True below the next breakpoint. xlAndDown is always true.',
    },
    {
      name: 'DasarBreakpointService: smAndUp / mdAndUp / lgAndUp / xlAndUp',
      type: 'Signal<boolean>',
      defaultValue: '-',
      description: 'True at or above the breakpoint.',
    },
    {
      name: 'DasarBreakpointService: state',
      type: 'Signal<DasarBreakpointState>',
      defaultValue: '-',
      description: 'All values above in one object.',
    },
    {
      name: 'DasarBreakpointService: setBreakpoints',
      type: '(partial: DasarThemeBreakpoints) => void',
      defaultValue: '-',
      description:
        'Overrides thresholds in px. TS only, it does not change the SCSS media queries. Also set through breakpoints in DasarThemeConfig.',
    },
    {
      name: 'dasar-breakpoint: hidden-at',
      type: 'DasarBreakpointName[] | string | null',
      defaultValue: 'null',
      description: 'Hides the content on these breakpoints. Accepts an array or "sm,md".',
    },
    {
      name: 'dasar-breakpoint: show-at',
      type: 'DasarBreakpointName[] | string | null',
      defaultValue: 'null',
      description: 'Shows the content only on these breakpoints. Wins over hidden-at.',
    },
    {
      name: 'dasar-breakpoint: (onMediaUpdate)',
      type: 'EventEmitter<DasarBreakpointState>',
      defaultValue: '-',
      description: 'Fires with the state when the breakpoint name changes.',
    },
    {
      name: 'dasar-breakpoint: (onShow)',
      type: 'EventEmitter<DasarBreakpointState>',
      defaultValue: '-',
      description: 'Fires when the content becomes visible.',
    },
    {
      name: 'dasar-breakpoint: (onHidden)',
      type: 'EventEmitter<DasarBreakpointState>',
      defaultValue: '-',
      description: 'Fires when the content becomes hidden.',
    },
    {
      name: 'dasar-breakpoint: default slot',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Content shown when the rule matches.',
    },
    {
      name: 'component config',
      type: 'DasarBreakpointConfig',
      defaultValue: '-',
      description:
        'Defaults via components.breakpoint in DasarComponentConfig. Full list on the Component Config page.',
    },
  ];
}
