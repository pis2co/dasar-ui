import { Component, signal } from '@angular/core';
import { DasarListComponent } from 'dasar-ui';

@Component({
  templateUrl: './list-interactive.example.html',
  selector: 'app-list-interactive-example',
  imports: [DasarListComponent],
  standalone: true,
})
export class ListInteractiveExample {
  protected items = [
    { id: 'ada', name: 'Ada Lovelace', role: 'Analyst' },
    { id: 'grace', name: 'Grace Hopper', role: 'Engineer' },
    { id: 'katherine', name: 'Katherine Johnson', role: 'Mathematician' },
  ];

  protected selected = signal<string | null>(null);

  protected select(id: string) {
    this.selected.set(this.selected() === id ? null : id);
  }
}
