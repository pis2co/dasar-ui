import { getDocsContent } from '../../docs-content.generated';
import { DocsLayoutComponent, DocNavGroup, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ButtonAppearanceExample } from './examples/appearance/button-appearance.example';
import { ButtonVariantExample } from './examples/variant/button-variant.example';
import { ButtonRadiusExample } from './examples/radius/button-radius.example';
import { ButtonSizesExample } from './examples/sizes/button-sizes.example';
import { ButtonStateExample } from './examples/state/button-state.example';
import { ButtonIconExample } from './examples/icon/button-icon.example';
import { ButtonPressedExample } from './examples/pressed/button-pressed.example';

// @ts-ignore - raw example
const variantHtml = getDocsContent('projects/documentation/src/app/pages/button/examples/variant/button-variant.example.html');
// @ts-ignore - raw example
const variantTs = getDocsContent('projects/documentation/src/app/pages/button/examples/variant/button-variant.example.ts');
// @ts-ignore - raw example
const appearanceHtml = getDocsContent('projects/documentation/src/app/pages/button/examples/appearance/button-appearance.example.html');
// @ts-ignore - raw example
const appearanceTs = getDocsContent('projects/documentation/src/app/pages/button/examples/appearance/button-appearance.example.ts');
// @ts-ignore - raw example
const sizesHtml = getDocsContent('projects/documentation/src/app/pages/button/examples/sizes/button-sizes.example.html');
// @ts-ignore - raw example
const sizesTs = getDocsContent('projects/documentation/src/app/pages/button/examples/sizes/button-sizes.example.ts');
// @ts-ignore - raw example
const radiusHtml = getDocsContent('projects/documentation/src/app/pages/button/examples/radius/button-radius.example.html');
// @ts-ignore - raw example
const radiusTs = getDocsContent('projects/documentation/src/app/pages/button/examples/radius/button-radius.example.ts');
// @ts-ignore - raw example
const iconHtml = getDocsContent('projects/documentation/src/app/pages/button/examples/icon/button-icon.example.html');
// @ts-ignore - raw example
const iconTs = getDocsContent('projects/documentation/src/app/pages/button/examples/icon/button-icon.example.ts');
// @ts-ignore - raw example
const stateHtml = getDocsContent('projects/documentation/src/app/pages/button/examples/state/button-state.example.html');
// @ts-ignore - raw example
const stateTs = getDocsContent('projects/documentation/src/app/pages/button/examples/state/button-state.example.ts');
// @ts-ignore - raw example
const pressedHtml = getDocsContent('projects/documentation/src/app/pages/button/examples/pressed/button-pressed.example.html');
// @ts-ignore - raw example
const pressedTs = getDocsContent('projects/documentation/src/app/pages/button/examples/pressed/button-pressed.example.ts');

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    ButtonVariantExample,
    ButtonAppearanceExample,
    ButtonSizesExample,
    ButtonRadiusExample,
    ButtonIconExample,
    ButtonStateExample,
    ButtonPressedExample,
  ],
  templateUrl: './button.page.html',
  selector: 'app-button-page',
  standalone: true,
})
export class ButtonDocPage {
  protected variantHtml = variantHtml;
  protected variantTs = variantTs;
  protected appearanceHtml = appearanceHtml;
  protected appearanceTs = appearanceTs;
  protected sizesHtml = sizesHtml;
  protected sizesTs = sizesTs;
  protected radiusHtml = radiusHtml;
  protected radiusTs = radiusTs;
  protected iconHtml = iconHtml;
  protected iconTs = iconTs;
  protected stateHtml = stateHtml;
  protected stateTs = stateTs;
  protected pressedHtml = pressedHtml;
  protected pressedTs = pressedTs;
  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'variant',
      type: "'primary' | 'success' | 'warning' | 'danger' | 'secondary' | 'ghost'",
      defaultValue: "'primary'",
      description: 'Defines the semantic color intent of the button.',
    },
    {
      name: 'appearance',
      type: "'solid' | 'subtle' | 'outline' | 'elevated' | 'pressed'",
      defaultValue: "'solid'",
      description: 'Defines the fill, border, elevation, or animated pressed interaction style.',
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Controls the button size, scaling padding and typography proportionally.',
    },
    {
      name: 'radius',
      type: 'ScaleAttributeType',
      defaultValue: "'md'",
      description: 'Sets the border radius curve of the button.',
    },
    {
      name: 'type',
      type: "'button' | 'submit' | 'reset'",
      defaultValue: "'button'",
      description: 'Standard native HTML button type attribute.',
    },
    {
      name: 'fluid',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Expands the button to fill the full width of its container.',
    },
    {
      name: 'full-width',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Applies full-width layout constraints to the button host element.',
    },
    {
      name: 'icon-only',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Optimizes padding and layout for buttons containing only an icon.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Disables user interaction and applies a muted visual state.',
    },
    {
      name: 'button-style',
      type: 'StyleType',
      defaultValue: 'null',
      description: 'Allows passing custom inline styles directly to the button element.',
    },
    {
      name: 'button-class',
      type: 'ClassType',
      defaultValue: 'null',
      description: 'Allows passing custom CSS classes to override or extend styles.',
    },
  ];
}
