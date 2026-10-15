import { Component } from '@angular/core';
import { DocsLayoutComponent } from '../../layouts/doc.layout';
import { DocMarkdownComponent } from '../../components/doc-markdown.component';

// @ts-ignore
import source from '../../../../../../README.md' with { loader: 'text' };

@Component({
  imports: [DocsLayoutComponent, DocMarkdownComponent],
  template: `<docs-layout title="Introduction" description="What dasar-ui is and where to go next.">
    <doc-markdown [source]="source" />
  </docs-layout>`,
  selector: 'app-introduction-page',
  standalone: true,
})
export class IntroductionDocPage {
  protected source = source;
}
