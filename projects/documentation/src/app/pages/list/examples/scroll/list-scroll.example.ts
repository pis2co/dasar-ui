import { Component } from '@angular/core';
import { DasarListComponent } from 'dasar-ui';

@Component({
  templateUrl: './list-scroll.example.html',
  selector: 'app-list-scroll-example',
  imports: [DasarListComponent],
  standalone: true,
})
export class ListScrollExample {
  protected members = Array.from({ length: 30 }, (_, i) => `Member ${i + 1}`);
}
