import { Component } from '@angular/core';
import { DasarListComponent } from 'dasar-ui';

@Component({
  templateUrl: './list-bordered-divider.example.html',
  selector: 'app-list-bordered-divider-example',
  imports: [DasarListComponent],
  standalone: true,
})
export class ListBorderedDividerExample {
  protected items = ['Design system', 'Component library', 'Documentation'];
}
