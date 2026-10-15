import { Component, signal } from '@angular/core';
import { DasarListComponent } from 'dasar-ui';

@Component({
  templateUrl: './list-value-field.example.html',
  selector: 'app-list-value-field-example',
  imports: [DasarListComponent],
  standalone: true,
})
export class ListValueFieldExample {
  protected members = [
    { id: 1, name: 'Ada Lovelace' },
    { id: 2, name: 'Grace Hopper' },
    { id: 3, name: 'Katherine Johnson' },
  ];
  protected selected = signal({ id: 2, name: 'Someone Else' });
}
