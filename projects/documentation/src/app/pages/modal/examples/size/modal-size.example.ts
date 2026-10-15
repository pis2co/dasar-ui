import { Component, signal } from '@angular/core';
import { DasarModalComponent, DasarButtonComponent } from 'dasar-ui';

type Size = 'sm' | 'md' | 'lg';

@Component({
  templateUrl: './modal-size.example.html',
  selector: 'app-modal-size-example',
  imports: [DasarModalComponent, DasarButtonComponent],
  standalone: true,
})
export class ModalSizeExample {
  protected open = signal(false);
  protected size = signal<Size>('md');
  protected sizes: Size[] = ['sm', 'md', 'lg'];

  show(size: Size) {
    this.size.set(size);
    this.open.set(true);
  }
}
