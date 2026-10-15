import { Component, signal } from '@angular/core';
import { DasarModalComponent, DasarButtonComponent } from 'dasar-ui';

type Appearance = 'elevated' | 'outline' | 'borderless';

@Component({
  templateUrl: './modal-appearance.example.html',
  selector: 'app-modal-appearance-example',
  imports: [DasarModalComponent, DasarButtonComponent],
  standalone: true,
})
export class ModalAppearanceExample {
  protected open = signal(false);
  protected appearance = signal<Appearance>('elevated');
  protected appearances: Appearance[] = ['elevated', 'outline', 'borderless'];

  show(appearance: Appearance) {
    this.appearance.set(appearance);
    this.open.set(true);
  }
}
