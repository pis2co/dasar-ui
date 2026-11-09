import { Component } from '@angular/core';
import { DocsLayoutComponent } from '../../layouts/doc.layout';
import { DocMarkdownComponent } from '../../components/doc-markdown.component';

// @ts-ignore
import source from '../../../../../../CHANGELOG.md' with { loader: 'text' };

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
