import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  inject,
  Input,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { marked } from 'marked';
import * as Prism from 'prismjs';

import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-css';

const INTERNAL_DOC_LINKS: Array<[string, string]> = [
  ['./installation.md', '/installation'],
  ['../README.md', '/introduction'],
  ['./README.md', '/introduction'],
  ['README.md', '/introduction'],
  ['./getting-started.md', '/getting-started'],
  ['../docs/getting-started.md', '/getting-started'],
  ['../docs/installation.md', '/installation'],
];

@Component({
  selector: 'doc-markdown',
  standalone: true,
  template: `<div class="doc-markdown" [innerHTML]="html()"></div>`,
  styles: [
    `
      .doc-markdown {
        display: block;
        max-width: 860px;
        color: var(--theme-text-primary-color);
        line-height: var(--line-height-normal);
      }
      .doc-markdown h1 {
        font-size: var(--font-size-xl);
        margin: 0 0 var(--space-4);
      }
      .doc-markdown h2 {
        font-size: var(--font-size-lg);
        margin: var(--space-8) 0 var(--space-3);
      }
      .doc-markdown h3 {
        font-size: var(--font-size-base);
        margin: var(--space-6) 0 var(--space-base);
      }
      .doc-markdown p {
        margin: 0 0 var(--space-4);
      }
      .doc-markdown ul,
      .doc-markdown ol {
        margin: 0 0 var(--space-4);
        padding-left: var(--space-6);
      }
      .doc-markdown li {
        margin-bottom: var(--space-base);
      }
      .doc-markdown a {
        color: var(--theme-primary-color);
      }
      .doc-markdown table {
        width: 100%;
        border-collapse: collapse;
        margin: 0 0 var(--space-6);
        font-size: var(--font-size-sm);
      }
      .doc-markdown th,
      .doc-markdown td {
        text-align: left;
        padding: var(--space-base) var(--space-3);
        border-bottom: 1px solid var(--theme-border-subtle-color);
      }
      .doc-markdown th {
        font-weight: var(--font-weight-semibold);
      }
      .doc-markdown code:not(pre code) {
        font-size: var(--font-size-sm);
        padding: 0 var(--space-1);
        border-radius: var(--radius-xs);
        background: var(--theme-bg-hover-color);
      }
      .doc-markdown pre {
        margin: 0 0 var(--space-6);
        padding: var(--space-4);
        border-radius: var(--radius-md);
        overflow: auto;
      }
      .doc-markdown pre code {
        background: transparent;
        padding: 0;
      }
      .doc-markdown blockquote {
        margin: 0 0 var(--space-4);
        padding-left: var(--space-4);
        border-left: 3px solid var(--theme-border-strong-color);
        color: var(--theme-text-secondary-color);
      }
    `,
  ],
})
export class DocMarkdownComponent {
  @Input({ required: true }) source = '';

  private platformId = inject(PLATFORM_ID);
  private sanitizer = inject(DomSanitizer);
  private host = inject(ElementRef);
  private rendered = signal(false);

  protected html = computed(() => {
    const raw = marked.parse(this.source, { async: false }) as unknown as string;
    return this.sanitizer.bypassSecurityTrustHtml(this.rewriteLinks(String(raw)));
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
        if (!this.rendered()) {
          this.rendered.set(true);
        }
        Prism.highlightAllUnder(this.host.nativeElement);
      });
    }
  }

  private rewriteLinks(html: string): string {
    let out = html;
    for (const [from, to] of INTERNAL_DOC_LINKS) {
      out = out.split(`href="${from}"`).join(`href="${to}"`);
    }
    out = out.replace(
      /<a href="(https?:\/\/[^"]+)"/g,
      '<a target="_blank" rel="noopener noreferrer" href="$1"',
    );
    return out;
  }
}
