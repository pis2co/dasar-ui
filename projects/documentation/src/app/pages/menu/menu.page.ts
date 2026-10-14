import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';
import { DasarCardComponent, DasarIconComponent } from 'dasar-ui';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MenuCustomTemplateExample } from './examples/custom-template/menu-custom-template.example';
import { MenuPlacementExample } from './examples/placement/menu-placement.example';
import { MenuBasicExample } from './examples/basic/menu-basic.example';

// @ts-ignore - raw example
import basicHtml from './examples/basic/menu-basic.example.html' with { loader: 'text' };
// @ts-ignore - raw example
import basicTs from './examples/basic/menu-basic.example.ts' with { loader: 'text' };
// @ts-ignore - raw example
import placementHtml from './examples/placement/menu-placement.example.html' with {
  loader: 'text',
};
// @ts-ignore - raw example
import placementTs from './examples/placement/menu-placement.example.ts' with { loader: 'text' };
// @ts-ignore - raw example
import templateHtml from './examples/custom-template/menu-custom-template.example.html' with {
  loader: 'text',
};
// @ts-ignore - raw example
import templateTs from './examples/custom-template/menu-custom-template.example.ts' with {
  loader: 'text',
};

@Component({
  imports: [
    MenuCustomTemplateExample,
    MenuPlacementExample,
    DocExampleComponent,
    DocsLayoutComponent,
    MenuBasicExample,
    CommonModule,
  ],
  templateUrl: './menu.page.html',
  selector: 'app-menu-page',
  standalone: true,
})
export class MenuDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;
  protected placementHtml = placementHtml;
  protected placementTs = placementTs;
  protected templateHtml = templateHtml;
  protected templateTs = templateTs;
  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'items',
      type: 'DasarMenuItem[]',
      defaultValue: '[]',
      description:
        'Array of objects representing the menu items. Each item can have a label, value, iconName, disabled, or divider property.',
    },
    {
      name: 'label',
      type: 'string',
      defaultValue: 'undefined',
      description: 'The text label displayed on the menu trigger button.',
    },
    {
      name: 'appearance',
      type: "'none' | 'outline' | 'filled'",
      defaultValue: "'outline'",
      description: 'Defines the visual appearance style of the trigger button.',
    },
    {
      name: 'placement',
      type: "'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'",
      defaultValue: "'bottom-start'",
      description: 'Controls the positioning of the dropdown panel relative to the trigger.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Sets the overall sizing of the menu trigger.',
    },
    {
      name: 'radius',
      type: 'ScaleAttributeType',
      defaultValue: "'md'",
      description: 'Controls the border radius of the trigger button.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Disables user interactions and prevents the menu from opening.',
    },
    {
      name: 'fluid',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Allows the trigger button to expand to the full width of its container.',
    },
    {
      name: 'container-class / panel-class / item-class',
      type: 'ClassType',
      defaultValue: 'null',
      description:
        'Injects custom CSS classes into the root wrapper, panel, or individual menu items.',
    },
    {
      name: 'container-style / panel-style / item-style',
      type: 'StyleType',
      defaultValue: 'null',
      description:
        'Injects custom inline styles into the root wrapper, panel, or individual menu items.',
    },
    {
      name: '(onItemClick)',
      type: 'EventEmitter<DasarMenuItem>',
      defaultValue: '-',
      description: 'Emitted when a user clicks on an active menu item. Returns the item object.',
    },
    {
      name: '(opened) / (closed)',
      type: 'EventEmitter<void>',
      defaultValue: '-',
      description: 'Emitted when the menu panel opens or closes.',
    },
    {
      name: '[prefix] / [suffix] (Directives)',
      type: 'Content Slot',
      defaultValue: '-',
      description:
        'Projects content (like icons) to the left (prefix) or right (suffix) of the trigger label.',
    },
    {
      name: '[menu-label] (Directive)',
      type: 'Content Slot',
      defaultValue: '-',
      description:
        'Completely replaces the default text label with custom HTML content inside the trigger.',
    },
    {
      name: '*menu-item (Structural Directive)',
      type: 'TemplateRef<any>',
      defaultValue: '-',
      description:
        'Allows custom rendering of menu items. Exposes the item object via `let-item` and the loop index via `let-index`.',
    },
  ];
}
