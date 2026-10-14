import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';
import { DasarCardComponent, DasarIconComponent } from 'dasar-ui';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DasarCardComponent,
    DasarIconComponent,
    DocExampleComponent,
  ],
  templateUrl: './icon.page.html',
  selector: 'app-icon-page',
  standalone: true,
})
export class IconDocPage {
  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'name',
      type: 'string',
      defaultValue: "''",
      description: 'The exact key of the icon registered in ICON_REGISTRY to render.',
    },
    {
      name: 'size',
      type: 'DasarIconSizeType',
      defaultValue: "'md'",
      description:
        "Controls the size of the icon. Accepts scale tokens (e.g., 'sm', 'md', 'lg') or a custom number (rendered in pixels).",
    },
    {
      name: 'color',
      type: 'string',
      defaultValue: "'currentColor'",
      description:
        'Sets the stroke color of the SVG. Inherits the surrounding text color by default.',
    },
    {
      name: 'stroke',
      type: 'number',
      defaultValue: '2',
      description: 'Defines the stroke-width (thickness) of the SVG paths.',
    },
    {
      name: 'fluid',
      type: 'boolean',
      defaultValue: 'false',
      description:
        'Strips fixed sizing constraints, allowing the icon to fill 100% of its container.',
    },
  ];
  protected readonly basicExampleCode = `
    <dasar-icon name="home"></dasar-icon>
    <dasar-icon name="home" color="red"></dasar-icon>
    <dasar-icon name="home" [stroke]="1"></dasar-icon>
    `;
}
