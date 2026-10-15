import { Component } from '@angular/core';
import { DasarListComponent } from 'dasar-ui';

@Component({
  templateUrl: './list-basic.example.html',
  selector: 'app-list-basic-example',
  imports: [DasarListComponent],
  standalone: true,
})
export class ListBasicExample {
  protected members = ['Ada Lovelace', 'Grace Hopper', 'Katherine Johnson'];
}
