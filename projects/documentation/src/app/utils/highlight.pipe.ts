import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { inject, Pipe, PipeTransform, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as Prism from 'prismjs';

import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-css';

@Pipe({
  name: 'highlight',
  standalone: true,
})
export class HighlightPipe implements PipeTransform {
  private platformId = inject(PLATFORM_ID);

  constructor(private sanitizer: DomSanitizer) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializePrismCustomizations();
    }
  }

  private initializePrismCustomizations() {
    try {
      const markup = Prism.languages['markup'] as any;
      if (markup?.tag?.inside?.['tag']?.inside) {
        markup.tag.inside['tag'].inside['custom-component'] = {
          pattern: /(^<\/?)[a-zA-Z0-9]+-[a-zA-Z0-9\-]+/,
          lookbehind: true,
        };
      }
    } catch (e) {
      // Prevents server-side crash
    }
  }

  transform(code: string, language: 'html' | 'typescript' | 'scss' | 'css'): SafeHtml {
    if (!code) return '';
    const prismLang = language === 'html' ? 'markup' : language;
    const grammar = Prism.languages[prismLang] || Prism.languages['markup'];
    const highlightedCode = Prism.highlight(code, grammar, prismLang);
    return this.sanitizer.bypassSecurityTrustHtml(highlightedCode);
  }
}
