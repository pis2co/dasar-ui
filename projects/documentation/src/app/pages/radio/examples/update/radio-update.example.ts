import { Component, signal } from '@angular/core';
import { DasarRadioComponent } from 'dasar-ui';

@Component({
  templateUrl: './radio-update.example.html',
  selector: 'app-radio-update-example',
  imports: [DasarRadioComponent],
  standalone: true,
})
export class RadioUpdateExample {
  protected choice = signal<string | null>(null);
  protected log = signal<any[]>([]);

  protected handleUpdate(value: any) {
    this.choice.set(value);
    this.log.update((entries) => [...entries, value]);
  }
}
