import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
  signal,
} from '@angular/core';
import {
  DOC_DEFAULT_SETTINGS,
  DocCustomizeService,
  DocCustomizeSettings,
} from '../services/doc-customize.service';
import { DasarModalComponent, DasarButtonComponent, DasarSelectComponent } from 'dasar-ui';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DasarModalOption {
  label: string;
  value: string | null;
}

const DEFAULT_SENTINEL = '__default__';

@Component({
  selector: 'doc-customize-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DasarModalComponent,
    DasarButtonComponent,
    DasarSelectComponent,
  ],
  template: `
    <dasar-modal [open]="open" label="Customize" (onClose)="cancel()">
      <section class="cm-section">
        <h3>Component defaults</h3>
        <p class="cm-hint">Applies to every example that does not set the property explicitly.</p>

        <dasar-select
          full-width
          label="Size"
          [dropdown-panel-style]="panelStyle"
          [options]="sizeOptions"
          [ngModel]="draft().size ?? sentinel"
          (ngModelChange)="setOption('size', $event)"
        ></dasar-select>

        <dasar-select
          full-width
          label="Radius"
          [dropdown-panel-style]="panelStyle"
          [options]="radiusOptions"
          [ngModel]="draft().radius ?? sentinel"
          (ngModelChange)="setOption('radius', $event)"
        ></dasar-select>

        <dasar-select
          full-width
          label="Button appearance"
          [dropdown-panel-style]="panelStyle"
          [options]="buttonAppearanceOptions"
          [ngModel]="draft().buttonAppearance ?? sentinel"
          (ngModelChange)="setOption('buttonAppearance', $event)"
        ></dasar-select>

        <dasar-select
          full-width
          label="Input appearance"
          [dropdown-panel-style]="panelStyle"
          [options]="inputAppearanceOptions"
          [ngModel]="draft().inputAppearance ?? sentinel"
          (ngModelChange)="setOption('inputAppearance', $event)"
        ></dasar-select>

        <dasar-select
          full-width
          label="Card appearance"
          [dropdown-panel-style]="panelStyle"
          [options]="cardAppearanceOptions"
          [ngModel]="draft().cardAppearance ?? sentinel"
          (ngModelChange)="setOption('cardAppearance', $event)"
        ></dasar-select>

        <dasar-select
          full-width
          label="Tabs appearance"
          [dropdown-panel-style]="panelStyle"
          [options]="tabsAppearanceOptions"
          [ngModel]="draft().tabsAppearance ?? sentinel"
          (ngModelChange)="setOption('tabsAppearance', $event)"
        ></dasar-select>

        <dasar-select
          full-width
          label="Tabs size"
          [dropdown-panel-style]="panelStyle"
          [options]="tabsSizeOptions"
          [ngModel]="draft().tabsSize ?? sentinel"
          (ngModelChange)="setOption('tabsSize', $event)"
        ></dasar-select>

        <dasar-select
          full-width
          label="Tabs spacing"
          [dropdown-panel-style]="panelStyle"
          [options]="tabsSpacingOptions"
          [ngModel]="draft().tabsSpacing ?? sentinel"
          (ngModelChange)="setOption('tabsSpacing', $event)"
        ></dasar-select>
      </section>

      <section class="cm-section">
        <h3>Theme</h3>

        <div class="cm-color">
          <span>Primary color</span>
          <input
            type="color"
            [ngModel]="draft().primaryColor ?? '#2563eb'"
            (ngModelChange)="set('primaryColor', $event)"
          />
          <dasar-button appearance="subtle" (click)="set('primaryColor', null)">
            Use default
          </dasar-button>
        </div>

        <dasar-select
          full-width
          label="Base font size"
          [dropdown-panel-style]="panelStyle"
          [options]="fontSizeOptions"
          [ngModel]="draft().fontSizeBase ?? sentinel"
          (ngModelChange)="setOption('fontSizeBase', $event)"
        ></dasar-select>

        <dasar-select
          full-width
          label="Font family"
          [options]="fontOptions"
          [dropdown-panel-style]="panelStyle"
          [ngModel]="draft().fontSans ?? sentinel"
          (ngModelChange)="setOption('fontSans', $event)"
        ></dasar-select>
      </section>

      <div action-slot style="display: flex; justify-content: space-between; align-items: center;">
        <dasar-button appearance="outline" variant="secondary" (click)="resetDraft()">
          Reset to defaults
        </dasar-button>
        <span class="cm-spacer"></span>
        <div style="display: flex; gap: var(--space-base); align-items: center;">
          <dasar-button appearance="outline" variant="secondary" (click)="cancel()">
            Cancel
          </dasar-button>
          <dasar-button appearance="solid" (click)="apply()">Apply</dasar-button>
        </div>
      </div>
    </dasar-modal>
  `,
  styles: [
    `
      .cm-section {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .cm-section + .cm-section {
        margin-top: 20px;
      }
      h3 {
        margin: 0;
        font-size: 13px;
        text-transform: uppercase;
        color: var(--theme-text-secondary-color);
      }
      .cm-hint {
        margin: 0;
        font-size: 12px;
        color: var(--theme-text-secondary-color);
      }
      .cm-color {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 14px;
      }
      .cm-color span {
        flex: 1;
      }
      .cm-color input[type='color'] {
        width: 48px;
        height: 32px;
        padding: 2px;
        border: 1px solid var(--theme-border-strong-color);
        border-radius: 6px;
        background: var(--theme-bg-default-color);
      }
      .cm-spacer {
        flex: 1;
      }
    `,
  ],
})
export class DocCustomizeModalComponent implements OnChanges {
  @Input() open = false;
  @Output() closed = new EventEmitter<void>();

