import {
  DasarToastCloseReason,
  DasarToastItem,
  DasarToastOptions,
  DasarToastRef,
} from './dasar-toast.model';
import { Injectable, signal } from '@angular/core';

// Provided by dasar-toast-provider, so every provider owns its own instance.
@Injectable()
export class DasarToastService {
  private nextId = 1;

  readonly items = signal<DasarToastItem[]>([]);
  readonly max = signal(5);

  create(options: DasarToastOptions): DasarToastRef {
    const id = this.nextId++;
    const ref: DasarToastRef = {
      id,
      close: () => this.close(id, 'destroy'),
      update: (patch) => this.update(id, patch),
    };
    this.items.update((list) => [...list, { id, options, state: 'entering', ref }]);
    return ref;
  }

  update(target: DasarToastRef | number, patch: Partial<DasarToastOptions>): void {
    const id = this.idOf(target);
    this.items.update((list) =>
      list.map((item) =>
        item.id === id ? { ...item, options: { ...item.options, ...patch } } : item,
      ),
    );
  }

  destroy(target: DasarToastRef | number): void {
    this.close(this.idOf(target), 'destroy');
  }

  destroyEverything(): void {
    for (const item of [...this.items()]) this.close(item.id, 'destroy');
  }

  isRendered(id: number): boolean {
    return this.items()
      .slice(0, this.max())
      .some((item) => item.id === id);
  }

  close(id: number, reason: DasarToastCloseReason): void {
    const item = this.find(id);
    if (!item || item.state === 'leaving') return;
    item.options.onClose?.(item.ref, reason);
    if (!this.isRendered(id)) {
      this.remove(id);
      return;
    }
    this.setState(id, 'leaving');
  }

  entered(id: number): void {
    const item = this.find(id);
    if (!item || item.state !== 'entering') return;
    this.setState(id, 'visible');
    item.options.onEnter?.(item.ref);
  }

  remove(id: number): void {
    const item = this.find(id);
    if (!item) return;
    this.items.update((list) => list.filter((entry) => entry.id !== id));
    item.options.onLeave?.(item.ref);
  }

  private setState(id: number, state: DasarToastItem['state']): void {
    this.items.update((list) => list.map((item) => (item.id === id ? { ...item, state } : item)));
  }

  private find(id: number): DasarToastItem | undefined {
    return this.items().find((item) => item.id === id);
  }

  private idOf(target: DasarToastRef | number): number {
    return typeof target === 'number' ? target : target.id;
  }
}
