import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DasarTableComponent, DasarTableColumn } from 'dasar-ui';
import { DocsLayoutComponent } from '../../layouts/doc.layout';
import { TOKEN_GROUPS } from './theming.data';

@Component({
  imports: [CommonModule, DocsLayoutComponent, DasarTableComponent],
  template: `<docs-layout
    title="Theme Tokens"
    description="Every token key, the CSS variable it writes, and the config path that sets it. Use tokens.light.<component> or tokens.dark.<component> in setGlobalTheme or [tokenConfig]."
  >
    @for (group of groups; track group.component) {
      <h2 class="theming-group-title">{{ group.component }}</h2>
      <p class="theming-group-path">{{ group.path }}</p>
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
        text-transform: capitalize;
        margin: var(--space-6) 0 0;
      }
      .theming-group-path {
        font-size: var(--font-size-sm);
        color: var(--theme-text-secondary-color);
      }
      dasar-table {
        display: block;
        margin-bottom: var(--space-6);
      }
    `,
  ],
  selector: 'app-theming-tokens-page',
  standalone: true,
})
export class ThemingTokensDocPage {
  protected columns: DasarTableColumn[] = [
    { key: 'token', label: 'Token key' },
    { key: 'cssVar', label: 'CSS variable' },
  ];

  protected groups = TOKEN_GROUPS.map((group) => ({
    component: group.component,
    path: group.path,
    rows: Object.entries(group.map).map(([token, cssVar]) => ({ token, cssVar })),
  }));
}
