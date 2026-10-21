import { Component } from '@angular/core';
import { DasarTreeComponent, DasarTreeItem } from 'dasar-ui';

@Component({
  templateUrl: './tree-basic.example.html',
  selector: 'app-tree-basic-example',
  imports: [DasarTreeComponent],
  standalone: true,
})
export class TreeBasicExample {
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
}
