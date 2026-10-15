import { Component } from '@angular/core';
import { DasarListComponent } from 'dasar-ui';

@Component({
  templateUrl: './list-radius.example.html',
  selector: 'app-list-radius-example',
  imports: [DasarListComponent],
  standalone: true,
})
export class ListRadiusExample {
  protected members = ['Ada Lovelace', 'Grace Hopper'];
}
