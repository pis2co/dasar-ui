import { getDocsContent } from '../../docs-content.generated';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { TableCustomSizesExample } from './examples/custom-sizes/table-custom-sizes.example';
import { TableDynamicStyleExample } from './examples/dynamic-style/table-dynamic-style.example';
import { TableCellProfileExample } from './examples/cell-profile/table-cell-profile.example';
import { TableCellActionsExample } from './examples/cell-actions/table-cell-actions.example';
import { TableCustomBodyExample } from './examples/custom-body/table-custom-body.example';
import { TableInlineEditExample } from './examples/inline-edit/table-inline-edit.example';
import { TablePaginationExample } from './examples/pagination/table-pagination.example';
import { TableCellBadgeExample } from './examples/cell-badge/table-cell-badge.example';
import { TableExpandedExample } from './examples/expanded/table-expanded.example';
import { TableHeatmapExample } from './examples/heatmap/table-heatmap.example';
import { TableNestedExample } from './examples/nested/table-nested.example';
import { TableEmptyExample } from './examples/empty/table-empty.example';
import { TableRadiusExample } from './examples/radius/table-radius.example';
import { TableRadiusThemeExample } from './examples/radius-theme/table-radius-theme.example';
import { TableAppearanceExample } from './examples/appearance/table-appearance.example';

