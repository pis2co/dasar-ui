import { Component } from '@angular/core';
import { DasarTabsComponent, DasarIconComponent, DasarChipComponent } from 'dasar-ui';

@Component({
  templateUrl: './tabs-slots.example.html',
  selector: 'app-tabs-slots-example',
  imports: [DasarTabsComponent, DasarIconComponent, DasarChipComponent],
  standalone: true,
})
export class TabsSlotsExample {}
