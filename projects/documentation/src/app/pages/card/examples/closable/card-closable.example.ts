import { Component } from '@angular/core';
import { DasarCardComponent } from 'dasar-ui';

@Component({
  templateUrl: './card-closable.example.html',
  selector: 'app-card-closable-example',
  imports: [DasarCardComponent],
  standalone: true,
})
export class CardClosableExample {
  protected isClosed = false;

  handleClose() {
    this.isClosed = true;
    setTimeout(() => {
      this.isClosed = false;
    }, 2000);
  }
}
