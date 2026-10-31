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
  protected appearance = signal<Appearance>('elevated');
  protected appearances: Appearance[] = ['elevated', 'outline', 'borderless'];

  setAppearance(appearance: Appearance) {
    this.appearance.set(appearance);
  }
}
