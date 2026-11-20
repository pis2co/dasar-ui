import { getDocsContent } from '../../docs-content.generated';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { TooltipBasicExample } from './examples/basic/tooltip-basic.example';
import { TooltipPlacementsExample } from './examples/placements/tooltip-placements.example';
import { TooltipAppearanceExample } from './examples/appearance/tooltip-appearance.example';
import { TooltipDelayExample } from './examples/delay/tooltip-delay.example';
import { TooltipDisabledExample } from './examples/disabled/tooltip-disabled.example';

const basicHtml = getDocsContent('projects/documentation/src/app/pages/tooltip/examples/basic/tooltip-basic.example.html');
const basicTs = getDocsContent('projects/documentation/src/app/pages/tooltip/examples/basic/tooltip-basic.example.ts');
const placementsHtml = getDocsContent('projects/documentation/src/app/pages/tooltip/examples/placements/tooltip-placements.example.html');
const placementsTs = getDocsContent('projects/documentation/src/app/pages/tooltip/examples/placements/tooltip-placements.example.ts');
const appearanceHtml = getDocsContent('projects/documentation/src/app/pages/tooltip/examples/appearance/tooltip-appearance.example.html');
const appearanceTs = getDocsContent('projects/documentation/src/app/pages/tooltip/examples/appearance/tooltip-appearance.example.ts');
const delayHtml = getDocsContent('projects/documentation/src/app/pages/tooltip/examples/delay/tooltip-delay.example.html');
const delayTs = getDocsContent('projects/documentation/src/app/pages/tooltip/examples/delay/tooltip-delay.example.ts');
const disabledHtml = getDocsContent('projects/documentation/src/app/pages/tooltip/examples/disabled/tooltip-disabled.example.html');
const disabledTs = getDocsContent('projects/documentation/src/app/pages/tooltip/examples/disabled/tooltip-disabled.example.ts');

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    TooltipBasicExample,
    TooltipPlacementsExample,
    TooltipAppearanceExample,
    TooltipDelayExample,
    TooltipDisabledExample,
  ],
  templateUrl: './tooltip.page.html',
  selector: 'app-tooltip-page',
  standalone: true,
})
export class TooltipDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;
  protected placementsHtml = placementsHtml;
  protected placementsTs = placementsTs;
  protected appearanceHtml = appearanceHtml;
  protected appearanceTs = appearanceTs;
  protected delayHtml = delayHtml;
  protected delayTs = delayTs;
  protected disabledHtml = disabledHtml;
  protected disabledTs = disabledTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'dasarTooltip',
      type: 'string | TemplateRef<any>',
      defaultValue: "''",
      description:
        'The content displayed inside the tooltip bubble. Can be a string message or an Angular TemplateRef. Applied directly as an attribute directive to any host element.',
    },
    {
      name: 'dasarTooltipPlacement',
      type: "'top' | 'bottom' | 'left' | 'right'",
      defaultValue: "'top'",
      description: 'Position of the tooltip relative to the target trigger element.',
    },
    {
      name: 'dasarTooltipDisabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether the tooltip trigger is disabled and prevented from showing.',
    },
    {
      name: 'dasarTooltipShowDelay',
      type: 'number',
      defaultValue: '0',
      description: 'Delay in milliseconds before the tooltip appears on hover or focus.',
    },
    {
      name: 'dasarTooltipHideDelay',
      type: 'number',
      defaultValue: '0',
      description: 'Delay in milliseconds before the tooltip disappears on pointer leave or blur.',
    },
    {
      name: 'dasarTooltipAppearance',
      type: "'solid' | 'elevated'",
      defaultValue: "'solid'",
      description: 'Visual appearance style of the tooltip bubble.',
    },
    {
      name: 'dasarTooltipClass',
      type: 'string | string[] | Record<string, boolean>',
      defaultValue: 'undefined',
      description: 'Custom CSS classes applied to the tooltip bubble content container.',
    },
    {
      name: 'dasarTooltipStyle',
      type: 'object',
      defaultValue: 'undefined',
      description: 'Custom inline styles applied to the tooltip bubble content container.',
    },
  ];
}
