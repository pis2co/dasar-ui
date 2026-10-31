import { Component } from '@angular/core';
import { DasarButtonComponent, DasarTooltip } from 'dasar-ui';

@Component({
  templateUrl: './tooltip-placements.example.html',
  selector: 'app-tooltip-placements-example',
  imports: [DasarButtonComponent, DasarTooltip],
  standalone: true,
})
export class TooltipPlacementsExample {}
