import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DasarTreeComponent, DasarTreeItem } from 'dasar-ui';

@Component({
  templateUrl: './tree-ng-model.example.html',
  selector: 'app-tree-ng-model-example',
  imports: [DasarTreeComponent, FormsModule],
  standalone: true,
})
export class TreeNgModelExample {
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
  protected checked: (string | number)[] = ['main.ts'];
  protected selected: string | number | null = 'package.json';
}
