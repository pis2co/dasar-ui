import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DasarInputComponent, DasarTableComponent, DasarTableColumn } from 'dasar-ui';
import { DocsLayoutComponent } from '../../layouts/doc.layout';
import { TOKEN_ROWS } from './theming.data';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    DocsLayoutComponent,
    DasarTableComponent,
    DasarInputComponent,
  ],
  template: `<docs-layout
    title="CSS Variables"
    description="Flat list of every CSS variable the library reads, with the component and token behind it. Override any of them in plain CSS."
  >
    <dasar-input
      label="Search variables"
      placeholder="For example --btn- or --list-"
      [ngModel]="query()"
      (ngModelChange)="query.set($event)"
    />
    <p class="theming-count">{{ rows().length }} variables</p>
    <dasar-table
      [columns]="columns"
      [hoverable]="true"
      [striped]="true"
      [data]="rows()"
      appearance="outline"
      spacing="normal"
    />
  </docs-layout>`,
  styles: [
    `
      .theming-count {
        font-size: var(--font-size-sm);
        color: var(--theme-text-secondary-color);
      }
      dasar-table {
        display: block;
        margin-top: var(--space-4);
      }
    `,
  ],
  selector: 'app-theming-css-variables-page',
  standalone: true,
})
export class ThemingCssVariablesDocPage {
  protected query = signal('');

  protected columns: DasarTableColumn[] = [
    { key: 'cssVar', label: 'CSS variable' },
    { key: 'component', label: 'Component' },
    { key: 'token', label: 'Token key' },
    { key: 'path', label: 'Config path' },
  ];

  protected rows = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return TOKEN_ROWS;
    return TOKEN_ROWS.filter(
      (row) =>
        row.cssVar.toLowerCase().includes(q) ||
        row.token.toLowerCase().includes(q) ||
        row.component.toLowerCase().includes(q),
    );
  });
}
