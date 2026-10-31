import { Component } from '@angular/core';
import { DasarButtonComponent, DasarTooltip } from 'dasar-ui';

@Component({
  templateUrl: './tooltip-appearance.example.html',
  selector: 'app-tooltip-appearance-example',
  imports: [DasarButtonComponent, DasarTooltip],
  standalone: true,
})
export class TooltipAppearanceExample {}
