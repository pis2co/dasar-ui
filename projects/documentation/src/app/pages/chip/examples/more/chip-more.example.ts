import { DasarChipComponent } from 'dasar-ui';
import { Component } from '@angular/core';

@Component({
  templateUrl: './chip-more.example.html',
  selector: 'app-chip-more-example',
  imports: [DasarChipComponent],
  standalone: true,
})
export class ChipMoreExample {
  removed() {
    alert('Chip removed!');
  }
  clicked() {
    alert('Chip clicked!');
  }
}
