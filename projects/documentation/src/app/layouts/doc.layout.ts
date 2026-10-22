import { DasarListComponent, DasarTableColumn, DasarTableComponent } from 'dasar-ui';
import { NavigationEnd, Router } from '@angular/router';
import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

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
  exact?: boolean;
}

export interface DocNavGroup {
  title: string;
  items: DocNavItem[];
}

@Component({
  imports: [CommonModule, DasarListComponent, DasarTableComponent],
  selector: 'docs-layout',
  standalone: true,
  template: `
    <div class="docs-page-wrapper">
      <aside class="docs-sidebar">
        <nav class="docs-nav">
          @for (group of navigation; track group.title) {
            <dasar-list
              class="nav-group"
              selectable
              hoverable
              radius="none"
              [value]="activeRoute()"
              (onItemClick)="onNavigate($event.value)"
            >
              <div header-slot class="nav-group-title">{{ group.title }}</div>
              @for (item of group.items; track item.label) {
                <dasar-list-item [value]="item.route">{{ item.label }}</dasar-list-item>
              }
            </dasar-list>
          }
        </nav>
      </aside>
      <main class="docs-main" #main>
        <div class="docs-layout">
          <header class="docs-header">
            <h1 class="docs-title">{{ title }}</h1>
            <span class="docs-description">{{ description }}</span>
          </header>
          <div class="docs-content">
            <ng-content></ng-content>
          </div>
          <br />
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
        background-color: var(--dasar-theme-bg-default-color);
        font-family: var(--dasar-font-sans);
        display: flex;
        height: 100%;
      }
      .docs-sidebar {
        border-right: 1px solid var(--dasar-theme-border-subtle-color);
        background: var(--dasar-theme-bg-surface-color);
        overflow-y: auto;
        flex-shrink: 0;
        width: 150px;
        height: 100%;
      }
      .docs-main {
        width: calc(100vw - 150px);
        overflow-y: auto;
        flex: 1;
      }
      .docs-layout {
        padding: var(--dasar-space-6);
        color: var(--dasar-theme-text-primary-color);
        margin: 0 auto;
      }
      .docs-header {
        margin-bottom: var(--dasar-space-base);
        border-bottom: 1px solid var(--dasar-theme-border-subtle-color);
        padding-bottom: var(--dasar-space-6);
      }
      .docs-title {
        font-weight: var(--dasar-font-weight-semibold);
        color: var(--dasar-theme-text-primary-color);
        font-family: var(--dasar-font-hero);
        margin: 0;
      }
      .docs-description {
        color: var(--dasar-theme-text-secondary-color);
        line-height: 1.5;
        margin: 0;
      }
      .nav-group-title {
        padding: var(--dasar-space-base) var(--dasar-space-3) var(--dasar-space-base);
        font-weight: var(--dasar-font-weight-semibold);
        font-size: var(--dasar-font-size-xs);
        text-transform: uppercase;
      }
      .docs-sidebar {
        --dasar-list-background: transparent;
        --dasar-list-header-padding: 0;
        --dasar-list-header-border: transparent;
        --dasar-list-header-background: transparent;
      }
      .api-title {
        font-weight: var(--dasar-font-weight-semibold);
        color: var(--dasar-theme-text-primary-color);
        margin: var(--dasar-space-base) 0;
        border-bottom: 1px solid var(--dasar-theme-border-subtle-color);
      }
      .api-reference-section code {
        font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
        background-color: var(--dasar-theme-bg-hover-color);
        color: var(--dasar-theme-primary-color);
        padding: var(--dasar-space-0-5) var(--dasar-space-1);
        border-radius: var(--dasar-radius-xs);
      }
      .prop-cell code {
        font-weight: var(--dasar-font-weight-medium);
      }
    `,
  ],
})
export class DocsLayoutComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() apiData: DocApiProperty[] = [];

  @ViewChild('main') private main?: ElementRef<HTMLElement>;
  private readonly router = inject(Router);
  private readonly host = inject(ElementRef<HTMLElement>);
  protected readonly activeRoute = signal('');

  constructor() {
    this.activeRoute.set(this.resolveActiveRoute(this.router.url));
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe((event) => this.activeRoute.set(this.resolveActiveRoute(event.urlAfterRedirects)));

    afterNextRender(() => {
      this.scrollMainToTop();
      this.revealActiveItem();
    });
  }

  protected onNavigate(route: string): void {
    if (this.router.url.split(/[?#]/)[0] === route) {
      this.scrollMainToTop();
      return;
    }
    this.router.navigateByUrl(route);
  }

  private scrollMainToTop(): void {
    this.main?.nativeElement.scrollTo({ top: 0 });
  }

  private revealActiveItem(): void {
    const active = this.host.nativeElement.querySelector('.docs-sidebar .dasar-list-item.active');
    active?.scrollIntoView({ block: 'nearest' });
  }

  private resolveActiveRoute(url: string): string {
    const path = url.split(/[?#]/)[0];
    const items = this.navigation.flatMap((group) => group.items);
    const exact = items.find((item) => item.route === path);
    if (exact) return exact.route;
    const prefixed = items
      .filter((item) => !item.exact && path.startsWith(`${item.route}/`))
      .sort((a, b) => b.route.length - a.route.length);
    return prefixed[0]?.route ?? '';
  }

  navigation: DocNavGroup[] = [
    {
      title: 'Getting Started',
      items: [
        { label: 'Introduction', route: '/introduction' },
        { label: 'Installation', route: '/installation' },
        { label: 'Getting Started', route: '/getting-started' },
      ],
    },
    {
      title: 'Theming',
      items: [
        { label: 'Overview', route: '/theming', exact: true },
        { label: 'Theme Tokens', route: '/theming/tokens' },
        { label: 'CSS Variables', route: '/theming/css-variables' },
        { label: 'Component Config', route: '/theming/component-config' },
      ],
    },
    {
      title: 'Basic',
      items: [
        { label: 'Button', route: '/components/button' },
        { label: 'Button Group', route: '/components/button-group' },
        { label: 'Icon', route: '/components/icon' },
        { label: 'Chip', route: '/components/chip' },
        { label: 'Divider', route: '/components/divider' },
        { label: 'Alert', route: '/components/alert' },
        { label: 'Calendar', route: '/components/calendar' },
        { label: 'Card', route: '/components/card' },
        { label: 'Modal', route: '/components/modal' },
        { label: 'Drawer', route: '/components/drawer' },
        { label: 'Tree', route: '/components/tree' },
        { label: 'Split', route: '/components/split' },
        { label: 'Toast', route: '/components/toast' },
        { label: 'Menu', route: '/components/menu' },
        { label: 'Tabs', route: '/components/tabs' },
        { label: 'List', route: '/components/list' },
        { label: 'Pagination', route: '/components/pagination' },
      ],
    },
    {
      title: 'Data',
      items: [{ label: 'Table', route: '/components/table' }],
    },
    {
      title: 'Input',
      items: [
        { label: 'Input', route: '/components/input' },
        { label: 'Number Input', route: '/components/number-input' },
        { label: 'Checkbox', route: '/components/checkbox' },
        { label: 'Radio', route: '/components/radio' },
        { label: 'Switch', route: '/components/switch' },
        { label: 'Skeleton', route: '/components/skeleton' },
        { label: 'Breakpoint', route: '/components/breakpoint' },
        { label: 'Select', route: '/components/select' },
        { label: 'Datepicker', route: '/components/datepicker' },
      ],
    },
  ];
  apiColumns: DasarTableColumn[] = [
    { key: 'name', label: 'Property' },
    { key: 'type', label: 'Type' },
    { key: 'defaultValue', label: 'Default' },
    { key: 'description', label: 'Description' },
  ];
}
