import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { ModalBasicExample } from './examples/basic/modal-basic.example';
import { ModalSizeExample } from './examples/size/modal-size.example';
import { ModalAppearanceExample } from './examples/appearance/modal-appearance.example';
import { ModalRadiusSpacingExample } from './examples/radius-spacing/modal-radius-spacing.example';
import { ModalWidthExample } from './examples/width/modal-width.example';
import { ModalSlotsExample } from './examples/slots/modal-slots.example';
import { ModalScrollExample } from './examples/scroll/modal-scroll.example';
import { ModalCloseBehaviorExample } from './examples/close-behavior/modal-close-behavior.example';
import { ModalOverlayExample } from './examples/overlay/modal-overlay.example';
import { ModalCustomStyleExample } from './examples/custom-style/modal-custom-style.example';

// @ts-ignore
import basicHtml from './examples/basic/modal-basic.example.html' with { loader: 'text' };
// @ts-ignore
import basicTs from './examples/basic/modal-basic.example.ts' with { loader: 'text' };
// @ts-ignore
import sizeHtml from './examples/size/modal-size.example.html' with { loader: 'text' };
// @ts-ignore
import sizeTs from './examples/size/modal-size.example.ts' with { loader: 'text' };
// @ts-ignore
import appearanceHtml from './examples/appearance/modal-appearance.example.html' with {
  loader: 'text',
};
// @ts-ignore
import appearanceTs from './examples/appearance/modal-appearance.example.ts' with {
  loader: 'text',
};
// @ts-ignore
import radiusSpacingHtml from './examples/radius-spacing/modal-radius-spacing.example.html' with {
  loader: 'text',
};
// @ts-ignore
import radiusSpacingTs from './examples/radius-spacing/modal-radius-spacing.example.ts' with {
  loader: 'text',
};
// @ts-ignore
import widthHtml from './examples/width/modal-width.example.html' with { loader: 'text' };
// @ts-ignore
import widthTs from './examples/width/modal-width.example.ts' with { loader: 'text' };
// @ts-ignore
import slotsHtml from './examples/slots/modal-slots.example.html' with { loader: 'text' };
// @ts-ignore
import slotsTs from './examples/slots/modal-slots.example.ts' with { loader: 'text' };
// @ts-ignore
import scrollHtml from './examples/scroll/modal-scroll.example.html' with { loader: 'text' };
// @ts-ignore
import scrollTs from './examples/scroll/modal-scroll.example.ts' with { loader: 'text' };
// @ts-ignore
import closeBehaviorHtml from './examples/close-behavior/modal-close-behavior.example.html' with {
  loader: 'text',
};
// @ts-ignore
import closeBehaviorTs from './examples/close-behavior/modal-close-behavior.example.ts' with {
  loader: 'text',
};
// @ts-ignore
import overlayHtml from './examples/overlay/modal-overlay.example.html' with { loader: 'text' };
// @ts-ignore
import overlayTs from './examples/overlay/modal-overlay.example.ts' with { loader: 'text' };
// @ts-ignore
import customStyleHtml from './examples/custom-style/modal-custom-style.example.html' with {
  loader: 'text',
};
// @ts-ignore
import customStyleTs from './examples/custom-style/modal-custom-style.example.ts' with {
  loader: 'text',
};

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    ModalBasicExample,
    ModalSizeExample,
    ModalAppearanceExample,
    ModalRadiusSpacingExample,
    ModalWidthExample,
    ModalSlotsExample,
    ModalScrollExample,
    ModalCloseBehaviorExample,
    ModalOverlayExample,
    ModalCustomStyleExample,
  ],
  templateUrl: './modal.page.html',
  selector: 'app-modal-page',
  standalone: true,
})
export class ModalDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;

  protected sizeHtml = sizeHtml;
  protected sizeTs = sizeTs;

  protected appearanceHtml = appearanceHtml;
  protected appearanceTs = appearanceTs;

  protected radiusSpacingHtml = radiusSpacingHtml;
  protected radiusSpacingTs = radiusSpacingTs;

  protected widthHtml = widthHtml;
  protected widthTs = widthTs;

  protected slotsHtml = slotsHtml;
  protected slotsTs = slotsTs;

  protected scrollHtml = scrollHtml;
  protected scrollTs = scrollTs;

  protected closeBehaviorHtml = closeBehaviorHtml;
  protected closeBehaviorTs = closeBehaviorTs;

  protected overlayHtml = overlayHtml;
  protected overlayTs = overlayTs;

  protected customStyleHtml = customStyleHtml;
  protected customStyleTs = customStyleTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'open',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Shows the modal. The component never closes itself, the consumer controls it.',
    },
    {
      name: 'label',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Sets a simple string title for the header. Replaced by the [header-slot].',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Width preset and typographic scale: sm 400px, md 560px, lg 800px.',
    },
    {
      name: 'appearance',
      type: "'outline' | 'borderless' | 'elevated'",
      defaultValue: "'elevated'",
      description: 'Defines the structural border and shadow style of the modal.',
    },
    {
      name: 'radius',
      type: 'ScaleAttributeType',
      defaultValue: "'lg'",
      description: 'Sets the border radius of the modal.',
    },
    {
      name: 'spacing',
      type: "'normal' | 'compact'",
      defaultValue: "'normal'",
      description: 'Controls the inner padding scale of the header, body and actions.',
    },
    {
      name: 'width',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Sets an explicit width and overrides the preset coming from size.',
    },
    {
      name: 'full-width',
      type: 'boolean',
      defaultValue: 'false',
      description:
        'Stretches the modal to the viewport minus the overlay padding. Wins over width.',
    },
    {
      name: 'closable',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Displays the default dismiss button in the header.',
    },
    {
      name: 'close-on-overlay',
      type: 'boolean',
      defaultValue: 'true',
      description: 'A click on the backdrop emits (onClose).',
    },
    {
      name: 'close-on-escape',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Pressing Escape emits (onClose).',
    },
    {
      name: 'overlay-blur',
      type: 'string | null',
      defaultValue: 'null',
      description:
        'Backdrop blur radius, forwarded to the underlying dasar-overlay. Falls back to the --overlay-blur theme token, then 4px.',
    },
    {
      name: 'overlay-background',
      type: 'string | null',
      defaultValue: 'null',
      description:
        'Backdrop color, forwarded to the underlying dasar-overlay. Falls back to the --overlay-background theme token, then rgba(0, 0, 0, 0.45).',
    },
    {
      name: 'fluid / ...-fluid',
      type: 'boolean',
      defaultValue: 'false',
      description:
        'Removes padding from a single section using header-fluid, body-fluid or action-fluid.',
    },
    {
      name: '...-style',
      type: 'object',
      defaultValue: 'null',
      description: 'Inline style injection for container, header, close, body and actions.',
    },
    {
      name: '...-class',
      type: 'string | object',
      defaultValue: 'null',
      description: 'Class injection for container, header, close, body and actions.',
    },
    {
      name: '(onClose)',
      type: 'EventEmitter<void>',
      defaultValue: '-',
      description:
        'Emitted when the close button, the backdrop or Escape is used. Set open to false in the handler.',
    },
    {
      name: '[header-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Replaces the default label with custom HTML content.',
    },
    {
      name: '[close-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Replaces the default dismiss button with a custom element.',
    },
    {
      name: '[action-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description:
        'Injects footer action elements. The actions stay visible while the body scrolls.',
    },
    {
      name: 'theme tokens',
      type: 'DasarThemeModal',
      defaultValue: '-',
      description:
        'Set through tokens.light.modal (or tokens.dark.modal) in DasarThemeService.setGlobalTheme, or [tokenConfig] on dasar-theme-provider. Each key writes one CSS variable, for example widthMd -> --modal-width-md.',
    },
    {
      name: 'default slot',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'The modal body. Scrolls on its own when the content exceeds the viewport.',
    },
  ];
}