const profileHtml = getDocsContent('projects/documentation/src/app/pages/table/examples/cell-profile/table-cell-profile.example.html');
const profileTs = getDocsContent('projects/documentation/src/app/pages/table/examples/cell-profile/table-cell-profile.example.ts');
const actionsHtml = getDocsContent('projects/documentation/src/app/pages/table/examples/cell-actions/table-cell-actions.example.html');
const paginationHtml = getDocsContent('projects/documentation/src/app/pages/table/examples/pagination/table-pagination.example.html');
const paginationTs = getDocsContent('projects/documentation/src/app/pages/table/examples/pagination/table-pagination.example.ts');
const customSizesHtml = getDocsContent('projects/documentation/src/app/pages/table/examples/custom-sizes/table-custom-sizes.example.html');
const customSizesTs = getDocsContent('projects/documentation/src/app/pages/table/examples/custom-sizes/table-custom-sizes.example.ts');
const customBodyHtml = getDocsContent('projects/documentation/src/app/pages/table/examples/custom-body/table-custom-body.example.html');
const customBodyTs = getDocsContent('projects/documentation/src/app/pages/table/examples/custom-body/table-custom-body.example.ts');
const badgeHtml = getDocsContent('projects/documentation/src/app/pages/table/examples/cell-badge/table-cell-badge.example.html');
const badgeTs = getDocsContent('projects/documentation/src/app/pages/table/examples/cell-badge/table-cell-badge.example.ts');
const actionsTs = getDocsContent('projects/documentation/src/app/pages/table/examples/cell-actions/table-cell-actions.example.ts');
const expandedHtml = getDocsContent('projects/documentation/src/app/pages/table/examples/expanded/table-expanded.example.html');
const expandedTs = getDocsContent('projects/documentation/src/app/pages/table/examples/expanded/table-expanded.example.ts');
const emptyHtml = getDocsContent('projects/documentation/src/app/pages/table/examples/empty/table-empty.example.html');
const emptyTs = getDocsContent('projects/documentation/src/app/pages/table/examples/empty/table-empty.example.ts');
const heatmapHtml = getDocsContent('projects/documentation/src/app/pages/table/examples/heatmap/table-heatmap.example.html');
const heatmapTs = getDocsContent('projects/documentation/src/app/pages/table/examples/heatmap/table-heatmap.example.ts');
const dynamicStyleHtml = getDocsContent('projects/documentation/src/app/pages/table/examples/dynamic-style/table-dynamic-style.example.html');
const dynamicStyleTs = getDocsContent('projects/documentation/src/app/pages/table/examples/dynamic-style/table-dynamic-style.example.ts');
const inlineEditHtml = getDocsContent('projects/documentation/src/app/pages/table/examples/inline-edit/table-inline-edit.example.html');
const inlineEditTs = getDocsContent('projects/documentation/src/app/pages/table/examples/inline-edit/table-inline-edit.example.ts');
const nestedHtml = getDocsContent('projects/documentation/src/app/pages/table/examples/nested/table-nested.example.html');
const nestedTs = getDocsContent('projects/documentation/src/app/pages/table/examples/nested/table-nested.example.ts');
const radiusHtml = getDocsContent('projects/documentation/src/app/pages/table/examples/radius/table-radius.example.html');
const radiusTs = getDocsContent('projects/documentation/src/app/pages/table/examples/radius/table-radius.example.ts');
const radiusThemeHtml = getDocsContent('projects/documentation/src/app/pages/table/examples/radius-theme/table-radius-theme.example.html');
const radiusThemeTs = getDocsContent('projects/documentation/src/app/pages/table/examples/radius-theme/table-radius-theme.example.ts');
const appearanceHtml = getDocsContent('projects/documentation/src/app/pages/table/examples/appearance/table-appearance.example.html');
const appearanceTs = getDocsContent('projects/documentation/src/app/pages/table/examples/appearance/table-appearance.example.ts');

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    TableHeatmapExample,
    TableDynamicStyleExample,
    TableInlineEditExample,
    TableNestedExample,
    TableCellBadgeExample,
    TableCellProfileExample,
    TableCellActionsExample,
    TableExpandedExample,
    TableEmptyExample,
    TablePaginationExample,
    TableCustomSizesExample,
    TableCustomBodyExample,
    TableRadiusExample,
    TableRadiusThemeExample,
    TableAppearanceExample,
  ],
  templateUrl: './table.page.html',
  selector: 'app-table-page',
  standalone: true,
})
export class TableDocPage {
  protected badgeHtml = badgeHtml;
  protected badgeTs = badgeTs;
  protected profileHtml = profileHtml;
  protected profileTs = profileTs;
  protected actionsHtml = actionsHtml;
  protected actionsTs = actionsTs;
  protected expandedHtml = expandedHtml;
  protected expandedTs = expandedTs;
  protected emptyHtml = emptyHtml;
  protected emptyTs = emptyTs;
  protected paginationHtml = paginationHtml;
  protected paginationTs = paginationTs;
  protected customSizesHtml = customSizesHtml;
  protected customSizesTs = customSizesTs;
  protected customBodyHtml = customBodyHtml;
  protected customBodyTs = customBodyTs;
  protected heatmapHtml = heatmapHtml;
  protected heatmapTs = heatmapTs;
  protected dynamicStyleHtml = dynamicStyleHtml;
  protected dynamicStyleTs = dynamicStyleTs;
  protected inlineEditHtml = inlineEditHtml;
  protected inlineEditTs = inlineEditTs;
  protected nestedHtml = nestedHtml;
  protected nestedTs = nestedTs;
  protected radiusHtml = radiusHtml;
  protected radiusTs = radiusTs;
  protected radiusThemeHtml = radiusThemeHtml;
  protected radiusThemeTs = radiusThemeTs;
  protected appearanceHtml = appearanceHtml;
  protected appearanceTs = appearanceTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'data',
      type: 'any[]',
      defaultValue: '[]',
      description: 'Array of data objects to render.',
    },
    {
      name: 'columns',
      type: 'DasarTableColumn[]',
      defaultValue: '[]',
      description: 'Configuration array for table columns.',
    },
    {
      name: 'appearance',
      type: "'outline' | 'filled' | 'elevated' | 'borderless'",
      defaultValue: "'outline'",
      description: 'Visual style of the table container.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Typographic scale of the table contents.',
    },
    {
      name: 'radius',
      type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'",
      defaultValue: "'md'",
      description:
        'Corner radius of the table container. Default via components.table.radius. Borderless appearance always stays square.',
    },
    {
      name: 'spacing',
      type: "'compact' | 'normal' | 'relaxed'",
      defaultValue: "'normal'",
      description: 'Controls the cell padding.',
    },
    {
      name: 'expandable',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Enables row expansion and renders the expand chevron column.',
    },
    {
      name: 'striped',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Applies alternating background colors to rows.',
    },
    {
      name: 'hoverable',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Applies hover effects to rows.',
    },
    {
      name: 'loading',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Displays the loading state overlay.',
    },
    {
      name: 'fluid',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Forces the table to 100% width.',
    },
    {
      name: 'sortKey',
      type: 'string | null',
      defaultValue: 'null',
      description: 'The currently active sorting column key.',
    },
    {
      name: 'sortDirection',
      type: "'asc' | 'desc' | null",
      defaultValue: 'null',
      description: 'The current sorting direction.',
    },
    {
      name: '(onSortChange)',
      type: 'EventEmitter<DasarTableSortEvent>',
      defaultValue: '-',
      description: 'Emitted when a sortable column header is clicked.',
    },
    {
      name: '(onRowClick) / (onRowDblClick)',
      type: 'EventEmitter<any>',
      defaultValue: '-',
      description: 'Mouse events on table rows.',
    },
    {
      name: '[cell-slot]="key"',
      type: 'TemplateRef',
      defaultValue: '-',
      description:
        'Overrides rendering for a specific column. Provides let-val, let-row, and let-index.',
    },
    {
      name: '[expanded-slot]',
      type: 'TemplateRef',
      defaultValue: '-',
      description: 'Template rendered inside an expanded row. Provides let-row and let-index.',
    },
    {
      name: '[empty-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Completely replaces the default empty state UI.',
    },
    {
      name: '[pagination-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Injects pagination controls at the bottom of the table.',
    },
    {
      name: '[header-slot] / [body-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Completely replaces the thead or tbody elements for ultimate control.',
    },
  ];
}
