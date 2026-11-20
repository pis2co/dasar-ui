import { getDocsContent } from '../../docs-content.generated';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { DividerBasicExample } from './examples/basic/divider-basic.example';
import { DividerDashedExample } from './examples/dashed/divider-dashed.example';
import { DividerLabelExample } from './examples/label/divider-label.example';
import { DividerLabelPlacementExample } from './examples/label-placement/divider-label-placement.example';
import { DividerVerticalExample } from './examples/vertical/divider-vertical.example';
import { DividerSpacingExample } from './examples/spacing/divider-spacing.example';
import { DividerLabelSlotExample } from './examples/label-slot/divider-label-slot.example';
import { DividerCustomStyleExample } from './examples/custom-style/divider-custom-style.example';
import { DividerAdvancedThemeExample } from './examples/advanced-theme/divider-advanced-theme.example';

const basicHtml = getDocsContent('projects/documentation/src/app/pages/divider/examples/basic/divider-basic.example.html');
const basicTs = getDocsContent('projects/documentation/src/app/pages/divider/examples/basic/divider-basic.example.ts');

const dashedHtml = getDocsContent('projects/documentation/src/app/pages/divider/examples/dashed/divider-dashed.example.html');
const dashedTs = getDocsContent('projects/documentation/src/app/pages/divider/examples/dashed/divider-dashed.example.ts');

const labelHtml = getDocsContent('projects/documentation/src/app/pages/divider/examples/label/divider-label.example.html');
const labelTs = getDocsContent('projects/documentation/src/app/pages/divider/examples/label/divider-label.example.ts');

const labelPlacementHtml = getDocsContent('projects/documentation/src/app/pages/divider/examples/label-placement/divider-label-placement.example.html');
const labelPlacementTs = getDocsContent('projects/documentation/src/app/pages/divider/examples/label-placement/divider-label-placement.example.ts');

const verticalHtml = getDocsContent('projects/documentation/src/app/pages/divider/examples/vertical/divider-vertical.example.html');
const verticalTs = getDocsContent('projects/documentation/src/app/pages/divider/examples/vertical/divider-vertical.example.ts');

const spacingHtml = getDocsContent('projects/documentation/src/app/pages/divider/examples/spacing/divider-spacing.example.html');
const spacingTs = getDocsContent('projects/documentation/src/app/pages/divider/examples/spacing/divider-spacing.example.ts');

const labelSlotHtml = getDocsContent('projects/documentation/src/app/pages/divider/examples/label-slot/divider-label-slot.example.html');
const labelSlotTs = getDocsContent('projects/documentation/src/app/pages/divider/examples/label-slot/divider-label-slot.example.ts');

const customStyleHtml = getDocsContent('projects/documentation/src/app/pages/divider/examples/custom-style/divider-custom-style.example.html');
const customStyleTs = getDocsContent('projects/documentation/src/app/pages/divider/examples/custom-style/divider-custom-style.example.ts');

const advancedThemeHtml = getDocsContent('projects/documentation/src/app/pages/divider/examples/advanced-theme/divider-advanced-theme.example.html');
const advancedThemeTs = getDocsContent('projects/documentation/src/app/pages/divider/examples/advanced-theme/divider-advanced-theme.example.ts');

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    DividerBasicExample,
    DividerDashedExample,
    DividerLabelExample,
    DividerLabelPlacementExample,
    DividerVerticalExample,
    DividerSpacingExample,
    DividerLabelSlotExample,
    DividerCustomStyleExample,
    DividerAdvancedThemeExample,
  ],
  templateUrl: './divider.page.html',
  selector: 'app-divider-page',
  standalone: true,
})
export class DividerDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;

  protected dashedHtml = dashedHtml;
  protected dashedTs = dashedTs;

  protected labelHtml = labelHtml;
  protected labelTs = labelTs;

  protected labelPlacementHtml = labelPlacementHtml;
  protected labelPlacementTs = labelPlacementTs;

  protected verticalHtml = verticalHtml;
  protected verticalTs = verticalTs;

  protected spacingHtml = spacingHtml;
  protected spacingTs = spacingTs;

  protected labelSlotHtml = labelSlotHtml;
  protected labelSlotTs = labelSlotTs;

  protected customStyleHtml = customStyleHtml;
  protected customStyleTs = customStyleTs;

  protected advancedThemeHtml = advancedThemeHtml;
  protected advancedThemeTs = advancedThemeTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'dashed',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Draws the line dashed instead of solid.',
    },
    {
      name: 'vertical',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Draws the divider vertically. Place it inside a flex row with a height.',
    },
    {
      name: 'label',
      type: 'string',
      defaultValue: 'null',
      description: 'Text shown in the line. Ignored when vertical is set.',
    },
    {
      name: 'label-placement',
      type: "'left' | 'center' | 'right'",
      defaultValue: "'center'",
      description: 'Position of the label along the line.',
    },
    {
      name: 'spacing',
      type: 'ScaleAttributeType',
      defaultValue: "'md'",
      description: 'Space around the divider.',
    },
    {
      name: 'container-class',
      type: 'string | object',
      defaultValue: "''",
      description: 'Class applied to the divider container.',
    },
    {
      name: 'container-style',
      type: 'object',
      defaultValue: 'null',
      description: 'Inline style for the divider container.',
    },
    {
      name: 'label-class',
      type: 'string | object',
      defaultValue: "''",
      description: 'Class applied to the label element.',
    },
    {
      name: 'label-style',
      type: 'object',
      defaultValue: 'null',
      description: 'Inline style for the label element.',
    },
    {
      name: 'divider-label-slot',
      type: 'Template Slot',
      defaultValue: '-',
      description: 'Custom label content. Replaces label.',
    },
    {
      name: 'theme tokens',
      type: 'DasarThemeDivider',
      defaultValue: '-',
      description:
        'Set through tokens.light.divider (or tokens.dark.divider) in DasarThemeService.setGlobalTheme, or [tokenConfig] on dasar-theme-provider. Example: color -> --dasar-divider-color. Full list on the Theme Tokens page.',
    },
    {
      name: 'component config',
      type: 'DasarDividerConfig',
      defaultValue: '-',
      description:
        'Defaults via components.divider in DasarComponentConfig. Full list on the Component Config page.',
    },
  ];
}
