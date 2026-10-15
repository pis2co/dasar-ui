import { Component, signal } from '@angular/core';
import { DasarButtonComponent, DasarIconComponent, DasarListComponent } from 'dasar-ui';

interface DocTask {
  id: number;
  title: string;
  owner: string;
}

@Component({
  templateUrl: './list-advanced-dynamic.example.html',
  selector: 'app-list-advanced-dynamic-example',
  imports: [DasarIconComponent, DasarButtonComponent, DasarListComponent],
  standalone: true,
})
export class ListAdvancedDynamicExample {
  private nextId = 3;

  protected tasks = signal<DocTask[]>([
    { id: 1, title: 'Draft the API contract', owner: 'Ada' },
    { id: 2, title: 'Review the token names', owner: 'Grace' },
  ]);

  addTask() {
    const id = this.nextId++;
    this.tasks.update((current) => [...current, { id, title: `Task #${id}`, owner: 'Unassigned' }]);
  }

  removeTask(id: number, event: MouseEvent) {
    event.stopPropagation();
    this.tasks.update((current) => current.filter((task) => task.id !== id));
  }
}
