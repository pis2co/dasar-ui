import { Component, signal } from '@angular/core';
import { DasarListComponent } from 'dasar-ui';

@Component({
  templateUrl: './list-keyboard.example.html',
  selector: 'app-list-keyboard-example',
  imports: [DasarListComponent],
  standalone: true,
})
export class ListKeyboardExample {
  protected members = Array.from({ length: 15 }, (_, i) => `Member ${i + 1}`);
  protected selected = signal<string | null>(null);
}
