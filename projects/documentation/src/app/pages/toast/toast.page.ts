import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { ToastBasicExample } from './examples/basic/toast-basic.example';
import { ToastVariantsExample } from './examples/variants/toast-variants.example';
import { ToastActionExample } from './examples/action/toast-action.example';
import { ToastLinkExample } from './examples/link/toast-link.example';
import { ToastDurationExample } from './examples/duration/toast-duration.example';
import { ToastEventsExample } from './examples/events/toast-events.example';
import { ToastControlExample } from './examples/control/toast-control.example';
import { ToastPlacementExample } from './examples/placement/toast-placement.example';
import { ToastMaxExample } from './examples/max/toast-max.example';
import { ToastScrollableExample } from './examples/scrollable/toast-scrollable.example';
import { ToastBlurExample } from './examples/blur/toast-blur.example';
import { ToastSlotsExample } from './examples/slots/toast-slots.example';

// @ts-ignore
import basicHtml from './examples/basic/toast-basic.example.html' with { loader: 'text' };
// @ts-ignore
import basicTs from './examples/basic/toast-basic.example.ts' with { loader: 'text' };
// @ts-ignore
import variantsHtml from './examples/variants/toast-variants.example.html' with { loader: 'text' };
// @ts-ignore
import variantsTs from './examples/variants/toast-variants.example.ts' with { loader: 'text' };
// @ts-ignore
import actionHtml from './examples/action/toast-action.example.html' with { loader: 'text' };
// @ts-ignore
import actionTs from './examples/action/toast-action.example.ts' with { loader: 'text' };
// @ts-ignore
import linkHtml from './examples/link/toast-link.example.html' with { loader: 'text' };
// @ts-ignore
import linkTs from './examples/link/toast-link.example.ts' with { loader: 'text' };
// @ts-ignore
import durationHtml from './examples/duration/toast-duration.example.html' with { loader: 'text' };
// @ts-ignore
import durationTs from './examples/duration/toast-duration.example.ts' with { loader: 'text' };
// @ts-ignore
import eventsHtml from './examples/events/toast-events.example.html' with { loader: 'text' };
// @ts-ignore
import eventsTs from './examples/events/toast-events.example.ts' with { loader: 'text' };
// @ts-ignore
import controlHtml from './examples/control/toast-control.example.html' with { loader: 'text' };
// @ts-ignore
import controlTs from './examples/control/toast-control.example.ts' with { loader: 'text' };
// @ts-ignore
import placementHtml from './examples/placement/toast-placement.example.html' with {
  loader: 'text',
};
// @ts-ignore
import placementTs from './examples/placement/toast-placement.example.ts' with { loader: 'text' };
// @ts-ignore
import maxHtml from './examples/max/toast-max.example.html' with { loader: 'text' };
// @ts-ignore
import maxTs from './examples/max/toast-max.example.ts' with { loader: 'text' };
// @ts-ignore
import scrollableHtml from './examples/scrollable/toast-scrollable.example.html' with {
  loader: 'text',
};
// @ts-ignore
import scrollableTs from './examples/scrollable/toast-scrollable.example.ts' with {
  loader: 'text',
};
// @ts-ignore
import blurHtml from './examples/blur/toast-blur.example.html' with { loader: 'text' };
// @ts-ignore
import blurTs from './examples/blur/toast-blur.example.ts' with { loader: 'text' };
// @ts-ignore
import slotsHtml from './examples/slots/toast-slots.example.html' with { loader: 'text' };
// @ts-ignore
import slotsTs from './examples/slots/toast-slots.example.ts' with { loader: 'text' };

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    ToastBasicExample,
    ToastVariantsExample,
    ToastActionExample,
    ToastLinkExample,
    ToastDurationExample,
    ToastEventsExample,
    ToastControlExample,
    ToastPlacementExample,
    ToastMaxExample,
    ToastScrollableExample,
    ToastBlurExample,
    ToastSlotsExample,
  ],
  templateUrl: './toast.page.html',
  selector: 'app-toast-page',
  standalone: true,
})
export class ToastDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;

  protected variantsHtml = variantsHtml;
  protected variantsTs = variantsTs;

  protected actionHtml = actionHtml;
  protected actionTs = actionTs;

  protected linkHtml = linkHtml;
  protected linkTs = linkTs;

  protected durationHtml = durationHtml;
  protected durationTs = durationTs;

  protected eventsHtml = eventsHtml;
  protected eventsTs = eventsTs;

  protected controlHtml = controlHtml;
  protected controlTs = controlTs;

  protected placementHtml = placementHtml;
  protected placementTs = placementTs;

  protected maxHtml = maxHtml;
  protected maxTs = maxTs;

  protected scrollableHtml = scrollableHtml;
  protected scrollableTs = scrollableTs;

  protected blurHtml = blurHtml;
  protected blurTs = blurTs;

  protected slotsHtml = slotsHtml;
  protected slotsTs = slotsTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'DasarToastService.create(options)',
      type: 'DasarToastRef',
      defaultValue: '-',
      description:
        'Creates a toast and returns a ref with id, close() and update(options). Inject the service in any component inside a dasar-toast-provider.',
    },
    {
      name: 'DasarToastService.destroy(refOrId)',
      type: 'void',
      defaultValue: '-',
      description: 'Closes one specific toast.',
    },
    {
      name: 'DasarToastService.destroyEverything()',
      type: 'void',
      defaultValue: '-',
      description: 'Closes every toast, including queued ones.',
    },
    {
      name: 'options.label',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Title in the top row.',
    },
    {
      name: 'options.caption',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Muted line under the label.',
    },
    {
      name: 'options.description',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Body text below the header.',
    },
    {
      name: 'options.content',
      type: 'string | TemplateRef<DasarToastContext>',
      defaultValue: 'undefined',
      description:
        'Free area below. A template gets the toast and a close function in its context.',
    },
    {
      name: 'options.duration',
      type: 'number',
      defaultValue: '4000',
      description: 'Milliseconds before the toast closes. Use 0 to keep it open.',
    },
    {
      name: 'options.closeable',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Shows the close button.',
    },
    {
      name: 'options.icon',
      type: 'string',
      defaultValue: 'undefined',
      description: 'dasar-icon name shown on the left of the top row.',
    },
    {
      name: 'options.to',
      type: 'string',
      defaultValue: 'undefined',
      description:
        'Makes the label and caption a link. Internal paths use DASAR_TOAST_NAVIGATOR when it is provided.',
    },
    {
      name: 'options.variant',
      type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger'",
      defaultValue: "'secondary'",
      description: 'Colors the icon and the close button.',
    },
    {
      name: 'options.aliveOnHover',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Pauses the countdown while the toast is hovered or focused.',
    },
    {
      name: 'options.onEnter',
      type: '(ref) => void',
      defaultValue: '-',
      description: 'Called after the enter animation.',
    },
    {
      name: 'options.onClose',
      type: "(ref, reason: 'button' | 'timeout' | 'destroy') => void",
      defaultValue: '-',
      description: 'Called when closing starts.',
    },
    {
      name: 'options.onLeave',
      type: '(ref) => void',
      defaultValue: '-',
      description: 'Called after the leave animation, when the toast is removed.',
    },
    {
      name: 'max',
      type: 'number',
      defaultValue: '5',
      description: 'Provider input. Number of toasts shown at once, the rest are queued.',
    },
    {
      name: 'placement',
      type: "'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right'",
      defaultValue: "'bottom-right'",
      description: 'Provider input. Where the toasts live.',
    },
    {
      name: 'scrollable',
      type: 'boolean',
      defaultValue: 'false',
      description:
        'Provider input. Keeps the stack expanded and scrolls it when it is taller than the viewport.',
    },
    {
      name: 'blur',
      type: 'string',
      defaultValue: 'null',
      description: 'Provider input. Backdrop blur radius that covers only the box of each toast.',
    },
    {
      name: 'container-class / container-style',
      type: 'ClassType / StyleType',
      defaultValue: '-',
      description: 'Provider input. Class and inline style for the toast container.',
    },
    {
      name: '[label-slot] / [caption-slot] / [content-slot]',
      type: 'ng-template',
      defaultValue: '-',
      description:
        'Replace that part of every toast. Context: $implicit and toast (the item) and close().',
    },
    {
      name: '[closeable-slot]',
      type: 'ng-template',
      defaultValue: '-',
      description: 'Replaces the close button. closable-slot is accepted as an alias.',
    },
    {
      name: 'DASAR_TOAST_NAVIGATOR',
      type: 'InjectionToken<(to: string) => void>',
      defaultValue: '-',
      description:
        'Optional handler for internal links, for example (to) => router.navigateByUrl(to).',
    },
    {
      name: 'theme tokens',
      type: 'DasarThemeToast',
      defaultValue: '-',
      description:
        'Set through tokens.light.toast (or tokens.dark.toast). Each key writes one CSS variable, for example width -> --dasar-toast-width.',
    },
  ];
}
