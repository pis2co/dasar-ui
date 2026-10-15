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

// @ts-ignore
import basicHtml from './examples/basic/divider-basic.example.html' with { loader: 'text' };
// @ts-ignore
import basicTs from './examples/basic/divider-basic.example.ts' with { loader: 'text' };

// @ts-ignore
import dashedHtml from './examples/dashed/divider-dashed.example.html' with { loader: 'text' };
// @ts-ignore
import dashedTs from './examples/dashed/divider-dashed.example.ts' with { loader: 'text' };

// @ts-ignore
import labelHtml from './examples/label/divider-label.example.html' with { loader: 'text' };
// @ts-ignore
import labelTs from './examples/label/divider-label.example.ts' with { loader: 'text' };

// @ts-ignore
import labelPlacementHtml from './examples/label-placement/divider-label-placement.example.html' with {
  loader: 'text',
};
// @ts-ignore
import labelPlacementTs from './examples/label-placement/divider-label-placement.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import verticalHtml from './examples/vertical/divider-vertical.example.html' with {
  loader: 'text',
};
// @ts-ignore
import verticalTs from './examples/vertical/divider-vertical.example.ts' with { loader: 'text' };

// @ts-ignore
import spacingHtml from './examples/spacing/divider-spacing.example.html' with { loader: 'text' };
// @ts-ignore
import spacingTs from './examples/spacing/divider-spacing.example.ts' with { loader: 'text' };

// @ts-ignore
import labelSlotHtml from './examples/label-slot/divider-label-slot.example.html' with {
  loader: 'text',
};
// @ts-ignore
import labelSlotTs from './examples/label-slot/divider-label-slot.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import customStyleHtml from './examples/custom-style/divider-custom-style.example.html' with {
  loader: 'text',
};
// @ts-ignore
import customStyleTs from './examples/custom-style/divider-custom-style.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import advancedThemeHtml from './examples/advanced-theme/divider-advanced-theme.example.html' with {
  loader: 'text',
};
// @ts-ignore
import advancedThemeTs from './examples/advanced-theme/divider-advanced-theme.example.ts' with {
  loader: 'text',
};

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
        'Set through tokens.light.divider (or tokens.dark.divider) in DasarThemeService.setGlobalTheme, or [tokenConfig] on dasar-theme-provider. Example: color -> --divider-color. Full list on the Theme Tokens page.',
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
