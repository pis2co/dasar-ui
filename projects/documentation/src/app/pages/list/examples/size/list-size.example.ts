import { Component } from '@angular/core';
import { DasarListComponent } from 'dasar-ui';

@Component({
  templateUrl: './list-size.example.html',
  selector: 'app-list-size-example',
  imports: [DasarListComponent],
  standalone: true,
})
export class ListSizeExample {
  protected items = ['Inbox', 'Sent', 'Drafts'];
}
