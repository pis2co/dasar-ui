import { DasarInputComponent, DasarIconComponent } from 'dasar-ui';
import { Component } from '@angular/core';

@Component({
  imports: [DasarInputComponent, DasarIconComponent],
  templateUrl: './input-slots.example.html',
  selector: 'app-input-slots-example',
  standalone: true,
})
export class InputSlotsExample {}
