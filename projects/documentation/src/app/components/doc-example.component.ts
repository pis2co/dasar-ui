import { DasarButtonComponent, DasarCardComponent } from 'dasar-ui';
import { Component, Input, signal } from '@angular/core';
import { HighlightPipe } from '../utils/highlight.pipe';
import { CommonModule } from '@angular/common';

interface DocExampleCodeOption {
  lang: 'html' | 'typescript' | 'scss' | 'css';
  label: string;
  value: string;
}

@Component({
  selector: 'doc-example-component',
  standalone: true,
  imports: [CommonModule, DasarCardComponent, HighlightPipe, DasarButtonComponent],
  template: `
    <dasar-card [label]="title">
      <dasar-card
        extra-header-slot
        fluid
        appearance="outline"
        [container-style]="{
          overflow: 'hidden',
        }"
      >
        <dasar-button
          [variant]="mode() === 'preview' ? 'primary' : 'secondary'"
          (click)="mode.set('preview')"
          appearance="subtle"
          radius="none"
          size="sm"
        >
          Preview
        </dasar-button>
        @if (codes.length > 0) {
          @for (codeItem of codes; track $index) {
            <dasar-button
              [variant]="mode() === 'code' && selectedCode() == codeItem ? 'primary' : 'secondary'"
              (click)="codeClicked(codeItem)"
              appearance="subtle"
              radius="none"
              size="sm"
            >
              {{ codeItem.label }}
            </dasar-button>
          }
        }
      </dasar-card>
      <div class="preview-area" [class.hidden]="mode() !== 'preview'" [ngStyle]="previewStyle">
        <ng-content></ng-content>
      </div>
      <div class="code-area" [class.hidden]="mode() !== 'code'">
        @if (selectedCode() != null) {
          <div class="code-header">
            <div class="code-lang-badge">
              <span class="lang-text">{{ selectedCode()?.lang | uppercase }}</span>
            </div>
            <button class="copy-btn" (click)="copyCode(selectedCode())" [class.copied]="isCopied()">
              {{ isCopied() ? 'Copied!' : 'Copy' }}
            </button>
          </div>
          @if (selectedCode()?.value != null && selectedCode()?.lang != null) {
            <div class="code-content">
              <pre><code
                [class]="'language-' + selectedCode()?.lang"
                [innerHTML]="selectedCode()!.value | highlight:selectedCode()!.lang"
              ></code></pre>
            </div>
          }
        }
      </div>
    </dasar-card>
  `,
  styles: [
    `
      .example-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: var(--dasar-space-4);
        margin-bottom: var(--dasar-space-6);
        padding-bottom: var(--dasar-space-4);
        border-bottom: 1px solid var(--dasar-theme-border-subtle-color);
      }
      .example-desc p {
        margin: 0;
        color: var(--dasar-theme-text-secondary-color);
        line-height: 1.5;
      }
      .segmented-control {
        display: flex;
        flex-shrink: 0;
        gap: var(--dasar-space-1);
        background: var(--dasar-theme-bg-hover-color);
        padding: var(--dasar-space-1);
        border-radius: var(--dasar-radius-sm);
        border: 1px solid var(--dasar-theme-border-subtle-color);
      }
      .preview-area {
        width: 100%;
      }
      .code-area {
        background: #1e1e1e;
        border-radius: var(--dasar-radius-md);
        border: 1px solid var(--dasar-theme-border-subtle-color);
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      .code-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #2d2d2d;
        padding: var(--dasar-space-base);
        border-bottom: 1px solid #404040;
      }
      .code-lang-badge {
        display: flex;
        align-items: center;

        gap: var(--dasar-space-2);
      }
      .lang-text {
        color: #9cdcfe;
        font-family: var(--dasar-font-sans);
        font-weight: 600;
        letter-spacing: 0.05em;
        margin-left: var(--dasar-space-2);
      }
      .copy-btn {
        background: transparent;
        border: 1px solid #555;
        color: #cccccc;
        padding: 4px 12px;
        border-radius: var(--dasar-radius-xs);
        cursor: pointer;
        font-family: var(--dasar-font-sans);
      }
      .copy-btn:hover {
        background: #444;
        color: #ffffff;
      }
      .copy-btn.copied {
        background: var(--dasar-theme-success-color);
        border-color: var(--dasar-theme-success-color);
        color: #ffffff;
      }
      .code-content {
        padding: var(--dasar-space-base);
        overflow-x: auto;
      }
      .code-content pre {
        margin: 0;
      }
      .code-content code {
        font-family: 'Menlo', 'Monaco', 'Consolas', 'Courier New', monospace;
        color: #d4d4d4;
        line-height: 1.6;
        white-space: pre-wrap;
      }
      .hidden {
        display: none !important;
      }
    `,
  ],
})
export class DocExampleComponent {
  @Input() previewStyle: Record<string, any> = {};
  @Input() codes: DocExampleCodeOption[] = [];
  @Input() description = '';
  @Input() title = '';

  selectedCode = signal<DocExampleCodeOption | null>(null);
  mode = signal<'preview' | 'code'>('preview');
  isCopied = signal<boolean>(false);

  codeClicked(item: DocExampleCodeOption) {
    this.mode.set('code');
    this.selectedCode.set(item);
  }
  copyCode(item: DocExampleCodeOption | null) {
    if (!item) return;
    navigator.clipboard.writeText(item.value).then(() => {
      this.isCopied.set(true);
      setTimeout(() => {
        this.isCopied.set(false);
      }, 1000);
    });
  }
}
