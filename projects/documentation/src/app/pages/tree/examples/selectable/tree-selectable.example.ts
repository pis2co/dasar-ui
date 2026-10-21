import { Component, signal } from '@angular/core';
import { DasarTreeComponent, DasarTreeItem } from 'dasar-ui';

@Component({
  templateUrl: './tree-selectable.example.html',
  selector: 'app-tree-selectable-example',
  imports: [DasarTreeComponent],
  standalone: true,
})
export class TreeSelectableExample {
  protected items: DasarTreeItem[] = [
    {
      key: 'src',
      label: 'src',
      children: [
        {
          key: 'app',
          label: 'app',
          children: [
            { key: 'app.ts', label: 'app.ts' },
            { key: 'app.html', label: 'app.html' },
          ],
        },
        { key: 'main.ts', label: 'main.ts' },
      ],
    },
    { key: 'package.json', label: 'package.json' },
    { key: 'README.md', label: 'README.md' },
  ];
  protected selected = signal<(string | number)[]>([]);
}
