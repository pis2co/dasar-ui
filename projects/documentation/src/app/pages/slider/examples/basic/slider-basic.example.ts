import { Component } from '@angular/core';
import { DasarSliderComponent } from 'dasar-ui';

@Component({
  templateUrl: './slider-basic.example.html',
  selector: 'app-slider-basic-example',
  imports: [DasarSliderComponent],
  standalone: true,
})
export class SliderBasicExample {
  protected value = 50;
}
