import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DasarTableComponent, DasarTableColumn } from 'dasar-ui';
import { DocsLayoutComponent } from '../../layouts/doc.layout';
import { COMPONENT_CONFIG_DOCS } from './theming.data';

@Component({
  imports: [CommonModule, DocsLayoutComponent, DasarTableComponent],
  template: `<docs-layout
    title="Component Config"
    description="Every components.* key of DasarComponentConfig. Set them in setGlobalTheme or [componentConfig] on dasar-theme-provider. Explicit inputs on a component always win over these defaults."
  >
    @for (group of groups; track group.component) {
      <h2 class="theming-group-title">components.{{ group.component }}</h2>
      <dasar-table
        [columns]="columns"
        [hoverable]="true"
        [striped]="true"
        [data]="group.rows"
        appearance="outline"
        spacing="normal"
      />
    }
  </docs-layout>`,
  styles: [
    `
      .theming-group-title {
        font-size: var(--font-size-lg);
      }
      dasar-table {
        display: block;
        margin-bottom: var(--space-6);
      }
    `,
  ],
  selector: 'app-theming-component-config-page',
  standalone: true,
})
export class ThemingComponentConfigDocPage {
  protected columns: DasarTableColumn[] = [
    { key: 'name', label: 'Property' },
    { key: 'type', label: 'Type' },
    { key: 'defaultValue', label: 'Default' },
    { key: 'description', label: 'Description' },
  ];

  protected groups = Object.entries(COMPONENT_CONFIG_DOCS).map(([component, rows]) => ({
    component,
    rows,
  }));
}
