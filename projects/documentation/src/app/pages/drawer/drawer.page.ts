import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { DrawerBasicExample } from './examples/basic/drawer-basic.example';
import { DrawerPlacementExample } from './examples/placement/drawer-placement.example';
import { DrawerResizableExample } from './examples/resizable/drawer-resizable.example';
import { DrawerSlotsExample } from './examples/slots/drawer-slots.example';
import { DrawerNgModelExample } from './examples/ng-model/drawer-ng-model.example';
import { DrawerCallbacksExample } from './examples/callbacks/drawer-callbacks.example';

// @ts-ignore
import basicHtml from './examples/basic/drawer-basic.example.html' with { loader: 'text' };
// @ts-ignore
import basicTs from './examples/basic/drawer-basic.example.ts' with { loader: 'text' };
// @ts-ignore
import placementHtml from './examples/placement/drawer-placement.example.html' with {
  loader: 'text',
};
// @ts-ignore
import placementTs from './examples/placement/drawer-placement.example.ts' with { loader: 'text' };
// @ts-ignore
import resizableHtml from './examples/resizable/drawer-resizable.example.html' with {
  loader: 'text',
};
// @ts-ignore
import resizableTs from './examples/resizable/drawer-resizable.example.ts' with { loader: 'text' };
// @ts-ignore
import slotsHtml from './examples/slots/drawer-slots.example.html' with { loader: 'text' };
// @ts-ignore
import slotsTs from './examples/slots/drawer-slots.example.ts' with { loader: 'text' };
// @ts-ignore
import ngModelHtml from './examples/ng-model/drawer-ng-model.example.html' with { loader: 'text' };
// @ts-ignore
import ngModelTs from './examples/ng-model/drawer-ng-model.example.ts' with { loader: 'text' };
// @ts-ignore
import callbacksHtml from './examples/callbacks/drawer-callbacks.example.html' with {
  loader: 'text',
};
// @ts-ignore
import callbacksTs from './examples/callbacks/drawer-callbacks.example.ts' with { loader: 'text' };

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    DrawerBasicExample,
    DrawerPlacementExample,
    DrawerResizableExample,
    DrawerSlotsExample,
    DrawerNgModelExample,
    DrawerCallbacksExample,
  ],
  templateUrl: './drawer.page.html',
  selector: 'app-drawer-page',
  standalone: true,
})
export class DrawerDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;

  protected placementHtml = placementHtml;
  protected placementTs = placementTs;

  protected resizableHtml = resizableHtml;
  protected resizableTs = resizableTs;

  protected slotsHtml = slotsHtml;
  protected slotsTs = slotsTs;

  protected ngModelHtml = ngModelHtml;
  protected ngModelTs = ngModelTs;

  protected callbacksHtml = callbacksHtml;
  protected callbacksTs = callbacksTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'show',
      type: 'boolean',
      defaultValue: 'false',
      description:
        'Shows the drawer. Supports [(show)] and ngModel. Closing from inside the drawer writes false back.',
    },
    {
      name: 'label',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Header title. Replaced by the [header-slot].',
    },
    {
      name: 'placement',
      type: "'top' | 'right' | 'bottom' | 'left'",
      defaultValue: "'right'",
      description: 'Edge the drawer slides in from.',
    },
    {
      name: 'closable',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Shows the close button in the header. Replaced by the [closeable-slot].',
    },
    {
      name: 'resizable',
      type: 'boolean',
      defaultValue: 'false',
      description:
        'Adds a drag handle on the inner edge. Arrow keys resize it when the handle is focused.',
    },
    {
      name: 'width',
      type: 'string | number',
      defaultValue: "'378px'",
      description: 'Width for left and right placements. A number is read as px.',
    },
    {
      name: 'height',
      type: 'string | number',
      defaultValue: "'378px'",
      description: 'Height for top and bottom placements. A number is read as px.',
    },
    {
      name: 'min-width / max-width',
      type: 'string | number',
      defaultValue: "200 / '100vw'",
      description: 'Resize limits for left and right placements.',
    },
    {
      name: 'min-height / max-height',
      type: 'string | number',
      defaultValue: "200 / '100vh'",
      description: 'Resize limits for top and bottom placements.',
    },
    {
      name: 'z-index',
      type: 'number',
      defaultValue: '1000',
      description: 'Stacking order of the backdrop and drawer.',
    },
    {
      name: 'close-on-overlay',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Closes the drawer when the backdrop is clicked.',
    },
    {
      name: 'close-on-escape',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Closes the drawer on Escape.',
    },
    {
      name: 'overlay-blur / overlay-background',
      type: 'string',
      defaultValue: 'null',
      description: 'Forwarded to dasar-overlay.',
    },
    {
      name: 'header-fluid / body-fluid / action-fluid',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Removes the padding of that section.',
    },
    {
      name: 'container-class / header-class / body-class / action-class',
      type: 'ClassType',
      defaultValue: 'null',
      description: 'Extra classes for the drawer parts.',
    },
    {
      name: 'container-style / header-style / body-style / action-style',
      type: 'StyleType',
      defaultValue: 'null',
      description: 'Inline styles for the drawer parts.',
    },
    {
      name: '(showChange)',
      type: 'EventEmitter<boolean>',
      defaultValue: '-',
      description: 'Emits the new value, for two-way binding.',
    },
    {
      name: '(onUpdateValue)',
      type: 'EventEmitter<boolean>',
      defaultValue: '-',
      description:
        'Emits when the user opens or closes the drawer from inside (close button, backdrop, Escape).',
    },
    {
      name: '(onWidthUpdate)',
      type: 'EventEmitter<number>',
      defaultValue: '-',
      description: 'Emits the width in px when a horizontal resize ends.',
    },
    {
      name: '(onHeightUpdate)',
      type: 'EventEmitter<number>',
      defaultValue: '-',
      description: 'Emits the height in px when a vertical resize ends.',
    },
    {
      name: '(onAfterEnter)',
      type: 'EventEmitter<void>',
      defaultValue: '-',
      description: 'Emits once the open animation has finished.',
    },
    {
      name: '(onAfterLeave)',
      type: 'EventEmitter<void>',
      defaultValue: '-',
      description: 'Emits once the close animation has finished and the drawer is removed.',
    },
    {
      name: '[header-slot]',
      type: 'ng-content',
      defaultValue: '-',
      description: 'Replaces the label in the header.',
    },
    {
      name: '[closeable-slot]',
      type: 'ng-content',
      defaultValue: '-',
      description: 'Replaces the default close button.',
    },
    {
      name: '[action-slot]',
      type: 'ng-content',
      defaultValue: '-',
      description: 'Footer actions.',
    },
  ];
}
