import { Component } from '@angular/core';
import { DasarButtonComponent, DasarTooltip } from 'dasar-ui';

@Component({
  templateUrl: './tooltip-delay.example.html',
  selector: 'app-tooltip-delay-example',
  imports: [DasarButtonComponent, DasarTooltip],
  standalone: true,
})
export class TooltipDelayExample {}
