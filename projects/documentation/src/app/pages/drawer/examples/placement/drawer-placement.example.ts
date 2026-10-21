import { Component, signal } from '@angular/core';
import { DasarButtonComponent, DasarDrawerComponent } from 'dasar-ui';

type Placement = 'top' | 'right' | 'bottom' | 'left';

@Component({
  templateUrl: './drawer-placement.example.html',
  selector: 'app-drawer-placement-example',
  imports: [DasarDrawerComponent, DasarButtonComponent],
  standalone: true,
})
export class DrawerPlacementExample {
  protected placements: Placement[] = ['top', 'right', 'bottom', 'left'];
  protected placement = signal<Placement>('right');
  protected show = signal(false);

  protected open(placement: Placement) {
    this.placement.set(placement);
    this.show.set(true);
  }
}
