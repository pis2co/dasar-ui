import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { TreeBasicExample } from './examples/basic/tree-basic.example';
import { TreeFileExample } from './examples/file/tree-file.example';
import { TreeSelectableExample } from './examples/selectable/tree-selectable.example';
import { TreeMultipleExample } from './examples/multiple/tree-multiple.example';
import { TreeShowLineExample } from './examples/show-line/tree-show-line.example';
import { TreeSearchExample } from './examples/search/tree-search.example';
import { TreeDraggableExample } from './examples/draggable/tree-draggable.example';
import { TreeCustomIconsExample } from './examples/custom-icons/tree-custom-icons.example';
import { TreeSlotsExample } from './examples/slots/tree-slots.example';
import { TreeNgModelExample } from './examples/ng-model/tree-ng-model.example';

// @ts-ignore
import basicHtml from './examples/basic/tree-basic.example.html' with { loader: 'text' };
// @ts-ignore
import basicTs from './examples/basic/tree-basic.example.ts' with { loader: 'text' };
// @ts-ignore
import fileHtml from './examples/file/tree-file.example.html' with { loader: 'text' };
// @ts-ignore
import fileTs from './examples/file/tree-file.example.ts' with { loader: 'text' };
// @ts-ignore
import selectableHtml from './examples/selectable/tree-selectable.example.html' with {
  loader: 'text',
};
// @ts-ignore
import selectableTs from './examples/selectable/tree-selectable.example.ts' with { loader: 'text' };
// @ts-ignore
import multipleHtml from './examples/multiple/tree-multiple.example.html' with { loader: 'text' };
// @ts-ignore
import multipleTs from './examples/multiple/tree-multiple.example.ts' with { loader: 'text' };
// @ts-ignore
import showLineHtml from './examples/show-line/tree-show-line.example.html' with { loader: 'text' };
// @ts-ignore
import showLineTs from './examples/show-line/tree-show-line.example.ts' with { loader: 'text' };
// @ts-ignore
import searchHtml from './examples/search/tree-search.example.html' with { loader: 'text' };
// @ts-ignore
import searchTs from './examples/search/tree-search.example.ts' with { loader: 'text' };
// @ts-ignore
import draggableHtml from './examples/draggable/tree-draggable.example.html' with {
  loader: 'text',
};
// @ts-ignore
import draggableTs from './examples/draggable/tree-draggable.example.ts' with { loader: 'text' };
// @ts-ignore
import customIconsHtml from './examples/custom-icons/tree-custom-icons.example.html' with {
  loader: 'text',
};
// @ts-ignore
import customIconsTs from './examples/custom-icons/tree-custom-icons.example.ts' with {
  loader: 'text',
};
// @ts-ignore
import slotsHtml from './examples/slots/tree-slots.example.html' with { loader: 'text' };
// @ts-ignore
import slotsTs from './examples/slots/tree-slots.example.ts' with { loader: 'text' };
// @ts-ignore
import ngModelHtml from './examples/ng-model/tree-ng-model.example.html' with { loader: 'text' };
// @ts-ignore
import ngModelTs from './examples/ng-model/tree-ng-model.example.ts' with { loader: 'text' };

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    TreeBasicExample,
    TreeFileExample,
    TreeSelectableExample,
    TreeMultipleExample,
    TreeShowLineExample,
    TreeSearchExample,
    TreeDraggableExample,
    TreeCustomIconsExample,
    TreeSlotsExample,
    TreeNgModelExample,
  ],
  templateUrl: './tree.page.html',
  selector: 'app-tree-page',
  standalone: true,
})
export class TreeDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;

  protected fileHtml = fileHtml;
  protected fileTs = fileTs;

  protected selectableHtml = selectableHtml;
  protected selectableTs = selectableTs;

  protected multipleHtml = multipleHtml;
  protected multipleTs = multipleTs;

  protected showLineHtml = showLineHtml;
  protected showLineTs = showLineTs;

  protected searchHtml = searchHtml;
  protected searchTs = searchTs;

  protected draggableHtml = draggableHtml;
  protected draggableTs = draggableTs;

  protected customIconsHtml = customIconsHtml;
  protected customIconsTs = customIconsTs;

  protected slotsHtml = slotsHtml;
  protected slotsTs = slotsTs;

  protected ngModelHtml = ngModelHtml;
  protected ngModelTs = ngModelTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'items',
      type: 'DasarTreeItem[]',
      defaultValue: '[]',
      description:
        'Nodes: { key, label, children?, disabled?, iconName?, data? }. Supports [(items)] because dragging reorders them.',
    },
    {
      name: 'type',
      type: "null | 'file' | 'selectable' | 'multiple'",
      defaultValue: 'null',
      description:
        'null: expand and collapse only. file: folder and file icons. selectable: single selection. multiple: a checkbox column.',
    },
    {
      name: 'selectable',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Row selection for any type, for example together with type="file".',
    },
    {
      name: 'multiple',
      type: 'boolean',
      defaultValue: 'false',
      description:
        'Checkbox column for any type. Checking a parent checks its enabled descendants.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Row height and font size.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Disables the whole tree. Items can also set disabled: true.',
    },
    {
      name: 'label',
      type: 'string',
      defaultValue: "''",
      description: 'Title above the tree. Replaced by the [label-slot].',
    },
    {
      name: 'hint',
      type: 'string',
      defaultValue: "''",
      description: 'Helper text under the tree. Replaced by the [hint-slot].',
    },
    {
      name: 'draggable',
      type: 'boolean',
      defaultValue: 'false',
      description:
        'Lets rows be dragged. Dropping before, after or inside a row reorders the items itself.',
    },
    {
      name: 'show-line',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Draws connecting lines between a node and its children.',
    },
    {
      name: 'search',
      type: 'boolean',
      defaultValue: 'false',
      description:
        'Shows a search field above the tree. Matches keep their ancestors and expand them.',
    },
    {
      name: 'search-placeholder',
      type: 'string',
      defaultValue: "'Search'",
      description: 'Placeholder of the search field.',
    },
    {
      name: 'filter-method',
      type: '(item, query) => boolean',
      defaultValue: 'label contains query',
      description: 'Custom match for the search.',
    },
    {
      name: 'search-value',
      type: 'string',
      defaultValue: "''",
      description: 'The current query. Supports two-way binding with (searchValueChange).',
    },
    {
      name: 'default-expand-all',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Expands every parent when the items first load.',
    },
    {
      name: 'expanded-keys / selected-keys / checked-keys',
      type: '(string | number)[]',
      defaultValue: '[]',
      description: 'Controlled state. Each has a matching ...Change output for two-way binding.',
    },
    {
      name: 'value / ngModel',
      type: 'key | key[]',
      defaultValue: 'null',
      description:
        'The selected key for selectable trees, the checked keys for multiple trees. Works with [(value)] and ngModel.',
    },
    {
      name: '(onUpdateExpandedKeys)',
      type: 'EventEmitter<Key[]>',
      defaultValue: '-',
      description: 'Emits the expanded keys after expanding or collapsing.',
    },
    {
      name: '(onUpdateSelectedKeys)',
      type: 'EventEmitter<Key[]>',
      defaultValue: '-',
      description: 'Emits the selected keys.',
    },
    {
      name: '(onUpdateCheckedKeys)',
      type: 'EventEmitter<Key[]>',
      defaultValue: '-',
      description: 'Emits every fully checked key, parents included.',
    },
    {
      name: '(onDragStart)',
      type: 'EventEmitter<DasarTreeDragEvent>',
      defaultValue: '-',
      description: 'A row drag started.',
    },
    {
      name: '(onDragEnter)',
      type: 'EventEmitter<DasarTreeDragEvent>',
      defaultValue: '-',
      description:
        'Dragging entered a row. position is the drop position, or null when dropping there is not allowed.',
    },
    {
      name: '(onDragLeave)',
      type: 'EventEmitter<DasarTreeDragEvent>',
      defaultValue: '-',
      description: 'Dragging left a row.',
    },
    {
      name: '(onDrop)',
      type: 'EventEmitter<DasarTreeDropEvent>',
      defaultValue: '-',
      description: 'A row was dropped: dragNode, dropNode, position and the new items.',
    },
    {
      name: '[search-slot]',
      type: 'ng-content',
      defaultValue: '-',
      description: 'Replaces the search field. Drive it with search-value.',
    },
    {
      name: '[label-slot] / [hint-slot] / [extra-header-slot]',
      type: 'ng-content',
      defaultValue: '-',
      description: 'Label, hint and extra content in the header.',
    },
    {
      name: 'tree-prefix-slot / tree-suffix-slot',
      type: 'ng-template',
      defaultValue: '-',
      description:
        'Content before and after the label of every row. Context: the item, level, expanded, selected, checked and toggle().',
    },
    {
      name: 'tree-icon-slot',
      type: 'ng-template',
      defaultValue: '-',
      description: 'Replaces the icon of every row.',
    },
    {
      name: 'tree-leaf-slot',
      type: 'ng-template',
      defaultValue: '-',
      description:
        'Replaces the expand and collapse trigger of rows that have children. Call toggle() from it.',
    },
    {
      name: 'tree-children-slot="key"',
      type: 'ng-template',
      defaultValue: '-',
      description: 'Replaces the content of the row with that key.',
    },
  ];
}
