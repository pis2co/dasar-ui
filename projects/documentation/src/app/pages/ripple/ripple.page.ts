import { getDocsContent } from '../../docs-content.generated';
import { Component } from '@angular/core';
import { DocsLayoutComponent } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { RippleBasicExample } from './examples/basic/ripple-basic.example';

// @ts-ignore - raw example
const basicHtml = getDocsContent('projects/documentation/src/app/pages/ripple/examples/basic/ripple-basic.example.html');
// @ts-ignore - raw example
const basicTs = getDocsContent('projects/documentation/src/app/pages/ripple/examples/basic/ripple-basic.example.ts');

@Component({
  imports: [DocsLayoutComponent, DocExampleComponent, RippleBasicExample],
  templateUrl: './ripple.page.html',
  selector: 'app-ripple-page',
  standalone: true,
})
export class RippleDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;
}
