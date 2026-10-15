import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { AlertBasicExample } from './examples/basic/alert-basic.example';
import { AlertVariantExample } from './examples/variant/alert-variant.example';
import { AlertBorderedExample } from './examples/bordered/alert-bordered.example';
import { AlertTitleExample } from './examples/title/alert-title.example';
import { AlertIconExample } from './examples/icon/alert-icon.example';
import { AlertCloseableExample } from './examples/closeable/alert-closeable.example';
import { AlertVisibleExample } from './examples/visible/alert-visible.example';
import { AlertSlotsExample } from './examples/slots/alert-slots.example';
import { AlertCustomStyleExample } from './examples/custom-style/alert-custom-style.example';
import { AlertAdvancedThemeExample } from './examples/advanced-theme/alert-advanced-theme.example';

// @ts-ignore
import basicHtml from './examples/basic/alert-basic.example.html' with { loader: 'text' };
// @ts-ignore
import basicTs from './examples/basic/alert-basic.example.ts' with { loader: 'text' };

// @ts-ignore
import variantHtml from './examples/variant/alert-variant.example.html' with { loader: 'text' };
// @ts-ignore
import variantTs from './examples/variant/alert-variant.example.ts' with { loader: 'text' };

// @ts-ignore
import borderedHtml from './examples/bordered/alert-bordered.example.html' with {
  loader: 'text',
};
// @ts-ignore
import borderedTs from './examples/bordered/alert-bordered.example.ts' with { loader: 'text' };

// @ts-ignore
import titleHtml from './examples/title/alert-title.example.html' with { loader: 'text' };
// @ts-ignore
import titleTs from './examples/title/alert-title.example.ts' with { loader: 'text' };

// @ts-ignore
import iconHtml from './examples/icon/alert-icon.example.html' with { loader: 'text' };
// @ts-ignore
import iconTs from './examples/icon/alert-icon.example.ts' with { loader: 'text' };

// @ts-ignore
import closeableHtml from './examples/closeable/alert-closeable.example.html' with {
  loader: 'text',
};
// @ts-ignore
import closeableTs from './examples/closeable/alert-closeable.example.ts' with { loader: 'text' };

// @ts-ignore
import visibleHtml from './examples/visible/alert-visible.example.html' with { loader: 'text' };
// @ts-ignore
import visibleTs from './examples/visible/alert-visible.example.ts' with { loader: 'text' };

// @ts-ignore
import slotsHtml from './examples/slots/alert-slots.example.html' with { loader: 'text' };
// @ts-ignore
import slotsTs from './examples/slots/alert-slots.example.ts' with { loader: 'text' };

// @ts-ignore
import customStyleHtml from './examples/custom-style/alert-custom-style.example.html' with {
  loader: 'text',
};
// @ts-ignore
import customStyleTs from './examples/custom-style/alert-custom-style.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import advancedThemeHtml from './examples/advanced-theme/alert-advanced-theme.example.html' with {
  loader: 'text',
};
// @ts-ignore
import advancedThemeTs from './examples/advanced-theme/alert-advanced-theme.example.ts' with {
  loader: 'text',
};

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    AlertBasicExample,
    AlertVariantExample,
    AlertBorderedExample,
    AlertTitleExample,
    AlertIconExample,
    AlertCloseableExample,
    AlertVisibleExample,
    AlertSlotsExample,
    AlertCustomStyleExample,
    AlertAdvancedThemeExample,
  ],
  templateUrl: './alert.page.html',
  selector: 'app-alert-page',
  standalone: true,
})
export class AlertDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;

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

  protected visibleHtml = visibleHtml;
  protected visibleTs = visibleTs;

  protected slotsHtml = slotsHtml;
  protected slotsTs = slotsTs;

  protected customStyleHtml = customStyleHtml;
  protected customStyleTs = customStyleTs;

  protected advancedThemeHtml = advancedThemeHtml;
  protected advancedThemeTs = advancedThemeTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger'",
      defaultValue: "'primary'",
      description: 'Color variant.',
    },
    {
      name: 'bordered',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Draws a border in the variant color.',
    },
    {
      name: 'closeable',
      type: 'boolean',
      defaultValue: 'false',
      description:
        'Shows a close button. Clicking it plays the leave animation, then hides the alert.',
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
        'Set through tokens.light.alert (or tokens.dark.alert) in DasarThemeService.setGlobalTheme, or [tokenConfig] on dasar-theme-provider. Example: dangerBg -> --alert-danger-bg. Full list on the Theme Tokens page.',
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