  private customize = inject(DocCustomizeService);
  readonly draft = signal<DocCustomizeSettings>({ ...DOC_DEFAULT_SETTINGS });
  readonly sentinel = DEFAULT_SENTINEL;
  readonly panelStyle = { 'z-index': '1100' };

  readonly sizeOptions: DasarModalOption[] = [
    { label: 'Default', value: DEFAULT_SENTINEL },
    { label: 'XS', value: 'xs' },
    { label: 'SM', value: 'sm' },
    { label: 'MD', value: 'md' },
    { label: 'LG', value: 'lg' },
    { label: 'XL', value: 'xl' },
  ];
  readonly radiusOptions: DasarModalOption[] = [
    { label: 'Default', value: DEFAULT_SENTINEL },
    { label: 'None', value: 'none' },
    { label: 'XS', value: 'xs' },
    { label: 'SM', value: 'sm' },
    { label: 'MD', value: 'md' },
    { label: 'LG', value: 'lg' },
    { label: 'XL', value: 'xl' },
    { label: 'Full', value: 'full' },
  ];
  readonly buttonAppearanceOptions: DasarModalOption[] = [
    { label: 'Default', value: DEFAULT_SENTINEL },
    { label: 'Solid', value: 'solid' },
    { label: 'Subtle', value: 'subtle' },
    { label: 'Outline', value: 'outline' },
  ];
  readonly inputAppearanceOptions: DasarModalOption[] = [
    { label: 'Default', value: DEFAULT_SENTINEL },
    { label: 'Outline', value: 'outline' },
    { label: 'Filled', value: 'filled' },
  ];
  readonly cardAppearanceOptions: DasarModalOption[] = [
    { label: 'Default', value: DEFAULT_SENTINEL },
    { label: 'Outline', value: 'outline' },
    { label: 'Borderless', value: 'borderless' },
    { label: 'Elevated', value: 'elevated' },
  ];
  readonly tabsAppearanceOptions: DasarModalOption[] = [
    { label: 'Default', value: DEFAULT_SENTINEL },
    { label: 'Solid', value: 'solid' },
    { label: 'Subtle', value: 'subtle' },
    { label: 'Outline', value: 'outline' },
  ];
  readonly tabsSizeOptions: DasarModalOption[] = [
    { label: 'Default', value: DEFAULT_SENTINEL },
    { label: 'None', value: 'none' },
    { label: 'Xs', value: 'xs' },
    { label: 'Sm', value: 'sm' },
    { label: 'Md', value: 'md' },
    { label: 'Lg', value: 'lg' },
    { label: 'Xl', value: 'xl' },
    { label: 'Full', value: 'full' },
  ];
  readonly tabsSpacingOptions: DasarModalOption[] = [
    { label: 'Default', value: DEFAULT_SENTINEL },
    { label: 'Normal', value: 'normal' },
    { label: 'Compact', value: 'compact' },
  ];
  readonly fontSizeOptions: DasarModalOption[] = [
    { label: 'Default', value: DEFAULT_SENTINEL },
    { label: '12px', value: '12px' },
    { label: '13px', value: '13px' },
    { label: '14px', value: '14px' },
    { label: '15px', value: '15px' },
    { label: '16px', value: '16px' },
  ];
  readonly fontOptions: DasarModalOption[] = [
    { label: 'Default', value: DEFAULT_SENTINEL },
    { label: 'System UI', value: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' },
    { label: 'Serif', value: 'Georgia, "Times New Roman", serif' },
    { label: 'Monospace', value: 'Menlo, Monaco, "Courier New", monospace' },
  ];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['open'] && this.open) {
      this.draft.set({ ...this.customize.settings() });
    }
  }

  set<K extends keyof DocCustomizeSettings>(key: K, value: DocCustomizeSettings[K]) {
    this.draft.update((d) => ({ ...d, [key]: value }));
  }

  setOption<K extends keyof DocCustomizeSettings>(key: K, value: unknown) {
    this.set(key, (value === DEFAULT_SENTINEL ? null : value) as DocCustomizeSettings[K]);
  }

  resetDraft() {
    this.draft.set({ ...DOC_DEFAULT_SETTINGS });
  }

  apply() {
    this.customize.apply(this.draft());
    this.closed.emit();
  }

  cancel() {
    this.closed.emit();
  }
}
