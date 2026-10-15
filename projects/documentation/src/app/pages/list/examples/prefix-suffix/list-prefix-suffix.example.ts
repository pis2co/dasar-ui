import { Component } from '@angular/core';
import { DasarChipComponent, DasarIconComponent, DasarListComponent } from 'dasar-ui';

@Component({
  templateUrl: './list-prefix-suffix.example.html',
  selector: 'app-list-prefix-suffix-example',
  imports: [DasarIconComponent, DasarChipComponent, DasarListComponent],
  standalone: true,
})
export class ListPrefixSuffixExample {
  protected items = [
    { name: 'Ada Lovelace', role: 'Admin' },
    { name: 'Grace Hopper', role: 'Editor' },
    { name: 'Katherine Johnson', role: 'Viewer' },
  ];
}
