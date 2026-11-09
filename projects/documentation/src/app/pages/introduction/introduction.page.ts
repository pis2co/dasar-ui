import { Component } from '@angular/core';
import { DasarAlertComponent } from 'dasar-ui';
import { DocsLayoutComponent } from '../../layouts/doc.layout';
import { DocMarkdownComponent } from '../../components/doc-markdown.component';

// @ts-ignore
import source from '../../../../../../README.md' with { loader: 'text' };

@Component({
  imports: [DasarAlertComponent, DocsLayoutComponent, DocMarkdownComponent],
  template: `<docs-layout title="Introduction" description="What dasar-ui is and where to go next.">
    <dasar-alert variant="primary" title="v3.0.0 is here">
      Several components (Button, Checkbox, Switch, Radio, Calendar/Datepicker, Pin, Slider,
      Toggle, Tooltip, Textarea) now run on
      <a href="https://ng-primitives.dev" target="_blank" rel="noopener">ng-primitives</a>
      under the hood, and Modal's API changed to a trigger + template pattern — see the
      <a href="/changelog">Changelog</a> for the full breaking-change details before upgrading.
    </dasar-alert>
    <doc-markdown [source]="source" />
  </docs-layout>`,
  selector: 'app-introduction-page',
  standalone: true,
})
export class IntroductionDocPage {
  protected source = source;
}
