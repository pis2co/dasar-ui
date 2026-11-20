import { getDocsContent } from '../../docs-content.generated';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { SplitBasicExample } from './examples/basic/split-basic.example';
import { SplitVerticalExample } from './examples/vertical/split-vertical.example';
import { SplitLimitsExample } from './examples/limits/split-limits.example';
import { SplitControlledExample } from './examples/controlled/split-controlled.example';
import { SplitDisabledExample } from './examples/disabled/split-disabled.example';
import { SplitTriggerExample } from './examples/trigger/split-trigger.example';
import { SplitEventsExample } from './examples/events/split-events.example';
import { SplitNestedExample } from './examples/nested/split-nested.example';

const basicHtml = getDocsContent('projects/documentation/src/app/pages/split/examples/basic/split-basic.example.html');
const basicTs = getDocsContent('projects/documentation/src/app/pages/split/examples/basic/split-basic.example.ts');
const verticalHtml = getDocsContent('projects/documentation/src/app/pages/split/examples/vertical/split-vertical.example.html');
const verticalTs = getDocsContent('projects/documentation/src/app/pages/split/examples/vertical/split-vertical.example.ts');
const limitsHtml = getDocsContent('projects/documentation/src/app/pages/split/examples/limits/split-limits.example.html');
const limitsTs = getDocsContent('projects/documentation/src/app/pages/split/examples/limits/split-limits.example.ts');
const controlledHtml = getDocsContent('projects/documentation/src/app/pages/split/examples/controlled/split-controlled.example.html');
const controlledTs = getDocsContent('projects/documentation/src/app/pages/split/examples/controlled/split-controlled.example.ts');
const disabledHtml = getDocsContent('projects/documentation/src/app/pages/split/examples/disabled/split-disabled.example.html');
const disabledTs = getDocsContent('projects/documentation/src/app/pages/split/examples/disabled/split-disabled.example.ts');
const triggerHtml = getDocsContent('projects/documentation/src/app/pages/split/examples/trigger/split-trigger.example.html');
const triggerTs = getDocsContent('projects/documentation/src/app/pages/split/examples/trigger/split-trigger.example.ts');
const eventsHtml = getDocsContent('projects/documentation/src/app/pages/split/examples/events/split-events.example.html');
const eventsTs = getDocsContent('projects/documentation/src/app/pages/split/examples/events/split-events.example.ts');
const nestedHtml = getDocsContent('projects/documentation/src/app/pages/split/examples/nested/split-nested.example.html');
const nestedTs = getDocsContent('projects/documentation/src/app/pages/split/examples/nested/split-nested.example.ts');

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    SplitBasicExample,
    SplitVerticalExample,
    SplitLimitsExample,
    SplitControlledExample,
    SplitDisabledExample,
    SplitTriggerExample,
    SplitEventsExample,
    SplitNestedExample,
  ],
  templateUrl: './split.page.html',
  selector: 'app-split-page',
  standalone: true,
})
export class SplitDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;

  protected verticalHtml = verticalHtml;
  protected verticalTs = verticalTs;

  protected limitsHtml = limitsHtml;
  protected limitsTs = limitsTs;

  protected controlledHtml = controlledHtml;
  protected controlledTs = controlledTs;

  protected disabledHtml = disabledHtml;
  protected disabledTs = disabledTs;

  protected triggerHtml = triggerHtml;
  protected triggerTs = triggerTs;

  protected eventsHtml = eventsHtml;
  protected eventsTs = eventsTs;

  protected nestedHtml = nestedHtml;
  protected nestedTs = nestedTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Blocks dragging and keyboard resizing.',
    },
    {
      name: 'direction',
      type: "'horizontal' | 'vertical'",
      defaultValue: "'horizontal'",
      description: 'Horizontal puts the panels side by side, vertical stacks them.',
    },
    {
      name: 'size',
      type: 'string | number',
      defaultValue: "'50%'",
      description:
        'Size of the first panel. Numbers are pixels, strings accept px and %. Supports [(size)] in pixels.',
    },
    {
      name: 'min',
      type: 'string | number',
      defaultValue: '0',
      description: 'Smallest size of the first panel. Width when horizontal, height when vertical.',
    },
    {
      name: 'max',
      type: 'string | number',
      defaultValue: "'100%'",
      description: 'Largest size of the first panel. Width when horizontal, height when vertical.',
    },
    {
      name: 'first-panel-class / first-panel-style',
      type: 'ClassType / StyleType',
      defaultValue: '-',
      description: 'Class and inline style for the first panel.',
    },
    {
      name: 'second-panel-class / second-panel-style',
      type: 'ClassType / StyleType',
      defaultValue: '-',
      description: 'Class and inline style for the second panel.',
    },
    {
      name: 'container-class / container-style',
      type: 'ClassType / StyleType',
      defaultValue: '-',
      description: 'Class and inline style for the split container.',
    },
    {
      name: '(onDragStart)',
      type: 'EventEmitter<number>',
      defaultValue: '-',
      description: 'Emits the first panel size in pixels when a drag starts.',
    },
    {
      name: '(onUpdateSize)',
      type: 'EventEmitter<number>',
      defaultValue: '-',
      description:
        'Emits the first panel size in pixels on every change, from dragging or the keyboard.',
    },
    {
      name: '(onDragEnd)',
      type: 'EventEmitter<number>',
      defaultValue: '-',
      description: 'Emits the first panel size in pixels when a drag ends.',
    },
    {
      name: '(sizeChange)',
      type: 'EventEmitter<number>',
      defaultValue: '-',
      description: 'Same value as onUpdateSize, used by two way binding.',
    },
    {
      name: '[first-panel-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Content of the first panel.',
    },
    {
      name: '[second-panel-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Content of the second panel.',
    },
    {
      name: '[trigger-panel]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Content shown inside the split bar, for example a grip icon.',
    },
    {
      name: 'theme tokens',
      type: 'DasarThemeSplit',
      defaultValue: '-',
      description:
        'Set through tokens.light.split (or tokens.dark.split). Each key writes one CSS variable, for example barSize -> --dasar-split-bar-size.',
    },
  ];
}
