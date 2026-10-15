import { DasarInputComponent, DasarIconComponent, DasarButtonComponent } from 'dasar-ui';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  imports: [FormsModule, DasarInputComponent, DasarIconComponent, DasarButtonComponent],
  templateUrl: './input-more.example.html',
  selector: 'app-input-more-example',
  standalone: true,
})
export class InputMoreExample {
  protected searchQuery: string = '';
  protected bioText: string = '';

  clearSearch() {
    this.searchQuery = '';
  }
}
