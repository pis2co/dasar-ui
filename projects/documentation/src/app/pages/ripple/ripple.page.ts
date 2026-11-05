import { Component } from '@angular/core';
import { DocsLayoutComponent } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { RippleBasicExample } from './examples/basic/ripple-basic.example';

// @ts-ignore - raw example
import basicHtml from './examples/basic/ripple-basic.example.html' with { loader: 'text' };
// @ts-ignore - raw example
import basicTs from './examples/basic/ripple-basic.example.ts' with { loader: 'text' };

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
