import { getDocsContent } from '../../docs-content.generated';
import { Component } from '@angular/core';
import { DocsLayoutComponent } from '../../layouts/doc.layout';
import { DocMarkdownComponent } from '../../components/doc-markdown.component';

const source = getDocsContent('CHANGELOG.md');

@Component({
  imports: [DocsLayoutComponent, DocMarkdownComponent],
  template: `<docs-layout title="Changelog" description="What changed in each dasar-ui release.">
    <doc-markdown [source]="source" />
  </docs-layout>`,
  selector: 'app-changelog-page',
  standalone: true,
})
export class ChangelogDocPage {
  protected source = source;
}
