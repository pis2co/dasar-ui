import { Component } from '@angular/core';
import { DasarIconComponent, DasarTreeComponent, DasarTreeItem } from 'dasar-ui';

@Component({
  templateUrl: './tree-custom-icons.example.html',
  selector: 'app-tree-custom-icons-example',
  imports: [DasarTreeComponent, DasarIconComponent],
  standalone: true,
})
export class TreeCustomIconsExample {
  protected items: DasarTreeItem[] = [
    {
      key: 'one',
      label: 'Out of Tao, One is born',
      children: [
        {
          key: 'two-a',
          label: 'Out of One, Two',
          children: [{ key: 'three-a', label: 'Out of Two, Three' }],
        },
        { key: 'two-b', label: 'Out of One, Two' },
      ],
    },
    {
      key: 'one-b',
      label: 'Out of Tao, One is born',
      children: [{ key: 'two-c', label: 'Out of One, Two' }],
    },
  ];
}
