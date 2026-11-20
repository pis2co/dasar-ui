import { getDocsContent } from '../../docs-content.generated';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { ToastBasicExample } from './examples/basic/toast-basic.example';
import { ToastVariantsExample } from './examples/variants/toast-variants.example';
import { ToastAppearanceExample } from './examples/appearance/toast-appearance.example';
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

const basicHtml = getDocsContent('projects/documentation/src/app/pages/toast/examples/basic/toast-basic.example.html');
const basicTs = getDocsContent('projects/documentation/src/app/pages/toast/examples/basic/toast-basic.example.ts');
const variantsHtml = getDocsContent('projects/documentation/src/app/pages/toast/examples/variants/toast-variants.example.html');
const variantsTs = getDocsContent('projects/documentation/src/app/pages/toast/examples/variants/toast-variants.example.ts');
const appearanceHtml = getDocsContent('projects/documentation/src/app/pages/toast/examples/appearance/toast-appearance.example.html');
const appearanceTs = getDocsContent('projects/documentation/src/app/pages/toast/examples/appearance/toast-appearance.example.ts');
const actionHtml = getDocsContent('projects/documentation/src/app/pages/toast/examples/action/toast-action.example.html');
const actionTs = getDocsContent('projects/documentation/src/app/pages/toast/examples/action/toast-action.example.ts');
const linkHtml = getDocsContent('projects/documentation/src/app/pages/toast/examples/link/toast-link.example.html');
const linkTs = getDocsContent('projects/documentation/src/app/pages/toast/examples/link/toast-link.example.ts');
const durationHtml = getDocsContent('projects/documentation/src/app/pages/toast/examples/duration/toast-duration.example.html');
const durationTs = getDocsContent('projects/documentation/src/app/pages/toast/examples/duration/toast-duration.example.ts');
const eventsHtml = getDocsContent('projects/documentation/src/app/pages/toast/examples/events/toast-events.example.html');
const eventsTs = getDocsContent('projects/documentation/src/app/pages/toast/examples/events/toast-events.example.ts');
const controlHtml = getDocsContent('projects/documentation/src/app/pages/toast/examples/control/toast-control.example.html');
const controlTs = getDocsContent('projects/documentation/src/app/pages/toast/examples/control/toast-control.example.ts');
const placementHtml = getDocsContent('projects/documentation/src/app/pages/toast/examples/placement/toast-placement.example.html');
const placementTs = getDocsContent('projects/documentation/src/app/pages/toast/examples/placement/toast-placement.example.ts');
const maxHtml = getDocsContent('projects/documentation/src/app/pages/toast/examples/max/toast-max.example.html');
const maxTs = getDocsContent('projects/documentation/src/app/pages/toast/examples/max/toast-max.example.ts');
const scrollableHtml = getDocsContent('projects/documentation/src/app/pages/toast/examples/scrollable/toast-scrollable.example.html');
const scrollableTs = getDocsContent('projects/documentation/src/app/pages/toast/examples/scrollable/toast-scrollable.example.ts');
const blurHtml = getDocsContent('projects/documentation/src/app/pages/toast/examples/blur/toast-blur.example.html');
const blurTs = getDocsContent('projects/documentation/src/app/pages/toast/examples/blur/toast-blur.example.ts');
const slotsHtml = getDocsContent('projects/documentation/src/app/pages/toast/examples/slots/toast-slots.example.html');
const slotsTs = getDocsContent('projects/documentation/src/app/pages/toast/examples/slots/toast-slots.example.ts');

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    ToastBasicExample,
    ToastVariantsExample,
    ToastAppearanceExample,
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

  protected appearanceHtml = appearanceHtml;
  protected appearanceTs = appearanceTs;

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
      name: 'appearance',
      type: "'solid' | 'elevated'",
      defaultValue: "'solid'",
      description:
        'Visual appearance style of the toast container with standard or elevated shadow depth.',
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
