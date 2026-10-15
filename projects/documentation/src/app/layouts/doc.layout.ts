import { DasarTableColumn, DasarTableComponent } from 'dasar-ui';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DocApiProperty {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

export interface DocExample {
  title: string;
  description?: string;
  code: string;
}

export interface DocNavItem {
  label: string;
  route: string;
}

export interface DocNavGroup {
  title: string;
  items: DocNavItem[];
}

@Component({
  imports: [CommonModule, RouterLink, RouterLinkActive, DasarTableComponent],
  selector: 'docs-layout',
  standalone: true,
  template: `
    <div class="docs-page-wrapper">
      <aside class="docs-sidebar">
        <nav class="docs-nav">
          @for (group of navigation; track group.title) {
            <div class="nav-group">
              <div class="nav-group-title">
                <span>{{ group.title }}</span>
              </div>
              <div class="nav-items">
                @for (item of group.items; track item.label) {
                  <a [routerLink]="item.route" routerLinkActive="active" class="nav-link">
                    {{ item.label }}
                  </a>
                }
              </div>
            </div>
          }
        </nav>
      </aside>
      <main class="docs-main">
        <div class="docs-layout">
          <header class="docs-header">
            <h1 class="docs-title">{{ title }}</h1>
            <span class="docs-description">{{ description }}</span>
          </header>
          <div class="docs-content">
            <ng-content></ng-content>
          </div>
          @if (apiData && apiData.length > 0) {
            <div class="api-reference-section">
              <h2 class="api-title">API Reference</h2>
              <dasar-table
                [columns]="apiColumns"
                [hoverable]="true"
                [striped]="true"
                [data]="apiData"
                appearance="outline"
                spacing="normal"
              >
                <ng-template cell-slot="name" let-value>
                  <span
                    ><code>{{ value }}</code></span
                  >
                </ng-template>
                <ng-template cell-slot="type" let-value>
                  <span
                    ><code>{{ value }}</code></span
                  >
                </ng-template>
              </dasar-table>
            </div>
          }
        </div>
      </main>
    </div>
  `,
  styles: [
    `
      .docs-content {
        flex-direction: column;
        display: flex;
        gap: 12px;
      }
      .docs-page-wrapper {
        background-color: var(--theme-bg-default-color);
        font-family: var(--font-sans);
        overflow: hidden;
        display: flex;
        height: 100%;
      }
      .docs-sidebar {
        border-right: 1px solid var(--theme-border-subtle-color);
        background: var(--theme-bg-surface-color);
        position: sticky;
        overflow-y: auto;
        flex-shrink: 0;
        width: 150px;
        height: 100%;
        top: 0;
      }
      .docs-main {
        width: calc(100vw - 150px);
        overflow-y: auto;
        flex: 1;
      }
      .docs-layout {
        padding: var(--space-6);
        color: var(--theme-text-primary-color);
        margin: 0 auto;
      }
      .docs-header {
        margin-bottom: var(--space-10);
        border-bottom: 1px solid var(--theme-border-subtle-color);
        padding-bottom: var(--space-6);
      }
      .docs-title {
        font-weight: var(--font-weight-semibold);
        color: var(--theme-text-primary-color);
        font-family: var(--font-hero);
        margin: 0;
      }
      .docs-description {
        color: var(--theme-text-secondary-color);
        line-height: 1.5;
        margin: 0;
      }
      .nav-group-title {
        padding: var(--space-base) var(--space-3) var(--space-base);
        font-weight: var(--font-weight-semibold);
        font-size: var(--font-size-xs);
        text-transform: uppercase;
      }
      .nav-items {
        display: flex;
        flex-direction: column;
      }
      .nav-link {
        display: block;
        color: var(--theme-text-secondary-color);
        text-decoration: none;
        border-right: 1px solid transparent;
        padding: var(--space-base);
        &:hover {
          color: var(--theme-text-primary-color);
          background-color: var(--theme-bg-hover-color);
        }
        &.active {
          color: var(--theme-primary-color);
          font-weight: var(--font-weight-medium);
          background-color: var(--theme-primary-surface-color);
          border-right-color: var(--theme-primary-color);
        }
      }
      .api-title {
        font-weight: var(--font-weight-semibold);
        color: var(--theme-text-primary-color);
        margin: 0 0 var(--space-6) 0;
        border-bottom: 1px solid var(--theme-border-subtle-color);
      }
      .api-reference-section code {
        font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
        background-color: var(--theme-bg-hover-color);
        color: var(--theme-primary-color);
        padding: var(--space-0-5) var(--space-1);
        border-radius: var(--radius-xs);
      }
      .prop-cell code {
        font-weight: var(--font-weight-medium);
      }
    `,
  ],
})
export class DocsLayoutComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() apiData: DocApiProperty[] = [];

  navigation: DocNavGroup[] = [
    {
      title: 'Getting Started',
      items: [{ label: 'Introduction', route: '/components/button' }],
    },
    {
      title: 'Basic',
      items: [
        { label: 'Button', route: '/components/button' },
        { label: 'Icon', route: '/components/icon' },
        { label: 'Chip', route: '/components/chip' },
        { label: 'Calendar', route: '/components/calendar' },
        { label: 'Datepicker', route: '/components/datepicker' },
        { label: 'Card', route: '/components/card' },
        { label: 'Modal', route: '/components/modal' },
        { label: 'Menu', route: '/components/menu' },
        { label: 'Tabs', route: '/components/tabs' },
      ],
    },
    {
      title: 'Input',
      items: [
        { label: 'Input', route: '/components/input' },
        { label: 'Number Input', route: '/components/number-input' },
        { label: 'Select', route: '/components/select' },
      ],
    },
    {
      title: 'Data',
      items: [{ label: 'Table', route: '/components/table' }],
    },
  ];
  apiColumns: DasarTableColumn[] = [
    { key: 'name', label: 'Property' },
    { key: 'type', label: 'Type' },
    { key: 'defaultValue', label: 'Default' },
    { key: 'description', label: 'Description' },
  ];
}
