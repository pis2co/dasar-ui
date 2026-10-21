import { Component } from '@angular/core';
import { DasarTreeComponent, DasarTreeItem } from 'dasar-ui';

@Component({
  templateUrl: './tree-file.example.html',
  selector: 'app-tree-file-example',
  imports: [DasarTreeComponent],
  standalone: true,
})
export class TreeFileExample {
  protected items: DasarTreeItem[] = [
    {
      key: 'folder',
      label: 'Folder',
      children: [
        { key: 'empty', label: 'Empty', disabled: true, children: [] },
        {
          key: 'my-files',
          label: 'MyFiles',
          children: [{ key: 'template.txt', label: 'template.txt', iconName: 'inbox' }],
        },
      ],
    },
  ];
}
