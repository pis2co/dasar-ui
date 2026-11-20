import { getDocsContent } from '../../docs-content.generated';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { AlertBasicExample } from './examples/basic/alert-basic.example';
import { AlertAppearanceExample } from './examples/appearance/alert-appearance.example';
import { AlertVariantExample } from './examples/variant/alert-variant.example';
import { AlertBorderedExample } from './examples/bordered/alert-bordered.example';
import { AlertTitleExample } from './examples/title/alert-title.example';
import { AlertIconExample } from './examples/icon/alert-icon.example';
import { AlertCloseableExample } from './examples/closeable/alert-closeable.example';
import { AlertCloseSlotExample } from './examples/close-slot/alert-close-slot.example';
import { AlertVisibleExample } from './examples/visible/alert-visible.example';
import { AlertSlotsExample } from './examples/slots/alert-slots.example';
import { AlertCustomStyleExample } from './examples/custom-style/alert-custom-style.example';
import { AlertAdvancedThemeExample } from './examples/advanced-theme/alert-advanced-theme.example';
import { AlertRadiusExample } from './examples/radius/alert-radius.example';
import { AlertRadiusThemeExample } from './examples/radius-theme/alert-radius-theme.example';

const basicHtml = getDocsContent('projects/documentation/src/app/pages/alert/examples/basic/alert-basic.example.html');
const basicTs = getDocsContent('projects/documentation/src/app/pages/alert/examples/basic/alert-basic.example.ts');

const appearanceHtml = getDocsContent('projects/documentation/src/app/pages/alert/examples/appearance/alert-appearance.example.html');
const appearanceTs = getDocsContent('projects/documentation/src/app/pages/alert/examples/appearance/alert-appearance.example.ts');

const variantHtml = getDocsContent('projects/documentation/src/app/pages/alert/examples/variant/alert-variant.example.html');
const variantTs = getDocsContent('projects/documentation/src/app/pages/alert/examples/variant/alert-variant.example.ts');

const borderedHtml = getDocsContent('projects/documentation/src/app/pages/alert/examples/bordered/alert-bordered.example.html');
const borderedTs = getDocsContent('projects/documentation/src/app/pages/alert/examples/bordered/alert-bordered.example.ts');

const titleHtml = getDocsContent('projects/documentation/src/app/pages/alert/examples/title/alert-title.example.html');
const titleTs = getDocsContent('projects/documentation/src/app/pages/alert/examples/title/alert-title.example.ts');

const iconHtml = getDocsContent('projects/documentation/src/app/pages/alert/examples/icon/alert-icon.example.html');
const iconTs = getDocsContent('projects/documentation/src/app/pages/alert/examples/icon/alert-icon.example.ts');

const closeableHtml = getDocsContent('projects/documentation/src/app/pages/alert/examples/closeable/alert-closeable.example.html');
const closeableTs = getDocsContent('projects/documentation/src/app/pages/alert/examples/closeable/alert-closeable.example.ts');

const closeSlotHtml = getDocsContent('projects/documentation/src/app/pages/alert/examples/close-slot/alert-close-slot.example.html');
const closeSlotTs = getDocsContent('projects/documentation/src/app/pages/alert/examples/close-slot/alert-close-slot.example.ts');
const visibleHtml = getDocsContent('projects/documentation/src/app/pages/alert/examples/visible/alert-visible.example.html');
const visibleTs = getDocsContent('projects/documentation/src/app/pages/alert/examples/visible/alert-visible.example.ts');

const slotsHtml = getDocsContent('projects/documentation/src/app/pages/alert/examples/slots/alert-slots.example.html');
const slotsTs = getDocsContent('projects/documentation/src/app/pages/alert/examples/slots/alert-slots.example.ts');

const customStyleHtml = getDocsContent('projects/documentation/src/app/pages/alert/examples/custom-style/alert-custom-style.example.html');
const customStyleTs = getDocsContent('projects/documentation/src/app/pages/alert/examples/custom-style/alert-custom-style.example.ts');

const advancedThemeHtml = getDocsContent('projects/documentation/src/app/pages/alert/examples/advanced-theme/alert-advanced-theme.example.html');
const advancedThemeTs = getDocsContent('projects/documentation/src/app/pages/alert/examples/advanced-theme/alert-advanced-theme.example.ts');

const radiusHtml = getDocsContent('projects/documentation/src/app/pages/alert/examples/radius/alert-radius.example.html');
const radiusTs = getDocsContent('projects/documentation/src/app/pages/alert/examples/radius/alert-radius.example.ts');

