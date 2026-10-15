import { Component, signal } from '@angular/core';
import { DasarListComponent } from 'dasar-ui';

@Component({
  templateUrl: './list-selectable.example.html',
  selector: 'app-list-selectable-example',
  imports: [DasarListComponent],
  standalone: true,
})
export class ListSelectableExample {
  protected members = ['Ada Lovelace', 'Grace Hopper', 'Katherine Johnson'];
  protected selected = signal<string | null>(null);
}
