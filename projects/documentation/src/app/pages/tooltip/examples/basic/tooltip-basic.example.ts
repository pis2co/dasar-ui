import { Component } from '@angular/core';
import { DasarButtonComponent, DasarTooltip } from 'dasar-ui';

@Component({
  templateUrl: './tooltip-basic.example.html',
  selector: 'app-tooltip-basic-example',
  imports: [DasarButtonComponent, DasarTooltip],
  standalone: true,
})
export class TooltipBasicExample {}
