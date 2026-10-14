import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  DOC_DEFAULT_SETTINGS,
  DocCustomizeService,
  DocCustomizeSettings,
} from '../services/doc-customize.service';

interface Opt {
  label: string;
  value: string | null;
}

@Component({
  selector: 'doc-customize-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (open) {
      <div class="cm-backdrop" (click)="cancel()"></div>
      <div class="cm-dialog" role="dialog" aria-modal="true" aria-labelledby="cm-title">
        <header class="cm-header">
          <h2 id="cm-title">Customize</h2>
          <button type="button" class="cm-close" aria-label="Close" (click)="cancel()">✕</button>
        </header>

        <div class="cm-body">
          <section>
            <h3>Component defaults</h3>
            <p class="cm-hint">
              Applies to every example that does not set the property explicitly.
            </p>

            <label
              >Size
              <select [ngModel]="draft().size" (ngModelChange)="set('size', $event)">
                @for (o of sizeOptions; track o.label) {
                <option [ngValue]="o.value">{{ o.label }}</option>
                }
              </select>
            </label>

            <label
              >Radius
              <select [ngModel]="draft().radius" (ngModelChange)="set('radius', $event)">
                @for (o of radiusOptions; track o.label) {
                <option [ngValue]="o.value">{{ o.label }}</option>
                }
              </select>
            </label>

            <label
              >Button appearance
              <select
                [ngModel]="draft().buttonAppearance"
                (ngModelChange)="set('buttonAppearance', $event)"
              >
                @for (o of buttonAppearanceOptions; track o.label) {
                <option [ngValue]="o.value">{{ o.label }}</option>
                }
              </select>
            </label>

            <label
              >Input appearance
              <select
                [ngModel]="draft().inputAppearance"
                (ngModelChange)="set('inputAppearance', $event)"
              >
                @for (o of inputAppearanceOptions; track o.label) {
                <option [ngValue]="o.value">{{ o.label }}</option>
                }
              </select>
            </label>

            <label
              >Card appearance
              <select
                [ngModel]="draft().cardAppearance"
                (ngModelChange)="set('cardAppearance', $event)"
              >
                @for (o of cardAppearanceOptions; track o.label) {
                <option [ngValue]="o.value">{{ o.label }}</option>
                }
              </select>
            </label>
          </section>

          <section>
            <h3>Theme</h3>

            <label
              >Primary color
              <span class="cm-row">
                <input
                  type="color"
                  [ngModel]="draft().primaryColor ?? '#2563eb'"
                  (ngModelChange)="set('primaryColor', $event)"
                />
                <button type="button" class="cm-link" (click)="set('primaryColor', null)">
                  Use default
                </button>
              </span>
            </label>

            <label
              >Base font size
              <select [ngModel]="draft().fontSizeBase" (ngModelChange)="set('fontSizeBase', $event)">
                @for (o of fontSizeOptions; track o.label) {
                <option [ngValue]="o.value">{{ o.label }}</option>
                }
              </select>
            </label>

            <label
              >Font family
              <select [ngModel]="draft().fontSans" (ngModelChange)="set('fontSans', $event)">
                @for (o of fontOptions; track o.label) {
                <option [ngValue]="o.value">{{ o.label }}</option>
                }
              </select>
            </label>
          </section>
        </div>

        <footer class="cm-footer">
          <button type="button" class="cm-btn" (click)="resetDraft()">Reset to defaults</button>
          <span class="cm-spacer"></span>
          <button type="button" class="cm-btn" (click)="cancel()">Cancel</button>
          <button type="button" class="cm-btn cm-primary" (click)="apply()">Apply</button>
        </footer>
      </div>
    }
  `,
  styles: [
    `
      .cm-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        z-index: 1000;
      }
      .cm-dialog {
        position: fixed;
        z-index: 1001;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: min(520px, calc(100vw - 32px));
        max-height: calc(100vh - 64px);
        display: flex;
        flex-direction: column;
        background: var(--theme-bg-surface-color);
        color: var(--theme-text-primary-color);
        border: 1px solid var(--theme-border-subtle-color);
        border-radius: 12px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
        font-family: var(--font-sans);
      }
      .cm-header,
      .cm-footer {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
      }
      .cm-header {
        border-bottom: 1px solid var(--theme-border-subtle-color);
        justify-content: space-between;
      }
      .cm-footer {
        border-top: 1px solid var(--theme-border-subtle-color);
      }
      .cm-header h2 {
        margin: 0;
        font-size: 16px;
      }
      .cm-body {
        padding: 16px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      section {
        display: flex;
        flex-direction: column;
        gap: 10px;
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
      label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        font-size: 14px;
      }
      select,
      input[type='color'] {
        min-width: 180px;
        height: 32px;
        padding: 0 8px;
        font: inherit;
        font-size: 14px;
        color: var(--theme-text-primary-color);
        background: var(--theme-bg-default-color);
        border: 1px solid var(--theme-border-strong-color);
        border-radius: 6px;
      }
      input[type='color'] {
        min-width: 48px;
        padding: 2px;
      }
      .cm-row {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .cm-spacer {
        flex: 1;
      }
      .cm-close,
      .cm-link {
        background: none;
        border: none;
        cursor: pointer;
        color: var(--theme-text-secondary-color);
        font: inherit;
      }
      .cm-link {
        font-size: 12px;
        text-decoration: underline;
      }
      .cm-btn {
        height: 32px;
        padding: 0 12px;
        border-radius: 6px;
        cursor: pointer;
        font: inherit;
        font-size: 14px;
        border: 1px solid var(--theme-border-strong-color);
        background: var(--theme-bg-default-color);
        color: var(--theme-text-primary-color);
      }
      .cm-primary {
        background: var(--theme-primary-color);
        border-color: var(--theme-primary-color);
        color: #fff;
      }
    `,
  ],
})
export class DocCustomizeModalComponent implements OnChanges {
  @Input() open = false;
  @Output() closed = new EventEmitter<void>();

  private customize = inject(DocCustomizeService);
  readonly draft = signal<DocCustomizeSettings>({ ...DOC_DEFAULT_SETTINGS });

  readonly sizeOptions: Opt[] = [
    { label: 'Default', value: null },
    { label: 'XS', value: 'xs' },
    { label: 'SM', value: 'sm' },
    { label: 'MD', value: 'md' },
    { label: 'LG', value: 'lg' },
    { label: 'XL', value: 'xl' },
  ];
  readonly radiusOptions: Opt[] = [
    { label: 'Default', value: null },
    { label: 'None', value: 'none' },
    { label: 'XS', value: 'xs' },
    { label: 'SM', value: 'sm' },
    { label: 'MD', value: 'md' },
    { label: 'LG', value: 'lg' },
    { label: 'XL', value: 'xl' },
    { label: 'Full', value: 'full' },
  ];
  readonly buttonAppearanceOptions: Opt[] = [
    { label: 'Default', value: null },
    { label: 'Solid', value: 'solid' },
    { label: 'Subtle', value: 'subtle' },
    { label: 'Outline', value: 'outline' },
  ];
  readonly inputAppearanceOptions: Opt[] = [
    { label: 'Default', value: null },
    { label: 'Outline', value: 'outline' },
    { label: 'Filled', value: 'filled' },
  ];
  readonly cardAppearanceOptions: Opt[] = [
    { label: 'Default', value: null },
    { label: 'Outline', value: 'outline' },
    { label: 'Borderless', value: 'borderless' },
    { label: 'Elevated', value: 'elevated' },
  ];
  readonly fontSizeOptions: Opt[] = [
    { label: 'Default', value: null },
    { label: '12px', value: '12px' },
    { label: '13px', value: '13px' },
    { label: '14px', value: '14px' },
    { label: '15px', value: '15px' },
    { label: '16px', value: '16px' },
  ];
  readonly fontOptions: Opt[] = [
    { label: 'Default', value: null },
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

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.open) this.cancel();
  }
}
