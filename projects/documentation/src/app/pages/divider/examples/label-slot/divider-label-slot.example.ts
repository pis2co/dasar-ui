import { Component } from '@angular/core';
import { DasarDividerComponent, DasarIconComponent } from 'dasar-ui';

@Component({
  templateUrl: './divider-label-slot.example.html',
  selector: 'app-divider-label-slot-example',
  imports: [DasarDividerComponent, DasarIconComponent],
  standalone: true,
})
export class DividerLabelSlotExample {}
