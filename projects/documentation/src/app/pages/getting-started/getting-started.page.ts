import { Component } from '@angular/core';
import { DocsLayoutComponent } from '../../layouts/doc.layout';
import { DocMarkdownComponent } from '../../components/doc-markdown.component';

// @ts-ignore
import source from '../../../../../../docs/getting-started.md' with { loader: 'text' };

@Component({
  imports: [DocsLayoutComponent, DocMarkdownComponent],
  template: `<docs-layout
    title="Getting Started"
    description="Render a component, add the theme provider, and toggle light and dark mode."
  >
    <doc-markdown [source]="source" />
  </docs-layout>`,
  selector: 'app-getting-started-page',
  standalone: true,
})
export class GettingStartedDocPage {
  protected source = source;
}
