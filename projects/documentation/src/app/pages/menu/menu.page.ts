import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';
import { DasarCardComponent, DasarIconComponent } from 'dasar-ui';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MenuCustomTemplateExample } from './examples/custom-template/menu-custom-template.example';
import { MenuPlacementExample } from './examples/placement/menu-placement.example';
import { MenuAppearanceExample } from './examples/appearance/menu-appearance.example';
import { MenuBasicExample } from './examples/basic/menu-basic.example';

// @ts-ignore - raw example
import basicHtml from './examples/basic/menu-basic.example.html' with { loader: 'text' };
// @ts-ignore - raw example
import basicTs from './examples/basic/menu-basic.example.ts' with { loader: 'text' };
// @ts-ignore - raw example
import appearanceHtml from './examples/appearance/menu-appearance.example.html' with {
  loader: 'text',
};
// @ts-ignore - raw example
import appearanceTs from './examples/appearance/menu-appearance.example.ts' with {
  loader: 'text',
};
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
    MenuAppearanceExample,
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
  protected appearanceHtml = appearanceHtml;
  protected appearanceTs = appearanceTs;
  protected placementHtml = placementHtml;
  protected placementTs = placementTs;
  protected templateHtml = templateHtml;
  protected templateTs = templateTs;
  protected readonly apiProps: DocApiProperty[] = [
    {
      name: '[dasarMenuTrigger]',
      type: 'TemplateRef<any>',
      defaultValue: 'undefined',
      description:
        'Directive applied to the launcher element pointing to an <ng-template> that contains <dasar-menu>.',
    },
    {
      name: '[dasarMenuTriggerPlacement]',
      type: 'NgpMenuPlacement',
      defaultValue: "'bottom-start'",
      description:
        'Position of the menu panel relative to the trigger button (e.g. "bottom-start", "bottom-end", "top-start", "top-end").',
    },
    {
      name: '[dasarMenuTriggerDisabled]',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Disables the trigger, preventing the menu from opening.',
    },
    {
      name: '[dasarMenuTriggerOffset]',
      type: 'number | [number, number]',
      defaultValue: '0',
      description: 'Pixel offset of the menu panel from the trigger element.',
    },
    {
      name: 'items',
      type: 'DasarMenuItem[]',
      defaultValue: '[]',
      description:
        'Array of objects representing the menu items. Each item can have a label, value, iconName, disabled, or divider property.',
    },
    {
      name: 'appearance',
      type: "'none' | 'outline' | 'filled' | 'elevated'",
      defaultValue: "'outline'",
      description: 'Defines the visual appearance style of the menu panel.',
    },
    {
      name: 'placement',
      type: 'DasarMenuPlacementType',
      defaultValue: "'bottom-start'",
      description: 'Fallback/default placement configured on the menu panel component.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Sets the sizing of the menu panel and the items inside it.',
    },
    {
      name: 'radius',
      type: 'ScaleAttributeType',
      defaultValue: "'md'",
      description: 'Controls the border radius of the dropdown menu panel.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Disables user interactions on all menu items.',
    },
    {
      name: 'fluid',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Allows the menu panel to expand to 100% width of its container.',
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
      name: '[menu-item-template]',
      type: 'TemplateRef<any>',
      defaultValue: '-',
      description:
        'Allows custom rendering of menu items using `<ng-template menu-item-template let-item let-i="index">`.',
    },
  ];
}
