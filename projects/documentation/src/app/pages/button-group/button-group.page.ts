import { getDocsContent } from '../../docs-content.generated';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { ButtonGroupBasicExample } from './examples/basic/button-group-basic.example';
import { ButtonGroupOrientationExample } from './examples/orientation/button-group-orientation.example';
import { ButtonGroupSizeExample } from './examples/size/button-group-size.example';
import { ButtonGroupVariantAppearanceExample } from './examples/variant-appearance/button-group-variant-appearance.example';
import { ButtonGroupDetachedExample } from './examples/detached/button-group-detached.example';
import { ButtonGroupIconsExample } from './examples/icons/button-group-icons.example';
import { ButtonGroupToggleExample } from './examples/toggle/button-group-toggle.example';
import { ButtonGroupFullWidthExample } from './examples/full-width/button-group-full-width.example';
import { ButtonGroupAdvancedThemeExample } from './examples/advanced-theme/button-group-advanced-theme.example';

const basicHtml = getDocsContent('projects/documentation/src/app/pages/button-group/examples/basic/button-group-basic.example.html');
const basicTs = getDocsContent('projects/documentation/src/app/pages/button-group/examples/basic/button-group-basic.example.ts');

const orientationHtml = getDocsContent('projects/documentation/src/app/pages/button-group/examples/orientation/button-group-orientation.example.html');
const orientationTs = getDocsContent('projects/documentation/src/app/pages/button-group/examples/orientation/button-group-orientation.example.ts');

const sizeHtml = getDocsContent('projects/documentation/src/app/pages/button-group/examples/size/button-group-size.example.html');
const sizeTs = getDocsContent('projects/documentation/src/app/pages/button-group/examples/size/button-group-size.example.ts');

const variantAppearanceHtml = getDocsContent('projects/documentation/src/app/pages/button-group/examples/variant-appearance/button-group-variant-appearance.example.html');
const variantAppearanceTs = getDocsContent('projects/documentation/src/app/pages/button-group/examples/variant-appearance/button-group-variant-appearance.example.ts');

const detachedHtml = getDocsContent('projects/documentation/src/app/pages/button-group/examples/detached/button-group-detached.example.html');
const detachedTs = getDocsContent('projects/documentation/src/app/pages/button-group/examples/detached/button-group-detached.example.ts');

const iconsHtml = getDocsContent('projects/documentation/src/app/pages/button-group/examples/icons/button-group-icons.example.html');
const iconsTs = getDocsContent('projects/documentation/src/app/pages/button-group/examples/icons/button-group-icons.example.ts');

const toggleHtml = getDocsContent('projects/documentation/src/app/pages/button-group/examples/toggle/button-group-toggle.example.html');
const toggleTs = getDocsContent('projects/documentation/src/app/pages/button-group/examples/toggle/button-group-toggle.example.ts');

const fullWidthHtml = getDocsContent('projects/documentation/src/app/pages/button-group/examples/full-width/button-group-full-width.example.html');
const fullWidthTs = getDocsContent('projects/documentation/src/app/pages/button-group/examples/full-width/button-group-full-width.example.ts');

const advancedThemeHtml = getDocsContent('projects/documentation/src/app/pages/button-group/examples/advanced-theme/button-group-advanced-theme.example.html');
const advancedThemeTs = getDocsContent('projects/documentation/src/app/pages/button-group/examples/advanced-theme/button-group-advanced-theme.example.ts');

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    ButtonGroupBasicExample,
    ButtonGroupOrientationExample,
    ButtonGroupSizeExample,
    ButtonGroupVariantAppearanceExample,
    ButtonGroupDetachedExample,
    ButtonGroupIconsExample,
    ButtonGroupToggleExample,
    ButtonGroupFullWidthExample,
    ButtonGroupAdvancedThemeExample,
  ],
  templateUrl: './button-group.page.html',
  selector: 'app-button-group-page',
  standalone: true,
})
export class ButtonGroupDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;

  protected orientationHtml = orientationHtml;
  protected orientationTs = orientationTs;

  protected sizeHtml = sizeHtml;
  protected sizeTs = sizeTs;

  protected variantAppearanceHtml = variantAppearanceHtml;
  protected variantAppearanceTs = variantAppearanceTs;

  protected detachedHtml = detachedHtml;
  protected detachedTs = detachedTs;

  protected iconsHtml = iconsHtml;
  protected iconsTs = iconsTs;

  protected toggleHtml = toggleHtml;
  protected toggleTs = toggleTs;

  protected fullWidthHtml = fullWidthHtml;
  protected fullWidthTs = fullWidthTs;

  protected advancedThemeHtml = advancedThemeHtml;
  protected advancedThemeTs = advancedThemeTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      defaultValue: "'horizontal'",
      description: 'Direction the buttons are laid out in.',
    },
    {
      name: 'attached',
      type: 'boolean',
      defaultValue: 'true',
      description:
        'Joins the buttons with shared borders. When false, the buttons are spaced apart with the gap token.',
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      defaultValue: 'null',
      description: 'Overrides the size of every button in the group. Null keeps each button size.',
    },
    {
      name: 'variant',
      type: 'DasarButtonVariantType',
      defaultValue: 'null',
      description:
        'Overrides the variant of every button in the group. Null keeps each button variant.',
    },
    {
      name: 'appearance',
      type: "'solid' | 'subtle' | 'outline' | 'elevated'",
      defaultValue: 'null',
      description:
        'Overrides the appearance of every button in the group. Null keeps each button appearance.',
    },
    {
      name: 'radius',
      type: 'ScaleAttributeType',
      defaultValue: "'md'",
      description: 'Corner radius of the outer corners when attached.',
    },
    {
      name: 'full-width',
      type: 'boolean',
      defaultValue: 'false',
      description:
        'Stretches the group to the container width. Horizontal buttons share the width equally.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Disables every button in the group.',
    },
    {
      name: 'container-class',
      type: 'string | object',
      defaultValue: "''",
      description: 'Class applied to the group container.',
    },
    {
      name: 'container-style',
      type: 'object',
      defaultValue: 'null',
      description: 'Inline style for the group container.',
    },
    {
      name: 'default slot',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'The grouped content. dasar-button elements are the usual children.',
    },
    {
      name: 'theme tokens',
      type: 'DasarThemeButtonGroup',
      defaultValue: '-',
      description:
        'Set through tokens.light.buttonGroup (or tokens.dark.buttonGroup) in DasarThemeService.setGlobalTheme, or [tokenConfig] on dasar-theme-provider. Example: gap -> --dasar-btn-group-gap.',
    },
    {
      name: 'component config',
      type: 'DasarButtonGroupConfig',
      defaultValue: '-',
      description: 'Defaults via components.buttonGroup in DasarComponentConfig.',
    },
  ];
}
