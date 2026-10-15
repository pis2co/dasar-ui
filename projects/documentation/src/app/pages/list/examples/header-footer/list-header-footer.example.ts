import { Component } from '@angular/core';
import { DasarListComponent } from 'dasar-ui';

@Component({
  templateUrl: './list-header-footer.example.html',
  selector: 'app-list-header-footer-example',
  imports: [DasarListComponent],
  standalone: true,
})
export class ListHeaderFooterExample {
  protected members = ['Ada Lovelace', 'Grace Hopper', 'Katherine Johnson'];
}
