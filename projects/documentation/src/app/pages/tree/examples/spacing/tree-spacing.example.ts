import { Component } from '@angular/core';
import { DasarTreeComponent, DasarTreeItem } from 'dasar-ui';

@Component({
  templateUrl: './tree-spacing.example.html',
  styles: [
    `
      .tree-spacing-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 24px;
      }
      .tree-spacing-title {
        font-size: 12px;
        margin: 0 0 8px;
        opacity: 0.7;
      }
    `,
  ],
  selector: 'app-tree-spacing-example',
  imports: [DasarTreeComponent],
  standalone: true,
})
export class TreeSpacingExample {
  protected items: DasarTreeItem[] = [
    {
      key: 'src',
      label: 'src',
      children: [
        {
          key: 'app',
          label: 'app',
          children: [
            {
              key: 'pages',
              label: 'pages',
              children: [{ key: 'home.ts', label: 'home.ts' }],
            },
            { key: 'app.ts', label: 'app.ts' },
          ],
        },
        { key: 'main.ts', label: 'main.ts' },
      ],
    },
    { key: 'package.json', label: 'package.json' },
  ];
}
