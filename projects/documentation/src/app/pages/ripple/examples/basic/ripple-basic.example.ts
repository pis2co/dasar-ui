import { Component } from '@angular/core';
import { DasarRippleDirective } from 'dasar-ui';

@Component({
  templateUrl: './ripple-basic.example.html',
  selector: 'app-ripple-basic-example',
  imports: [DasarRippleDirective],
  standalone: true,
})
export class RippleBasicExample {}
