import { Component } from '@angular/core';
import { DocsLayoutComponent } from '../../layouts/doc.layout';
import { DocMarkdownComponent } from '../../components/doc-markdown.component';

// @ts-ignore
import source from '../../../../../../docs/installation.md' with { loader: 'text' };

@Component({
  imports: [DocsLayoutComponent, DocMarkdownComponent],
  template: `<docs-layout title="Installation" description="Add dasar-ui to an Angular project.">
    <doc-markdown [source]="source" />
  </docs-layout>`,
  selector: 'app-installation-page',
  standalone: true,
})
export class InstallationDocPage {
  protected source = source;
}