const radiusThemeHtml = getDocsContent('projects/documentation/src/app/pages/alert/examples/radius-theme/alert-radius-theme.example.html');
const radiusThemeTs = getDocsContent('projects/documentation/src/app/pages/alert/examples/radius-theme/alert-radius-theme.example.ts');

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    AlertBasicExample,
    AlertAppearanceExample,
    AlertVariantExample,
    AlertBorderedExample,
    AlertTitleExample,
    AlertIconExample,
    AlertCloseableExample,
    AlertVisibleExample,
    AlertCloseSlotExample,
    AlertSlotsExample,
    AlertCustomStyleExample,
    AlertAdvancedThemeExample,
    AlertRadiusExample,
    AlertRadiusThemeExample,
  ],
  templateUrl: './alert.page.html',
  selector: 'app-alert-page',
  standalone: true,
})
export class AlertDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;

  protected appearanceHtml = appearanceHtml;
  protected appearanceTs = appearanceTs;

  protected variantHtml = variantHtml;
  protected variantTs = variantTs;

  protected borderedHtml = borderedHtml;
  protected borderedTs = borderedTs;

  protected titleHtml = titleHtml;
  protected titleTs = titleTs;

  protected iconHtml = iconHtml;
  protected iconTs = iconTs;

  protected closeableHtml = closeableHtml;
  protected closeableTs = closeableTs;

  protected closeSlotHtml = closeSlotHtml;
  protected closeSlotTs = closeSlotTs;

  protected visibleHtml = visibleHtml;
  protected visibleTs = visibleTs;

  protected slotsHtml = slotsHtml;
  protected slotsTs = slotsTs;

  protected customStyleHtml = customStyleHtml;
  protected customStyleTs = customStyleTs;

  protected advancedThemeHtml = advancedThemeHtml;
  protected advancedThemeTs = advancedThemeTs;

  protected radiusHtml = radiusHtml;
  protected radiusTs = radiusTs;

  protected radiusThemeHtml = radiusThemeHtml;
  protected radiusThemeTs = radiusThemeTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger'",
      defaultValue: "'primary'",
      description: 'Color variant.',
    },
    {
      name: 'appearance',
      type: "'outline' | 'borderless' | 'elevated'",
      defaultValue: "'outline'",
      description: 'Visual style of the alert container.',
    },
    {
      name: 'bordered',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Draws a border in the variant color.',
    },
    {
      name: 'radius',
      type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'",
      defaultValue: "'md'",
      description: 'Corner radius of the container. Default via components.alert.radius.',
    },
    {
      name: 'closeable',
      type: 'boolean',
      defaultValue: 'false',
      description:
        'Shows the default ghost close button. Clicking it plays the leave animation, then hides the alert.',
    },
    {
      name: '[(visible)]',
      type: 'boolean',
      defaultValue: 'true',
      description:
        'Shows or hides the alert. Closing sets it to false; setting it to true shows the alert again. Setting it to false hides immediately, without animation or events.',
    },
    {
      name: 'title',
      type: 'string',
      defaultValue: 'null',
      description: 'Bold heading above the content. Replaced by header-slot.',
    },
    {
      name: 'icon-name',
      type: 'string',
      defaultValue: 'null',
      description: 'Leading icon. Nothing is shown when empty. Replaced by icon-slot.',
    },
    {
      name: 'close-icon-name',
      type: 'string',
      defaultValue: "'x'",
      description: 'Icon of the close button.',
    },
    {
      name: 'container-class',
      type: 'string | object',
      defaultValue: "''",
      description: 'Class applied to the alert container.',
    },
    {
      name: 'container-style',
      type: 'object',
      defaultValue: 'null',
      description: 'Inline style for the alert container.',
    },
    {
      name: 'title-class',
      type: 'string | object',
      defaultValue: "''",
      description: 'Class applied to the title.',
    },
    {
      name: 'title-style',
      type: 'object',
      defaultValue: 'null',
      description: 'Inline style for the title.',
    },
    {
      name: 'content-class',
      type: 'string | object',
      defaultValue: "''",
      description: 'Class applied to the content.',
    },
    {
      name: 'content-style',
      type: 'object',
      defaultValue: 'null',
      description: 'Inline style for the content.',
    },
    {
      name: '[closeable-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description:
        'Replaces the default close button with custom content. It shows even when closeable is false. Close the alert yourself with [(visible)].',
    },
    {
      name: '(onClose)',
      type: 'EventEmitter<MouseEvent>',
      defaultValue: '-',
      description: 'Fires when the close button is clicked, before the leave animation.',
    },
    {
      name: '(onAfterLeave)',
      type: 'EventEmitter<void>',
      defaultValue: '-',
      description: 'Fires once after the leave animation ends and the alert is hidden.',
    },
    {
      name: '(visibleChange)',
      type: 'EventEmitter<boolean>',
      defaultValue: '-',
      description: 'Fires with false after the alert closes. Used by [(visible)].',
    },
    {
      name: 'default slot',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Alert message.',
    },
    {
      name: 'header-slot',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Custom header. Replaces title.',
    },
    {
      name: 'icon-slot',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Custom leading icon. Replaces icon-name.',
    },
    {
      name: 'theme tokens',
      type: 'DasarThemeAlert',
      defaultValue: '-',
      description:
        'Set through tokens.light.alert (or tokens.dark.alert) in DasarThemeService.setGlobalTheme, or [tokenConfig] on dasar-theme-provider. Example: dangerBg -> --dasar-alert-danger-bg. Full list on the Theme Tokens page.',
    },
    {
      name: 'component config',
      type: 'DasarAlertConfig',
      defaultValue: '-',
      description:
        'Defaults via components.alert in DasarComponentConfig. Full list on the Component Config page.',
    },
  ];
}
