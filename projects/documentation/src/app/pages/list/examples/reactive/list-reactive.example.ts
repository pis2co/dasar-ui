import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DasarButtonComponent, DasarListComponent } from 'dasar-ui';

@Component({
  templateUrl: './list-reactive.example.html',
  selector: 'app-list-reactive-example',
  imports: [ReactiveFormsModule, DasarButtonComponent, DasarListComponent],
  standalone: true,
})
export class ListReactiveExample {
  protected members = ['Ada Lovelace', 'Grace Hopper', 'Katherine Johnson'];
  protected control = new FormControl<string | null>('Grace Hopper');
  protected disabled = signal(false);

  protected toggle() {
    this.disabled.set(!this.disabled());
    if (this.disabled()) this.control.disable();
    else this.control.enable();
  }
}
