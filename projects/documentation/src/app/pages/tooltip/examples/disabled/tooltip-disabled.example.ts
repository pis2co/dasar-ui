import { Component } from '@angular/core';
import { DasarButtonComponent, DasarTooltip } from 'dasar-ui';

@Component({
  templateUrl: './tooltip-disabled.example.html',
  selector: 'app-tooltip-disabled-example',
  imports: [DasarButtonComponent, DasarTooltip],
  standalone: true,
})
export class TooltipDisabledExample {}
